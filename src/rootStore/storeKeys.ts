export const STORE_KEYS = {
  ACCOUNT_STORE: 'accountStore',
  CHECK_IN_STORE: 'checkInStore',
};

type StoreKeyKeys = keyof typeof STORE_KEYS;
export type StoreKeyValues = (typeof STORE_KEYS)[StoreKeyKeys];
