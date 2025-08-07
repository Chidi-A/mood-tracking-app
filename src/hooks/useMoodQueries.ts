import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { moodService } from '../services/moodService';
import type { MoodFormData } from '../features/types';
import { useAppSelector } from '../store/hooks';

const MOOD_ENTRIES_KEY = ['moodEntries'] as const;
const AVERAGE_STATS_KEY = ['averageStats'] as const;

export const useMoodQueries = () => {
  const currentProfile = useAppSelector(
    (state) => state.profile.currentProfile
  );

  return useQuery({
    queryKey: [...MOOD_ENTRIES_KEY, currentProfile?.id],
    queryFn: () => {
      if (!currentProfile?.id) return [];
      return moodService.getMoodEntries(currentProfile.id);
    },
    enabled: !!currentProfile?.id,
  });
};

export const useCreateMoodEntry = () => {
  const queryClient = useQueryClient();
  const currentProfile = useAppSelector(
    (state) => state.profile.currentProfile
  );

  return useMutation({
    mutationFn: (data: MoodFormData) => {
      if (!currentProfile?.id) {
        throw new Error('No current profile selected');
      }
      return moodService.createMoodEntry({
        ...data,
        userId: currentProfile.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...MOOD_ENTRIES_KEY, currentProfile?.id],
      });
      queryClient.invalidateQueries({
        queryKey: [...AVERAGE_STATS_KEY, currentProfile?.id],
      });
    },
    onError: (error) => {
      console.error('Error creating mood entry:', error);
    },
  });
};

export const useLatestMoodEntry = () => {
  const { data: moodEntries, isLoading, error } = useMoodQueries();

  const latestEntry =
    moodEntries && moodEntries.length > 0 ? moodEntries[0] : null;

  // Convert database format to app format
  const convertedEntry = latestEntry
    ? {
        createdAt: latestEntry.created_at || new Date().toISOString(),
        mood: latestEntry.mood,
        feelings: latestEntry.feelings,
        journalEntry: latestEntry.journal_entry,
        sleepHours: parseFloat(latestEntry.sleep_hours),
      }
    : null;

  return {
    data: convertedEntry,
    isLoading,
    error,
  };
};

export const useAllMoodEntries = () => {
  const { data: moodEntries, isLoading, error } = useMoodQueries();

  // Convert database format to app format for all entries
  const convertedEntries =
    moodEntries?.map((entry) => ({
      createdAt: entry.created_at || new Date().toISOString(),
      mood: entry.mood,
      feelings: entry.feelings,
      journalEntry: entry.journal_entry,
      sleepHours: parseFloat(entry.sleep_hours),
    })) || [];

  return {
    data: convertedEntries,
    isLoading,
    error,
  };
};

export const useAverageStats = () => {
  const currentProfile = useAppSelector(
    (state) => state.profile.currentProfile
  );

  return useQuery({
    queryKey: [...AVERAGE_STATS_KEY, currentProfile?.id],
    queryFn: () => {
      if (!currentProfile?.id) {
        throw new Error('No profile selected');
      }
      return moodService.calculateAverageStats(currentProfile.id);
    },
    enabled: !!currentProfile?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Only retry once on failure
  });
};
