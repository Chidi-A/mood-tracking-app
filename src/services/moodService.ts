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

export const moodService = {
  async createMoodEntry(data: MoodFormData): Promise<MoodEntry> {
    // Use the profile ID directly as the user_id
    const profileId = data.userId!;

    console.log('Creating mood entry for profile:', profileId);

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
    console.log('Fetching mood entries for profile:', profileId);

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
};
