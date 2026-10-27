import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Users,
  Lock,
  KeyRound,
  ShieldCheck,
  Mail,
  Phone,
  Plus,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  LogOut,
} from 'lucide-react';

interface UserPagesViewProps {
  onBackToDashboard: () => void;
  onNavigateToGeneralProfile?: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Revenue Director' | 'Operations Lead' | 'Security Auditor';
  status: 'Active' | 'Pending' | 'Offline';
  phone: string;
  avatarColor: string;
  lastActive: string;
}

const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'usr-1',
    name: 'Rachel Adams',
    email: 'rachel.adams@lector-analytics.com',
    role: 'Revenue Director',
    status: 'Active',
    phone: '+1 (555) 382-9012',
    avatarColor: '#EC388A',
    lastActive: 'Now (Online)',
  },
  {
    id: 'usr-2',
    name: 'Patrick Taylor',
    email: 'patrick.t@lector-analytics.com',
    role: 'Super Admin',
    status: 'Active',
    phone: '+1 (555) 492-1102',
    avatarColor: '#8052C7',
    lastActive: '12 mins ago',
  },
  {
    id: 'usr-3',
    name: 'Jonathan Vance',
    email: 'j.vance@lector-analytics.com',
    role: 'Operations Lead',
    status: 'Active',
    phone: '+1 (555) 782-4411',
    avatarColor: '#38B9DF',
    lastActive: '1 hour ago',
  },
  {
    id: 'usr-4',
    name: 'Elena Rostova',
    email: 'elena.r@lector-analytics.com',
    role: 'Security Auditor',
    status: 'Pending',
    phone: '+1 (555) 291-7789',
    avatarColor: '#FFA62B',
    lastActive: 'Yesterday',
  },
];

export const UserPagesView: React.FC<UserPagesViewProps> = ({
  onBackToDashboard,
  onNavigateToGeneralProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'roster' | 'login' | 'forgot' | 'lockscreen'>('roster');
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<TeamMember['role']>('Operations Lead');

  // Preview form states
  const [loginEmail, setLoginEmail] = useState('admin@lector-analytics.com');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState('');
  const [unlockedSuccess, setUnlockedSuccess] = useState(false);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;
    const member: TeamMember = {
      id: `usr-${Date.now()}`,
      name: newMemberName.trim(),
      email: newMemberEmail.trim(),
      role: newMemberRole,
      status: 'Active',
      phone: '+1 (555) 000-1234',
      avatarColor: '#EC388A',
      lastActive: 'Just now',
    };
    setTeam([...team, member]);
    setNewMemberName('');
    setNewMemberEmail('');
    setShowAddMember(false);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white p-4 lg:p-5 rounded-lg border border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-[#89909C] mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#EC388A] font-semibold">User Pages</span>
          </div>
          <h1 className="text-base font-bold text-[#303744]">User Directory & Authentication Hub</h1>
          <p className="text-xs text-[#89909C] mt-0.5">
            Admin access management, team roster directory, and integrated authentication view templates.
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

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EDF0F4] pb-2 overflow-x-auto">
        {[
          { id: 'roster', label: 'Team Directory & Access', icon: Users },
          { id: 'login', label: 'Login Screen Template', icon: User },
          { id: 'forgot', label: 'Forgot Password Flow', icon: KeyRound },
          { id: 'lockscreen', label: 'Lockscreen Security View', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2 rounded-md text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#EC388A] text-white shadow-xs'
                  : 'bg-white border border-[#EDF0F4] text-[#5A6270] hover:bg-[#FAFBFD]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: TEAM ROSTER & ACCESS DIRECTORY */}
      {activeTab === 'roster' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-sm font-bold text-[#303744]">Authenticated Workspace Operators</h2>
                <p className="text-xs text-[#89909C]">
                  Role-based access control enabled for all administrators.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddMember(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EC388A] text-white text-xs font-semibold hover:bg-[#D9307E] transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Administrator
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#293548] text-white text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-2.5 pl-4 pr-2 rounded-l-md">Operator Name</th>
                    <th className="py-2.5 px-2">Role</th>
                    <th className="py-2.5 px-2">Contact</th>
                    <th className="py-2.5 px-2">Last Active</th>
                    <th className="py-2.5 pl-2 pr-4 rounded-r-md">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F5F9]">
                  {team.map((member) => (
                    <tr key={member.id} className="hover:bg-[#FAFBFD] transition-colors">
                      <td className="py-3 pl-4 pr-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs"
                            style={{ backgroundColor: member.avatarColor }}
                          >
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-[#303744] block">{member.name}</span>
                            <span className="text-[10px] text-[#89909C]">{member.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-medium text-[#5A6270]">
                        <span className="px-2 py-0.5 rounded bg-[#F3F5F9] text-[#5A6270] font-semibold text-[10px]">
                          {member.role}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-[#89909C] tabular-nums">
                        {member.phone}
                      </td>
                      <td className="py-3 px-2 text-[#5A6270] tabular-nums">
                        {member.lastActive}
                      </td>
                      <td className="py-3 pl-2 pr-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            member.status === 'Active'
                              ? 'bg-[#E8F8EB] text-[#16882C]'
                              : 'bg-[#FFF8EB] text-[#B87000]'
                          }`}
                        >
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LOGIN SCREEN TEMPLATE */}
      {activeTab === 'login' && (
        <div className="max-w-md mx-auto bg-white p-7 rounded-xl border border-[#EDF0F4] shadow-md space-y-4">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#0c0624] p-1.5 mx-auto mb-2 flex items-center justify-center">
              <img
                src="/assets/aistudio/Glossy_Lector_Tech_Logo_387f5f41.png"
                alt="Lector"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-base font-bold text-[#303744]">Sign In to Lector</h2>
            <p className="text-xs text-[#89909C]">Enter your corporate credentials to continue</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">Email Address</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] focus:border-[#EC388A] focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-[#5A6270]">Password</label>
                <button
                  type="button"
                  onClick={() => setActiveTab('forgot')}
                  className="text-[11px] text-[#EC388A] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] focus:border-[#EC388A] focus:outline-none pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#89909C] hover:text-[#303744]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={onBackToDashboard}
              className="w-full py-2.5 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: FORGOT PASSWORD FLOW */}
      {activeTab === 'forgot' && (
        <div className="max-w-md mx-auto bg-white p-7 rounded-xl border border-[#EDF0F4] shadow-md space-y-4">
          <div className="text-center space-y-1">
            <div className="w-10 h-10 rounded-full bg-[#FDF2F7] text-[#EC388A] flex items-center justify-center mx-auto mb-2">
              <KeyRound className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#303744]">Reset Your Password</h2>
            <p className="text-xs text-[#89909C]">
              We will send a secure one-time recovery token to your registered email
            </p>
          </div>

          {forgotSent ? (
            <div className="p-4 rounded-lg bg-[#E8F8EB] text-[#16882C] text-xs text-center space-y-2">
              <CheckCircle2 className="w-6 h-6 mx-auto text-[#4AD962]" />
              <p className="font-bold">Recovery Instructions Sent</p>
              <p className="text-[11px] text-[#5A6270]">
                Check your inbox at <strong>{forgotEmail || 'admin@lector.com'}</strong> for password reset link.
              </p>
              <button
                type="button"
                onClick={() => setForgotSent(false)}
                className="mt-2 text-[11px] text-[#EC388A] font-semibold underline block mx-auto"
              >
                Send again
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (forgotEmail.trim()) setForgotSent(true);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                  Registered Work Email
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="rachel.adams@lector.com"
                  required
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] focus:border-[#EC388A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Send Reset Link
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="w-full text-center text-xs text-[#89909C] hover:text-[#EC388A] pt-1 block"
              >
                Back to Sign In
              </button>
            </form>
          )}
        </div>
      )}

      {/* TAB 4: LOCKSCREEN SECURITY VIEW */}
      {activeTab === 'lockscreen' && (
        <div className="max-w-md mx-auto bg-white p-7 rounded-xl border border-[#EDF0F4] shadow-md space-y-4 text-center">
          <div className="relative w-16 h-16 rounded-full bg-[#EC388A] text-white flex items-center justify-center font-bold text-xl mx-auto ring-4 ring-[#FDF2F7]">
            RA
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#293548] text-white flex items-center justify-center">
              <Lock className="w-3 h-3" />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#303744]">Rachel Adams</h2>
            <p className="text-xs text-[#89909C]">Revenue Director (Locked Session)</p>
          </div>

          {unlockedSuccess ? (
            <div className="p-3 bg-[#E8F8EB] text-[#16882C] rounded-lg text-xs font-bold">
              ✓ Session Unlocked! Returning to active dashboard...
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setUnlockedSuccess(true);
                setTimeout(() => {
                  onBackToDashboard();
                }, 1000);
              }}
              className="space-y-3"
            >
              <div>
                <input
                  type="password"
                  value={unlockPassword}
                  onChange={(e) => setUnlockPassword(e.target.value)}
                  placeholder="Enter PIN or password to unlock"
                  required
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] text-center focus:border-[#EC388A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-md bg-[#293548] hover:bg-[#1C2533] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Unlock Session
              </button>
            </form>
          )}
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[1px]">
          <div className="bg-white rounded-xl shadow-xl border border-[#EDF0F4] max-w-sm w-full p-5">
            <h3 className="text-sm font-bold text-[#303744] mb-3">Add Team Administrator</h3>
            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">Full Name *</label>
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Liam Henderson"
                  required
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] focus:border-[#EC388A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">Corporate Email *</label>
                <input
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="liam.h@lector.com"
                  required
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] focus:border-[#EC388A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">Role Permission</label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value as TeamMember['role'])}
                  className="w-full px-3 py-2 text-xs rounded-md border border-[#DCE1EA] bg-white focus:outline-none"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Revenue Director">Revenue Director</option>
                  <option value="Operations Lead">Operations Lead</option>
                  <option value="Security Auditor">Security Auditor</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EDF0F4]">
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="px-3 py-1.5 rounded-md border border-[#DCE1EA] text-xs font-semibold text-[#5A6270]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-md bg-[#EC388A] text-white text-xs font-semibold"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
