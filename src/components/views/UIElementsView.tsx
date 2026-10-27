import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  Sparkles,
} from 'lucide-react';

interface UIElementsViewProps {
  onBackToDashboard: () => void;
}

export const UIElementsView: React.FC<UIElementsViewProps> = ({
  onBackToDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'buttons' | 'alerts' | 'badges'>('buttons');
  const [alertDismissed, setAlertDismissed] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <h1 className="text-sm font-bold text-[#303744]">UI Elements Kit</h1>
          <p className="text-xs text-[#89909C]">
            Interactive component patterns and visual tokens
          </p>
        </div>
        <button
          type="button"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EC388A] text-white text-xs font-semibold hover:bg-[#D9307E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EDF0F4] pb-2">
        {(['buttons', 'alerts', 'badges'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
              activeTab === tab
                ? 'bg-[#EC388A] text-white shadow-xs'
                : 'text-[#5A6270] hover:bg-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'buttons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-lg border border-[#EDF0F4] shadow-xs space-y-3">
            <h2 className="text-xs font-bold text-[#303744]">Brand & Accent Buttons</h2>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-white text-xs font-semibold shadow-xs"
              >
                Pink Primary
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-[#8052C7] hover:bg-[#6E42B0] text-white text-xs font-semibold shadow-xs"
              >
                Purple Action
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-[#38B9DF] hover:bg-[#2BA5CA] text-white text-xs font-semibold shadow-xs"
              >
                Cyan Accent
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-[#FFA62B] hover:bg-[#EB931A] text-white text-xs font-semibold shadow-xs"
              >
                Orange Warn
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#EDF0F4] shadow-xs space-y-3">
            <h2 className="text-xs font-bold text-[#303744]">Outline & Ghost Buttons</h2>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                className="px-4 py-2 rounded-md border border-[#EC388A] text-[#EC388A] hover:bg-[#FDF2F7] text-xs font-semibold"
              >
                Pink Outline
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md border border-[#EDF0F4] text-[#5A6270] hover:bg-[#FAFBFD] text-xs font-semibold"
              >
                Neutral Border
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-[#293548] text-white text-xs font-semibold"
              >
                Navy Solid
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="bg-white p-5 rounded-lg border border-[#EDF0F4] shadow-xs space-y-3">
          <h2 className="text-xs font-bold text-[#303744]">Status Notifications & Alerts</h2>

          {!alertDismissed ? (
            <div className="p-3.5 rounded-lg bg-[#EBF8FC] border border-[#BCE8F5] flex items-center justify-between text-xs text-[#0F6582]">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0 text-[#38B9DF]" />
                <span>
                  <strong>Information:</strong> Real-time websocket telemetry updates are enabled.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAlertDismissed(true)}
                className="font-bold text-xs hover:underline ml-2"
              >
                Dismiss
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAlertDismissed(false)}
              className="text-xs text-[#EC388A] font-semibold hover:underline"
            >
              Show dismissed alert again
            </button>
          )}

          <div className="p-3.5 rounded-lg bg-[#E8F8EB] border border-[#B8EAC0] flex items-center gap-2 text-xs text-[#1D742B]">
            <CheckCircle className="w-4 h-4 shrink-0 text-[#4AD962]" />
            <span>
              <strong>Success:</strong> Deal invoice batch has been verified and synchronized.
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#FFF8EB] border border-[#FDE3B8] flex items-center gap-2 text-xs text-[#9E650C]">
            <AlertTriangle className="w-4 h-4 shrink-0 text-[#FFA62B]" />
            <span>
              <strong>Warning:</strong> Direct Search traffic exceeded bandwidth quota for peak hours.
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#FDF2F7] border border-[#F8C1DA] flex items-center gap-2 text-xs text-[#9D1751]">
            <XCircle className="w-4 h-4 shrink-0 text-[#EC388A]" />
            <span>
              <strong>Attention:</strong> Payment reconciliation for invoice #12386 requires confirmation.
            </span>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="bg-white p-5 rounded-lg border border-[#EDF0F4] shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-[#303744]">Lector Status Badges</h2>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded bg-[#EA398A] text-white text-xs font-semibold">
              Process
            </span>
            <span className="px-3 py-1 rounded bg-[#7E51C8] text-white text-xs font-semibold">
              Open
            </span>
            <span className="px-3 py-1 rounded bg-[#38B9DF] text-white text-xs font-semibold">
              On Hold
            </span>
            <span className="px-3 py-1 rounded bg-[#FFA62B] text-white text-xs font-semibold">
              Pending
            </span>
            <span className="px-3 py-1 rounded bg-[#4AD962] text-white text-xs font-semibold">
              Done
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
