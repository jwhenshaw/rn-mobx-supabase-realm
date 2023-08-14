import Realm from 'realm';
import { v4 as uuidv4 } from 'uuid';
import { Database } from './types/supabase';

export const ProfileTypename = 'Profile';

export type sbProfile = Database['public']['Tables']['profiles']['Row'];

class Profile extends Realm.Object<Profile> implements sbProfile {
  id!: string; // FK for auth.user.id
  created_at!: string;
  updated_at!: string;
  avatar_url: string | null = null;
  full_name: string | null = null;
  username: string | null = null;

  static schema = {
    name: ProfileTypename,
    properties: {
      id: { type: 'string', default: uuidv4 },
      created_at: { type: 'string', default: new Date().toISOString() },
      accountId: 'string',
      updatedAt: { type: 'string', default: new Date().toISOString() },
      full_name: { type: 'string' },
      username: { type: 'string' },
    },
    primaryKey: 'accountId',
  };
}

export default Profile;
