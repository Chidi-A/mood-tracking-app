import React from 'react';
import type { ChartDataPoint } from '../index';
import { prepareChartData } from '../utils/moodUtils';
import { DashboardGrid } from './DashboardGrid';
import { HappyStateCard } from './HappyStateCard';
import { SleepStateCard } from './SleepStateCard';
import { ReflectionCard } from './ReflectionCard';
import { AverageStatsCard } from './AverageStatsCard';
import { TrendsChartCard } from './TrendsChartCard';
import { useAllMoodEntries, useAverageStats } from '../hooks/useMoodQueries';

export const DashboardSummary: React.FC = () => {
  const {
    data: averageStats,
    isLoading: statsLoading,
    error: statsError,
  } = useAverageStats();
  const {
    data: moodEntries,
    isLoading: entriesLoading,
    error: entriesError,
  } = useAllMoodEntries();

  // Prepare chart data (last 16 entries for the chart)
  const chartData: ChartDataPoint[] = prepareChartData(moodEntries);

  const isLoading = statsLoading || entriesLoading;
  const error = statsError || entriesError;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-neutral-600">Loading average statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-red-600">
          <p className="font-medium">Failed to load average statistics</p>
          <p className="text-sm text-neutral-600 mt-1">
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
        </div>
      </div>
    );
  }

  if (!averageStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-neutral-600">No statistics available</p>
      </div>
    );
  }

  return (
    <DashboardGrid>
      {/* First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 h-[340px]">
        <HappyStateCard />
        <div className="grid grid-rows-2 lg:grid-rows-[1fr_1.5fr] gap-5">
          <SleepStateCard />
          <ReflectionCard />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
        <AverageStatsCard stats={averageStats} />
        <TrendsChartCard chartData={chartData} />
      </div>
    </DashboardGrid>
  );
};
