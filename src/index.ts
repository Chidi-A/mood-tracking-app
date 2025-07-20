export interface MoodEntry {
  createdAt: string;
  mood: number;
  feelings: string[];
  journalEntry: string;
  sleepHours: number;
}

export interface MoodQuotes {
  [key: string]: string[];
}

export interface AppData {
  moodEntries: MoodEntry[];
  moodQuotes: MoodQuotes;
}

export type MoodLevel = -2 | -1 | 0 | 1 | 2;

export const MOOD_LABELS: Record<MoodLevel, string> = {
  [-2]: 'Very Sad',
  [-1]: 'Sad',
  0: 'Neutral',
  1: 'Happy',
  2: 'Very Happy',
};

export const MOOD_COLORS: Record<MoodLevel, string> = {
  [-2]: '#FCA5A5', // red-300
  [-1]: '#C7D2FE', // indigo-200
  0: '#93C5FD', // blue-300
  1: '#86EFAC', // green-300
  2: '#FCD34D', // amber-300
};

export interface CurrentMoodData {
  mood: number;
  sleepHours: number;
  journalEntry: string;
  quote: string;
}

export interface AverageStats {
  averageMood: number;
  averageSleep: number;
  moodTrend: 'same' | 'increase' | 'decrease';
  sleepTrend: 'same' | 'increase' | 'decrease';
}

export type SleepCategory =
  | '0-2 hours'
  | '3-4 hours'
  | '5-6 hours'
  | '7-8 hours'
  | '9+ hours';

export const SLEEP_CATEGORIES: SleepCategory[] = [
  '0-2 hours',
  '3-4 hours',
  '5-6 hours',
  '7-8 hours',
  '9+ hours',
];

export interface ChartDataPoint {
  date: string;
  mood: number;
  sleepHours: number;
  sleepCategory: SleepCategory;
  moodIcon: string;
  moodText: string;
  feelings: string[];
  journalEntry: string;
}
