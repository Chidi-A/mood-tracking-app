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
import { getMoodIcon, getMoodText, getSleepCategory } from '../utils/moodUtils';

interface TrendsChartCardProps {
  chartData: ChartDataPoint[];
}

const toSleepBucket = (h: number): 2 | 4 | 6 | 8 | 10 =>
  h >= 9 ? 10 : h >= 7 ? 8 : h >= 5 ? 6 : h >= 3 ? 4 : 2;

export const TrendsChartCard: React.FC<TrendsChartCardProps> = ({
  chartData,
}) => {
  const hasData = chartData && chartData.length > 0;
  const DAYS = 11;

  // 1) Fixed 11 days, oldest → newest
  const placeholders: Array<
    ChartDataPoint & {
      timestamp: string;
      sleepValue: number;
      hasRealData: boolean;
    }
  > = Array.from({ length: DAYS }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (DAYS - 1 - i));
    const ts = d.toISOString();

    return {
      timestamp: ts,
      // keep 0 so no bars are drawn by default
      sleepValue: 0,
      hasRealData: false, // Mark as placeholder data
      // satisfy ChartDataPoint
      sleepHours: 0,
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: 0,
      sleepCategory: getSleepCategory(0),
      moodIcon: getMoodIcon(0),
      moodText: getMoodText(0),
      feelings: [],
      journalEntry: '',
    };
  });

  // 2) Sort incoming data ascending and take last 11
  const sortedAsc: Array<ChartDataPoint & { timestamp: string }> = hasData
    ? [...(chartData as Array<ChartDataPoint & { timestamp: string }>)].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
    : [];

  const recent = sortedAsc.slice(-DAYS);

  // 3) Overlay recent data onto the right, quantizing sleep to bucket ceiling
  const data = [...placeholders];
  const start = DAYS - recent.length;
  for (let i = 0; i < recent.length; i++) {
    const r = recent[i];
    data[start + i] = {
      ...data[start + i],
      ...r,
      sleepValue: toSleepBucket(r.sleepHours),
      hasRealData: true, // Mark as real data
    };
  }

  const formatYAxisTick = (value: number) => {
    if (value <= 2) return '0-2 hours';
    if (value <= 4) return '3-4 hours';
    if (value <= 6) return '5-6 hours';
    if (value <= 8) return '7-8 hours';
    return '9+ hours';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-full">
      <h4 className="text-preset-3 text-neutral-900 mb-4">
        Mood and sleep trends
      </h4>

      <div className="h-[400px] overflow-x-auto">
        <div className="w-[800px] lg:w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 30, left: 40, bottom: 60 }}
              barCategoryGap="20%"
            >
              <CartesianGrid
                stroke="#e0e6fa"
                opacity={0.3}
                horizontal
                vertical={false}
              />

              <XAxis
                dataKey="timestamp"
                axisLine={false}
                tickLine={false}
                tick={<CustomXAxisTick x={0} y={0} />}
                tickFormatter={(timestamp) =>
                  new Date(timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                }
                interval={0}
              />

              <YAxis
                type="number"
                dataKey="sleepValue"
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
                dataKey="sleepValue"
                shape={<CustomBar />}
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
                hide={!hasData} // hide bars entirely when there’s no real data
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
