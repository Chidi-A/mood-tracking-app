import React from 'react';
import { useLatestMoodEntry } from '../hooks/useMoodQueries';

export const ReflectionCard: React.FC = () => {
  const { data: moodData } = useLatestMoodEntry();

  if (!moodData) {
    return null;
  }

  const reflection = moodData.journalEntry;
  const tags = moodData.feelings;

  return (
    <div className="bg-neutral-0 rounded-[16px] p-5 border border-blue-100 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-neutral-600 text-lg">
            <img
              src="/images/icon-reflection.svg"
              alt="reflection"
              className="w-[22px] h-[22px]"
            />
          </span>
          <span className="text-neutral-600 text-preset-6">
            Reflection of the day
          </span>
        </div>
        <p className="text-neutral-900 text-preset-6 mb-3">{reflection}</p>
      </div>
      <div className="flex gap-2">
        <div className="flex gap-3">
          {tags.map((tag) => {
            return (
              <span key={tag} className="text-neutral-600 text-preset-6 italic">
                #{tag}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
