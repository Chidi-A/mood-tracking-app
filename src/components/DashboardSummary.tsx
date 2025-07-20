import React from 'react';
import type {
  AppData,
  CurrentMoodData,
  AverageStats,
  ChartDataPoint,
  MoodEntry,
} from '../index';
import { prepareChartData } from '../utils/moodUtils';
import { DashboardGrid } from './DashboardGrid';
import { HappyStateCard } from './HappyStateCard';
import { SleepStateCard } from './SleepStateCard';
import { ReflectionCard } from './ReflectionCard';
import { AverageStatsCard } from './AverageStatsCard';
import { TrendsChartCard } from './TrendsChartCard';

interface DashboardSummaryProps {
  data: AppData;
}

export const DashboardSummary: React.FC<DashboardSummaryProps> = ({ data }) => {
  // Get current mood data (latest entry)
  const currentEntry = data.moodEntries[data.moodEntries.length - 1];
  const currentMoodData: CurrentMoodData = {
    mood: currentEntry.mood,
    sleepHours: currentEntry.sleepHours,
    journalEntry: currentEntry.journalEntry,
    quote: getRandomQuote(data.moodQuotes, currentEntry.mood.toString()),
  };

  // Calculate averages for last 5 entries
  const last5Entries = data.moodEntries.slice(-5);
  const averageStats: AverageStats = calculateAverageStats(last5Entries);

  // Prepare chart data (last 16 entries for the chart)
  const chartData: ChartDataPoint[] = prepareChartData(data.moodEntries);

  return (
    <DashboardGrid>
      {/* First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 h-[340px]">
        <HappyStateCard moodData={currentMoodData} />
        <div className="grid grid-rows-2 lg:grid-rows-[1fr_1.5fr] gap-5">
          <SleepStateCard sleepHours={currentMoodData.sleepHours} />
          <ReflectionCard reflection={currentMoodData.journalEntry} />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8  ">
        <AverageStatsCard stats={averageStats} />
        <TrendsChartCard chartData={chartData} />
      </div>
    </DashboardGrid>
  );
};

// Helper functions
function getRandomQuote(
  quotes: Record<string, string[]>,
  moodKey: string
): string {
  const moodQuotes = quotes[moodKey] || quotes['0'];
  return moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
}

function calculateAverageStats(entries: MoodEntry[]): AverageStats {
  const avgMood =
    entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length;
  const avgSleep =
    entries.reduce((sum, entry) => sum + entry.sleepHours, 0) / entries.length;

  // Calculate trends (simplified - in real app you'd compare with previous period)
  const moodTrend =
    avgMood > 0 ? 'increase' : avgMood < 0 ? 'decrease' : 'same';
  const sleepTrend =
    avgSleep > 7 ? 'increase' : avgSleep < 6 ? 'decrease' : 'same';

  return {
    averageMood: Math.round(avgMood * 10) / 10,
    averageSleep: Math.round(avgSleep * 10) / 10,
    moodTrend,
    sleepTrend,
  };
}
