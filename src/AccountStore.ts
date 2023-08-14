import { PostgrestError, Session } from '@supabase/supabase-js';
import { makeObservable, observable, action } from 'mobx';
import { getUniqueId } from 'react-native-device-info';

import { supabase } from './lib/supabase';
import { RootStore } from './types/RootStore';
import { STORE_KEYS } from './rootStore/storeKeys';
import openRealm from './lib/realm';
import Profile, { sbProfile } from './Profile.realm';

class AccountStore {
  rootStore: RootStore;
  storeKey = STORE_KEYS.ACCOUNT_STORE;

  realm!: Realm;
  profile: Profile | null = null;

  error: Error | PostgrestError | null = null;
  session: Session | null = null;
  deviceId!: string;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      error: observable,
      session: observable,
      getSession: action,
      handleAuthStateChange: action,
    });
    this.rootStore = rootStore;
    this.configure();

    supabase.auth.onAuthStateChange(this.handleAuthStateChange);
  }

  get id() {
    return this.profile?.id ?? this.session?.user.id ?? this.deviceId;
  }

  handleAuthStateChange = (_event: string, newSession: Session | null) => {
    this.session = newSession;
  };

  async configure() {
    try {
      this.deviceId = await getUniqueId();
      // configure the persistent store
      this.realm = await openRealm();
      // now fetch the locally stored profile
      const localProfile = await this.getLocalProfile().catch(() => null);
      const session = await this.getSession();

      if (localProfile && !session) {
        // we are in anon mode so let's use the local profile only
        this.profile = localProfile;
        this.rootStore.setReady(this.storeKey);
      } else if (!localProfile && session) {
        // we have a session but no local profile
        // so let's create a local profile from the session
        const profile = await this.fetchProfile();
        this.profile = await this.createLocalProfile(profile);
      } else if (localProfile && session) {
        // we have a session and a local profile
        // let's check if the local profile is up to date
        const profile = await this.fetchProfile();
        if (new Date(profile.updated_at) > new Date(localProfile.updated_at)) {
          // the local profile is out of date
          // so let's update it
          this.profile = await this.updateLocalProfile(localProfile, profile);
        } else {
          // local profile is up to date
          // so let's update the backend store
          supabase.from('profiles').upsert(profile);
        }
        this.profile = localProfile;
      }

      this.rootStore.setReady(this.storeKey);
    } catch (error) {
      // do something with error
      console.error(error);
    }
  }

  async getSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      // do something with error
      this.error = error;
    }

    if (!data.session) {
      // if no session, set session to null
      this.session = null;
    } else {
      this.session = data.session;
    }
    return this.session;
  }

  async fetchProfile() {
    if (!this.session?.user.id) {
      throw new Error('Cannot fetch profile without a user id');
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', this.session?.user.id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  createLocalProfile(profile: sbProfile) {
    // create new profile
    this.realm.write(() => {
      this.realm.create(Profile, {
        id: profile.id,
        created_at: profile.created_at,
        updated_at: profile.created_at,
      });
    });

    const localProfile = this.getLocalProfile();
    if (!localProfile) {
      throw new Error('Failed to create and then find local profile');
    }

    return localProfile;
  }

  updateLocalProfile(localProfile: Profile, profile: sbProfile) {
    this.realm.write(() => {
      localProfile.updated_at = profile.updated_at;
      localProfile.avatar_url = profile.avatar_url;
      localProfile.username = profile.username;
      localProfile.full_name = profile.full_name;
    });

    return this.getLocalProfile();
  }

  async getLocalProfile() {
    const profile = this.realm.objectForPrimaryKey(Profile, this.id);
    if (!profile) {
      throw new Error('Local profile not found');
    }
    return profile;
  }
}

export default AccountStore;
