import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { moodService, type MoodEntry } from '../services/moodService';
import type { MoodFormData } from '../features/types';
import { useAppSelector } from '../store/hooks';

const MOOD_ENTRIES_KEY = ['moodEntries'] as const;

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
    onSuccess: (newEntry) => {
      queryClient.invalidateQueries({
        queryKey: [...MOOD_ENTRIES_KEY, currentProfile?.id],
      });
      queryClient.setQueryData(
        [...MOOD_ENTRIES_KEY, currentProfile?.id],
        (oldData: MoodEntry[]) => {
          return oldData ? [newEntry, ...oldData] : [newEntry];
        }
      );
    },
    onError: (error) => {
      console.error('Error creating mood entry:', error);
    },
  });
};
