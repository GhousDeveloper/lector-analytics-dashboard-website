import React from 'react';
import { Crown, Heart, Wand2, PieChart } from 'lucide-react';
import { BottomKpiItem, PeriodAnalytics, ReportingPeriod } from '../types/dashboard';
import { EarningsChart } from './EarningsChart';
import { formatCurrency } from '../utils/dashboardLogic';

interface DashboardOverviewProps {
  analytics: PeriodAnalytics;
  selectedPeriod: ReportingPeriod;
  onSelectPeriod: (period: ReportingPeriod) => void;
  showingLastMonth: boolean;
  onToggleLastMonth: () => void;
}

const KPI_ICON_STYLES: Record<
  BottomKpiItem['color'],
  { bg: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  pink: { bg: 'bg-[#EC388A]', Icon: Crown },
  purple: { bg: 'bg-[#7E51C8]', Icon: Heart },
  cyan: { bg: 'bg-[#38B9DF]', Icon: Wand2 },
  orange: { bg: 'bg-[#FFB22B]', Icon: PieChart },
};

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  analytics,
  selectedPeriod,
  onSelectPeriod,
  showingLastMonth,
  onToggleLastMonth,
}) => {
  const displayedEarnings = showingLastMonth
    ? analytics.lastMonthEarnings
    : analytics.earnings;
  const displayedSales = showingLastMonth
    ? analytics.lastMonthSales
    : analytics.sales;

  return (
    <section
      aria-label="Dashboard Analytics Overview"
      className="bg-white rounded-lg border border-[#EDF0F4] shadow-[0_2px_10px_rgba(48,55,68,0.03)] flex flex-col justify-between"
    >
      {/* Upper Section: Left Summary + Right Area Chart */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Left Summary Metrics */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <div>
            <h1 className="text-[13px] font-bold text-[#303744] leading-tight">
              Dashboard
            </h1>
            <p className="text-[10.5px] text-[#89909C] mt-0.5 whitespace-nowrap">
              Overview of your recent business activity
            </p>
          </div>

          <div className="mt-4">
            <div className="text-[21px] font-extrabold text-[#303744] tracking-tight tabular-nums leading-none">
              {formatCurrency(displayedEarnings, true)}
            </div>
            <p className="text-[10.5px] text-[#89909C] mt-1">
              {showingLastMonth ? 'Last Month Earnings' : 'Current Month Earnings'}
            </p>
          </div>

          <div className="mt-3.5">
            <div className="text-[19px] font-extrabold text-[#303744] tracking-tight tabular-nums leading-none">
              {displayedSales}
            </div>
            <p className="text-[10.5px] text-[#89909C] mt-1">
              {showingLastMonth ? 'Last Month Sales' : 'Current Month Sales'}
            </p>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={onToggleLastMonth}
              aria-pressed={showingLastMonth}
              className="px-3.5 py-1.5 rounded-md text-[10.5px] font-semibold text-white shadow-xs transition-all cursor-pointer whitespace-nowrap hover:opacity-95 active:scale-[0.99]"
              style={{
                background: showingLastMonth
                  ? 'linear-gradient(90deg, #8052C7 0%, #EC388A 100%)'
                  : 'linear-gradient(90deg, #EC388A 0%, #D93280 100%)',
              }}
            >
              {showingLastMonth ? 'Current Month Summary' : 'Last Month Summary'}
            </button>
          </div>
        </div>

        {/* Right Area Chart */}
        <div className="md:col-span-8 min-w-0">
          <EarningsChart
            data={analytics.chartData}
            selectedPeriod={selectedPeriod}
            onSelectPeriod={onSelectPeriod}
          />
        </div>
      </div>

      {/* Bottom 4 Mini KPI Strip inside the Dashboard Card */}
      <div className="border-t border-[#EDF0F4] px-4 py-2.5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {analytics.kpis.map((kpi) => {
          const style = KPI_ICON_STYLES[kpi.color];
          const IconComponent = style.Icon;
          return (
            <div
              key={kpi.id}
              className="flex items-center gap-3 border-r last:border-r-0 border-[#F1F3F7] pr-2"
            >
              <div
                className={`w-8 h-8 rounded-full ${style.bg} text-white flex items-center justify-center shrink-0 shadow-xs`}
              >
                <IconComponent className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#89909C] truncate">{kpi.label}</p>
                <p className="text-[12px] font-bold text-[#303744] tabular-nums mt-0.5">
                  {kpi.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
