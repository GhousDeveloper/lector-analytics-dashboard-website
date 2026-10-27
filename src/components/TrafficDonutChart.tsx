import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { TrafficSegment } from '../types/dashboard';

interface TrafficDonutChartProps {
  segments: TrafficSegment[];
}

export const TrafficDonutChart: React.FC<TrafficDonutChartProps> = ({ segments }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Display order underneath matching the reference: 33% Direct Traffic, 55% Referrals, 12% Search Traffic
  const orderedStats = [
    segments.find((s) => s.id === 'direct') || segments[1],
    segments.find((s) => s.id === 'referrals') || segments[0],
    segments.find((s) => s.id === 'search') || segments[2],
  ];

  return (
    <section
      aria-label="Traffic Analytics"
      className="bg-white rounded-lg border border-[#EDF0F4] shadow-[0_2px_10px_rgba(48,55,68,0.03)] p-4 flex flex-col justify-between h-full"
    >
      <div>
        <h2 className="text-[13px] font-bold text-[#303744]">Traffic</h2>
      </div>

      {/* Centered Donut Chart */}
      <div className="w-full h-[160px] flex items-center justify-center my-1 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={segments}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={72}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {segments.map((entry, index) => (
                <Cell
                  key={entry.id}
                  fill={entry.color}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.78}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#EDF0F4',
                borderRadius: '8px',
                fontSize: '11px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
              formatter={(value: number, name: string) => [`${value}%`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom 3 Traffic Percentages */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        {orderedStats.map((seg) => (
          <div key={seg.id} className="text-center">
            <div className="text-[18px] font-extrabold text-[#303744] tabular-nums leading-none">
              {seg.percentage}
              <span className="text-[11px] font-bold align-top ml-0.5">%</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-[10px] text-[#89909C] whitespace-nowrap truncate">
                {seg.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
