import { supabase } from '../lib/supabase';
import type { MoodFormData } from '../features/types';

export interface MoodEntry {
  id?: string;
  mood: number;
  feelings: string[];
  journal_entry: string;
  sleep_hours: string;
  created_at?: string;
  user_id?: string; // This will store the profile_id
}

export interface AverageStatsResult {
  averageMood: number;
  moodTrend: 'same' | 'increase' | 'decrease';
  averageSleep: number;
  sleepTrend: 'same' | 'increase' | 'decrease';
  dataAvailable: {
    hasLast5: boolean;
    hasPrevious5: boolean;
    totalEntries: number;
  };
}

export const moodService = {
  async createMoodEntry(data: MoodFormData): Promise<MoodEntry> {
    // Use the profile ID directly as the user_id
    const profileId = data.userId!;

    const { data: moodEntry, error } = await supabase
      .from('mood_entries')
      .insert({
        mood: data.mood,
        feelings: data.feelings,
        journal_entry: data.journalEntry,
        sleep_hours: data.sleepHours,
        user_id: profileId, // Store profile_id directly
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create mood entry: ${error.message}`);
    }
    return moodEntry;
  },

  async getMoodEntries(profileId: string): Promise<MoodEntry[]> {
    // Get mood entries for this profile directly
    const { data: moodEntries, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', profileId) // Filter by profile_id
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch mood entries: ${error.message}`);
    }
    return moodEntries || [];
  },

  async getLastNMoodEntries(
    profileId: string,
    limit: number
  ): Promise<MoodEntry[]> {
    const { data: moodEntries, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', profileId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch mood entries: ${error.message}`);
    }
    return moodEntries || [];
  },

  async calculateAverageStats(profileId: string): Promise<AverageStatsResult> {
    // Get last 10 entries to calculate both current and previous averages
    const entries = await this.getLastNMoodEntries(profileId, 10);

    const totalEntries = entries.length;
    const hasLast5 = totalEntries >= 5;
    const hasPrevious5 = totalEntries >= 10;

    if (!hasLast5) {
      throw new Error(
        'Insufficient data: Need at least 5 mood entries for average calculation'
      );
    }

    // Current period (last 5 entries)
    const last5Entries = entries.slice(0, 5);
    const averageMood =
      last5Entries.reduce((sum, entry) => sum + entry.mood, 0) / 5;
    const averageSleep =
      last5Entries.reduce(
        (sum, entry) => sum + parseFloat(entry.sleep_hours),
        0
      ) / 5;

    let moodTrend: 'same' | 'increase' | 'decrease' = 'same';
    let sleepTrend: 'same' | 'increase' | 'decrease' = 'same';

    // Calculate trend only if we have enough data
    if (hasPrevious5) {
      const previous5Entries = entries.slice(5, 10);
      const previousAverageMood =
        previous5Entries.reduce((sum, entry) => sum + entry.mood, 0) / 5;
      const previousAverageSleep =
        previous5Entries.reduce(
          (sum, entry) => sum + parseFloat(entry.sleep_hours),
          0
        ) / 5;

      // Calculate mood trend with tolerance for small changes
      const moodDifference = averageMood - previousAverageMood;
      if (Math.abs(moodDifference) < 0.1) {
        moodTrend = 'same';
      } else if (moodDifference > 0) {
        moodTrend = 'increase';
      } else {
        moodTrend = 'decrease';
      }

      // Calculate sleep trend with tolerance
      const sleepDifference = averageSleep - previousAverageSleep;
      if (Math.abs(sleepDifference) < 0.2) {
        sleepTrend = 'same';
      } else if (sleepDifference > 0) {
        sleepTrend = 'increase';
      } else {
        sleepTrend = 'decrease';
      }
    }

    return {
      averageMood: Math.round(averageMood * 10) / 10,
      averageSleep: Math.round(averageSleep * 10) / 10,
      moodTrend,
      sleepTrend,
      dataAvailable: {
        hasLast5,
        hasPrevious5,
        totalEntries,
      },
    };
  },
};
