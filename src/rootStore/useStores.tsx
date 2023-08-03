import {useContext} from 'react';
import {RootStoreContext} from './RootStore';

export const useStores = () => useContext(RootStoreContext);
