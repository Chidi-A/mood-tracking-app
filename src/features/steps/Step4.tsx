import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
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
    <Controller
      name="sleepHours"
      control={control}
      rules={{ required: 'How many hours did you sleep last night?' }}
      render={({ field }) => (
        <div className="space-y-3">
          {SLEEP_OPTIONS.map((option) => {
            const isSelected = field.value === option.value;

            return (
              <div
                key={option.value}
                onClick={(e) => {
                  e.preventDefault(); // Prevent any default behavior
                  e.stopPropagation(); // Stop event bubbling
                  console.log('🔍 Sleep option clicked:', option.value); // Debug log
                  field.onChange(option.value);
                }}
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent mousedown from triggering form submission
                }}
                className={`flex items-center px-5 py-3 bg-neutral-0 border rounded-[10px] cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-blue-600 border-2 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="relative mr-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
                <span className="text-preset-5 text-neutral-900 flex-1">
                  {option.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    />
    {errors.sleepHours && (
      <div className="flex items-center gap-2 mt-3 p-3">
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
          {errors.sleepHours.message}
        </p>
      </div>
    )}
  </div>
);
