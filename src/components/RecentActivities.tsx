import React from 'react';
import {
  ClipboardCheck,
  ShieldCheck,
  Newspaper,
  Anchor,
  MessageCircle,
} from 'lucide-react';
import { ActivityItem } from '../types/dashboard';

interface RecentActivitiesProps {
  activities: ActivityItem[];
}

const ACTIVITY_STYLE_MAP: Record<
  ActivityItem['color'],
  { bg: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  pink: { bg: 'bg-[#EC388A]', Icon: ClipboardCheck },
  purple: { bg: 'bg-[#7E51C8]', Icon: ShieldCheck },
  cyan: { bg: 'bg-[#38B9DF]', Icon: Newspaper },
  orange: { bg: 'bg-[#FFB22B]', Icon: Anchor },
  green: { bg: 'bg-[#4AD962]', Icon: MessageCircle },
};

export const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    <section
      aria-label="Recent Activities"
      className="bg-white rounded-lg border border-[#EDF0F4] shadow-[0_2px_10px_rgba(48,55,68,0.03)] p-4 flex flex-col h-full"
    >
      <div className="mb-2.5">
        <h2 className="text-[13px] font-bold text-[#303744]">Recent Activities</h2>
      </div>

      <div className="relative flex-1 flex flex-col justify-between py-0.5">
        {activities.map((item, idx) => {
          const style = ACTIVITY_STYLE_MAP[item.color];
          const IconComponent = style.Icon;
          const isLast = idx === activities.length - 1;

          return (
            <div
              key={item.id}
              className="relative grid grid-cols-[68px_28px_1fr] items-start gap-2.5 py-1.5"
            >
              {/* Timestamp on the left */}
              <span className="text-[10px] text-[#89909C] pt-1.5 tabular-nums whitespace-nowrap">
                {item.timeAgo}
              </span>

              {/* Center circular icon + vertical connector */}
              <div className="relative flex flex-col items-center">
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute top-7 bottom-[-22px] w-[1px] bg-[#EDF0F4]"
                  />
                )}
                <div
                  className={`relative z-10 w-7 h-7 rounded-full ${style.bg} text-white flex items-center justify-center shadow-xs shrink-0`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Activity Title & Subtitle on the right */}
              <div className="min-w-0 pt-0.5">
                <h3 className="text-[12px] font-semibold text-[#303744] leading-tight">
                  {item.title}
                </h3>
                <p className="text-[10px] text-[#89909C] mt-0.5 truncate">
                  <span className="font-semibold text-[#303744]">{item.person}</span>{' '}
                  {item.actionText}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
