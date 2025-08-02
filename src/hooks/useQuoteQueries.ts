import { useQuery } from '@tanstack/react-query';
import { quoteService } from '../services/quoteService';

const QUOTES_KEY = ['moodQuotes'] as const;

export const useMoodQuotesQuery = () => {
  return useQuery({
    queryKey: QUOTES_KEY,
    queryFn: () => quoteService.getMoodQuotes(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
