import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import userReducer from "./user/userSlice";
import { createTransform } from "redux-persist";

// Transform to exclude loading and error states from persistence
const userTransform = createTransform(
  (inboundState, key) => {
    // Transform state before saving to persistence
    return { ...inboundState, loading: false, error: null };
  },
  (outboundState, key) => {
    // Transform state after loading from persistence
    return outboundState;
  },
  { whitelist: ["currentUser"] } // Apply transformation only to the `currentUser` key
);

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key for storage
  storage, // Use local storage
  transforms: [userTransform], // Apply custom transforms
  whitelist: ["currentUser"], // Only persist `currentUser` slice
};

const rootReducer = combineReducers({
  user: userReducer, // Combine user reducer
});

// Create a persisted reducer with the provided configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore actions related to redux-persist
      },
    }),
});

// Create a persistor to manage state persistence
export const persistor = persistStore(store);
