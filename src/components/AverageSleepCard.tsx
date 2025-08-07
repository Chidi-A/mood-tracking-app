import React from 'react';
import {
  getAverageSleepText,
  getSleepTrendText,
  getTrendIcon,
} from '../utils/moodUtils';

interface AverageSleepCardProps {
  averageSleep: number;
  sleepTrend: 'same' | 'increase' | 'decrease';
}

export const AverageSleepCard: React.FC<AverageSleepCardProps> = ({
  averageSleep,
  sleepTrend,
}) => {
  return (
    <div className="bg-blue-600 overflow-hidden rounded-[20px] p-5 text-neutral-0 h-[150px] flex items-center justify-center relative">
      <div className="absolute right-[-10rem] top-1/2 -translate-y-1/2">
        <img
          src="/src/assets/images/bg-pattern-averages.svg"
          alt="background pattern"
        />
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <span>
              <img
                src="/src/assets/images/sleep-status-icon.svg"
                alt="Average Sleep"
                className="w-6 h-6 text-neutral-0"
              />
            </span>
            <p className="text-preset-4 text-neutral-0">
              {getAverageSleepText(averageSleep)}
            </p>
          </div>
          <div>
            <p className="text-preset-7 text-neutral-0 flex items-center gap-2">
              <span>
                <img
                  src={getTrendIcon(sleepTrend)}
                  alt={`${sleepTrend} trend icon`}
                  className="w-4 h-4 text-neutral-0"
                />
              </span>
              {getSleepTrendText(sleepTrend)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
