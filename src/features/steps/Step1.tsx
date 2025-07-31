import React from 'react';
import type { Control, FieldErrors } from 'react-hook-form';
import { CustomRadio } from '../../components/CustomRadio';
import { MOOD_OPTIONS } from '../constants';
import type { MoodFormData } from '../types';

interface Step1Props {
  control: Control<MoodFormData>;
  errors: FieldErrors<MoodFormData>;
}

export const Step1: React.FC<Step1Props> = ({ control, errors }) => (
  <div>
    <h3 className="text-preset-3 text-neutral-900 mb-6">
      How was your mood today?
    </h3>
    <CustomRadio
      name="mood"
      control={control}
      options={MOOD_OPTIONS}
      rules={{ required: 'Please select a mood before continuing' }}
      showEmoji={true}
    />
    {errors.mood && (
      <div className="flex items-center gap-2 mt-3 p-3 ">
        <svg
          className="w-5 h-5 text-red-700"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-red-700 text-preset-6 font-medium">
          {errors.mood.message}
        </p>
      </div>
    )}
  </div>
);
