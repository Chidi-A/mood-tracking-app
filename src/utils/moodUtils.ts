import type { MoodEntry, ChartDataPoint, SleepCategory } from '..';
import { SLEEP_CATEGORIES } from '..';

export const getMoodIcon = (mood: number): string => {
  switch (mood) {
    case 2:
      return '/src/assets/images/icon-very-happy-color.svg';
    case 1:
      return '/src/assets/images/icon-happy-color.svg';
    case 0:
      return '/src/assets/images/icon-neutral-color.svg';
    case -1:
      return '/src/assets/images/icon-sad-color.svg';
    case -2:
      return '/src/assets/images/icon-very-sad-color.svg';
    default:
      return '/src/assets/images/icon-neutral-color.svg';
  }
};

export const getAverageMoodIcon = (mood: number): string => {
  if (mood >= 1.5) return '/src/assets/images/icon-very-happy-white.svg';
  if (mood >= 0.5) return '/src/assets/images/icon-happy-white.svg';
  if (mood >= -0.5) return '/src/assets/images/icon-neutral-white.svg';
  if (mood >= -1.5) return '/src/assets/images/icon-sad-white.svg';
  return '/src/assets/images/icon-very-sad-white.svg';
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

export const getAverageMoodText = (mood: number): string => {
  if (mood >= 1.5) return 'Very Happy';
  if (mood >= 0.5) return 'Happy';
  if (mood >= -0.5) return 'Neutral';
  if (mood >= -1.5) return 'Sad';
  return 'Very Sad';
};

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
      return '/src/assets/images/icon-trend-increase.svg';
    case 'decrease':
      return '/src/assets/images/icon-trend-decrease.svg';
    default:
      return '/src/assets/images/icon-trend-same.svg';
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
    .slice(-16) // Last 16 entries for the chart
    .map((entry) => ({
      date: new Date(entry.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
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
