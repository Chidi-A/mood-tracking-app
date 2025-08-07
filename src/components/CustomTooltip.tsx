import React from 'react';
import type { ChartDataPoint } from '..';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: ChartDataPoint; value: number; dataKey: string }>;
  label?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;

    if (!data) {
      return null;
    }

    return (
      <div className="bg-white p-4 border border-gray-200 rounded-[10px] shadow-xl w-[200px]">
        {/* Mood Section */}
        <div className="mb-3">
          <h4 className="text-preset-8 text-neutral-600 mb-2">Mood</h4>
          <div className="flex items-center gap-2">
            <img src={data.moodIcon} alt={data.moodText} className="w-5 h-5" />
            <span className="text-preset-7 text-neutral-900">
              {data.moodText}
            </span>
          </div>
        </div>

        {/* Sleep Section */}
        <div className="mb-3">
          <h4 className="text-preset-8 text-neutral-600 mb-2">Sleep</h4>
          <span className="text-preset-7 text-neutral-900">
            {data.sleepCategory}
          </span>
        </div>

        {/* Reflection Section */}
        <div className="mb-3">
          <h4 className="text-preset-8 text-neutral-600 mb-2">Reflection</h4>
          <p className="text-preset-9 text-neutral-900 text-xs leading-relaxed">
            {data.journalEntry || 'No reflection recorded'}
          </p>
        </div>

        {/* Tags Section */}
        <div>
          <h4 className="text-preset-8 text-neutral-600 mb-1">Tags</h4>
          <div className="flex flex-wrap gap-1">
            {data.feelings && data.feelings.length > 0 ? (
              <span className="text-preset-9 text-neutral-900 text-xs">
                {data.feelings.join(', ')}
              </span>
            ) : (
              <span className="text-xs text-gray-500 italic">No tags</span>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
};
