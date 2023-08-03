import { action, computed, makeObservable, observable } from 'mobx';
import { createContext, useContext } from 'react';
import AccountStore from '../account/AccountStore';
import { CheckInStore } from '../check-in/CheckInStore';
import { STORE_KEYS, StoreKeyValues } from './storeKeys';

export class RootStore {
  accountStore: AccountStore;
  checkInStore: CheckInStore;
  readyMap: { [key: StoreKeyValues]: boolean } = {};

  constructor() {
    makeObservable(this, {
      isReady: computed,
      readyMap: observable,
      setReady: action,
    });
    this.accountStore = new AccountStore(this);
    this.checkInStore = new CheckInStore(this);

    this.readyMap = {
      [STORE_KEYS.ACCOUNT_STORE]: false,
      [STORE_KEYS.CHECK_IN_STORE]: false,
    };
  }

  get isReady() {
    return Object.values(this.readyMap).find(ready => !ready) === undefined;
  }

  setReady = (key: StoreKeyValues) => {
    if (this.readyMap[key] === false) {
      this.readyMap[key] = true;
    }
  };
}

const rootStore = new RootStore();
export const RootStoreContext = createContext(rootStore);

export const useRootStore = () => useContext(RootStoreContext);
