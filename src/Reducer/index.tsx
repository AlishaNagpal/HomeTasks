
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { reducer } from './Reducer'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['HomeReducer'],
    blacklist: [],
}

const persistedReducer = persistReducer(persistConfig, reducer)
const enhancer = compose(applyMiddleware(thunk, logger));
const store = createStore(persistedReducer, enhancer);
let persistor = persistStore(store);

export{
    store,
    persistor
};