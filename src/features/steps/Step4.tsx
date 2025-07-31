import React from 'react';
import type { Control, FieldErrors } from 'react-hook-form';
import { CustomRadio } from '../../components/CustomRadio';
import { SLEEP_OPTIONS } from '../constants';
import type { MoodFormData } from '../types';

interface Step4Props {
  control: Control<MoodFormData>;
  errors: FieldErrors<MoodFormData>;
}

export const Step4: React.FC<Step4Props> = ({ control, errors }) => (
  <div>
    <h3 className="text-preset-4 text-neutral-900 mb-6">
      How many hours did you sleep last night?
    </h3>
    <CustomRadio
      name="sleepHours"
      control={control}
      options={SLEEP_OPTIONS}
      rules={{ required: 'How many hours did you sleep last night?' }}
      showEmoji={false}
    />
    {errors.sleepHours && (
      <p className="text-red-500 text-preset-7 mt-2">
        {errors.sleepHours.message}
      </p>
    )}
  </div>
);
