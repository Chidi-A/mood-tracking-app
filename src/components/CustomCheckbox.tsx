import React from 'react';
import type { Control, UseControllerProps } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { MoodFormData } from '../features/types';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CustomCheckboxProps {
  name: keyof MoodFormData;
  control: Control<MoodFormData>;
  options: CheckboxOption[];
  rules?: UseControllerProps<MoodFormData, keyof MoodFormData>['rules'];
  maxSelections?: number;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  name,
  control,
  options,
  rules,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className="flex flex-row flex-wrap gap-x-4 gap-y-3">
          {options.map((option) => {
            // Type-safe check for array values
            const fieldValue = field.value as string[];
            const isSelected =
              Array.isArray(fieldValue) && fieldValue.includes(option.value);

            return (
              <label
                key={option.value}
                className={`flex items-center p-3 bg-neutral-0 border rounded-[10px] cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-blue-600 border-2 bg-blue-50'
                    : 'border-blue-100 border-2 hover:border-blue-200'
                }`}
              >
                <div className="relative mr-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {
                      const currentValues = (field.value as string[]) || [];
                      const newValues = isSelected
                        ? currentValues.filter((v) => v !== option.value)
                        : [...currentValues, option.value];
                      field.onChange(newValues);
                    }}
                    className="sr-only"
                    value={option.value}
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-blue-200 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-preset-6-regular text-neutral-900 flex-1">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      )}
    />
  );
};
