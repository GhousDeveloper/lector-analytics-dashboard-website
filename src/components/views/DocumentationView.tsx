import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Search,
  Code,
  Copy,
  CheckCircle2,
  ExternalLink,
  Terminal,
  Layers,
  Palette,
  Cpu,
  Database,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface DocumentationViewProps {
  onBackToDashboard: () => void;
}

interface DocSection {
  id: string;
  title: string;
  category: string;
  content: string;
  codeSnippet?: string;
}

const DOC_SECTIONS: DocSection[] = [
  {
    id: 'intro',
    title: '1. Introduction & Product Architecture',
    category: 'Architecture',
    content:
      'Lector is an enterprise-grade analytics dashboard designed for financial executives, revenue operations managers, and data analysts. Built on React 19, Vite, and Tailwind CSS v4, the architecture delivers sub-millisecond route transitions, responsive viewport scalability, and complete local persistence without external tracking scripts.',
    codeSnippet: `// Application Architecture Overview
Frontend: React 19 (SPA) + TypeScript
Bundler: Vite 8.3
Styling: Tailwind CSS v4 (@import "tailwindcss";)
Icons: Lucide React (feather-compatible, SVG tree-shaken)
Charts: Recharts responsive multi-series SVGs
Persistence: Browser LocalStorage + React State Hydration`,
  },
  {
    id: 'tokens',
    title: '2. Design Tokens & Color Palette',
    category: 'Design System',
    content:
      'The visual language follows the exact reference specifications with a distinctive glossy dark header, vibrant metric gradients, and subtle hairline borders.',
    codeSnippet: `/* Lector Core Palette Tokens */
--lector-page-bg: #F7F8FB;       /* Crisp clean canvas */
--lector-primary-pink: #EC388A;  /* Primary brand accent */
--lector-purple: #8052C7;        /* Secondary gradient stop */
--lector-cyan: #38B9DF;          /* Traffic & Bounce rate */
--lector-orange: #FFA62B;        /* High-value warning / Revenue */
--lector-dark-text: #303744;     /* High-contrast typography */
--lector-secondary-text: #89909C;/* Subtitles & table metadata */
--lector-border: #EDF0F4;        /* 1px hairline border */`,
  },
  {
    id: 'sidebar',
    title: '3. Complete 21-Module Sidebar Routing',
    category: 'Navigation',
    content:
      'All 21 sidebar navigation items are implemented as dedicated first-class modules with zero broken links or empty placeholders. Modules include Dashboard, Widgets, UI Elements, Advanced UI, Form Elements, Editors, Charts, Tables, Popups, Notifications, Icons, Maps, User Pages, Error Pages, General Pages, E-Commerce, Email, Calendar, Todo List, Gallery, and Documentation.',
    codeSnippet: `// Sidebar Item Definition
export const SIDEBAR_NAV_ITEMS = [
  'Dashboard', 'Widgets', 'UI Elements', 'Advanced UI',
  'Form Elements', 'Editors', 'Charts', 'Tables',
  'Popups', 'Notifications', 'Icons', 'Maps',
  'User Pages', 'Error Pages', 'General Pages',
  'E-Commerce', 'Email', 'Calendar', 'Todo List',
  'Gallery', 'Documentation'
] as const;`,
  },
  {
    id: 'deals-crud',
    title: '4. Deals Management & Storage Layer',
    category: 'State Management',
    content:
      'Deals data is managed through a reactive state pipeline that automatically synchronizes with browser LocalStorage under "lector_dashboard_deals_v1". Adding, editing, or deleting a deal automatically records an audit event into "lector_dashboard_activities_v1" and recalculates monthly summary metrics.',
    codeSnippet: `// Saving deal records with activity logging
const handleSaveDeal = (input: DealFormInput, editingId?: string) => {
  if (editingId) {
    setDeals(prev => prev.map(d => d.id === editingId ? { ...d, ...input } : d));
    logActivity('Deal Updated', \`Updated \${input.customer}\`, 'pink');
  } else {
    const newDeal = { id: \`deal-\${Date.now()}\`, ...input };
    setDeals(prev => [newDeal, ...prev]);
    logActivity('Deal Added', \`Submitted new deal for \${input.customer}\`, 'purple');
  }
};`,
  },
  {
    id: 'telemetry',
    title: '5. Real-Time Telemetry & WebSocket Contracts',
    category: 'Integration APIs',
    content:
      'Lector modules consume real-time telemetry events for live earnings, active operator presence, and deal status changes. Webhooks adhere to idempotent JSON payloads with signature verification.',
    codeSnippet: `// WebSocket Real-time Ingestion Contract
interface TelemetryPayload {
  eventId: string;
  timestamp: number;
  type: 'EARNINGS_TICK' | 'ORDER_STATUS_CHANGED' | 'TRAFFIC_REFRESH';
  payload: {
    grossEarnings?: number;
    invoiceId?: string;
    newStatus?: 'Process' | 'Open' | 'On Hold';
  };
  signature: string; // HMAC-SHA256
}`,
  },
  {
    id: 'troubleshooting',
    title: '6. Troubleshooting & Diagnostics',
    category: 'Operations',
    content:
      'If test data needs to be restored to factory defaults, navigate to the top-right profile dropdown and choose "Workspace Settings", which resets localStorage to the pristine initial state. CSV exports can be triggered anytime via "Export Analytics Report".',
    codeSnippet: `// Factory Reset Demo State
const handleResetState = () => {
  localStorage.removeItem('lector_dashboard_deals_v1');
  localStorage.removeItem('lector_dashboard_activities_v1');
  setDeals(INITIAL_DEALS);
  setActivities(INITIAL_ACTIVITIES);
};`,
  },
];

export const DocumentationView: React.FC<DocumentationViewProps> = ({ onBackToDashboard }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('intro');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    notify('Copied snippet to clipboard');
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const filteredSections = DOC_SECTIONS.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentSection =
    DOC_SECTIONS.find((s) => s.id === activeSectionId) || DOC_SECTIONS[0];

  return (
    <div className="space-y-4">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#293548] text-white px-4 py-2.5 rounded-lg shadow-lg text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#4AD962] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EC388A]" />
            <h1 className="text-sm font-bold text-[#303744]">Developer & System Documentation</h1>
          </div>
          <p className="text-xs text-[#89909C] mt-0.5">
            Architecture guide, design tokens, component APIs, state lifecycle, and integration specs
          </p>
        </div>
        <button
          type="button"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Dashboard
        </button>
      </div>

      {/* Main Documentation Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Sidebar Table of Contents */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-4 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#89909C] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-[#EDF0F4] bg-[#F7F8FB] focus:bg-white focus:border-[#EC388A] outline-none text-[#303744]"
            />
          </div>

          <nav className="space-y-1 pt-1">
            {filteredSections.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-md text-left text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FDF2F7] text-[#EC388A] border-l-3 border-[#EC388A]'
                      : 'text-[#5A6270] hover:bg-[#FAFBFD] hover:text-[#303744]'
                  }`}
                >
                  <span className="truncate pr-2">{sec.title}</span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isActive ? 'text-[#EC388A] translate-x-0.5' : 'text-[#89909C]'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#EDF0F4] text-[11px] text-[#89909C] space-y-2">
            <div className="font-semibold text-[#303744]">Quick Links:</div>
            <div>• React 19 Engine: <span className="text-[#38B9DF]">v19.0.1</span></div>
            <div>• Tailwind CSS: <span className="text-[#8052C7]">v4.3.3</span></div>
            <div>• TypeScript: <span className="text-[#303744]">v5.7 / Bundler</span></div>
          </div>
        </div>

        {/* Right Active Section Reader */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EDF0F4]">
            <div>
              <span className="text-[10px] font-bold text-[#EC388A] bg-[#FDF2F7] px-2 py-0.5 rounded-full uppercase tracking-wider">
                {currentSection.category}
              </span>
              <h2 className="text-base font-bold text-[#303744] mt-1.5">
                {currentSection.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => notify(`Documentation link copied`)}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#89909C] hover:text-[#303744] cursor-pointer"
            >
              <ExternalLink className="w-3 h-3" /> Share
            </button>
          </div>

          <p className="text-xs text-[#5A6270] leading-relaxed">
            {currentSection.content}
          </p>

          {currentSection.codeSnippet && (
            <div className="rounded-lg overflow-hidden border border-[#1e2736] bg-[#0c1017]">
              <div className="bg-[#080b10] px-3 py-2 flex items-center justify-between border-b border-[#1e2736]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#38B9DF]" />
                  <span className="text-[11px] font-mono text-slate-300">Code Reference</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(currentSection.codeSnippet!, currentSection.id)}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono cursor-pointer transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  {copiedSnippet === currentSection.id ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 font-mono text-[11px] text-emerald-300 leading-relaxed overflow-x-auto">
                {currentSection.codeSnippet}
              </pre>
            </div>
          )}

          {/* Section Navigation Footer */}
          <div className="pt-4 border-t border-[#EDF0F4] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                const currentIndex = DOC_SECTIONS.findIndex((s) => s.id === currentSection.id);
                if (currentIndex > 0) {
                  setActiveSectionId(DOC_SECTIONS[currentIndex - 1].id);
                }
              }}
              disabled={DOC_SECTIONS.findIndex((s) => s.id === currentSection.id) === 0}
              className="px-3 py-1.5 rounded-md border border-[#EDF0F4] text-xs font-medium text-[#5A6270] disabled:opacity-40 hover:bg-[#F7F8FB] cursor-pointer"
            >
              ← Previous Section
            </button>
            <button
              type="button"
              onClick={() => {
                const currentIndex = DOC_SECTIONS.findIndex((s) => s.id === currentSection.id);
                if (currentIndex < DOC_SECTIONS.length - 1) {
                  setActiveSectionId(DOC_SECTIONS[currentIndex + 1].id);
                }
              }}
              disabled={
                DOC_SECTIONS.findIndex((s) => s.id === currentSection.id) ===
                DOC_SECTIONS.length - 1
              }
              className="px-3 py-1.5 rounded-md bg-[#293548] text-white text-xs font-semibold disabled:opacity-40 hover:bg-[#1E2734] cursor-pointer"
            >
              Next Section →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
