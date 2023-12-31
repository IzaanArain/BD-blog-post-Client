import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "../features/Auth/Auth";
import ChatReducer from "../features/Chat/ChatSlice";
import MessageReducer from "../features/Messages/MessageSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import axios from "axios";


const persistAuthConfig = {
  key: "blog-user",
  storage,
  //  blacklist: ['isLoading','isError'],
  // whitelist: ['user'],
};
// const persistMessageConfig = {
//   key: "blog-messages",
//   storage,
// };

const persistedUserReducer = persistReducer(persistAuthConfig, AuthReducer);
// const persistedMessageReducer = persistReducer(persistMessageConfig, MessageReducer);

const rootReducer = combineReducers({
  auth: persistedUserReducer,
  chat: ChatReducer,
  message: MessageReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware({
  //   serializableCheck: false,
  // }),
});

export const persistor = persistStore(store);

persistor.subscribe(() => {
  const persistedState = store.getState();
  const token = persistedState?.auth?.user?.user_auth || {};
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
});