import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "../features/Auth/Auth";
import ChatReducer from "../features/Chat/ChatSlice";
import MessageReducer from "../features/Messages/MessageSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistAuthConfig = {
  key: "blog-user",
  storage,
  //  blacklist: ['isLoading','isError'],
  // whitelist: ['user'],
};

const persistedUserReducer = persistReducer(persistAuthConfig, AuthReducer);

const rootReducer = combineReducers({
  auth: persistedUserReducer,
  chat: ChatReducer,
  message: MessageReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
