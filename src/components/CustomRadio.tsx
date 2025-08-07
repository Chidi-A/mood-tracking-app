import React from 'react';
import type { Control, UseControllerProps } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { MoodFormData } from '../features/types';

interface RadioOption {
  value: string | number;
  label: string;
  emoji?: string;
}

interface CustomRadioProps {
  name: keyof MoodFormData;
  control: Control<MoodFormData>;
  options: RadioOption[];
  rules?: UseControllerProps<MoodFormData, keyof MoodFormData>['rules'];
  showEmoji?: boolean;
}

export const CustomRadio: React.FC<CustomRadioProps> = ({
  name,
  control,
  options,
  rules,
  showEmoji = true,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = field.value === option.value;

            return (
              <label
                key={option.value}
                onClick={() => {
                  field.onChange(option.value);
                }}
                className={`flex items-center px-5 py-3 bg-neutral-0 border rounded-[10px] cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-blue-600 border-2 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="relative mr-4">
                  <input
                    type="radio"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => field.onChange(option.value)}
                    className="sr-only"
                    readOnly
                  />
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
                {showEmoji && option.emoji && (
                  <img
                    src={option.emoji}
                    alt={option.label}
                    className="w-10 h-10"
                  />
                )}
              </label>
            );
          })}
        </div>
      )}
    />
  );
};
