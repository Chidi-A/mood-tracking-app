import React from 'react';
import type { Control, FieldErrors } from 'react-hook-form';
import { CustomCheckbox } from '../../components/CustomCheckbox';
import { FEELING_TAGS } from '../constants';
import type { MoodFormData } from '../types';

interface Step2Props {
  control: Control<MoodFormData>;
  errors: FieldErrors<MoodFormData>;
}

export const Step2: React.FC<Step2Props> = ({ control, errors }) => (
  <div>
    <h3 className="text-preset-3 text-neutral-900 mb-2">How did you feel?</h3>
    <p className="text-preset-6 text-neutral-600 mb-6">
      Select up to three tags:
    </p>
    <CustomCheckbox
      name="feelings"
      control={control}
      options={FEELING_TAGS.map((tag) => ({ value: tag, label: tag }))}
      rules={{
        required: 'Pick a feeling to tag your day!',
        validate: (value) => {
          if (!value || (Array.isArray(value) && value.length === 0)) {
            return 'Pick a feeling to tag your day!';
          }
          if (Array.isArray(value) && value.length > 3) {
            return 'You can only select a maximum of 3 tags.';
          }
          return true;
        },
      }}
      maxSelections={3}
    />
    {errors.feelings && (
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
          {errors.feelings.message}
        </p>
      </div>
    )}
  </div>
);
