import type { MoodLevel, SleepCategory } from '..';

export const MOOD_OPTIONS: {
  value: MoodLevel;
  label: string;
  emoji: string;
}[] = [
  {
    value: 2,
    label: 'Very Happy',
    emoji: '/images/icon-very-happy-color.svg',
  },
  {
    value: 1,
    label: 'Happy',
    emoji: '/images/icon-happy-color.svg',
  },
  {
    value: 0,
    label: 'Neutral',
    emoji: '/images/icon-neutral-color.svg',
  },
  {
    value: -1,
    label: 'Sad',
    emoji: '/images/icon-sad-color.svg',
  },
  {
    value: -2,
    label: 'Very Sad',
    emoji: '/images/icon-very-sad-color.svg',
  },
];

export const FEELING_TAGS = [
  'Joyful',
  'Down',
  'Anxious',
  'Calm',
  'Excited',
  'Frustrated',
  'Lonely',
  'Grateful',
  'Overwhelmed',
  'Motivated',
  'Irritable',
  'Peaceful',
  'Tired',
  'Hopeful',
  'Confident',
  'Stressed',
  'Content',
  'Disappointed',
  'Optimistic',
  'Restless',
];

export const SLEEP_OPTIONS: { value: SleepCategory; label: string }[] = [
  { value: '9+ hours', label: '9+ hours' },
  { value: '7-8 hours', label: '7-8 hours' },
  { value: '5-6 hours', label: '5-6 hours' },
  { value: '3-4 hours', label: '3-4 hours' },
  { value: '0-2 hours', label: '0-2 hours' },
];
