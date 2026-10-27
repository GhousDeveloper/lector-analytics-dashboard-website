import React, { useState } from 'react';
import {
  Home,
  LayoutGrid,
  Sliders,
  Layers,
  FileSpreadsheet,
  FileEdit,
  BarChart2,
  Table2,
  MessageSquarePlus,
  Bell,
  Compass,
  MapPin,
  User,
  AlertCircle,
  FileText,
  ShoppingCart,
  Mail,
  Calendar,
  CheckSquare,
  Image,
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { NavItemId } from '../types/dashboard';
import { SIDEBAR_NAV_ITEMS } from '../utils/dashboardLogic';

interface SidebarProps {
  activeNav: NavItemId;
  onSelectNav: (item: NavItemId) => void;
  collapsed: boolean;
  onToggleCollapse?: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const NAV_ICON_MAP: Record<NavItemId, React.ComponentType<{ className?: string }>> = {
  Dashboard: Home,
  Widgets: LayoutGrid,
  'UI Elements': Sliders,
  'Advanced UI': Layers,
  'Form Elements': FileSpreadsheet,
  Editors: FileEdit,
  Charts: BarChart2,
  Tables: Table2,
  Popups: MessageSquarePlus,
  Notifications: Bell,
  Icons: Compass,
  Maps: MapPin,
  'User Pages': User,
  'Error Pages': AlertCircle,
  'General Pages': FileText,
  'E-Commerce': ShoppingCart,
  Email: Mail,
  Calendar: Calendar,
  'Todo List': CheckSquare,
  Gallery: Image,
  Documentation: BookOpen,
};

// Subtle badge indicators matching Lector's live features
const NAV_BADGE_MAP: Partial<Record<NavItemId, { text: string; bg: string; textCol: string }>> = {
  Notifications: { text: '2', bg: 'bg-[#38B9DF]', textCol: 'text-white' },
  Email: { text: '3', bg: 'bg-[#8052C7]', textCol: 'text-white' },
  'Todo List': { text: '4', bg: 'bg-[#4AD962]', textCol: 'text-white' },
  Popups: { text: 'New', bg: 'bg-[#FDF2F7]', textCol: 'text-[#EC388A]' },
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  onSelectNav,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) => {
  const [hoveredTooltip, setHoveredTooltip] = useState<{
    name: NavItemId;
    top: number;
    badge?: { text: string; bg: string; textCol: string };
  } | null>(null);

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Sidebar Navigation"
        className={`
          bg-white border-r border-[#EDF0F4] flex flex-col shrink-0 select-none z-50
          transition-[width] duration-250 ease-out
          fixed inset-y-0 left-0 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
          ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:shadow-none'}
          ${collapsed ? 'lg:w-[68px]' : 'w-[190px] lg:w-[190px]'}
        `}
      >
        {/* Top Brand Block with Glossy Lector Tech Logo */}
        <div
          className="h-[54px] shrink-0 flex items-center justify-between border-b border-[#201048] bg-[#0c0624] text-white overflow-hidden relative shadow-sm"
        >
          <button
            type="button"
            onClick={() => onSelectNav('Dashboard')}
            className="w-full h-full flex items-center justify-center relative focus:outline-none transition-opacity hover:opacity-95 cursor-pointer"
            aria-label="Lector Home"
          >
            {collapsed ? (
              /* Collapsed State: 3D Glossy Hexagonal Ribbon Prism Only */
              <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="235 245 310 390"
                  className="h-7 w-auto drop-shadow-md shrink-0"
                  aria-hidden="true"
                >
                  <image
                    href="/assets/aistudio/Glossy_Lector_Tech_Logo_387f5f41.png"
                    width="1691"
                    height="930"
                  />
                </svg>
              </div>
            ) : (
              /* Expanded State: Seamless full logo and dark indigo background */
              <img
                src="/assets/aistudio/Glossy_Lector_Tech_Logo_387f5f41.png"
                alt="Lector"
                className="w-full h-full object-cover object-center select-none"
              />
            )}
          </button>

          {mobileOpen && (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close navigation menu"
              className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded bg-[#0c0624]/80 text-white/80 hover:text-white shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav aria-label="Main Menu" className="flex-1 overflow-y-auto py-2 px-1">
          <ul className="space-y-[1px]">
            {SIDEBAR_NAV_ITEMS.map((item) => {
              const Icon = NAV_ICON_MAP[item];
              const isActive = activeNav === item;
              const badge = NAV_BADGE_MAP[item];

              return (
                <li key={item} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectNav(item);
                      if (mobileOpen) onCloseMobile();
                    }}
                    onMouseEnter={(e) => {
                      if (collapsed) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredTooltip({
                          name: item,
                          top: rect.top + rect.height / 2,
                          badge,
                        });
                      }
                    }}
                    onMouseLeave={() => setHoveredTooltip(null)}
                    title={collapsed ? item : undefined}
                    className={`
                      relative w-full flex items-center gap-2.5 py-[5.5px] text-left text-[11px] font-medium transition-colors cursor-pointer rounded-md
                      ${
                        isActive
                          ? 'text-[#E83E8C] bg-[#FDF2F7]/70 font-semibold'
                          : 'text-[#5A6270] hover:text-[#E83E8C] hover:bg-[#FAFBFD]'
                      }
                      ${collapsed ? 'lg:justify-center lg:px-0' : 'px-3'}
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Active Left Indicator Bar */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r bg-[#E83E8C]"
                      />
                    )}

                    {/* Icon */}
                    <Icon
                      className={`w-[13px] h-[13px] shrink-0 transition-colors ${
                        isActive ? 'text-[#E83E8C]' : 'text-[#89909C]'
                      }`}
                    />

                    {/* Label (Expanded Mode) */}
                    <span
                      className={`truncate flex-1 ${
                        collapsed ? 'lg:hidden' : 'inline-block'
                      }`}
                    >
                      {item}
                    </span>

                    {/* Badge (Expanded Mode) */}
                    {badge && !collapsed && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full leading-tight shrink-0 ${badge.bg} ${badge.textCol}`}
                      >
                        {badge.text}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Collapse / Expand Toggle Bar (Desktop only) */}
        {onToggleCollapse && (
          <div className="hidden lg:flex shrink-0 p-2 border-t border-[#EDF0F4] bg-[#FAFBFD]">
            <button
              type="button"
              onClick={onToggleCollapse}
              className={`
                w-full flex items-center gap-2 py-1.5 px-2 rounded-md text-[11px] font-medium text-[#89909C] hover:text-[#303744] hover:bg-white hover:shadow-xs transition-all cursor-pointer
                ${collapsed ? 'justify-center' : 'justify-between'}
              `}
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {!collapsed && (
                <span className="flex items-center gap-1.5 truncate">
                  <PanelLeftClose className="w-3.5 h-3.5 shrink-0 text-[#89909C]" />
                  <span>Collapse Menu</span>
                </span>
              )}
              {collapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-[#89909C] hover:text-[#EC388A]" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
              )}
            </button>
          </div>
        )}
      </aside>

      {/* Floating Unclipped Tooltip in Collapsed Mode */}
      {collapsed && hoveredTooltip && (
        <div
          role="tooltip"
          style={{ top: `${hoveredTooltip.top}px` }}
          className="hidden lg:flex fixed left-[72px] -translate-y-1/2 z-[100] items-center pointer-events-none drop-shadow-xl"
        >
          {/* Arrow */}
          <span className="w-1.5 h-1.5 bg-[#293548] transform rotate-45 -mr-1 z-10" />
          {/* Tooltip Content */}
          <div className="bg-[#293548] text-white text-[11px] font-semibold py-1 px-2.5 rounded shadow-xl whitespace-nowrap flex items-center gap-1.5 border border-white/10">
            <span>{hoveredTooltip.name}</span>
            {hoveredTooltip.badge && (
              <span
                className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full leading-tight ${hoveredTooltip.badge.bg} ${hoveredTooltip.badge.textCol}`}
              >
                {hoveredTooltip.badge.text}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};
