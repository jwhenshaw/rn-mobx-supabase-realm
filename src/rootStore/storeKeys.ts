export const STORE_KEYS = {
  ACCOUNT_STORE: 'accountStore',
};

type StoreKeyKeys = keyof typeof STORE_KEYS;
export type StoreKeyValues = (typeof STORE_KEYS)[StoreKeyKeys];
