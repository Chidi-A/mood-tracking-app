import React from 'react';
import type { AverageStats } from '../index';
import { AverageMoodCard } from './AverageMoodCard';
import { AverageSleepCard } from './AverageSleepCard';

interface AverageStatsCardProps {
  stats: AverageStats & {
    dataAvailable?: {
      hasLast5: boolean;
      hasPrevious5: boolean;
      totalEntries: number;
    };
  };
}

export const AverageStatsCard: React.FC<AverageStatsCardProps> = ({
  stats,
}) => {
  const hasEnoughData = !!stats.dataAvailable?.hasLast5;

  return (
    <div className="flex flex-col gap-4 bg-neutral-0  p-6 rounded-[16px] border border-blue-100 ">
      <div>
        <h4 className="text-preset-5  mb-3">
          Average Mood{' '}
          <span className="text-neutral-600 text-preset-7">
            (Last 5 check-ins)
          </span>
        </h4>
        <AverageMoodCard
          averageMood={stats.averageMood}
          moodTrend={stats.moodTrend}
          hasEnoughData={hasEnoughData}
        />
      </div>
      <div>
        <h4 className="text-preset-5 mb-3">
          Average Sleep{' '}
          <span className="text-neutral-600 text-preset-7">(Last 5 days)</span>
        </h4>
        <AverageSleepCard
          averageSleep={stats.averageSleep}
          sleepTrend={stats.sleepTrend}
          hasEnoughData={hasEnoughData}
        />
      </div>
    </div>
  );
};
