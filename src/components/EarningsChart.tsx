import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ChartDataPoint, ReportingPeriod } from '../types/dashboard';

interface EarningsChartProps {
  data: ChartDataPoint[];
  selectedPeriod: ReportingPeriod;
  onSelectPeriod: (period: ReportingPeriod) => void;
}

const PERIOD_OPTIONS: ReportingPeriod[] = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

export const EarningsChart: React.FC<EarningsChartProps> = ({
  data,
  selectedPeriod,
  onSelectPeriod,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Top Bar: Period Selector Tabs & Online/Store Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div
          role="tablist"
          aria-label="Reporting Period"
          className="flex items-center gap-5"
        >
          {PERIOD_OPTIONS.map((period) => {
            const active = selectedPeriod === period;
            return (
              <button
                key={period}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectPeriod(period)}
                className={`
                  relative pb-1.5 text-[10px] tracking-wider uppercase font-semibold transition-colors whitespace-nowrap
                  ${active ? 'text-[#303744]' : 'text-[#9BA2AE] hover:text-[#303744]'}
                `}
              >
                {period}
                {active && (
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-[#E83E8C]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Series Legend */}
        <div className="flex items-center gap-4 text-[11px] text-[#89909C]">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#38B9DF]" />
            Online
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#FFA62B]" />
            Store
          </span>
        </div>
      </div>

      {/* Multi-series Smooth Area Chart */}
      <div className="w-full h-[165px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -24, bottom: 0 }}
          >
            <defs>
              <linearGradient id="onlineFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8052C7" stopOpacity={0.42} />
                <stop offset="95%" stopColor="#E83E8C" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="storeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EC388A" stopOpacity={0.38} />
                <stop offset="95%" stopColor="#FFA62B" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="referralFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFA62B" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#FFD166" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="2 3"
              vertical={true}
              horizontal={true}
              stroke="#F1F3F7"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9BA2AE', fontSize: 10 }}
              dy={6}
            />
            <YAxis
              domain={[0, 35]}
              ticks={[0, 5, 10, 15, 20, 25, 30, 35]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9BA2AE', fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#EDF0F4',
                borderRadius: '8px',
                fontSize: '11px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
              formatter={(value: number, name: string) => [
                `$${(value * 100).toFixed(0)}`,
                name.charAt(0).toUpperCase() + name.slice(1),
              ]}
            />
            <Area
              type="monotone"
              dataKey="referral"
              stroke="#FFA62B"
              strokeWidth={1.8}
              fillOpacity={1}
              fill="url(#referralFill)"
              dot={{ r: 0 }}
              activeDot={{ r: 4, fill: '#FFA62B', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="store"
              stroke="#E83E8C"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#storeFill)"
              dot={(props: { cx?: number; cy?: number; payload?: ChartDataPoint }) => {
                if (props.payload?.label === 'Apr' && props.cx && props.cy) {
                  return (
                    <circle
                      key="apr-store"
                      cx={props.cx}
                      cy={props.cy}
                      r={4}
                      fill="#FFA62B"
                      stroke="#FFFFFF"
                      strokeWidth={1.8}
                    />
                  );
                }
                return <g key={`empty-store-${props.payload?.label}`} />;
              }}
              activeDot={{ r: 4.5, fill: '#E83E8C', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="online"
              stroke="#8052C7"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#onlineFill)"
              dot={(props: { cx?: number; cy?: number; payload?: ChartDataPoint }) => {
                if (props.payload?.label === 'Apr' && props.cx && props.cy) {
                  return (
                    <circle
                      key="apr-online"
                      cx={props.cx}
                      cy={props.cy}
                      r={4}
                      fill="#8052C7"
                      stroke="#FFFFFF"
                      strokeWidth={1.8}
                    />
                  );
                }
                return <g key={`empty-online-${props.payload?.label}`} />;
              }}
              activeDot={{ r: 4.5, fill: '#8052C7', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
