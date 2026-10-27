import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Settings,
  Bell,
  HelpCircle,
  Clock,
  FileCode,
  Save,
  CheckCircle2,
  Shield,
  Key,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Copy,
  Plus,
  RefreshCw,
} from 'lucide-react';

interface GeneralPagesViewProps {
  onBackToDashboard: () => void;
}

type GeneralTabId = 'profile' | 'account' | 'notifications' | 'faq' | 'timeline' | 'blank';

export const GeneralPagesView: React.FC<GeneralPagesViewProps> = ({ onBackToDashboard }) => {
  const [activeTab, setActiveTab] = useState<GeneralTabId>('profile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Form State
  const [profile, setProfile] = useState({
    firstName: 'Nikolai',
    lastName: 'Vane',
    email: 'nikolai.vane@lector.io',
    role: 'Lead Business Analyst',
    department: 'Revenue & Operations',
    bio: 'Overseeing global deal flows, traffic attribution models, and conversion funnel analytics across EMEA & APAC regions.',
    phone: '+1 (555) 234-8901',
    timezone: 'UTC-05:00 Eastern Time',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  });

  // Account Settings State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [ipRestricted, setIpRestricted] = useState(false);

  // Notification Preferences State
  const [notifyPreferences, setNotifyPreferences] = useState({
    emailDeals: true,
    emailWeeklyDigest: true,
    pushHighValueAlert: true,
    pushTeamMentions: false,
    smsSecurityAlerts: true,
    browserSound: true,
  });

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');

  // Blank Page Code Copy State
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const notify = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    notify('Profile changes successfully updated!');
  };

  const handleAccountSave = (e: React.FormEvent) => {
    e.preventDefault();
    notify('Security preferences and session rules updated!');
  };

  const handleCopyBlankTemplate = () => {
    const code = `import React from 'react';\n\nexport const CustomModule: React.FC = () => {\n  return (\n    <div className="bg-white p-6 rounded-lg border border-[#EDF0F4] shadow-xs">\n      <h1 className="text-base font-bold text-[#303744]">Custom Workspace Module</h1>\n      <p className="text-xs text-[#89909C] mt-1">Start building your application workflow here.</p>\n    </div>\n  );\n};\n`;
    navigator.clipboard.writeText(code);
    setCopiedTemplate(true);
    notify('Starter template JSX copied to clipboard');
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const FAQS = [
    {
      q: 'How does Lector calculate Current Month Earnings?',
      a: 'Earnings represent verified completed invoices and realized contract payments captured during the active billing period (1st of the month through the present date), adjusted for regional currency conversions and transaction fees.',
    },
    {
      q: 'How do I add a new enterprise operator with custom permissions?',
      a: 'Navigate to the "User Pages" section from the sidebar and click "+ Add Team Member". Assign role designations (Super Admin, Senior Analyst, or Viewer) to restrict or permit deals modification.',
    },
    {
      q: 'Can deal records be exported to CSV or third-party reporting tools?',
      a: 'Yes. In the Deals Status table or within the Charts & Widgets view, click the "Export CSV" button to download complete tabular records including customer name, origin country, amount, and timestamp.',
    },
    {
      q: 'Where are notification and toast position configurations stored?',
      a: 'Toast anchors, sound settings, and dismiss timeouts can be fine-tuned in the "Notifications" module and "General Pages > Notification Preferences".',
    },
    {
      q: 'Is my dashboard data saved across browser reloads?',
      a: 'Yes! Added deals, status modifications, and activity log entries are persisted directly to your browser localStorage and IndexedDB caches for seamless continuity.',
    },
  ];

  const filteredFaqs = FAQS.filter(
    (item) =>
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

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
            <h1 className="text-sm font-bold text-[#303744]">General Pages & System Settings</h1>
          </div>
          <p className="text-xs text-[#89909C] mt-0.5">
            Operator profile, workspace security policies, notification dispatch rules, and system FAQ
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

      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-2 rounded-lg border border-[#EDF0F4] shadow-xs">
        {[
          { id: 'profile', label: 'User Profile & Bio', icon: User },
          { id: 'account', label: 'Account & Security', icon: Shield },
          { id: 'notifications', label: 'Notification Settings', icon: Bell },
          { id: 'faq', label: 'Help Center & FAQ', icon: HelpCircle },
          { id: 'timeline', label: 'Activity Timeline', icon: Clock },
          { id: 'blank', label: 'Blank Page Scaffold', icon: FileCode },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as GeneralTabId)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#EC388A] text-white shadow-xs'
                  : 'text-[#5A6270] hover:bg-[#F7F8FB] hover:text-[#303744]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content 1: User Profile */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Profile Overview Card */}
          <div className="lg:col-span-4 bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5 text-center">
            <div className="relative inline-block mx-auto mb-3">
              <img
                src={profile.avatarUrl}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#FDF2F7] shadow-sm"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#4AD962] border-2 border-white rounded-full" />
            </div>
            <h2 className="text-base font-bold text-[#303744]">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-xs text-[#EC388A] font-semibold mt-0.5">{profile.role}</p>
            <p className="text-[11px] text-[#89909C] mt-1">{profile.department}</p>

            <div className="mt-4 pt-4 border-t border-[#EDF0F4] grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-sm font-bold text-[#303744]">142</div>
                <div className="text-[10px] text-[#89909C]">Deals Closed</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#8052C7]">$842k</div>
                <div className="text-[10px] text-[#89909C]">Revenue</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#38B9DF]">99.4%</div>
                <div className="text-[10px] text-[#89909C]">KPI Score</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#EDF0F4] text-left">
              <span className="text-[11px] font-bold text-[#303744] block mb-1">Bio Summary</span>
              <p className="text-xs text-[#5A6270] leading-relaxed">{profile.bio}</p>
            </div>
          </div>

          {/* Right Edit Form */}
          <div className="lg:col-span-8 bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5">
            <h2 className="text-sm font-bold text-[#303744] mb-3">Edit Personal Information</h2>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-md border border-[#EDF0F4] bg-[#F7F8FB] focus:bg-white focus:border-[#EC388A] outline-none text-[#303744]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-md border border-[#EDF0F4] bg-[#F7F8FB] focus:bg-white focus:border-[#EC388A] outline-none text-[#303744]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-md border border-[#EDF0F4] bg-[#F7F8FB] focus:bg-white focus:border-[#EC388A] outline-none text-[#303744]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                    Direct Phone
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-md border border-[#EDF0F4] bg-[#F7F8FB] focus:bg-white focus:border-[#EC388A] outline-none text-[#303744]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-md border border-[#EDF0F4] bg-[#F7F8FB] focus:bg-white focus:border-[#EC388A] outline-none text-[#303744]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                    Timezone
                  </label>
                  <select
                    value={profile.timezone}
                    onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-md border border-[#EDF0F4] bg-[#F7F8FB] focus:bg-white focus:border-[#EC388A] outline-none text-[#303744]"
                  >
                    <option value="UTC-08:00 Pacific Time">UTC-08:00 Pacific Time</option>
                    <option value="UTC-05:00 Eastern Time">UTC-05:00 Eastern Time</option>
                    <option value="UTC+00:00 London GMT">UTC+00:00 London GMT</option>
                    <option value="UTC+01:00 Berlin CET">UTC+01:00 Berlin CET</option>
                    <option value="UTC+09:00 Tokyo JST">UTC+09:00 Tokyo JST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                  Professional Bio
                </label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-md border border-[#EDF0F4] bg-[#F7F8FB] focus:bg-white focus:border-[#EC388A] outline-none text-[#303744] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => notify('Form changes reverted')}
                  className="px-3.5 py-2 rounded-md border border-[#EDF0F4] text-xs font-medium text-[#5A6270] hover:bg-[#F7F8FB] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab Content 2: Account & Security */}
      {activeTab === 'account' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5 space-y-5">
            <div>
              <h2 className="text-sm font-bold text-[#303744]">Security & Authentication Rules</h2>
              <p className="text-xs text-[#89909C] mt-0.5">
                Protect administrative access to financial records and sensitive customer invoices
              </p>
            </div>

            <form onSubmit={handleAccountSave} className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-lg border border-[#EDF0F4] bg-[#F7F8FB]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#4AD962] flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#303744]">
                      Two-Factor Authentication (2FA)
                    </div>
                    <div className="text-[11px] text-[#89909C]">
                      Enforce TOTP authenticator challenge on all new session logins
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4AD962]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-lg border border-[#EDF0F4] bg-[#F7F8FB]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 text-[#8052C7] flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#303744]">
                      Strict IP Allowlisting
                    </div>
                    <div className="text-[11px] text-[#89909C]">
                      Restrict dashboard access exclusively to registered VPN subnets
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ipRestricted}
                    onChange={(e) => setIpRestricted(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8052C7]"></div>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                  Automatic Inactive Session Timeout
                </label>
                <select
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-md border border-[#EDF0F4] bg-[#F7F8FB] focus:bg-white focus:border-[#EC388A] outline-none text-[#303744]"
                >
                  <option value="15">15 Minutes of inactivity</option>
                  <option value="30">30 Minutes of inactivity (Default)</option>
                  <option value="60">60 Minutes of inactivity</option>
                  <option value="240">4 Hours of inactivity</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#293548] hover:bg-[#1E2734] text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  Update Security Policies
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-4 bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5">
            <h3 className="text-xs font-bold text-[#303744] mb-3">Active Workspace Sessions</h3>
            <div className="space-y-3">
              {[
                { device: 'MacBook Pro (Chrome)', ip: '192.168.1.14', location: 'San Francisco, US', current: true },
                { device: 'iPhone 15 Pro (Safari)', ip: '172.56.21.99', location: 'San Jose, US', current: false },
                { device: 'Workstation ThinkPad', ip: '10.0.4.118', location: 'New York, US', current: false },
              ].map((sess, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-[#EDF0F4] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#303744]">{sess.device}</span>
                    {sess.current ? (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Current
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => notify(`Revoked session on ${sess.device}`)}
                        className="text-[10px] font-semibold text-rose-500 hover:underline cursor-pointer"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                  <div className="text-[10px] text-[#89909C] mt-1">
                    {sess.ip} • {sess.location}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Notification Preferences */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5 space-y-4 max-w-3xl">
          <div>
            <h2 className="text-sm font-bold text-[#303744]">Notification Channels & Alerts</h2>
            <p className="text-xs text-[#89909C] mt-0.5">
              Specify when Lector should ping your email, mobile device, or browser notification tray
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              {
                id: 'emailDeals',
                title: 'High-Value Deal Confirmations',
                desc: 'Receive instant email confirmation when a deal exceeds $5,000 threshold',
                checked: notifyPreferences.emailDeals,
              },
              {
                id: 'emailWeeklyDigest',
                title: 'Weekly Performance Executive Digest',
                desc: 'Consolidated report delivered every Monday morning with revenue chart trends',
                checked: notifyPreferences.emailWeeklyDigest,
              },
              {
                id: 'pushHighValueAlert',
                title: 'Real-Time Browser Toast Notifications',
                desc: 'Show on-screen badges when team members update order status',
                checked: notifyPreferences.pushHighValueAlert,
              },
              {
                id: 'smsSecurityAlerts',
                title: 'SMS Security Warnings',
                desc: 'Urgent mobile SMS if an unrecognized IP tries to sign into your account',
                checked: notifyPreferences.smsSecurityAlerts,
              },
              {
                id: 'browserSound',
                title: 'Audible Sound Effects',
                desc: 'Play a discreet chime when new inbound deals are registered',
                checked: notifyPreferences.browserSound,
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-lg border border-[#EDF0F4] hover:bg-[#F7F8FB] transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-[#303744]">{item.title}</div>
                  <div className="text-[11px] text-[#89909C]">{item.desc}</div>
                </div>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => {
                    setNotifyPreferences({
                      ...notifyPreferences,
                      [item.id]: e.target.checked,
                    });
                    notify(`Updated preference for "${item.title}"`);
                  }}
                  className="w-4 h-4 accent-[#EC388A] rounded cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: FAQ & Knowledge Base */}
      {activeTab === 'faq' && (
        <div className="bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#303744]">Frequently Asked Questions</h2>
              <p className="text-xs text-[#89909C] mt-0.5">
                Common inquiries regarding dashboard metrics, security models, and export workflows
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#89909C] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Filter questions..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-[#EDF0F4] bg-[#F7F8FB] focus:bg-white focus:border-[#EC388A] outline-none text-[#303744]"
              />
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#EDF0F4] rounded-lg overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-3.5 text-left bg-white hover:bg-[#FAFBFD] transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-bold text-[#303744] pr-4">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#EC388A] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#89909C] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-3.5 pt-0 text-xs text-[#5A6270] bg-[#FAFBFD] leading-relaxed border-t border-[#EDF0F4]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content 5: Activity Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5 space-y-4">
          <div>
            <h2 className="text-sm font-bold text-[#303744]">Comprehensive Audit Timeline</h2>
            <p className="text-xs text-[#89909C] mt-0.5">
              Live chronological stream of operator actions, status adjustments, and deals data
            </p>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#EDF0F4]">
            {[
              {
                time: '10 minutes ago',
                actor: 'Rachel Bennett',
                action: 'Modified deal record #12386',
                detail: 'Adjusted billing country from Brazil to United Kingdom and set status to "Open"',
                badge: 'Deal Modified',
                color: 'bg-[#EC388A]',
              },
              {
                time: '1 hour ago',
                actor: 'Nikolai Vane',
                action: 'Exported Monthly Revenue CSV',
                detail: 'Downloaded 20 active deal rows to lector-deals-status.csv',
                badge: 'Data Export',
                color: 'bg-[#8052C7]',
              },
              {
                time: '3 hours ago',
                actor: 'System Daemon',
                action: 'Automatic Traffic Recalculation',
                detail: 'Analyzed 42,500 inbound attribution sessions across Facebook, YouTube, and Direct search',
                badge: 'Analytics Sync',
                color: 'bg-[#38B9DF]',
              },
              {
                time: 'Yesterday at 4:30 PM',
                actor: 'Denyel Onak',
                action: 'Updated On-Hold Deal Status',
                detail: 'Flagged invoice #12384 for manual compliance verification',
                badge: 'Compliance',
                color: 'bg-[#FFA62B]',
              },
            ].map((ev, idx) => (
              <div key={idx} className="relative group">
                <span
                  className={`absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${ev.color} shadow-xs`}
                />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="text-xs font-bold text-[#303744]">
                    {ev.actor} • <span className="font-normal text-[#5A6270]">{ev.action}</span>
                  </div>
                  <span className="text-[10px] text-[#89909C]">{ev.time}</span>
                </div>
                <div className="text-[11px] text-[#89909C] mt-1 bg-[#F7F8FB] p-2.5 rounded-md border border-[#EDF0F4]">
                  {ev.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 6: Blank Page Scaffold */}
      {activeTab === 'blank' && (
        <div className="bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#FDF2F7] text-[#EC388A] flex items-center justify-center mx-auto">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#303744]">Blank Page Scaffold</h2>
            <p className="text-xs text-[#89909C] max-w-md mx-auto mt-1 leading-relaxed">
              Use this clean canvas starter template when constructing new custom business modules inside the Lector workspace.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleCopyBlankTemplate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#293548] text-white text-xs font-semibold hover:bg-[#1E2734] transition-colors cursor-pointer shadow-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              {copiedTemplate ? 'Copied Boilerplate!' : 'Copy Module JSX'}
            </button>
            <button
              type="button"
              onClick={() => notify('Starter module initialized')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-[#EDF0F4] text-[#303744] text-xs font-semibold hover:border-[#EC388A] transition-colors cursor-pointer bg-white"
            >
              <Plus className="w-3.5 h-3.5 text-[#EC388A]" />
              New Custom View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
