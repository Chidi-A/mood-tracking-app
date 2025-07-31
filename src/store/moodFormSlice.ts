import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MoodEntry, MoodLevel, SleepCategory } from '..';

export interface MoodFormState {
  currentStep: number;
  formData: {
    mood: MoodLevel | undefined;
    sleepHours: SleepCategory | undefined;
    feelings: string[];
    journalEntry: string;
  };
  isModalOpen: boolean;
  isSubmitting: boolean;
  isDraft: boolean;
  error: string | null;
  lastSubmittedEntry: MoodEntry | null;
}

const initialState: MoodFormState = {
  currentStep: 1,
  formData: {
    mood: undefined,
    sleepHours: undefined,
    feelings: [],
    journalEntry: '',
  },
  isModalOpen: false,
  isSubmitting: false,
  isDraft: false,
  error: null,
  lastSubmittedEntry: null,
};

const moodFormSlice = createSlice({
  name: 'moodForm',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
      state.currentStep = 1;
      state.isDraft = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.currentStep = 1;
      state.formData = initialState.formData;
      state.isDraft = false;
    },
    nextStep: (state) => {
      if (state.currentStep < 4) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    updateFormData: (
      state,
      action: PayloadAction<Partial<MoodFormState['formData']>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLastSubmittedEntry: (state, action: PayloadAction<MoodEntry | null>) => {
      state.lastSubmittedEntry = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  openModal,
  closeModal,
  nextStep,
  prevStep,
  updateFormData,
  setSubmitting,
  setError,
  setLastSubmittedEntry,
  clearError,
} = moodFormSlice.actions;

export default moodFormSlice.reducer;
