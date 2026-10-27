import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  DealFormInput,
  DealFormValidationErrors,
  DealRecord,
  DealStatus,
} from '../types/dashboard';
import { validateDealForm } from '../utils/dashboardLogic';

interface DealFormModalProps {
  isOpen: boolean;
  editingDeal: DealRecord | null;
  onClose: () => void;
  onSave: (input: DealFormInput, editingId?: string) => void;
}

const STATUS_OPTIONS: DealStatus[] = [
  'Process',
  'Open',
  'On Hold',
  'Pending',
  'Done',
];

export const DealFormModal: React.FC<DealFormModalProps> = ({
  isOpen,
  editingDeal,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState<DealFormInput>({
    invoice: '12394',
    customer: '',
    from: '',
    price: '',
    status: 'Process',
  });
  const [errors, setErrors] = useState<DealFormValidationErrors>({});

  useEffect(() => {
    if (editingDeal) {
      setForm({
        invoice: editingDeal.invoice,
        customer: editingDeal.customer,
        from: editingDeal.from,
        price: String(editingDeal.price),
        status: editingDeal.status,
      });
    } else {
      setForm({
        invoice: '12394',
        customer: '',
        from: '',
        price: '',
        status: 'Process',
      });
    }
    setErrors({});
  }, [editingDeal, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateDealForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(form, editingDeal?.id);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="deal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[1px]"
    >
      <div className="bg-white rounded-xl border border-[#EDF0F4] shadow-xl w-full max-w-md overflow-hidden">
        {/* Modal Header */}
        <div
          className="px-5 py-3.5 flex items-center justify-between text-white"
          style={{
            background: 'linear-gradient(90deg, #EC388A 0%, #8349C6 100%)',
          }}
        >
          <h2 id="deal-modal-title" className="text-sm font-bold">
            {editingDeal ? 'Edit Deal Record' : 'Add New Deal'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-5 space-y-3.5">
          <div>
            <label
              htmlFor="deal-invoice"
              className="block text-xs font-semibold text-[#303744] mb-1"
            >
              Invoice Number
            </label>
            <input
              id="deal-invoice"
              type="text"
              value={form.invoice}
              onChange={(e) => {
                setForm({ ...form, invoice: e.target.value });
                if (errors.invoice) setErrors({ ...errors, invoice: undefined });
              }}
              placeholder="e.g. 12386"
              className="w-full px-3 py-2 rounded-md border border-[#DCE1EA] text-xs text-[#303744] focus:border-[#E83E8C] focus:outline-none tabular-nums"
            />
            {errors.invoice && (
              <p className="text-[11px] text-[#DC2626] mt-1">{errors.invoice}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="deal-customer"
              className="block text-xs font-semibold text-[#303744] mb-1"
            >
              Customer Name
            </label>
            <input
              id="deal-customer"
              type="text"
              value={form.customer}
              onChange={(e) => {
                setForm({ ...form, customer: e.target.value });
                if (errors.customer) setErrors({ ...errors, customer: undefined });
              }}
              placeholder="e.g. Charly Dues"
              className="w-full px-3 py-2 rounded-md border border-[#DCE1EA] text-xs text-[#303744] focus:border-[#E83E8C] focus:outline-none"
            />
            {errors.customer && (
              <p className="text-[11px] text-[#DC2626] mt-1">{errors.customer}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="deal-from"
                className="block text-xs font-semibold text-[#303744] mb-1"
              >
                Country / From
              </label>
              <input
                id="deal-from"
                type="text"
                value={form.from}
                onChange={(e) => {
                  setForm({ ...form, from: e.target.value });
                  if (errors.from) setErrors({ ...errors, from: undefined });
                }}
                placeholder="e.g. Brazil"
                className="w-full px-3 py-2 rounded-md border border-[#DCE1EA] text-xs text-[#303744] focus:border-[#E83E8C] focus:outline-none"
              />
              {errors.from && (
                <p className="text-[11px] text-[#DC2626] mt-1">{errors.from}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="deal-price"
                className="block text-xs font-semibold text-[#303744] mb-1"
              >
                Price (USD)
              </label>
              <input
                id="deal-price"
                type="number"
                min="1"
                step="1"
                value={form.price}
                onChange={(e) => {
                  setForm({ ...form, price: e.target.value });
                  if (errors.price) setErrors({ ...errors, price: undefined });
                }}
                placeholder="e.g. 299"
                className="w-full px-3 py-2 rounded-md border border-[#DCE1EA] text-xs text-[#303744] focus:border-[#E83E8C] focus:outline-none tabular-nums"
              />
              {errors.price && (
                <p className="text-[11px] text-[#DC2626] mt-1">{errors.price}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="deal-status"
              className="block text-xs font-semibold text-[#303744] mb-1"
            >
              Deal Status
            </label>
            <select
              id="deal-status"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as DealStatus })
              }
              className="w-full px-3 py-2 rounded-md border border-[#DCE1EA] text-xs text-[#303744] focus:border-[#E83E8C] focus:outline-none bg-white"
            >
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#EDF0F4]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-md border border-[#DCE1EA] text-xs font-medium text-[#5A6270] hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#EC388A] hover:bg-[#D9307E] text-xs font-semibold text-white shadow-xs"
            >
              {editingDeal ? 'Save Changes' : 'Add Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
