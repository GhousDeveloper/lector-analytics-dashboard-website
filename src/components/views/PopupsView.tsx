import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  X,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Info,
  Maximize2,
  Trash2,
  Save,
  Image as ImageIcon,
  HelpCircle,
} from 'lucide-react';

interface PopupsViewProps {
  onBackToDashboard: () => void;
}

type ModalType =
  | 'small'
  | 'medium'
  | 'large'
  | 'fullscreen'
  | 'confirmDelete'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'form'
  | 'image'
  | null;

export const PopupsView: React.FC<PopupsViewProps> = ({ onBackToDashboard }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Admin', notify: true });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; email?: string } = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setActiveModal(null);
      setFormData({ name: '', email: '', role: 'Admin', notify: true });
      setFormErrors({});
    }, 1500);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white p-4 lg:p-5 rounded-lg border border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-[#89909C] mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#EC388A] font-semibold">Popups & Modals</span>
          </div>
          <h1 className="text-base font-bold text-[#303744]">Modal & Popup Showcase</h1>
          <p className="text-xs text-[#89909C] mt-0.5">
            Interactive modal dialogs, alert overlays, multi-sized dialogs, and form popups.
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

      {/* Main Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Category 1: Standard Modal Sizes */}
        <div className="bg-white p-5 rounded-lg border border-[#EDF0F4] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EC388A]" />
              <h2 className="text-xs font-bold text-[#303744] uppercase tracking-wider">
                Modal Sizes
              </h2>
            </div>
            <p className="text-xs text-[#89909C] mb-4">
              Responsive dialog containers formatted for small confirmations, medium cards, large reports, and full-screen viewports.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setActiveModal('small')}
              className="px-3 py-2 rounded-md border border-[#DCE1EA] text-xs font-medium text-[#303744] hover:bg-[#FDF2F7] hover:border-[#EC388A] hover:text-[#EC388A] transition-colors"
            >
              Small Modal (360px)
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('medium')}
              className="px-3 py-2 rounded-md border border-[#DCE1EA] text-xs font-medium text-[#303744] hover:bg-[#FDF2F7] hover:border-[#EC388A] hover:text-[#EC388A] transition-colors"
            >
              Medium Modal (500px)
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('large')}
              className="px-3 py-2 rounded-md border border-[#DCE1EA] text-xs font-medium text-[#303744] hover:bg-[#FDF2F7] hover:border-[#EC388A] hover:text-[#EC388A] transition-colors"
            >
              Large Modal (750px)
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('fullscreen')}
              className="px-3 py-2 rounded-md border border-[#DCE1EA] text-xs font-medium text-[#303744] hover:bg-[#FDF2F7] hover:border-[#EC388A] hover:text-[#EC388A] transition-colors"
            >
              Full Screen Modal
            </button>
          </div>
        </div>

        {/* Category 2: Status & Alert Modals */}
        <div className="bg-white p-5 rounded-lg border border-[#EDF0F4] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8052C7]" />
              <h2 className="text-xs font-bold text-[#303744] uppercase tracking-wider">
                Status Alerts & Dialogs
              </h2>
            </div>
            <p className="text-xs text-[#89909C] mb-4">
              Semantically color-coded notification modals with prominent icons and clear call-to-action buttons.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setActiveModal('success')}
              className="px-3 py-2 rounded-md bg-[#4AD962]/10 border border-[#4AD962]/30 text-[#16882C] text-xs font-semibold hover:bg-[#4AD962]/20 transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Success Modal
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('warning')}
              className="px-3 py-2 rounded-md bg-[#FFA62B]/10 border border-[#FFA62B]/30 text-[#B87000] text-xs font-semibold hover:bg-[#FFA62B]/20 transition-colors flex items-center justify-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Warning Modal
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('error')}
              className="px-3 py-2 rounded-md bg-[#DC2626]/10 border border-[#DC2626]/30 text-[#DC2626] text-xs font-semibold hover:bg-[#DC2626]/20 transition-colors flex items-center justify-center gap-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5" /> Error Modal
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('info')}
              className="px-3 py-2 rounded-md bg-[#38B9DF]/10 border border-[#38B9DF]/30 text-[#0982A3] text-xs font-semibold hover:bg-[#38B9DF]/20 transition-colors flex items-center justify-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5" /> Info Modal
            </button>
          </div>
        </div>

        {/* Category 3: Interactive Workflows */}
        <div className="bg-white p-5 rounded-lg border border-[#EDF0F4] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38B9DF]" />
              <h2 className="text-xs font-bold text-[#303744] uppercase tracking-wider">
                Workflows & Media
              </h2>
            </div>
            <p className="text-xs text-[#89909C] mb-4">
              Complex dialogs including validated user creation forms, destructive confirmation gates, and image preview popups.
            </p>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setActiveModal('form')}
              className="w-full py-2 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Open Validated Form Modal
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('confirmDelete')}
              className="w-full py-2 rounded-md bg-[#FFF5F8] border border-[#FBCFE8] hover:bg-[#FEE2E2] text-[#DC2626] text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" /> Destructive Delete Confirmation
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('image')}
              className="w-full py-2 rounded-md border border-[#DCE1EA] hover:bg-[#FAFBFD] text-[#5A6270] text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ImageIcon className="w-3.5 h-3.5" /> Media & Brand Lightbox
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation feedback status banner if delete confirmed */}
      {deleteConfirmed && (
        <div className="p-3.5 rounded-lg bg-[#FFF5F8] border border-[#FBCFE8] flex items-center justify-between text-xs text-[#DC2626]">
          <span>Record #12386 was successfully deleted from local cache.</span>
          <button
            type="button"
            onClick={() => setDeleteConfirmed(false)}
            className="text-xs font-bold underline hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* MODAL DIALOG OVERLAYS */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px] transition-opacity"
          onClick={() => setActiveModal(null)}
        >
          <div
            className={`bg-white rounded-xl shadow-2xl border border-[#EDF0F4] overflow-hidden flex flex-col transition-transform ${
              activeModal === 'small'
                ? 'max-w-sm w-full'
                : activeModal === 'medium'
                ? 'max-w-md w-full'
                : activeModal === 'large'
                ? 'max-w-2xl w-full'
                : activeModal === 'fullscreen'
                ? 'w-[95vw] h-[90vh]'
                : activeModal === 'form'
                ? 'max-w-md w-full'
                : activeModal === 'image'
                ? 'max-w-3xl w-full'
                : 'max-w-md w-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="px-5 py-3.5 flex items-center justify-between text-white shrink-0"
              style={{
                background:
                  activeModal === 'error' || activeModal === 'confirmDelete'
                    ? 'linear-gradient(90deg, #DC2626 0%, #991B1B 100%)'
                    : activeModal === 'warning'
                    ? 'linear-gradient(90deg, #FFA62B 0%, #D97706 100%)'
                    : activeModal === 'success'
                    ? 'linear-gradient(90deg, #4AD962 0%, #16A34A 100%)'
                    : 'linear-gradient(90deg, #EC388A 0%, #8349C6 100%)',
              }}
            >
              <h3 className="text-sm font-bold flex items-center gap-2">
                {activeModal === 'small' && 'Small Dialog Container'}
                {activeModal === 'medium' && 'Medium Component Dialog'}
                {activeModal === 'large' && 'Large Analytical Report Dialog'}
                {activeModal === 'fullscreen' && 'Fullscreen Viewport Dialog'}
                {activeModal === 'success' && 'Transaction Succeeded'}
                {activeModal === 'warning' && 'System Resource Warning'}
                {activeModal === 'error' && 'Execution Failed'}
                {activeModal === 'info' && 'Lector Architecture Information'}
                {activeModal === 'form' && 'Create Team Operator'}
                {activeModal === 'confirmDelete' && 'Confirm Destructive Action'}
                {activeModal === 'image' && 'Lector Visual Asset Lightbox'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 flex-1 overflow-y-auto text-xs text-[#303744] space-y-3">
              {activeModal === 'small' && (
                <div>
                  <p className="text-xs text-[#5A6270] leading-relaxed">
                    This is a compact 360px container ideal for quick confirmation prompts, notifications, single-field inputs, and status badges.
                  </p>
                </div>
              )}

              {activeModal === 'medium' && (
                <div className="space-y-2">
                  <p className="text-xs text-[#5A6270] leading-relaxed">
                    Medium dialogs (500px) balance content density with readability. They are suitable for settings forms, summary breakdowns, and quick edits.
                  </p>
                  <div className="p-3 bg-[#F7F8FB] rounded border border-[#EDF0F4] text-[11px]">
                    <strong>Tip:</strong> Press <kbd className="px-1.5 py-0.5 bg-white border border-[#DCE1EA] rounded shadow-2xs font-mono">Esc</kbd> or click outside to dismiss this overlay.
                  </div>
                </div>
              )}

              {activeModal === 'large' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#5A6270] leading-relaxed">
                    Large dialogs (750px) comfortably accommodate data grids, complex multi-column forms, audit logs, or multi-tabbed configuration views.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded bg-[#FDF2F7] border border-[#FBCFE8] text-center">
                      <span className="text-[10px] text-[#EC388A] font-bold">TOTAL CALLS</span>
                      <p className="text-base font-extrabold text-[#303744] mt-0.5 tabular-nums">42,890</p>
                    </div>
                    <div className="p-3 rounded bg-[#F3F0FA] border border-[#DDD6FE] text-center">
                      <span className="text-[10px] text-[#8052C7] font-bold">UPTIME</span>
                      <p className="text-base font-extrabold text-[#303744] mt-0.5 tabular-nums">99.98%</p>
                    </div>
                    <div className="p-3 rounded bg-[#EBF8FC] border border-[#BAE6FD] text-center">
                      <span className="text-[10px] text-[#38B9DF] font-bold">LATENCY</span>
                      <p className="text-base font-extrabold text-[#303744] mt-0.5 tabular-nums">18ms</p>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'fullscreen' && (
                <div className="space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <p className="text-xs text-[#5A6270]">
                      Fullscreen dialogs maximize the viewport area for immersive analytics, code review, file exploration, or full dataset auditing.
                    </p>
                    <div className="border border-[#EDF0F4] rounded-lg p-4 bg-[#FAFBFD] space-y-2">
                      <h4 className="font-bold text-xs text-[#303744]">Workspace Manifest</h4>
                      <p className="text-[11px] text-[#89909C]">
                        Framework: React 19 + TypeScript + Tailwind CSS + Recharts + Lucide Icons.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'success' && (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#E8F8EB] text-[#4AD962] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-[#303744]">Payment Settled</h4>
                  <p className="text-xs text-[#89909C] max-w-xs mx-auto">
                    Invoice #12386 ($2,642.00) has been cleared through the international settlement gateway.
                  </p>
                </div>
              )}

              {activeModal === 'warning' && (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#FFF8EB] text-[#FFA62B] flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-[#303744]">Bandwidth Approaching Limit</h4>
                  <p className="text-xs text-[#89909C] max-w-xs mx-auto">
                    Search traffic has reached 88% of current monthly allocation. Consider expanding network throughput.
                  </p>
                </div>
              )}

              {activeModal === 'error' && (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-[#303744]">Gateway Connection Timeout</h4>
                  <p className="text-xs text-[#89909C] max-w-xs mx-auto">
                    Failed to reach payment prober endpoint after 3 retries. Please verify SSL certificates.
                  </p>
                </div>
              )}

              {activeModal === 'info' && (
                <div className="space-y-3 py-2">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#EBF8FC] text-[#38B9DF] flex items-center justify-center shrink-0">
                      <Info className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#303744]">Lector Version 2.4-Core</h4>
                      <p className="text-xs text-[#89909C] mt-1">
                        All modules operate with reactive state synchronisation, local storage cache, and accessible keyboard navigation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'confirmDelete' && (
                <div className="text-center py-3 space-y-3">
                  <div className="w-11 h-11 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#303744]">Delete Deal Record?</h4>
                  <p className="text-xs text-[#89909C]">
                    Are you sure you want to remove this deal? This action will remove the record from your current session cache.
                  </p>
                </div>
              )}

              {activeModal === 'form' && (
                <form onSubmit={handleFormSubmit} className="space-y-3 pt-1">
                  {formSuccess ? (
                    <div className="p-3 bg-[#E8F8EB] text-[#16882C] rounded-md text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Operator successfully added!
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                          }}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-3 py-2 rounded-md border border-[#DCE1EA] text-xs text-[#303744] focus:border-[#EC388A] focus:outline-none"
                        />
                        {formErrors.name && (
                          <span className="text-[10px] text-[#DC2626] mt-0.5 block">{formErrors.name}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                          }}
                          placeholder="s.jenkins@lector-tech.com"
                          className="w-full px-3 py-2 rounded-md border border-[#DCE1EA] text-xs text-[#303744] focus:border-[#EC388A] focus:outline-none"
                        />
                        {formErrors.email && (
                          <span className="text-[10px] text-[#DC2626] mt-0.5 block">{formErrors.email}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A6270] mb-1">
                          Assigned Role
                        </label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full px-3 py-2 rounded-md border border-[#DCE1EA] text-xs text-[#303744] bg-white focus:outline-none"
                        >
                          <option value="Admin">System Administrator</option>
                          <option value="Analyst">Revenue Analyst</option>
                          <option value="Billing">Billing Operator</option>
                          <option value="Auditor">Security Auditor</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          id="notify-check"
                          type="checkbox"
                          checked={formData.notify}
                          onChange={(e) => setFormData({ ...formData, notify: e.target.checked })}
                          className="rounded text-[#EC388A] focus:ring-[#EC388A] accent-[#EC388A]"
                        />
                        <label htmlFor="notify-check" className="text-xs text-[#5A6270]">
                          Send onboarding invitation email with 2FA setup instructions
                        </label>
                      </div>
                    </>
                  )}
                </form>
              )}

              {activeModal === 'image' && (
                <div className="space-y-3">
                  <div className="rounded-lg overflow-hidden bg-[#0d0728] border border-[#231548] p-4 flex items-center justify-center">
                    <img
                      src="/assets/aistudio/Glossy_Lector_Tech_Logo_387f5f41.png"
                      alt="Glossy Lector Logo Lightbox"
                      className="max-h-72 w-auto object-contain rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#89909C]">
                    <span>Asset: Glossy_Lector_Tech_Logo.png</span>
                    <span>1691 × 930 px • High-Res Master</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="px-5 py-3 border-t border-[#EDF0F4] bg-[#FAFBFD] flex items-center justify-end gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 rounded-md border border-[#DCE1EA] text-xs font-semibold text-[#5A6270] hover:bg-white transition-colors cursor-pointer"
              >
                {activeModal === 'confirmDelete' ? 'Cancel' : 'Close'}
              </button>

              {activeModal === 'confirmDelete' && (
                <button
                  type="button"
                  onClick={() => {
                    setDeleteConfirmed(true);
                    setActiveModal(null);
                  }}
                  className="px-4 py-1.5 rounded-md bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Yes, Delete Record
                </button>
              )}

              {activeModal === 'form' && (
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  className="px-4 py-1.5 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Confirm & Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
