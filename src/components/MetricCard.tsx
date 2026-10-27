import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const BAR_HEIGHTS_1 = [38, 72, 30, 54, 22, 36, 26, 78];
const BAR_HEIGHTS_4 = [40, 70, 32, 52, 24, 38, 28, 76];

const BOUNCE_RATE_BY_PERIOD: Record<'Monthly' | 'Weekly' | 'Daily', { value: string; path: string }> = {
  Monthly: {
    value: '$ 432',
    path: 'M 2 26 Q 16 4, 30 22 T 58 20 T 86 24 T 112 28',
  },
  Weekly: {
    value: '$ 128',
    path: 'M 2 22 Q 16 10, 30 16 T 58 14 T 86 20 T 112 18',
  },
  Daily: {
    value: '$ 49',
    path: 'M 2 28 Q 16 14, 30 24 T 58 12 T 86 22 T 112 14',
  },
};

export const MetricCardsRow: React.FC = () => {
  const [bouncePeriod, setBouncePeriod] = useState<'Monthly' | 'Weekly' | 'Daily'>('Monthly');
  const bounceData = BOUNCE_RATE_BY_PERIOD[bouncePeriod];

  return (
    <section
      aria-label="Key Performance Metric Cards"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      {/* CARD 1: REVENUE STATUS (Pink-to-Purple Gradient) */}
      <div
        className="relative rounded-lg p-3.5 text-white shadow-[0_4px_14px_rgba(236,56,138,0.18)] overflow-hidden flex flex-col justify-between h-[112px] transition-transform duration-150 hover:-translate-y-0.5"
        style={{
          background: 'linear-gradient(135deg, #EC388A 0%, #B244B7 100%)',
        }}
      >
        <h3 className="text-[11px] font-semibold tracking-wide text-white/95">
          Revenue Status
        </h3>

        <div className="flex items-end justify-between mt-auto pt-2">
          {/* Mini White Bar Chart */}
          <div className="flex items-end gap-[4px] h-[36px]" aria-hidden="true">
            {BAR_HEIGHTS_1.map((h, i) => (
              <span
                key={i}
                className="w-[3px] bg-white/95 rounded-t-[1px]"
                style={{ height: `${(h / 100) * 36}px` }}
              />
            ))}
          </div>

          {/* Right Metric Value & Date */}
          <div className="text-right">
            <div className="text-[20px] font-bold leading-none tabular-nums tracking-tight">
              $ 432
            </div>
            <p className="text-[10px] text-white/80 mt-1 tabular-nums">
              Jan 01 - Jan 10
            </p>
          </div>
        </div>
      </div>

      {/* CARD 2: PAGE VIEW (Purple Gradient + Bottom Wave Area) */}
      <div
        className="relative rounded-lg p-3.5 text-white shadow-[0_4px_14px_rgba(128,82,199,0.18)] overflow-hidden flex flex-col justify-between h-[112px] transition-transform duration-150 hover:-translate-y-0.5"
        style={{
          background: 'linear-gradient(135deg, #864EC9 0%, #5B45B6 100%)',
        }}
      >
        <div className="relative z-10">
          <h3 className="text-[11px] font-semibold tracking-wide text-white/95">
            Page View
          </h3>
          <div className="text-[20px] font-bold leading-none tabular-nums tracking-tight mt-2">
            $ 432
          </div>
        </div>

        {/* Decorative Multi-Wave Area at Bottom */}
        <svg
          viewBox="0 0 260 60"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 w-full h-[54px]"
        >
          <path
            d="M0,42 C35,24 65,48 105,34 C145,20 185,8 225,22 C242,28 252,38 260,44 L260,60 L0,60 Z"
            fill="rgba(255,255,255,0.18)"
          />
          <path
            d="M0,48 C45,32 85,54 130,38 C175,22 205,26 260,48 L260,60 L0,60 Z"
            fill="rgba(255,255,255,0.22)"
          />
        </svg>
      </div>

      {/* CARD 3: BOUNCE RATE (Cyan-to-Blue Gradient + Period Selector + Line Chart) */}
      <div
        className="relative rounded-lg p-3.5 text-white shadow-[0_4px_14px_rgba(56,185,223,0.18)] overflow-hidden flex flex-col justify-between h-[112px] transition-transform duration-150 hover:-translate-y-0.5"
        style={{
          background: 'linear-gradient(135deg, #37BBE2 0%, #558FDC 100%)',
        }}
      >
        <div>
          <h3 className="text-[11px] font-semibold tracking-wide text-white/95">
            Bounce Rate
          </h3>
          <div className="text-[20px] font-bold leading-none tabular-nums tracking-tight mt-2">
            {bounceData.value}
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 mt-auto">
          {/* Small Interactive Reporting Period Selector */}
          <div className="relative inline-block">
            <label htmlFor="bounce-rate-period" className="sr-only">
              Bounce rate period
            </label>
            <select
              id="bounce-rate-period"
              value={bouncePeriod}
              onChange={(e) =>
                setBouncePeriod(e.target.value as 'Monthly' | 'Weekly' | 'Daily')
              }
              className="appearance-none bg-white text-[#303744] text-[10px] font-semibold pl-2.5 pr-6 py-1 rounded shadow-xs cursor-pointer focus:outline-none"
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Daily">Daily</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#5A6270] pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* White Mini Smooth Bezier Line Chart */}
          <svg
            viewBox="0 0 116 34"
            className="w-[106px] h-[32px] overflow-visible shrink-0"
            aria-hidden="true"
          >
            <path
              d={bounceData.path}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* CARD 4: REVENUE STATUS (Orange-to-Coral Gradient) */}
      <div
        className="relative rounded-lg p-3.5 text-white shadow-[0_4px_14px_rgba(255,166,43,0.18)] overflow-hidden flex flex-col justify-between h-[112px] transition-transform duration-150 hover:-translate-y-0.5"
        style={{
          background: 'linear-gradient(135deg, #FCB532 0%, #FA763D 100%)',
        }}
      >
        <h3 className="text-[11px] font-semibold tracking-wide text-white/95">
          Revenue Status
        </h3>

        <div className="flex items-end justify-between mt-auto pt-2">
          {/* Mini White Bar Chart */}
          <div className="flex items-end gap-[4px] h-[36px]" aria-hidden="true">
            {BAR_HEIGHTS_4.map((h, i) => (
              <span
                key={i}
                className="w-[3px] bg-white/95 rounded-t-[1px]"
                style={{ height: `${(h / 100) * 36}px` }}
              />
            ))}
          </div>

          {/* Right Metric Value & Date */}
          <div className="text-right">
            <div className="text-[20px] font-bold leading-none tabular-nums tracking-tight">
              $ 432
            </div>
            <p className="text-[10px] text-white/80 mt-1 tabular-nums">
              Jan 01 - Jan 10
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
