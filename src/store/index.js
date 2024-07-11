import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { userReducer } from "./userSlice.js";
import storage from "redux-persist/lib/storage";


const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["userName"],
};

const persistedReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = combineReducers({
  user: persistedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
