import type { MoodLevel, SleepCategory } from '..';

export interface MoodFormData {
  mood: MoodLevel | undefined;
  sleepHours: SleepCategory;
  feelings: string[];
  journalEntry: string;
  userId?: string;
}
