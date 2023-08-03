import { Session } from '@supabase/supabase-js';
import { makeObservable, observable, action } from 'mobx';

import { supabase } from './lib/supabase';
import { RootStore } from './types/RootStore';
import { STORE_KEYS } from './rootStore/storeKeys';

class AccountStore {
  rootStore: RootStore;
  storeKey = STORE_KEYS.ACCOUNT_STORE;

  error: Error | null = null;
  session: Session | null = null;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      error: observable,
      session: observable,
      getSession: action,
      handleAuthStateChange: action,
    });
    this.rootStore = rootStore;
    this.getSession().catch(console.error);

    supabase.auth.onAuthStateChange(this.handleAuthStateChange);
  }

  handleAuthStateChange = (_event: string, newSession: Session | null) => {
    this.session = newSession;
  };

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

    // this func is all we need for this store to ready so far
    this.rootStore.setReady(this.storeKey);
  }
}

export default AccountStore;
