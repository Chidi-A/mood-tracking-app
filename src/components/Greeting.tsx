import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { openModal } from '../store/moodFormSlice';

export const Greeting: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentProfile = useAppSelector(
    (state) => state.profile.currentProfile
  );

  const fullName = currentProfile?.name || 'User';
  const firstName = fullName.split(' ')[0];

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = today.toLocaleDateString('en-US', options);

  const handleLogMood = () => {
    dispatch(openModal());
  };

  return (
    <div className="text-center py-16">
      <div className="flex flex-col gap-[0.625rem] items-center mb-12">
        <h3 className="text-preset-3-mobile lg:text-preset-3 text-blue-600">
          Hello, {firstName}!
        </h3>
        <h1 className="text-preset-1-mobile lg:text-preset-1 text-neutral-900">
          How are you feeling today?
        </h1>
        <p className="text-preset-6-mobile lg:text-preset-6 text-neutral-600">
          {formattedDate}
        </p>
      </div>
      <button
        onClick={handleLogMood}
        className="cursor-pointer bg-blue-600 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-preset-5 transition-colors"
      >
        Log today's mood
      </button>
    </div>
  );
};
