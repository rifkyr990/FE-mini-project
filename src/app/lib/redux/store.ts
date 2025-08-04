// src/lib/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
