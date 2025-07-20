import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ChartDataPoint } from '../index';
import { CustomBar } from './CustomBar';
import { CustomTooltip } from './CustomTooltip';
import { CustomYAxisTick } from './CustomYAxisTick';
import { CustomXAxisTick } from './CustomXAxisTick';

interface TrendsChartCardProps {
  chartData: ChartDataPoint[];
}

export const TrendsChartCard: React.FC<TrendsChartCardProps> = ({
  chartData,
}) => {
  const formatYAxisTick = (value: number) => {
    if (value <= 2) return '0-2 hours';
    if (value <= 4) return '3-4 hours';
    if (value <= 6) return '5-6 hours';
    if (value <= 8) return '7-8 hours';
    return '9+ hours';
  };

  const limitedChartData = chartData.slice(0, 11);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-full">
      <h4 className="text-lg font-bold mb-4">Mood and sleep trends</h4>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={limitedChartData}
          margin={{ top: 30, left: 40, bottom: 60 }}
        >
          <CartesianGrid
            stroke="#e0e6fa" // blue-100 color
            opacity={0.3} // 30% opacity
            horizontal={true} // Show horizontal lines
            vertical={false}
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={<CustomXAxisTick />}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatYAxisTick}
            ticks={[2, 4, 6, 8, 10]}
            domain={[0, 10]}
            tick={<CustomYAxisTick />}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
          />

          <Bar
            dataKey="sleepHours"
            shape={<CustomBar />}
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
