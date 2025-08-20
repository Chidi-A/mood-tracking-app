import React from 'react';
import { getSleepText } from '../utils/moodUtils';
import { useLatestMoodEntry } from '../hooks/useMoodQueries';

export const SleepStateCard: React.FC = () => {
  const { data: moodData } = useLatestMoodEntry();

  if (!moodData) {
    return null;
  }

  const sleepHours = moodData.sleepHours;
  const sleepText = getSleepText(sleepHours);
  return (
    <div className="bg-neutral-0 rounded-[16px] p-5 border border-blue-100">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-blue-600 text-lg">
          <img
            src="/images/icon-sleep.svg"
            alt="Sleep"
            className="w-[22px] h-[22px]"
          />
        </span>
        <span className="text-neutral-600 text-preset-6">Sleep</span>
      </div>
      <p className="text-preset-3 text-neutral-900">{sleepText}</p>
    </div>
  );
};
