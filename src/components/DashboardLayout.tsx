import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { DashboardOverview } from './DashboardOverview';
import { TrafficDonutChart } from './TrafficDonutChart';
import { MetricCardsRow } from './MetricCard';
import { RecentActivities } from './RecentActivities';
import { DealsTable } from './DealsTable';
import { DealFormModal } from './DealFormModal';
import {
  ActivityItem,
  DealFormInput,
  DealRecord,
  NavItemId,
  NotificationItem,
  ReportingPeriod,
} from '../types/dashboard';
import {
  INITIAL_ACTIVITIES,
  INITIAL_DEALS,
  INITIAL_NOTIFICATIONS,
  PERIOD_ANALYTICS_MAP,
  TRAFFIC_SEGMENTS,
} from '../utils/dashboardLogic';
import { ArrowLeft, CheckCircle2, Layers } from 'lucide-react';
import { EcommerceView } from './views/EcommerceView';
import { TodoView } from './views/TodoView';
import { CalendarView } from './views/CalendarView';
import { EmailView } from './views/EmailView';
import { UIElementsView } from './views/UIElementsView';
import { AdvancedUIView } from './views/AdvancedUIView';
import { FormElementsView } from './views/FormElementsView';
import { EditorsView } from './views/EditorsView';
import { PopupsView } from './views/PopupsView';
import { NotificationsView } from './views/NotificationsView';
import { IconsView } from './views/IconsView';
import { MapsView } from './views/MapsView';
import { UserPagesView } from './views/UserPagesView';
import { ErrorPagesView } from './views/ErrorPagesView';
import { GeneralPagesView } from './views/GeneralPagesView';
import { GalleryView } from './views/GalleryView';
import { DocumentationView } from './views/DocumentationView';

const STORAGE_KEY_DEALS = 'lector_dashboard_deals_v1';
const STORAGE_KEY_ACTIVITIES = 'lector_dashboard_activities_v1';

export const DashboardLayout: React.FC = () => {
  const [activeNav, setActiveNav] = useState<NavItemId>('Dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedPeriod, setSelectedPeriod] = useState<ReportingPeriod>('Monthly');
  const [showingLastMonth, setShowingLastMonth] = useState(false);

  const [deals, setDeals] = useState<DealRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DEALS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_DEALS;
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_ACTIVITIES;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<DealRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DEALS, JSON.stringify(deals));
    } catch {
      // ignore
    }
  }, [deals]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(activities));
    } catch {
      // ignore
    }
  }, [activities]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const handleToggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileMenuOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  const handleSaveDeal = (input: DealFormInput, editingId?: string) => {
    const numericPrice = Number(input.price);
    if (editingId) {
      setDeals((prev) =>
        prev.map((d) =>
          d.id === editingId
            ? {
                ...d,
                invoice: input.invoice.trim(),
                customer: input.customer.trim(),
                from: input.from.trim(),
                price: numericPrice,
                status: input.status,
              }
            : d
        )
      );
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          title: 'Deal Updated',
          person: 'Rachel',
          actionText: `Updated ${input.customer.trim()}`,
          subtitle: `Rachel Updated ${input.customer.trim()}`,
          timeAgo: 'Just Now',
          color: 'pink',
        },
        ...prev.slice(0, 4),
      ]);
      showToast(`Updated deal for ${input.customer.trim()}`);
    } else {
      const newDeal: DealRecord = {
        id: `deal-${Date.now()}`,
        invoice: input.invoice.trim(),
        customer: input.customer.trim(),
        from: input.from.trim(),
        price: numericPrice,
        status: input.status,
      };
      setDeals((prev) => [newDeal, ...prev]);
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          title: 'Deal Added',
          person: 'Patrick',
          actionText: 'Submitted a Deal',
          subtitle: 'Patrick Submitted a Deal',
          timeAgo: 'Just Now',
          color: 'purple',
        },
        ...prev.slice(0, 4),
      ]);
      showToast(`Added new deal for ${input.customer.trim()}`);
    }
    setIsModalOpen(false);
    setEditingDeal(null);
  };

  const handleDeleteDeal = (dealId: string) => {
    const target = deals.find((d) => d.id === dealId);
    setDeals((prev) => prev.filter((d) => d.id !== dealId));
    if (target) {
      showToast(`Deleted deal record for ${target.customer}`);
    }
  };

  const handleExportCsv = () => {
    const header = 'Invoice,Customer,From,Price,Status\n';
    const rows = deals
      .map((d) => `${d.invoice},"${d.customer}","${d.from}",${d.price},${d.status}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'lector-deals-status.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Exported deals table to CSV');
  };

  const handleMarkAllRead = (type: 'alert' | 'message') => {
    setNotifications((prev) =>
      prev.map((n) => (n.type === type ? { ...n, unread: false } : n))
    );
    showToast(`Marked all ${type === 'alert' ? 'notifications' : 'messages'} as read`);
  };

  const handleProfileOption = (option: string) => {
    if (option === 'Workspace Settings') {
      setDeals(INITIAL_DEALS);
      setActivities(INITIAL_ACTIVITIES);
      localStorage.removeItem(STORAGE_KEY_DEALS);
      localStorage.removeItem(STORAGE_KEY_ACTIVITIES);
      showToast('Demo records restored to initial state');
    } else if (option === 'Export Analytics Report') {
      handleExportCsv();
    } else {
      showToast(`${option} selected`);
    }
  };

  const currentAnalytics = PERIOD_ANALYTICS_MAP[selectedPeriod];

  return (
    <div className="min-h-screen w-full bg-[#F7F8FB] flex">
      {/* Left Vertical Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onSelectNav={(item) => setActiveNav(item)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Right Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F7F8FB]">
        {/* Horizontal Top Navigation Bar */}
        <TopNavbar
          onToggleSidebar={handleToggleSidebar}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onSelectProfileOption={handleProfileOption}
        />

        {/* Toast Feedback Banner */}
        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-5 right-5 z-50 bg-[#293548] text-white px-4 py-2.5 rounded-lg shadow-lg text-xs font-medium flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#4AD962] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Content Body */}
        <main className="flex-1 p-4 lg:p-6 space-y-4 overflow-x-hidden">
          {activeNav === 'Dashboard' ? (
            <>
              {/* ROW 1: Dashboard Overview (Left ~68%) + Traffic Donut Card (Right ~32%) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                <div className="lg:col-span-8">
                  <DashboardOverview
                    analytics={currentAnalytics}
                    selectedPeriod={selectedPeriod}
                    onSelectPeriod={(p) => setSelectedPeriod(p)}
                    showingLastMonth={showingLastMonth}
                    onToggleLastMonth={() => setShowingLastMonth((prev) => !prev)}
                  />
                </div>
                <div className="lg:col-span-4">
                  <TrafficDonutChart segments={TRAFFIC_SEGMENTS} />
                </div>
              </div>

              {/* ROW 2: Four Colorful Gradient Metric Cards */}
              <MetricCardsRow />

              {/* ROW 3: Recent Activities (Left ~34%) + Deals Status Table (Right ~66%) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                <div className="lg:col-span-4">
                  <RecentActivities activities={activities} />
                </div>
                <div className="lg:col-span-8">
                  <DealsTable
                    deals={deals}
                    onOpenAddModal={() => {
                      setEditingDeal(null);
                      setIsModalOpen(true);
                    }}
                    onOpenEditModal={(deal) => {
                      setEditingDeal(deal);
                      setIsModalOpen(true);
                    }}
                    onDeleteDeal={handleDeleteDeal}
                    onExportCsv={handleExportCsv}
                  />
                </div>
              </div>
            </>
          ) : activeNav === 'Widgets' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs">
                <div>
                  <h1 className="text-sm font-bold text-[#303744]">Widgets Overview</h1>
                  <p className="text-xs text-[#89909C]">
                    KPI metric widgets and activity timeline components
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNav('Dashboard')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EC388A] text-white text-xs font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
                </button>
              </div>
              <MetricCardsRow />
              <RecentActivities activities={activities} />
            </div>
          ) : activeNav === 'Charts' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs">
                <div>
                  <h1 className="text-sm font-bold text-[#303744]">Interactive Charts</h1>
                  <p className="text-xs text-[#89909C]">
                    Multi-series revenue area analytics and traffic distribution
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNav('Dashboard')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EC388A] text-white text-xs font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                <div className="lg:col-span-8">
                  <DashboardOverview
                    analytics={currentAnalytics}
                    selectedPeriod={selectedPeriod}
                    onSelectPeriod={(p) => setSelectedPeriod(p)}
                    showingLastMonth={showingLastMonth}
                    onToggleLastMonth={() => setShowingLastMonth((prev) => !prev)}
                  />
                </div>
                <div className="lg:col-span-4">
                  <TrafficDonutChart segments={TRAFFIC_SEGMENTS} />
                </div>
              </div>
            </div>
          ) : activeNav === 'Tables' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs">
                <div>
                  <h1 className="text-sm font-bold text-[#303744]">Deals Data Table</h1>
                  <p className="text-xs text-[#89909C]">
                    Manage customer invoices, statuses, and deal records
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNav('Dashboard')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EC388A] text-white text-xs font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
                </button>
              </div>
              <DealsTable
                deals={deals}
                onOpenAddModal={() => {
                  setEditingDeal(null);
                  setIsModalOpen(true);
                }}
                onOpenEditModal={(deal) => {
                  setEditingDeal(deal);
                  setIsModalOpen(true);
                }}
                onDeleteDeal={handleDeleteDeal}
                onExportCsv={handleExportCsv}
              />
            </div>
          ) : activeNav === 'UI Elements' ? (
            <UIElementsView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'Advanced UI' ? (
            <AdvancedUIView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'Form Elements' ? (
            <FormElementsView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'Editors' ? (
            <EditorsView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'Popups' ? (
            <PopupsView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'Notifications' ? (
            <NotificationsView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'Icons' ? (
            <IconsView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'Maps' ? (
            <MapsView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'User Pages' ? (
            <UserPagesView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'Error Pages' ? (
            <ErrorPagesView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'General Pages' ? (
            <GeneralPagesView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'E-Commerce' ? (
            <EcommerceView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'Email' ? (
            <EmailView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'Calendar' ? (
            <CalendarView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'Todo List' ? (
            <TodoView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'Gallery' ? (
            <GalleryView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : activeNav === 'Documentation' ? (
            <DocumentationView onBackToDashboard={() => setActiveNav('Dashboard')} />
          ) : (
            <div className="bg-white rounded-lg border border-[#EDF0F4] p-10 text-center max-w-lg mx-auto my-8 shadow-xs">
              <div className="w-11 h-11 rounded-full bg-[#FDF2F7] text-[#E83E8C] flex items-center justify-center mx-auto mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h1 className="text-base font-bold text-[#303744]">
                {activeNav} Module
              </h1>
              <p className="text-xs text-[#89909C] mt-1.5 leading-relaxed">
                The <strong>{activeNav}</strong> workspace module is active. Return to the main Dashboard to explore live analytics, traffic charts, and deal records.
              </p>
              <div className="mt-5 flex items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveNav('Dashboard')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Deal Modal */}
      <DealFormModal
        isOpen={isModalOpen}
        editingDeal={editingDeal}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDeal(null);
        }}
        onSave={handleSaveDeal}
      />
    </div>
  );
};
