import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { moodService, type MoodEntry } from '../services/moodService';
import type { MoodFormData } from '../features/types';

const MOOD_ENTRIES_KEY = ['moodEntries'] as const;

export const useMoodQueries = () => {
  return useQuery({
    queryKey: MOOD_ENTRIES_KEY,
    queryFn: () => moodService.getMoodEntries(),
  });
};

export const useCreateMoodEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MoodFormData) => moodService.createMoodEntry(data),
    onSuccess: (newEntry) => {
      queryClient.invalidateQueries({ queryKey: MOOD_ENTRIES_KEY });
      queryClient.setQueryData(MOOD_ENTRIES_KEY, (oldData: MoodEntry[]) => {
        return oldData ? [newEntry, ...oldData] : [newEntry];
      });
    },
    onError: (error) => {
      console.error('Error creating mood entry:', error);
    },
  });
};
