import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import type { MoodFormData } from '../types';

interface Step3Props {
  control: Control<MoodFormData>;
  errors: FieldErrors<MoodFormData>;
}

export const Step3: React.FC<Step3Props> = ({ control, errors }) => (
  <div>
    <h3 className="text-preset-3 text-neutral-900 mb-8">
      Write about your day...
    </h3>
    <Controller
      name="journalEntry"
      control={control}
      rules={{
        required: 'Please write about your day',
        maxLength: {
          value: 150,
          message: 'Entry must be 150 characters or less',
        },
      }}
      render={({ field }) => (
        <div className="relative">
          <textarea
            {...field}
            placeholder="Today, I felt..."
            maxLength={150}
            className="w-full p-4 border bg-neutral-0 border-neutral-300 rounded-lg resize-none h-38 focus:outline-none focus:border-blue-600"
          />
          <div className="absolute bottom--4 right-2 text-preset-8 text-neutral-600">
            {field.value?.length || 0}/150
          </div>
        </div>
      )}
    />
    {errors.journalEntry && (
      <p className="text-red-500 text-preset-7 mt-2">
        {errors.journalEntry.message}
      </p>
    )}
  </div>
);
