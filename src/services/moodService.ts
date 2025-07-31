import { supabase } from '../lib/supabase';
import type { MoodFormData } from '../features/types';

export interface MoodEntry {
  id?: string;
  mood: number;
  feelings: string[];
  journal_entry: string;
  sleep_hours: string;
  created_at?: string;
  user_id?: string;
}

export const moodService = {
  async createMoodEntry(data: MoodFormData): Promise<MoodEntry> {
    const { data: moodEntry, error } = await supabase
      .from('mood_entries')
      .insert({
        mood: data.mood,
        feelings: data.feelings,
        journal_entry: data.journalEntry,
        sleep_hours: data.sleepHours,
        user_id: data.userId,
      })
      .select()
      .single();
    if (error) {
      throw new Error(`Failed to create mood entry: ${error.message}`);
    }
    return moodEntry;
  },

  async getMoodEntries(userId?: string): Promise<MoodEntry[]> {
    const { data: moodEntries, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      throw new Error(`Failed to fetch mood entries: ${error.message}`);
    }
    return moodEntries || [];
  },
};
