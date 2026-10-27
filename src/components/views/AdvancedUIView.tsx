import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface AdvancedUIViewProps {
  onBackToDashboard: () => void;
}

export const AdvancedUIView: React.FC<AdvancedUIViewProps> = ({ onBackToDashboard }) => {
  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<number[]>([0]);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Tooltip & Popover state
  const [activeTooltipPos, setActiveTooltipPos] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [hoveredTooltip, setHoveredTooltip] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  // Segmented control state
  const [segmentIndex, setSegmentIndex] = useState(0);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const notify = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const CAROUSEL_SLIDES = [
    {
      title: 'Executive Earnings Intelligence',
      subtitle: 'Real-time multi-currency revenue forecasting powered by Lector telemetry',
      bgGradient: 'from-[#EC388A] via-[#B83280] to-[#8052C7]',
      tag: 'FINANCIAL ANALYTICS',
      metric: '$52,567.53',
      metricLabel: 'Monthly Gross Run-rate',
    },
    {
      title: 'Global Traffic Attribution',
      subtitle: 'Track channel conversion ratios across YouTube, Facebook, and Organic Search',
      bgGradient: 'from-[#8052C7] via-[#5F4BB6] to-[#38B9DF]',
      tag: 'ACQUISITION FUNNEL',
      metric: '55% Social Share',
      metricLabel: 'Leading Acquisition Source',
    },
    {
      title: 'High-Velocity Deals Flow',
      subtitle: 'Instant invoice reconciliation with zero latency status propagation',
      bgGradient: 'from-[#38B9DF] via-[#10B981] to-[#FFA62B]',
      tag: 'PIPELINE VELOCITY',
      metric: '82 Active Deals',
      metricLabel: 'Current Month Invoices',
    },
  ];

  // Auto-play carousel effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, CAROUSEL_SLIDES.length]);

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

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
            <span className="w-2 h-2 rounded-full bg-[#8052C7]" />
            <h1 className="text-sm font-bold text-[#303744]">Advanced UI Components</h1>
          </div>
          <p className="text-xs text-[#89909C] mt-0.5">
            Interactive accordions, carousel hero banners, circular progress rings, and positioned popovers
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

      {/* SECTION 1: Interactive Hero Carousel */}
      <div className="bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-[#303744]">Interactive Feature Carousel</h2>
            <p className="text-[11px] text-[#89909C]">
              Slide {currentSlide + 1} of {CAROUSEL_SLIDES.length} • Auto-rotation {isAutoPlaying ? 'Active' : 'Paused'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-1.5 rounded-md border border-[#EDF0F4] hover:bg-[#F7F8FB] text-[#5A6270] text-xs font-medium cursor-pointer"
              title={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1))
              }
              className="p-1.5 rounded-md border border-[#EDF0F4] hover:bg-[#F7F8FB] text-[#5A6270] cursor-pointer"
              title="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length)}
              className="p-1.5 rounded-md border border-[#EDF0F4] hover:bg-[#F7F8FB] text-[#5A6270] cursor-pointer"
              title="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Slide viewport */}
        <div className="relative rounded-lg overflow-hidden min-h-[180px] shadow-sm">
          {CAROUSEL_SLIDES.map((slide, idx) => {
            const isCurrent = idx === currentSlide;
            return (
              <div
                key={idx}
                className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} p-6 flex flex-col justify-between text-white transition-opacity duration-500 ${
                  isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-white/20 backdrop-blur-xs uppercase">
                    {slide.tag}
                  </span>
                  <div className="text-right">
                    <div className="text-base font-black tracking-tight">{slide.metric}</div>
                    <div className="text-[10px] text-white/80">{slide.metricLabel}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold tracking-tight">{slide.title}</h3>
                  <p className="text-xs text-white/90 max-w-lg mt-1">{slide.subtitle}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => notify(`Selected ${slide.title}`)}
                    className="px-3 py-1.5 rounded-md bg-white text-[#303744] text-[11px] font-bold hover:bg-white/90 transition-colors shadow-xs cursor-pointer"
                  >
                    Explore Insights
                  </button>
                  <div className="flex items-center gap-1.5">
                    {CAROUSEL_SLIDES.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => setCurrentSlide(dotIdx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          dotIdx === currentSlide ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                        }`}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Grid of Accordions + Circular Progress Rings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Accordions */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5 space-y-3">
          <div>
            <h2 className="text-xs font-bold text-[#303744]">Multi-Expand Collapsible Accordions</h2>
            <p className="text-[11px] text-[#89909C]">
              Expandable panels for complex workspace policies, compliance, and schema specs
            </p>
          </div>

          <div className="space-y-2">
            {[
              {
                title: 'Data Retention & GDPR Compliance Policies',
                icon: ShieldCheck,
                color: 'text-emerald-500',
                content:
                  'Customer invoice records and deal logs are retained for 7 years in cryptographically sealed cold storage. Audit logs can be purged upon verified GDPR right-to-erasure receipt.',
              },
              {
                title: 'High-Concurrency Ingestion Architecture',
                icon: Cpu,
                color: 'text-[#8052C7]',
                content:
                  'Lector processes real-time transaction webhooks through an asynchronous queue worker with sub-20ms delivery guarantees and automatic idempotency keys.',
              },
              {
                title: 'Automated Rate-Limiting & Quota Management',
                icon: Zap,
                color: 'text-[#FFA62B]',
                content:
                  'API endpoints permit 500 requests per minute per IP token bucket. Burst limits scale dynamically according to enterprise subscription tiers.',
              },
            ].map((item, index) => {
              const isOpen = openAccordions.includes(index);
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="border border-[#EDF0F4] rounded-lg overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-3.5 text-left bg-white hover:bg-[#FAFBFD] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
                      <span className="text-xs font-bold text-[#303744]">{item.title}</span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#EC388A] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#89909C] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-3.5 pt-0 text-xs text-[#5A6270] bg-[#FAFBFD] leading-relaxed border-t border-[#EDF0F4]">
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Circular Radial Meters & Progress Bars */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5 space-y-4">
          <div>
            <h2 className="text-xs font-bold text-[#303744]">Radial Progress & Stacked Meters</h2>
            <p className="text-[11px] text-[#89909C]">
              Circular SVG indicators with live completion percentages
            </p>
          </div>

          {/* 3 Circular Rings */}
          <div className="grid grid-cols-3 gap-2 text-center py-2">
            {[
              { label: 'Earning KPI', percent: 85, color: '#EC388A', stroke: 'stroke-[#EC388A]' },
              { label: 'Traffic Goal', percent: 64, color: '#8052C7', stroke: 'stroke-[#8052C7]' },
              { label: 'Deals Done', percent: 92, color: '#38B9DF', stroke: 'stroke-[#38B9DF]' },
            ].map((meter, idx) => {
              const radius = 28;
              const circumference = 2 * Math.PI * radius;
              const offset = circumference - (meter.percent / 100) * circumference;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="relative w-18 h-18 flex items-center justify-center">
                    <svg className="w-18 h-18 transform -rotate-90">
                      <circle
                        cx="36"
                        cy="36"
                        r={radius}
                        className="stroke-[#EDF0F4]"
                        strokeWidth="5"
                        fill="transparent"
                      />
                      <circle
                        cx="36"
                        cy="36"
                        r={radius}
                        className={meter.stroke}
                        strokeWidth="5"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-[#303744]">
                      {meter.percent}%
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#5A6270] mt-1">
                    {meter.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stacked multi-segment bar */}
          <div className="space-y-1.5 pt-2 border-t border-[#EDF0F4]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#303744]">
              <span>Storage Allocation</span>
              <span className="text-[#89909C] text-[11px]">8.4 GB of 10 GB</span>
            </div>
            <div className="h-2.5 w-full bg-[#EDF0F4] rounded-full overflow-hidden flex">
              <div className="h-full bg-[#EC388A]" style={{ width: '45%' }} title="Media Assets (45%)" />
              <div className="h-full bg-[#8052C7]" style={{ width: '25%' }} title="Database Records (25%)" />
              <div className="h-full bg-[#38B9DF]" style={{ width: '14%' }} title="Backups (14%)" />
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#89909C] pt-1">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#EC388A]" /> Media
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#8052C7]" /> Database
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#38B9DF]" /> Backups
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Positioned Tooltips & Popovers + Segmented Pill Switches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Tooltip & Popover Playground */}
        <div className="lg:col-span-6 bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5 space-y-4">
          <div>
            <h2 className="text-xs font-bold text-[#303744]">Interactive Tooltips & Popovers</h2>
            <p className="text-[11px] text-[#89909C]">
              Directionally aware hover triggers and rich popover cards
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#5A6270]">Tooltip Anchor:</span>
            {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => setActiveTooltipPos(pos)}
                className={`px-2.5 py-1 text-[11px] rounded font-semibold capitalize transition-colors cursor-pointer ${
                  activeTooltipPos === pos
                    ? 'bg-[#293548] text-white'
                    : 'bg-[#F7F8FB] border border-[#EDF0F4] text-[#5A6270]'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>

          {/* Interactive Trigger Area */}
          <div className="flex items-center justify-center p-8 bg-[#FAFBFD] rounded-lg border border-dashed border-[#EDF0F4] relative">
            <div className="relative inline-block">
              <button
                type="button"
                onMouseEnter={() => setHoveredTooltip(true)}
                onMouseLeave={() => setHoveredTooltip(false)}
                onClick={() => setShowPopover(!showPopover)}
                className="px-4 py-2 rounded-lg bg-[#EC388A] text-white text-xs font-bold shadow-xs hover:bg-[#D9307E] cursor-pointer"
              >
                Hover for Tooltip / Click for Popover
              </button>

              {/* Tooltip Overlay */}
              {hoveredTooltip && !showPopover && (
                <div
                  className={`absolute z-30 px-2.5 py-1 bg-[#293548] text-white text-[10px] font-medium rounded shadow-md whitespace-nowrap pointer-events-none transition-all ${
                    activeTooltipPos === 'top'
                      ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
                      : activeTooltipPos === 'bottom'
                      ? 'top-full left-1/2 -translate-x-1/2 mt-2'
                      : activeTooltipPos === 'left'
                      ? 'right-full top-1/2 -translate-y-1/2 mr-2'
                      : 'left-full top-1/2 -translate-y-1/2 ml-2'
                  }`}
                >
                  Positioned: {activeTooltipPos.toUpperCase()} Anchor
                </div>
              )}

              {/* Rich Popover Overlay */}
              {showPopover && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2.5 z-40 w-64 bg-white border border-[#EDF0F4] rounded-lg shadow-xl p-3 text-left">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#EDF0F4]">
                    <span className="text-xs font-bold text-[#303744]">Popover Details</span>
                    <button
                      type="button"
                      onClick={() => setShowPopover(false)}
                      className="text-xs text-[#89909C] hover:text-[#303744]"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-[11px] text-[#5A6270] mt-2 leading-relaxed">
                    Popovers support formatted rich text, contextual actions, and sub-forms without leaving the view.
                  </p>
                  <div className="mt-3 flex justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPopover(false);
                        notify('Action confirmed from Popover');
                      }}
                      className="px-2.5 py-1 rounded bg-[#8052C7] text-white text-[10px] font-semibold cursor-pointer"
                    >
                      Confirm Action
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Segmented Controls & Animated Badges */}
        <div className="lg:col-span-6 bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5 space-y-4">
          <div>
            <h2 className="text-xs font-bold text-[#303744]">Segmented Switches & Status Pulses</h2>
            <p className="text-[11px] text-[#89909C]">
              Tactile tab sliders and live telemetry status indicators
            </p>
          </div>

          {/* Segmented slider */}
          <div className="bg-[#F7F8FB] p-1 rounded-lg border border-[#EDF0F4] flex items-center">
            {['Daily View', 'Weekly Trends', 'Monthly Consolidated', 'Annual Forecast'].map(
              (seg, idx) => (
                <button
                  key={seg}
                  type="button"
                  onClick={() => setSegmentIndex(idx)}
                  className={`flex-1 py-1.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                    segmentIndex === idx
                      ? 'bg-white text-[#EC388A] shadow-xs'
                      : 'text-[#89909C] hover:text-[#303744]'
                  }`}
                >
                  {seg}
                </button>
              )
            )}
          </div>

          {/* Pulsing badges */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <div className="p-3 rounded-lg border border-emerald-100 bg-emerald-50/50 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div>
                <div className="text-[11px] font-bold text-emerald-800">WebSocket Live</div>
                <div className="text-[10px] text-emerald-600">Sync delay: 12ms</div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-rose-100 bg-rose-50/50 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
              </span>
              <div>
                <div className="text-[11px] font-bold text-rose-800">Queue Processing</div>
                <div className="text-[10px] text-rose-600">82 pending tasks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
