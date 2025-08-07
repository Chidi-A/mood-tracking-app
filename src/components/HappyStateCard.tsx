import React from 'react';
import { getMoodIcon, getMoodText } from '../utils/moodUtils';
import { useMoodQuotesQuery } from '../hooks/useQuoteQueries';
import { useLatestMoodEntry } from '../hooks/useMoodQueries';

export const HappyStateCard: React.FC = () => {
  const { data: moodQuotes } = useMoodQuotesQuery();
  const { data: moodData } = useLatestMoodEntry();

  if (!moodData) {
    return null;
  }

  const getRandomQuote = (moodLevel: number): string => {
    if (!moodQuotes) return 'Loading quote...';
    const quotes = moodQuotes[moodLevel.toString()] || moodQuotes['0'];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const moodText = getMoodText(moodData.mood);
  const moodIcon = getMoodIcon(moodData.mood);
  const quote = getRandomQuote(moodData.mood);

  return (
    <div className="bg-neutral-0 rounded-[16px] p-8 border border-blue-100 overflow-hidden">
      <div className="flex items-center justify-between h-full">
        <div className="flex-1 flex flex-col justify-between h-full">
          <div>
            <p className="text-neutral-900 text-preset-3 opacity-70">
              I'm feeling
            </p>
            <h2 className="text-preset-2 text-neutral-900 ">{moodText}</h2>
          </div>
          <div className="flex items-start flex-col gap-3 max-w-[246px]">
            <img
              src="/src/assets/images/icon-quote.svg"
              alt="quote"
              className="w-8 h-8"
            />
            <p className="text-neutral-900 text-preset-6 italic">{quote}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={moodIcon}
            alt={`${moodText} mood icon`}
            className="w-[320px] h-[320px] mb-[-60px]"
          />
        </div>
      </div>
    </div>
  );
};
