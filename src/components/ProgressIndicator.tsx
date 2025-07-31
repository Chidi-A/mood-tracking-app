import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  className = '',
}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-1.5 flex-1 rounded transition-colors ${
            index + 1 <= currentStep ? 'bg-blue-600' : 'bg-blue-200'
          }`}
        />
      ))}
    </div>
  );
};
