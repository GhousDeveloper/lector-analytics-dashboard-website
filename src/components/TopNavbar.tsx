import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Bell,
  Mail,
  Settings,
  Check,
  User,
  LogOut,
  Shield,
  Sliders,
} from 'lucide-react';
import { NotificationItem } from '../types/dashboard';

interface TopNavbarProps {
  onToggleSidebar: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: (type: 'alert' | 'message') => void;
  onSelectProfileOption: (option: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onToggleSidebar,
  notifications,
  onMarkAllRead,
  onSelectProfileOption,
}) => {
  const [openMenu, setOpenMenu] = useState<'alerts' | 'messages' | 'profile' | 'settings' | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alerts = notifications.filter((n) => n.type === 'alert');
  const messages = notifications.filter((n) => n.type === 'message');
  const unreadAlerts = alerts.filter((n) => n.unread).length;
  const unreadMessages = messages.filter((n) => n.unread).length;

  return (
    <header
      ref={navRef}
      className="h-[50px] bg-white border-b border-[#EDF0F4] px-5 flex items-center justify-between shrink-0 relative z-30"
    >
      {/* Left: Sidebar Toggle Button */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar navigation"
          className="p-1.5 rounded-md text-[#89909C] hover:text-[#303744] hover:bg-[#F5F7FA] transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Notification, Message, Avatar, Settings */}
      <div className="flex items-center gap-3.5">
        {/* Alert Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenMenu(openMenu === 'alerts' ? null : 'alerts')}
            aria-label={`Notifications (${unreadAlerts} unread)`}
            aria-expanded={openMenu === 'alerts'}
            className="relative p-1.5 rounded-full text-[#89909C] hover:text-[#303744] hover:bg-[#F5F7FA] transition-colors"
          >
            <Bell className="w-[15px] h-[15px]" />
            {unreadAlerts > 0 && (
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#38B9DF] text-white text-[8px] font-bold flex items-center justify-center tabular-nums">
                {unreadAlerts}
              </span>
            )}
          </button>

          {openMenu === 'alerts' && (
            <div
              role="region"
              aria-label="Notifications Panel"
              className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-[#EDF0F4] py-2 z-50"
            >
              <div className="px-3.5 py-1.5 border-b border-[#EDF0F4] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#303744]">Notifications</span>
                <button
                  type="button"
                  onClick={() => onMarkAllRead('alert')}
                  className="text-[10px] font-medium text-[#E83E8C] hover:underline flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto divide-y divide-[#F4F6F9]">
                {alerts.map((item) => (
                  <div key={item.id} className="px-3.5 py-2.5 hover:bg-[#FAFBFD]">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold text-[#303744]">{item.title}</p>
                      <span className="text-[10px] text-[#89909C] tabular-nums">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-[#89909C] mt-0.5">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Messages / Activity Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenMenu(openMenu === 'messages' ? null : 'messages')}
            aria-label={`Messages (${unreadMessages} unread)`}
            aria-expanded={openMenu === 'messages'}
            className="relative p-1.5 rounded-full text-[#89909C] hover:text-[#303744] hover:bg-[#F5F7FA] transition-colors"
          >
            <Mail className="w-[15px] h-[15px]" />
            {unreadMessages > 0 && (
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#8052C7] text-white text-[8px] font-bold flex items-center justify-center tabular-nums">
                {unreadMessages}
              </span>
            )}
          </button>

          {openMenu === 'messages' && (
            <div
              role="region"
              aria-label="Messages Panel"
              className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-[#EDF0F4] py-2 z-50"
            >
              <div className="px-3.5 py-1.5 border-b border-[#EDF0F4] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#303744]">Activity Messages</span>
                <button
                  type="button"
                  onClick={() => onMarkAllRead('message')}
                  className="text-[10px] font-medium text-[#8052C7] hover:underline flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto divide-y divide-[#F4F6F9]">
                {messages.map((item) => (
                  <div key={item.id} className="px-3.5 py-2.5 hover:bg-[#FAFBFD]">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold text-[#303744]">{item.title}</p>
                      <span className="text-[10px] text-[#89909C] tabular-nums">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-[#89909C] mt-0.5">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenMenu(openMenu === 'profile' ? null : 'profile')}
            aria-label="User profile menu"
            aria-expanded={openMenu === 'profile'}
            className="w-6 h-6 rounded-full bg-[#293548] text-white flex items-center justify-center overflow-hidden ring-2 ring-[#EDF0F4] hover:ring-[#E83E8C]/40 transition-all focus:outline-none"
          >
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <rect width="36" height="36" fill="#232A38" />
              <circle cx="18" cy="13" r="6" fill="#F4A261" />
              <path d="M7 33c2-7 8-10 11-10s9 3 11 10" fill="#E83E8C" />
            </svg>
          </button>

          {openMenu === 'profile' && (
            <div
              role="menu"
              aria-label="User Profile Options"
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#EDF0F4] py-1.5 z-50"
            >
              <div className="px-3.5 py-2 border-b border-[#EDF0F4]">
                <p className="text-xs font-bold text-[#303744]">Rachel Adams</p>
                <p className="text-[10px] text-[#89909C]">Analytics Director</p>
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onSelectProfileOption('Account Profile');
                  setOpenMenu(null);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#303744] hover:bg-[#FAFBFD] flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-[#89909C]" /> My Profile
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onSelectProfileOption('Security Preferences');
                  setOpenMenu(null);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#303744] hover:bg-[#FAFBFD] flex items-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-[#89909C]" /> Security
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onSelectProfileOption('Workspace Settings');
                  setOpenMenu(null);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#303744] hover:bg-[#FAFBFD] flex items-center gap-2 border-t border-[#EDF0F4]"
              >
                <LogOut className="w-3.5 h-3.5 text-[#E83E8C]" /> Reset Demo State
              </button>
            </div>
          )}
        </div>

        {/* Settings Icon */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenMenu(openMenu === 'settings' ? null : 'settings')}
            aria-label="Dashboard settings"
            aria-expanded={openMenu === 'settings'}
            className="p-1.5 rounded-full text-[#89909C] hover:text-[#303744] hover:bg-[#F5F7FA] transition-colors"
          >
            <Settings className="w-[15px] h-[15px]" />
          </button>

          {openMenu === 'settings' && (
            <div
              role="menu"
              aria-label="Dashboard Settings"
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#EDF0F4] py-1.5 z-50"
            >
              <div className="px-3.5 py-1.5 border-b border-[#EDF0F4] text-[11px] font-semibold text-[#303744] flex items-center gap-1.5">
                <Sliders className="w-3 h-3 text-[#E83E8C]" /> Quick Preferences
              </div>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onSelectProfileOption('Export Analytics Report');
                  setOpenMenu(null);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#303744] hover:bg-[#FAFBFD]"
              >
                Export CSV Summary
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onSelectProfileOption('Refresh Live Metrics');
                  setOpenMenu(null);
                }}
                className="w-full px-3.5 py-2 text-left text-xs text-[#303744] hover:bg-[#FAFBFD]"
              >
                Refresh Data
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
