import { configureStore } from '@reduxjs/toolkit';
import moodFormReducer from './moodFormSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    moodForm: moodFormReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
