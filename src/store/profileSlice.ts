import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Profile } from '../services/profileService';

export interface ProfileState {
  currentProfile: Profile | null;
  profiles: Profile[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  currentProfile: null,
  profiles: [],
  isLoading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfiles: (state, action: PayloadAction<Profile[]>) => {
      state.profiles = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addProfile: (state, action: PayloadAction<Profile>) => {
      state.profiles.unshift(action.payload);
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      const index = state.profiles.findIndex(
        (profile) => profile.id === action.payload.id
      );
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
      if (state.currentProfile?.id === action.payload.id) {
        state.currentProfile = action.payload;
      }
    },
    removeProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter(
        (profile) => profile.id !== action.payload
      );
      if (state.currentProfile?.id === action.payload) {
        state.currentProfile = null;
      }
    },
    setCurrentProfile: (state, action: PayloadAction<Profile | null>) => {
      state.currentProfile = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setProfiles,
  addProfile,
  updateProfile,
  removeProfile,
  setCurrentProfile,
  setLoading,
  setError,
  clearError,
} = profileSlice.actions;

export default profileSlice.reducer;
