import React from 'react';

interface GreetingProps {
  userName: string;
  onLogMood: () => void;
}

export const Greeting: React.FC<GreetingProps> = ({
  userName = 'Lisa',
  onLogMood,
}) => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div className="text-center py-16">
      <div className="flex flex-col gap-[0.625rem] items-center mb-12">
        <h3 className="text-preset-3 text-blue-600">Hello, {userName}!</h3>
        <h1 className="text-preset-1 text-neutral-900">
          How are you feeling today?
        </h1>
        <p className="text-preset-6 text-neutral-600">{formattedDate}</p>
      </div>
      <button
        onClick={onLogMood}
        className="bg-blue-600 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-preset-5 transition-colors"
      >
        Log today's mood
      </button>
    </div>
  );
};
