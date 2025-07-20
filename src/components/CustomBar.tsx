import React from 'react';
import { type ChartDataPoint, MOOD_COLORS } from '../index';

interface CustomBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: ChartDataPoint;
}

export const CustomBar: React.FC<CustomBarProps> = (props) => {
  const { x, y, width, height, payload } = props;

  if (!x || !y || !width || !height || !payload) {
    return null;
  }

  const getMoodIconWhite = (mood: number): string => {
    switch (mood) {
      case 2:
        return '/src/assets/images/icon-very-happy-white.svg';
      case 1:
        return '/src/assets/images/icon-happy-white.svg';
      case 0:
        return '/src/assets/images/icon-neutral-white.svg';
      case -1:
        return '/src/assets/images/icon-sad-white.svg';
      case -2:
        return '/src/assets/images/icon-very-sad-white.svg';
      default:
        return '/src/assets/images/icon-neutral-white.svg';
    }
  };

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={MOOD_COLORS[payload.mood as keyof typeof MOOD_COLORS]}
        rx={width / 2}
        ry={width / 2}
      />

      <image
        x={x + width / 2 - 12}
        y={y + 8}
        width={24}
        height={24}
        href={getMoodIconWhite(payload.mood)}
        aria-label={`${payload.moodText} mood`}
        role="img"
      />
    </g>
  );
};
