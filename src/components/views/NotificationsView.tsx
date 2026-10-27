import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  X,
  Play,
  Sliders,
  Check,
  Trash2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface NotificationsViewProps {
  onBackToDashboard: () => void;
}

type ToastType = 'success' | 'warning' | 'error' | 'info';
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface LiveToast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration: number;
}

interface CenterNotification {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  category: 'system' | 'deals' | 'security';
}

const INITIAL_CENTER_NOTIFS: CenterNotification[] = [
  {
    id: 'cn-1',
    type: 'success',
    title: 'Deal #12386 Finalized',
    message: 'Patrick successfully settled payment with Italian distributor Marko for $2,642.',
    time: '12 mins ago',
    read: false,
    category: 'deals',
  },
  {
    id: 'cn-2',
    type: 'warning',
    title: 'High Direct Traffic Spike',
    message: 'Facebook referral volume surged +42% in the last 2 hours. Server capacity normal.',
    time: '45 mins ago',
    read: false,
    category: 'system',
  },
  {
    id: 'cn-3',
    type: 'info',
    title: 'Monthly Summary Generated',
    message: 'October earnings report is compiled and available for export in the main dashboard.',
    time: '2 hours ago',
    read: true,
    category: 'deals',
  },
  {
    id: 'cn-4',
    type: 'error',
    title: 'Webhook Sync Failed',
    message: 'Endpoint /api/v1/telemetry timed out after 30s. Automatically queued for retry.',
    time: '5 hours ago',
    read: true,
    category: 'system',
  },
  {
    id: 'cn-5',
    type: 'info',
    title: 'Security Audit Passed',
    message: 'Zero vulnerabilities detected in the session management and authentication layers.',
    time: '1 day ago',
    read: true,
    category: 'security',
  },
];

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  onBackToDashboard,
}) => {
  const [centerNotifs, setCenterNotifs] = useState<CenterNotification[]>(INITIAL_CENTER_NOTIFS);
  const [filter, setFilter] = useState<'all' | 'unread' | 'deals' | 'system'>('all');

  // Toast generator state
  const [toastType, setToastType] = useState<ToastType>('success');
  const [toastPosition, setToastPosition] = useState<ToastPosition>('top-right');
  const [toastDuration, setToastDuration] = useState<number>(4);
  const [toastTitle, setToastTitle] = useState('Transaction Approved');
  const [toastMessage, setToastMessage] = useState('Payment voucher has been verified and registered.');
  const [activeToasts, setActiveToasts] = useState<LiveToast[]>([]);

  const handleTriggerToast = () => {
    const id = `toast-${Date.now()}`;
    const newToast: LiveToast = {
      id,
      type: toastType,
      title: toastTitle,
      message: toastMessage,
      duration: toastDuration,
    };
    setActiveToasts((prev) => [...prev, newToast]);

    if (toastDuration > 0) {
      setTimeout(() => {
        setActiveToasts((prev) => prev.filter((t) => t.id !== id));
      }, toastDuration * 1000);
    }
  };

  const handleDismissToast = (id: string) => {
    setActiveToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleMarkAllRead = () => {
    setCenterNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setCenterNotifs([]);
  };

  const handleToggleRead = (id: string) => {
    setCenterNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const filteredNotifs = centerNotifs.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'deals') return n.category === 'deals';
    if (filter === 'system') return n.category === 'system';
    return true;
  });

  const unreadCount = centerNotifs.filter((n) => !n.read).length;

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white p-4 lg:p-5 rounded-lg border border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-[#89909C] mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#EC388A] font-semibold">Notifications</span>
          </div>
          <h1 className="text-base font-bold text-[#303744]">Notification Center & Live Toast Generator</h1>
          <p className="text-xs text-[#89909C] mt-0.5">
            Test toast notifications across screen anchors, durations, and manage the event center.
          </p>
        </div>
        <button
          type="button"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#EC388A] text-white text-xs font-semibold hover:bg-[#D9307E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Toast Generator Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-lg border border-[#EDF0F4] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDF0F4]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#EC388A]" />
                <h2 className="text-xs font-bold text-[#303744] uppercase tracking-wider">
                  Live Toast Controller
                </h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FDF2F7] text-[#EC388A]">
                Interactive
              </span>
            </div>

            {/* Notification Type Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-[#5A6270] mb-1.5">
                Toast Status Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['success', 'warning', 'error', 'info'] as ToastType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setToastType(type);
                      if (type === 'success') {
                        setToastTitle('Operation Successful');
                        setToastMessage('Data points have been updated.');
                      } else if (type === 'warning') {
                        setToastTitle('Quota Warning');
                        setToastMessage('Approaching API rate limits.');
                      } else if (type === 'error') {
                        setToastTitle('Request Failed');
                        setToastMessage('Could not establish database connection.');
                      } else {
                        setToastTitle('Notice');
                        setToastMessage('New version deployment scheduled tonight.');
                      }
                    }}
                    className={`px-3 py-2 rounded-md text-xs font-semibold capitalize flex items-center gap-2 border transition-colors ${
                      toastType === type
                        ? type === 'success'
                          ? 'bg-[#E8F8EB] border-[#4AD962] text-[#16882C]'
                          : type === 'warning'
                          ? 'bg-[#FFF8EB] border-[#FFA62B] text-[#B87000]'
                          : type === 'error'
                          ? 'bg-[#FEE2E2] border-[#DC2626] text-[#DC2626]'
                          : 'bg-[#EBF8FC] border-[#38B9DF] text-[#0982A3]'
                        : 'border-[#EDF0F4] text-[#5A6270] hover:bg-[#FAFBFD]'
                    }`}
                  >
                    {type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                    {type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 shrink-0" />}
                    {type === 'error' && <AlertCircle className="w-3.5 h-3.5 shrink-0" />}
                    {type === 'info' && <Info className="w-3.5 h-3.5 shrink-0" />}
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Position Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-[#5A6270] mb-1.5">
                Screen Anchor Position
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'top-right', label: 'Top Right' },
                  { id: 'top-left', label: 'Top Left' },
                  { id: 'bottom-right', label: 'Bottom Right' },
                  { id: 'bottom-left', label: 'Bottom Left' },
                ].map((pos) => (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => setToastPosition(pos.id as ToastPosition)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
                      toastPosition === pos.id
                        ? 'bg-[#EC388A] border-[#EC388A] text-white shadow-xs'
                        : 'border-[#DCE1EA] text-[#5A6270] hover:bg-[#FAFBFD]'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-[#5A6270]">
                  Auto-Dismiss Duration
                </label>
                <span className="text-xs font-bold text-[#EC388A] tabular-nums">
                  {toastDuration} seconds
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={toastDuration}
                onChange={(e) => setToastDuration(Number(e.target.value))}
                className="w-full accent-[#EC388A] cursor-pointer"
              />
            </div>

            {/* Custom Text Inputs */}
            <div>
              <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                Toast Title
              </label>
              <input
                type="text"
                value={toastTitle}
                onChange={(e) => setToastTitle(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-md border border-[#DCE1EA] text-[#303744] focus:border-[#EC388A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                Toast Message
              </label>
              <input
                type="text"
                value={toastMessage}
                onChange={(e) => setToastMessage(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-md border border-[#DCE1EA] text-[#303744] focus:border-[#EC388A] focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleTriggerToast}
              className="w-full py-2.5 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Trigger Live Toast Notification
            </button>
          </div>
        </div>

        {/* Right: Notification Center */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-lg border border-[#EDF0F4] shadow-xs overflow-hidden flex flex-col">
            {/* Header with actions */}
            <div className="p-4 border-b border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#8052C7]" />
                <h2 className="text-xs font-bold text-[#303744] uppercase tracking-wider">
                  Notification Center ({centerNotifs.length})
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#EC388A] text-white text-[10px] font-bold tabular-nums">
                    {unreadCount} unread
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    className="text-xs font-semibold text-[#EC388A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
                {centerNotifs.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-xs font-semibold text-[#89909C] hover:text-[#DC2626] flex items-center gap-1 cursor-pointer ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear
                  </button>
                )}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-4 py-2 bg-[#FAFBFD] border-b border-[#EDF0F4] flex items-center gap-2">
              {(['all', 'unread', 'deals', 'system'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1 rounded text-xs font-semibold capitalize transition-colors ${
                    filter === tab
                      ? 'bg-white text-[#EC388A] shadow-2xs border border-[#EDF0F4]'
                      : 'text-[#89909C] hover:text-[#303744]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Notification List */}
            <div className="divide-y divide-[#F3F5F9] max-h-[500px] overflow-y-auto">
              {filteredNotifs.length === 0 ? (
                <div className="p-8 text-center text-[#89909C] text-xs">
                  No notifications matching filter.
                </div>
              ) : (
                filteredNotifs.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleRead(item.id)}
                    className={`p-4 flex items-start justify-between gap-3 transition-colors cursor-pointer ${
                      item.read ? 'bg-white hover:bg-[#FAFBFD]' : 'bg-[#FDF2F7]/40 hover:bg-[#FDF2F7]/60'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="mt-0.5 shrink-0">
                        {item.type === 'success' && (
                          <div className="w-7 h-7 rounded-full bg-[#E8F8EB] text-[#4AD962] flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                        {item.type === 'warning' && (
                          <div className="w-7 h-7 rounded-full bg-[#FFF8EB] text-[#FFA62B] flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                        )}
                        {item.type === 'error' && (
                          <div className="w-7 h-7 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
                            <AlertCircle className="w-4 h-4" />
                          </div>
                        )}
                        {item.type === 'info' && (
                          <div className="w-7 h-7 rounded-full bg-[#EBF8FC] text-[#38B9DF] flex items-center justify-center">
                            <Info className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-xs ${item.read ? 'font-semibold text-[#303744]' : 'font-bold text-[#EC388A]'}`}>
                            {item.title}
                          </h4>
                          {!item.read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EC388A]" />
                          )}
                        </div>
                        <p className="text-xs text-[#5A6270] mt-0.5 leading-relaxed">
                          {item.message}
                        </p>
                        <span className="text-[10px] text-[#89909C] flex items-center gap-1 mt-1.5 tabular-nums">
                          <Clock className="w-3 h-3" /> {item.time}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCenterNotifs(centerNotifs.filter((n) => n.id !== item.id));
                      }}
                      className="p-1 text-[#89909C] hover:text-[#DC2626] rounded shrink-0"
                      aria-label="Remove notification"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING LIVE TOAST STACK */}
      {activeToasts.length > 0 && (
        <div
          aria-live="polite"
          className={`fixed z-50 flex flex-col gap-2.5 p-4 pointer-events-none ${
            toastPosition === 'top-right'
              ? 'top-0 right-0'
              : toastPosition === 'top-left'
              ? 'top-0 left-0'
              : toastPosition === 'bottom-right'
              ? 'bottom-0 right-0'
              : 'bottom-0 left-0'
          }`}
        >
          {activeToasts.map((toast) => (
            <div
              key={toast.id}
              className={`w-80 p-3.5 rounded-lg shadow-xl border pointer-events-auto flex items-start gap-3 transition-all animate-in slide-in-from-top-2 bg-white ${
                toast.type === 'success'
                  ? 'border-[#4AD962] text-[#16882C]'
                  : toast.type === 'warning'
                  ? 'border-[#FFA62B] text-[#B87000]'
                  : toast.type === 'error'
                  ? 'border-[#DC2626] text-[#DC2626]'
                  : 'border-[#38B9DF] text-[#0982A3]'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#4AD962]" />}
                {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-[#FFA62B]" />}
                {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-[#DC2626]" />}
                {toast.type === 'info' && <Info className="w-5 h-5 text-[#38B9DF]" />}
              </div>

              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-[#303744]">{toast.title}</h5>
                <p className="text-[11px] text-[#5A6270] mt-0.5 leading-snug">{toast.message}</p>
              </div>

              <button
                type="button"
                onClick={() => handleDismissToast(toast.id)}
                className="p-1 rounded text-[#89909C] hover:text-[#303744] shrink-0 cursor-pointer"
                aria-label="Dismiss toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
