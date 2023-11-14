import { configureStore,combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "../features/Auth/Auth"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
   key: 'blog-user',
   storage,
   blacklist: ['isLoading','isError'],
 };

const persistedUserReducer=persistReducer(persistConfig,AuthReducer);

const rootReducer = combineReducers({
  auth:persistedUserReducer,
});

export const store=configureStore({
   reducer:rootReducer,
   middleware: [thunk]
});

export const persistor = persistStore(store);