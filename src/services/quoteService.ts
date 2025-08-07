import { supabase } from '../lib/supabase';
import type { MoodQuotes } from '../index';

export interface QuoteEntry {
  id: string;
  mood_level: number;
  quote: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export const quoteService = {
  async getMoodQuotes(): Promise<MoodQuotes> {
    const { data: quotes, error } = await supabase
      .from('mood_quotes')
      .select('*')
      .eq('is_active', true)
      .order('mood_level');

    if (error) {
      console.error('Error fetching quotes:', error);
      throw new Error(`Failed to fetch mood quotes: ${error.message}`);
    }

    const moodQuotes: MoodQuotes = {};

    quotes?.forEach((quote: QuoteEntry) => {
      const moodLevel = quote.mood_level.toString();
      if (!moodQuotes[moodLevel]) {
        moodQuotes[moodLevel] = [];
      }
      moodQuotes[moodLevel].push(quote.quote);
    });

    return moodQuotes;
  },
};
