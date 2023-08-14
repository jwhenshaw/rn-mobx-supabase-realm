import Realm from 'realm';
import Profile from '../Profile.realm';

const realmConfig: Realm.Configuration = {
  schema: [Profile],
};

const openRealm = async () => {
  const realm = await Realm.open(realmConfig);
  realm.objectForPrimaryKey(Profile.schema.name, 'accountId');
  return realm;
};

export default openRealm;
