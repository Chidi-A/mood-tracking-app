import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  closeModal,
  nextStep,
  updateFormData,
  setSubmitting,
  setLastSubmittedEntry,
} from '../store/moodFormSlice';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { Step1, Step2, Step3, Step4 } from './steps';
import type { MoodFormData } from './types';
import { useCreateMoodEntry } from '../hooks/useMoodQueries';
import type { MoodEntry } from '../index';

interface LogMoodModalProps {
  onSubmit: (data: MoodFormData) => Promise<void>;
}

export const LogMoodModal: React.FC<LogMoodModalProps> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const { isModalOpen, currentStep, isSubmitting } = useAppSelector(
    (state) => state.moodForm
  );

  const createMoodEntry = useCreateMoodEntry();

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    reset,

    formState: { errors },
  } = useForm<MoodFormData>({
    defaultValues: {
      mood: undefined,
      sleepHours: undefined,
      feelings: [],
      journalEntry: '',
    },
    mode: 'onSubmit',
  });

  const watchedMood = watch('mood');
  const watchedSleepHours = watch('sleepHours');
  const watchedFeelings = watch('feelings');
  const watchedJournalEntry = watch('journalEntry');

  useEffect(() => {
    if (!isModalOpen) {
      reset({
        mood: undefined,
        sleepHours: undefined,
        feelings: [],
        journalEntry: '',
      });
    }
  }, [isModalOpen, reset]);

  useEffect(() => {
    dispatch(
      updateFormData({
        mood: watchedMood,
        sleepHours: watchedSleepHours,
        feelings: watchedFeelings,
        journalEntry: watchedJournalEntry,
      })
    );
  }, [
    watchedMood,
    watchedSleepHours,
    watchedFeelings,
    watchedJournalEntry,
    dispatch,
  ]);

  useEffect(() => {}, [currentStep, errors, watchedSleepHours]);

  useEffect(() => {
    const allFieldsComplete =
      watchedMood &&
      watchedSleepHours &&
      watchedFeelings.length > 0 &&
      watchedJournalEntry;

    if (allFieldsComplete && currentStep === 4) {
      console.log(
        'All fields are complete on step 4 - this might trigger auto-submission'
      );
    }
  }, [
    watchedMood,
    watchedSleepHours,
    watchedFeelings,
    watchedJournalEntry,
    currentStep,
  ]);

  useEffect(() => {}, [
    currentStep,
    errors,
    watchedMood,
    watchedSleepHours,
    watchedFeelings,
    watchedJournalEntry,
  ]);

  const handleClose = () => {
    dispatch(closeModal());
  };
  const getCurrentStepField = () => {
    switch (currentStep) {
      case 1:
        return 'mood';
      case 2:
        return 'feelings';
      case 3:
        return 'journalEntry';
      case 4:
        return 'sleepHours';
      default:
        return 'mood';
    }
  };

  const handleNext = async () => {
    if (currentStep >= 4) {
      return;
    }

    const isValid = await trigger(getCurrentStepField());

    const canProceedResult = canProceed();

    if (isValid && canProceedResult) {
      dispatch(nextStep());
    } else {
      console.log(
        '❌ Cannot proceed - validation failed or conditions not met'
      );
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return watchedMood !== undefined;
      case 2:
        return watchedFeelings.length > 0;
      case 3:
        return watchedJournalEntry.trim().length > 0;
      case 4:
        return watchedSleepHours !== undefined;
      default:
        return false;
    }
  };

  const onFormSubmit = async (data: MoodFormData) => {
    console.log('🚀 Form submission started in LogMoodModal');
    console.log('📍 Stack trace:');
    console.trace();
    console.log('Form data:', data);

    // Only allow submission on step 4 and when explicitly triggered
    if (currentStep !== 4) {
      console.log('❌ Submission blocked - not on step 4');
      return;
    }

    try {
      dispatch(setSubmitting(true));

      console.log('🎯 Calling React Query mutation...');
      const result = await createMoodEntry.mutateAsync(data);
      console.log('✅ Supabase submission successful:', result);

      const submittedEntry: MoodEntry = {
        createdAt: new Date().toISOString(),
        mood: data.mood!,
        feelings: data.feelings,
        journalEntry: data.journalEntry,
        sleepHours: parseFloat(data.sleepHours!),
      };

      dispatch(setLastSubmittedEntry(submittedEntry));
      await onSubmit(data);
      dispatch(closeModal());
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  if (!isModalOpen) return null;

  const steps = [Step1, Step2, Step3, Step4];
  const CurrentStep = steps[currentStep - 1];

  return (
    <div className="fixed inset-0 bg-neutral-900/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-light rounded-2xl px-5 md:px-10 lg:px-10 py-12 w-[600px] max-h-[90vh] relative overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-full">
            <h2 className="text-preset-2 text-neutral-900 mb-8">
              Log your mood
            </h2>
            <ProgressIndicator currentStep={currentStep} totalSteps={4} />
          </div>
          <button
            onClick={handleClose}
            className="cursor-pointer absolute top-5 right-10 text-gray-400 hover:text-gray-600 text-4xl"
          >
            ×
          </button>
        </div>

        {/* <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm">
          <strong>Debug Info:</strong>
          <br />
          Mutation Loading: {createMoodEntry.isPending ? 'Yes' : 'No'}
          <br />
          Mutation Error:{' '}
          {createMoodEntry.error ? createMoodEntry.error.message : 'None'}
          <br />
          Form Data:{' '}
          {JSON.stringify(
            {
              mood: watchedMood,
              sleepHours: watchedSleepHours,
              feelings: watchedFeelings,
              journalEntry: watchedJournalEntry,
            },
            null,
            2
          )}
        </div> */}

        {/* Prevent form from auto-submitting by not using onSubmit */}
        <div>
          <div className="mb-8">
            <CurrentStep control={control} errors={errors} />
          </div>

          <div className="">
            <div className="flex gap-3">
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="cursor-pointer w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-preset-5 hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    handleSubmit(onFormSubmit)();
                  }}
                  disabled={isSubmitting || createMoodEntry.isPending}
                  className={`w-full px-6 py-3 rounded-lg text-preset-5 transition-colors ${
                    isSubmitting || createMoodEntry.isPending
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting || createMoodEntry.isPending
                    ? 'Submitting...'
                    : 'Submit'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
