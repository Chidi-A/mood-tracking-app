import { configureStore } from '@reduxjs/toolkit';
import moodFormReducer from './moodFormSlice';
import profileReducer from './profileSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    moodForm: moodFormReducer,
    profile: profileReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setAuth'],
        ignoredPaths: ['auth.user', 'auth.session'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
