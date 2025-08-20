import type { MoodEntry, ChartDataPoint, SleepCategory } from '..';
import { SLEEP_CATEGORIES } from '..';

export const getMoodIcon = (mood: number): string => {
  switch (mood) {
    case 2:
      return '/images/icon-very-happy-color.svg';
    case 1:
      return '/images/icon-happy-color.svg';
    case 0:
      return '/images/icon-neutral-color.svg';
    case -1:
      return '/images/icon-sad-color.svg';
    case -2:
      return '/images/icon-very-sad-color.svg';
    default:
      return '/images/icon-neutral-color.svg';
  }
};

export const getAverageMoodIcon = (mood: number): string => {
  if (mood >= 1.5) return '/images/icon-very-happy-white.svg';
  if (mood >= 0.5) return '/images/icon-happy-white.svg';
  if (mood >= -0.5) return '/images/icon-neutral-white.svg';
  if (mood >= -1.5) return '/images/icon-sad-white.svg';
  return '/images/icon-very-sad-white.svg';
};

export const getMoodText = (mood: number): string => {
  switch (mood) {
    case 2:
      return 'Very Happy';
    case 1:
      return 'Happy';
    case 0:
      return 'Neutral';
    case -1:
      return 'Sad';
    case -2:
      return 'Very Sad';
    default:
      return 'Neutral';
  }
};

// export const getAverageMoodText = (mood: number): string => {
//   if (mood >= 1.5) return 'Very Happy';
//   if (mood >= 0.5) return 'Happy';
//   if (mood >= -0.5) return 'Neutral';
//   if (mood >= -1.5) return 'Sad';
//   return 'Very Sad';
// };

export const getSleepText = (hours: number): string => {
  if (hours >= 9) return '9+ Hours';
  if (hours >= 7) return '7-8 Hours';
  if (hours >= 5) return '5-6 Hours';
  if (hours >= 3) return '3-4 Hours';
  return '0-2 Hours';
};

export const getTrendIcon = (trend: string): string => {
  switch (trend) {
    case 'increase':
      return '/images/icon-trend-increase.svg';
    case 'decrease':
      return '/images/icon-trend-decrease.svg';
    default:
      return '/images/icon-trend-same.svg';
  }
};

export const getTrendText = (trend: string): string => {
  switch (trend) {
    case 'increase':
      return `Increase from the previous 5 check-ins`;
    case 'decrease':
      return `Decrease from the previous 5 check-ins`;
    default:
      return `Same as the previous 5 check-ins`;
  }
};

// Add these new functions
export const getSleepCategory = (hours: number): SleepCategory => {
  if (hours >= 9) return '9+ hours';
  if (hours >= 7) return '7-8 hours';
  if (hours >= 5) return '5-6 hours';
  if (hours >= 3) return '3-4 hours';
  return '0-2 hours';
};

export const prepareChartData = (
  moodEntries: MoodEntry[]
): ChartDataPoint[] => {
  return moodEntries
    .slice(0, 16) // Last 16 entries for the chart
    .map((entry) => ({
      date: new Date(entry.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),

      timestamp: entry.createdAt,
      mood: entry.mood,
      sleepHours: entry.sleepHours,
      sleepCategory: getSleepCategory(entry.sleepHours),
      moodIcon: getMoodIcon(entry.mood),
      moodText: getMoodText(entry.mood),
      feelings: entry.feelings,
      journalEntry: entry.journalEntry,
    }));
};

export const getSleepCategoryIndex = (category: SleepCategory): number => {
  return SLEEP_CATEGORIES.indexOf(category);
};

export const getAverageMoodText = (mood: number): string => {
  // Round to nearest 0.5 for cleaner categorization
  const rounded = Math.round(mood * 2) / 2;

  if (rounded >= 1.5) return 'Very Happy';
  if (rounded >= 0.5) return 'Happy';
  if (rounded >= -0.5) return 'Neutral';
  if (rounded >= -1.5) return 'Sad';
  return 'Very Sad';
};

// Helper function to get trend text with context
export const getMoodTrendText = (
  trend: 'same' | 'increase' | 'decrease',
  hasEnoughData: boolean
): string => {
  if (!hasEnoughData) {
    return 'Not enough data for trend analysis';
  }

  return getTrendText(trend);
};

export const getAverageSleepText = (hours: number): string => {
  // Round to nearest 0.5 hour for cleaner display
  const rounded = Math.round(hours * 2) / 2;

  if (rounded >= 9) return '9+ Hours';
  if (rounded >= 7) return '7-8 Hours';
  if (rounded >= 5) return '5-6 Hours';
  if (rounded >= 3) return '3-4 Hours';
  return '0-2 Hours';
};

// Sleep-specific trend text with different context
export const getSleepTrendText = (
  trend: 'same' | 'increase' | 'decrease'
): string => {
  switch (trend) {
    case 'increase':
      return `More sleep than the previous 5 days`;
    case 'decrease':
      return `Less sleep than the previous 5 days`;
    default:
      return `Same as the previous 5 days`;
  }
};

// Get sleep quality descriptor based on average
export const getSleepQuality = (hours: number): string => {
  if (hours >= 8) return 'Excellent';
  if (hours >= 7) return 'Good';
  if (hours >= 6) return 'Fair';
  if (hours >= 4) return 'Poor';
  return 'Very Poor';
};
