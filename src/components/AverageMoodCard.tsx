import React from 'react';
import {
  getAverageMoodIcon,
  getMoodText,
  getTrendIcon,
  getTrendText,
} from '../utils/moodUtils';

interface AverageMoodCardProps {
  averageMood: number;
  moodTrend: 'same' | 'increase' | 'decrease';
}

export const AverageMoodCard: React.FC<AverageMoodCardProps> = ({
  averageMood,
  moodTrend,
}) => {
  return (
    <div className="bg-blue-300 overflow-hidden rounded-[20px] p-5 text-neutral-900 h-[150px] flex items-center justify-center relative">
      <div className="absolute right-[-10rem] top-1/2 -translate-y-1/2">
        <img
          src="/src/assets/images/bg-pattern-averages.svg"
          alt="trend icon"
        />
      </div>
      <div className="flex  w-full justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <span>
              <img
                src={getAverageMoodIcon(averageMood)}
                alt={`${getMoodText(averageMood)} mood icon`}
                className="w-6 h-6"
              />
            </span>
            <p className="text-preset-4 text-neutral-900">
              {getMoodText(averageMood)}
            </p>
          </div>
          <div>
            <p className="text-preset-7 text-neutral-900 flex items-center gap-2">
              <span>
                <img
                  src={getTrendIcon(moodTrend)}
                  alt={`${moodTrend} trend icon`}
                  className="w-4 h-4"
                />
              </span>
              {getTrendText(moodTrend)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
