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
      <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-6 lg:gap-0">
        {/* Left column on desktop - contains "I'm feeling" text and quote with proper spacing */}
        <div className="flex-1 flex flex-col justify-between h-full order-1 lg:order-1">
          {/* "I'm feeling" text */}
          <div className="text-center lg:text-left">
            <p className="text-neutral-900 text-preset-3 opacity-70">
              I'm feeling
            </p>
            <h2 className="text-preset-2 text-neutral-900 ">{moodText}</h2>
          </div>

          {/* Quote section - hidden on mobile, shown on desktop with proper spacing */}
          <div className="hidden lg:flex items-start flex-col gap-3 max-w-[246px]">
            <img
              src="/src/assets/images/icon-quote.svg"
              alt="quote"
              className="w-8 h-8"
            />
            <p className="text-neutral-900 text-preset-6 italic text-left">
              {quote}
            </p>
          </div>
        </div>

        {/* Mood icon */}
        <div className="flex items-center justify-center order-2 lg:order-2">
          <img
            src={moodIcon}
            alt={`${moodText} mood icon`}
            className="w-[200px] h-[200px] lg:w-[320px] lg:h-[320px] mb-0 lg:mb-[-60px]"
          />
        </div>

        {/* Quote section - shown on mobile after icon, hidden on desktop */}
        <div className="flex lg:hidden items-start flex-col gap-3 max-w-[246px] mx-auto order-3">
          <img
            src="/src/assets/images/icon-quote.svg"
            alt="quote"
            className="w-8 h-8 mx-auto"
          />
          <p className="text-neutral-900 text-preset-6 italic text-center">
            {quote}
          </p>
        </div>
      </div>
    </div>
  );
};
