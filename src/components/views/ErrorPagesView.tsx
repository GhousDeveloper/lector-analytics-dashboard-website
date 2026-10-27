import React, { useState } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  ShieldAlert,
  ServerCrash,
  WifiOff,
  Home,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  Terminal,
  CheckCircle2,
  Copy,
} from 'lucide-react';

interface ErrorPagesViewProps {
  onBackToDashboard: () => void;
}

type ErrorPageType = '404' | '403' | '500' | 'offline';

export const ErrorPagesView: React.FC<ErrorPagesViewProps> = ({ onBackToDashboard }) => {
  const [activeError, setActiveError] = useState<ErrorPageType>('404');
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showStackTrace, setShowStackTrace] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const notify = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSimulateRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      notify('Simulated reconnection: Ping 14ms. Server is reachable.');
    }, 1200);
  };

  const handleCopyErrorCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    notify(`Copied error trace to clipboard`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const renderErrorContent = () => {
    switch (activeError) {
      case '404':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8 lg:p-12 max-w-2xl mx-auto">
            {/* Visual Art */}
            <div className="relative mb-6">
              <div className="text-8xl lg:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#EC388A] via-[#8052C7] to-[#38B9DF] select-none opacity-90 drop-shadow-sm">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white text-[#EC388A] border border-[#EC388A]/30 shadow-md transform -rotate-6">
                  Page Not Found
                </span>
              </div>
            </div>

            <h2 className="text-xl lg:text-2xl font-bold text-[#303744]">
              Oops! The page you are looking for does not exist.
            </h2>
            <p className="text-xs lg:text-sm text-[#89909C] mt-2 max-w-md leading-relaxed">
              The URL might be mistyped, the resource has been moved to another path, or your session needs to be refreshed.
            </p>

            {/* Quick Search */}
            <div className="w-full max-w-md mt-6 flex items-center gap-2 bg-[#F7F8FB] border border-[#EDF0F4] rounded-lg px-3 py-2 focus-within:border-[#EC388A] transition-colors">
              <Search className="w-4 h-4 text-[#89909C] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dashboard views, deals, or reports..."
                className="w-full bg-transparent text-xs text-[#303744] outline-none placeholder:text-[#89909C]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => notify(`Found 3 results matching "${searchQuery}"`)}
                  className="text-[11px] font-semibold text-[#EC388A] hover:underline"
                >
                  Search
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={onBackToDashboard}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#EC388A] text-white text-xs font-semibold hover:bg-[#D9307E] transition-colors shadow-xs cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                Return to Dashboard
              </button>
              <button
                type="button"
                onClick={() => notify('Help center article opened')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#EDF0F4] bg-white text-[#5A6270] text-xs font-medium hover:border-[#8052C7] hover:text-[#8052C7] transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Visit Help Center
              </button>
            </div>

            {/* Helpful Links */}
            <div className="mt-8 pt-6 border-t border-[#EDF0F4] w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left">
              {[
                { title: 'Deals & Revenue', desc: 'View latest sales data' },
                { title: 'Traffic Analytics', desc: 'Inspect source channels' },
                { title: 'System Documentation', desc: 'Read guides and APIs' },
              ].map((link, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => notify(`Navigating to ${link.title}`)}
                  className="p-3 rounded-lg border border-[#EDF0F4] hover:border-[#EC388A]/40 hover:bg-[#FDF2F7]/40 text-left transition-colors cursor-pointer group"
                >
                  <div className="text-[11px] font-semibold text-[#303744] group-hover:text-[#EC388A] flex items-center justify-between">
                    {link.title}
                    <ChevronRight className="w-3 h-3 text-[#89909C] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-[10px] text-[#89909C] mt-0.5">{link.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case '403':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8 lg:p-12 max-w-2xl mx-auto">
            {/* Visual Shield */}
            <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-5 text-amber-500 shadow-sm relative">
              <ShieldAlert className="w-10 h-10" />
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-md bg-[#293548] text-white text-[10px] font-bold">
                403
              </div>
            </div>

            <h2 className="text-xl lg:text-2xl font-bold text-[#303744]">
              Access Denied / Forbidden
            </h2>
            <p className="text-xs lg:text-sm text-[#89909C] mt-2 max-w-md leading-relaxed">
              You do not have administrative privileges to access this secure zone. Please verify your role credentials or request clearance from an organization owner.
            </p>

            {/* Permission breakdown */}
            <div className="w-full max-w-md mt-6 bg-[#F7F8FB] border border-[#EDF0F4] rounded-lg p-3 text-left space-y-2">
              <div className="text-[11px] font-semibold text-[#303744] flex items-center justify-between">
                <span>Security Clearance Context:</span>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">
                  RESTRICTED_RBAC
                </span>
              </div>
              <div className="text-[10px] text-[#5A6270] space-y-1">
                <div>• Current Principal: <code className="text-[#303744] font-mono">operator@lector-demo.app</code></div>
                <div>• Required Role: <code className="text-[#303744] font-mono">SUPER_ADMIN | BILLING_DIRECTOR</code></div>
                <div>• Incident Ref: <code className="text-[#EC388A] font-mono">SEC-AUTH-8829-X</code></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => notify('Access request ticket #REQ-4091 submitted to workspace owner.')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#293548] text-white text-xs font-semibold hover:bg-[#1E2734] transition-colors shadow-xs cursor-pointer"
              >
                Request Authorization
              </button>
              <button
                type="button"
                onClick={onBackToDashboard}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#EDF0F4] bg-white text-[#5A6270] text-xs font-medium hover:border-[#EC388A] hover:text-[#EC388A] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Dashboard
              </button>
            </div>
          </div>
        );

      case '500':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8 lg:p-12 max-w-2xl mx-auto">
            {/* Visual Server Error */}
            <div className="w-20 h-20 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mb-5 text-[#EC388A] shadow-sm relative">
              <ServerCrash className="w-10 h-10" />
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-md bg-[#EC388A] text-white text-[10px] font-bold">
                500
              </div>
            </div>

            <h2 className="text-xl lg:text-2xl font-bold text-[#303744]">
              Internal Server Error
            </h2>
            <p className="text-xs lg:text-sm text-[#89909C] mt-2 max-w-md leading-relaxed">
              The application server encountered an unexpected condition while processing the upstream payload. Our reliability engineers have been automatically notified.
            </p>

            {/* Stack trace toggle */}
            <div className="w-full max-w-md mt-6 text-left">
              <div className="flex items-center justify-between mb-1.5">
                <button
                  type="button"
                  onClick={() => setShowStackTrace(!showStackTrace)}
                  className="text-[11px] font-semibold text-[#8052C7] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Terminal className="w-3 h-3" />
                  {showStackTrace ? 'Hide Stack Diagnostic' : 'Inspect Stack Diagnostic'}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyErrorCode(
                      '500 ServerException: upstream timeout at POST /api/v2/analytics/aggregate:54:12'
                    )
                  }
                  className="text-[10px] text-[#89909C] hover:text-[#303744] flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-2.5 h-2.5" />
                  {copiedCode ? 'Copied' : 'Copy Log'}
                </button>
              </div>

              {showStackTrace && (
                <div className="bg-[#1E2734] text-rose-300 rounded-lg p-3 font-mono text-[10px] leading-relaxed overflow-x-auto border border-[#293548]">
                  <div className="text-white/60">// Exception Trace</div>
                  <div>Error: UpstreamConnectionTimeout at ClusterNode:03</div>
                  <div className="text-white/40">  at dispatchEngine (/server/workers/compute.ts:182:11)</div>
                  <div className="text-white/40">  at async handleDataAggregation (/routes/analytics.ts:45:9)</div>
                  <div className="text-emerald-400 mt-1">status: 500, incidentId: "ERR_CLUST_44919"</div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                type="button"
                disabled={isRetrying}
                onClick={handleSimulateRetry}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#EC388A] text-white text-xs font-semibold hover:bg-[#D9307E] transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
                {isRetrying ? 'Retrying Node Connection...' : 'Retry Connection'}
              </button>
              <button
                type="button"
                onClick={onBackToDashboard}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#EDF0F4] bg-white text-[#5A6270] text-xs font-medium hover:border-[#EC388A] hover:text-[#EC388A] transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                Return to Dashboard
              </button>
            </div>
          </div>
        );

      case 'offline':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8 lg:p-12 max-w-2xl mx-auto">
            {/* Visual Offline Icon */}
            <div className="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-5 text-[#89909C] shadow-sm relative">
              <WifiOff className="w-10 h-10" />
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-md bg-[#89909C] text-white text-[10px] font-bold">
                OFFLINE
              </div>
            </div>

            <h2 className="text-xl lg:text-2xl font-bold text-[#303744]">
              No Internet Connection
            </h2>
            <p className="text-xs lg:text-sm text-[#89909C] mt-2 max-w-md leading-relaxed">
              Your workstation appears to be offline. Lector is running in offline cache mode with localized IndexedDB synchronization paused.
            </p>

            <div className="mt-6 bg-[#F7F8FB] border border-[#EDF0F4] rounded-lg p-3 text-left max-w-md w-full text-[11px] text-[#5A6270] space-y-1">
              <div className="font-semibold text-[#303744]">Troubleshooting steps:</div>
              <div>1. Check your Wi-Fi or local Ethernet cable connection</div>
              <div>2. Verify DNS resolution and firewall permissions</div>
              <div>3. Disable VPN or proxy servers if access is blocked</div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                type="button"
                disabled={isRetrying}
                onClick={handleSimulateRetry}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#38B9DF] text-white text-xs font-semibold hover:bg-[#2BA0C2] transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
                {isRetrying ? 'Checking Network...' : 'Test Connection'}
              </button>
              <button
                type="button"
                onClick={onBackToDashboard}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#EDF0F4] bg-white text-[#5A6270] text-xs font-medium hover:border-[#38B9DF] hover:text-[#38B9DF] transition-colors cursor-pointer"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Toast banner */}
      {statusMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#293548] text-white px-4 py-2.5 rounded-lg shadow-lg text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#4AD962] shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EC388A]" />
            <h1 className="text-sm font-bold text-[#303744]">Error Pages Showcase</h1>
          </div>
          <p className="text-xs text-[#89909C] mt-0.5">
            Production error boundaries, access control fallback screens, and network resilience states
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFullscreenPreview(!isFullscreenPreview)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#EDF0F4] text-[#5A6270] hover:text-[#303744] hover:bg-[#FAFBFD] text-xs font-medium transition-colors cursor-pointer"
          >
            {isFullscreenPreview ? 'Exit Full Screen' : 'Full Screen View'}
          </button>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Error state tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-lg border border-[#EDF0F4] shadow-xs">
        <span className="text-xs font-bold text-[#89909C] px-2">Select Error Template:</span>
        {[
          { id: '404', label: '404 - Not Found', icon: AlertTriangle, color: 'text-[#EC388A]' },
          { id: '403', label: '403 - Forbidden', icon: ShieldAlert, color: 'text-amber-500' },
          { id: '500', label: '500 - Server Error', icon: ServerCrash, color: 'text-rose-500' },
          { id: 'offline', label: 'Offline - No Network', icon: WifiOff, color: 'text-[#38B9DF]' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeError === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveError(tab.id as ErrorPageType)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#293548] text-white shadow-xs'
                  : 'text-[#5A6270] hover:bg-[#F7F8FB] hover:text-[#303744]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.color}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Interactive Render Box */}
      <div
        className={`bg-white rounded-lg border border-[#EDF0F4] shadow-xs overflow-hidden transition-all ${
          isFullscreenPreview ? 'fixed inset-0 z-50 rounded-none border-none p-6 flex flex-col justify-center' : 'min-h-[460px] flex items-center justify-center'
        }`}
      >
        {isFullscreenPreview && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <span className="text-xs text-[#89909C] bg-white/90 px-2 py-1 rounded border border-[#EDF0F4]">
              Simulated Mode: {activeError.toUpperCase()}
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreenPreview(false)}
              className="px-3 py-1.5 rounded-md bg-[#293548] text-white text-xs font-medium cursor-pointer shadow-md"
            >
              Close Fullscreen
            </button>
          </div>
        )}
        {renderErrorContent()}
      </div>

      {/* Implementation Spec Note */}
      <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#FDF2F7] text-[#EC388A] flex items-center justify-center shrink-0 font-bold text-xs">
          UX
        </div>
        <div className="text-xs">
          <div className="font-semibold text-[#303744]">Production Ready Error Boundaries</div>
          <p className="text-[#89909C] mt-0.5 leading-relaxed">
            These screens integrate with React ErrorBoundary fallback components, handling network disconnects, unauthorized OAuth token revocations, unhandled API rejections, and missing route deep links seamlessly while keeping users grounded in the Lector system.
          </p>
        </div>
      </div>
    </div>
  );
};
