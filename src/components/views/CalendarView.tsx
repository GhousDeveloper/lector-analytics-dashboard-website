import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  MapPin,
  ArrowLeft,
  Check,
} from 'lucide-react';

interface CalendarViewProps {
  onBackToDashboard: () => void;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: number; // day of month (e.g. 26)
  time: string;
  color: string;
  type: string;
}

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: 'e-1',
    title: 'Executive Earnings Briefing',
    date: 26,
    time: '10:00 AM - 11:30 AM',
    color: '#EC388A',
    type: 'Strategy',
  },
  {
    id: 'e-2',
    title: 'Customer Deal Review: Marko',
    date: 26,
    time: '02:00 PM - 03:00 PM',
    color: '#8052C7',
    type: 'Sales',
  },
  {
    id: 'e-3',
    title: 'SEO & Search Traffic Alignment',
    date: 27,
    time: '11:00 AM - 12:00 PM',
    color: '#38B9DF',
    type: 'Marketing',
  },
  {
    id: 'e-4',
    title: 'Quarterly Infrastructure Audit',
    date: 29,
    time: '04:00 PM - 05:00 PM',
    color: '#FFA62B',
    type: 'DevOps',
  },
];

export const CalendarView: React.FC<CalendarViewProps> = ({
  onBackToDashboard,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(26);
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('02:00 PM - 03:00 PM');
  const [eventType, setEventType] = useState('General');

  const daysInMonth = 31;
  const startDayOffset = 4; // Thursday Oct 1st 2026

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;
    const newEvent: CalendarEvent = {
      id: `e-${Date.now()}`,
      title: eventTitle.trim(),
      date: selectedDay,
      time: eventTime,
      color: '#EC388A',
      type: eventType,
    };
    setEvents([...events, newEvent]);
    setEventTitle('');
    setShowAddModal(false);
  };

  const selectedDayEvents = events.filter((e) => e.date === selectedDay);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <h1 className="text-sm font-bold text-[#303744]">Business Calendar</h1>
          <p className="text-xs text-[#89909C]">
            October 2026 schedule and scheduled briefings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EC388A] text-white text-xs font-semibold hover:bg-[#D9307E] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> New Event
          </button>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#DCE1EA] text-[#5A6270] text-xs font-semibold hover:bg-[#FAFBFD] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Calendar Grid */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-[#303744]">October 2026</h2>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-1 rounded text-[#89909C] hover:bg-[#F3F5F9]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1 rounded text-[#89909C] hover:bg-[#F3F5F9]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-[#89909C] mb-2 uppercase">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Empty slots for starting offset */}
            {Array.from({ length: startDayOffset }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="h-16 rounded border border-transparent bg-[#FAFBFC]/50"
              />
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const isSelected = selectedDay === dayNum;
              const dayEvents = events.filter((e) => e.date === dayNum);

              return (
                <button
                  key={dayNum}
                  type="button"
                  onClick={() => setSelectedDay(dayNum)}
                  className={`h-16 p-1.5 rounded border text-left flex flex-col justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#EC388A] bg-[#FDF2F7]/40 ring-1 ring-[#EC388A]'
                      : 'border-[#F1F3F7] hover:bg-[#FAFBFD]'
                  }`}
                >
                  <span
                    className={`text-xs font-semibold tabular-nums ${
                      dayNum === 26
                        ? 'w-5 h-5 rounded-full bg-[#EC388A] text-white flex items-center justify-center font-bold'
                        : isSelected
                        ? 'text-[#EC388A]'
                        : 'text-[#303744]'
                    }`}
                  >
                    {dayNum}
                  </span>

                  <div className="space-y-0.5 overflow-hidden w-full">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className="text-[9px] font-medium text-white px-1 py-0.5 rounded truncate"
                        style={{ backgroundColor: ev.color }}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[8px] text-[#89909C]">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Agenda */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EDF0F4] mb-4">
              <div>
                <h3 className="text-xs font-bold text-[#303744]">
                  Agenda: October {selectedDay}, 2026
                </h3>
                <p className="text-[11px] text-[#89909C]">
                  {selectedDayEvents.length} scheduled item(s)
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedDayEvents.length === 0 ? (
                <div className="py-10 text-center text-[#89909C] text-xs">
                  No events scheduled for this day.{' '}
                  <button
                    type="button"
                    onClick={() => setShowAddModal(true)}
                    className="text-[#EC388A] font-semibold block mt-1 mx-auto hover:underline"
                  >
                    + Schedule an event
                  </button>
                </div>
              ) : (
                selectedDayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 rounded-lg border border-[#EDF0F4] bg-[#FAFBFD] hover:bg-white hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                        style={{ backgroundColor: ev.color }}
                      >
                        {ev.type}
                      </span>
                      <span className="text-[10px] text-[#89909C] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {ev.time}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#303744] mt-2">
                      {ev.title}
                    </h4>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#EDF0F4] mt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="w-full py-2 rounded-md bg-[#293548] hover:bg-[#1E2638] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Event for Oct {selectedDay}
            </button>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[1px]">
          <div className="bg-white rounded-xl shadow-xl border border-[#EDF0F4] max-w-sm w-full p-5">
            <h3 className="text-sm font-bold text-[#303744] mb-3">
              Add Event for October {selectedDay}
            </h3>
            <form onSubmit={handleAddEvent} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Client presentation"
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] focus:border-[#EC388A] focus:outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                  Time
                </label>
                <input
                  type="text"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] focus:border-[#EC388A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                  Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] bg-white focus:outline-none"
                >
                  <option value="Strategy">Strategy</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Review">Review</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-md border border-[#DCE1EA] text-xs font-semibold text-[#5A6270]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-md bg-[#EC388A] text-white text-xs font-semibold"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
