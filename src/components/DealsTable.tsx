import React, { useState } from 'react';
import {
  PlusCircle,
  Pencil,
  Trash2,
  Printer,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';
import {
  DealRecord,
  DealStatus,
  SortDirection,
  SortField,
} from '../types/dashboard';
import {
  filterDeals,
  paginateDeals,
  sortDeals,
} from '../utils/dashboardLogic';

interface DealsTableProps {
  deals: DealRecord[];
  onOpenAddModal: () => void;
  onOpenEditModal: (deal: DealRecord) => void;
  onDeleteDeal: (dealId: string) => void;
  onExportCsv: () => void;
}

const STATUS_BADGE_STYLES: Record<DealStatus, string> = {
  Process: 'bg-[#EA398A] text-white',
  Open: 'bg-[#7E51C8] text-white',
  'On Hold': 'bg-[#38B9DF] text-white',
  Pending: 'bg-[#FFA62B] text-white',
  Done: 'bg-[#4AD962] text-white',
};

export const DealsTable: React.FC<DealsTableProps> = ({
  deals,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteDeal,
  onExportCsv,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const pageSize = 5;

  const filtered = filterDeals(deals, appliedSearch);
  const sorted = sortDeals(filtered, sortField, sortDir);
  const { items, totalPages, safePage, startIndex, endIndex } = paginateDeals(
    sorted,
    currentPage,
    pageSize
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setAppliedSearch(value);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearch(searchInput);
    setCurrentPage(1);
  };

  const activeSelectedDeal =
    deals.find((d) => d.id === selectedDealId) || items[0] || null;

  return (
    <section
      aria-label="Deals Status Table"
      className="bg-white rounded-lg border border-[#EDF0F4] shadow-[0_2px_10px_rgba(48,55,68,0.03)] p-4 flex flex-col justify-between h-full"
    >
      <div>
        {/* Panel Title */}
        <div className="mb-2.5">
          <h2 className="text-[13px] font-bold text-[#303744]">Deals Status</h2>
          <p className="text-[10.5px] text-[#89909C] mt-0.5">
            Overview of Latest Deals
          </p>
        </div>

        {/* Action & Search Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#EC388A] hover:bg-[#D9307E] text-white text-[11px] font-semibold shadow-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Add
            </button>

            <button
              type="button"
              onClick={() => {
                if (activeSelectedDeal) onOpenEditModal(activeSelectedDeal);
              }}
              disabled={!activeSelectedDeal}
              aria-label="Edit selected deal"
              title="Edit selected deal"
              className="p-1.5 rounded bg-[#F1F3F8] hover:bg-[#E4E8F0] text-[#5A6270] disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (activeSelectedDeal) setConfirmDeleteId(activeSelectedDeal.id);
              }}
              disabled={!activeSelectedDeal}
              aria-label="Delete selected deal"
              title="Delete selected deal"
              className="p-1.5 rounded bg-[#F1F3F8] hover:bg-[#FEE2E2] hover:text-[#DC2626] text-[#5A6270] disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onExportCsv}
              aria-label="Export deals to CSV"
              title="Export deals to CSV"
              className="p-1.5 rounded bg-[#F1F3F8] hover:bg-[#E4E8F0] text-[#5A6270] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5">
            <label htmlFor="deals-search-input" className="sr-only">
              Search deals by invoice or customer
            </label>
            <input
              id="deals-search-input"
              type="search"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search"
              className="w-36 sm:w-44 px-3 py-1.5 rounded bg-[#F3F5F9] text-[11px] text-[#303744] placeholder-[#9BA2AE] border border-transparent focus:border-[#E83E8C] focus:bg-white focus:outline-none transition-colors"
            />
            <button
              type="submit"
              aria-label="Search deals"
              className="p-1.5 rounded bg-[#F1F3F8] hover:bg-[#E4E8F0] text-[#5A6270] transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Delete Confirmation Banner if triggered */}
        {confirmDeleteId && (
          <div
            role="alert"
            className="mb-3 px-3.5 py-2 rounded-md bg-[#FFF5F8] border border-[#FBCFE8] flex items-center justify-between gap-2 text-[11px]"
          >
            <span className="text-[#303744]">
              Confirm deleting deal{' '}
              <strong>
                {deals.find((d) => d.id === confirmDeleteId)?.customer}
              </strong>
              ?
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onDeleteDeal(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-2.5 py-1 rounded bg-[#EC388A] text-white font-semibold hover:bg-[#D9307E]"
              >
                Confirm Delete
              </button>
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="px-2.5 py-1 rounded bg-white border border-[#EDF0F4] text-[#5A6270] hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Responsive Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[520px]">
            <thead>
              <tr className="bg-[#293548] text-white text-[10px] font-bold uppercase tracking-wider">
                <th className="py-2.5 pl-4 pr-2 rounded-l-md">
                  <button
                    type="button"
                    onClick={() => handleSort('invoice')}
                    className="inline-flex items-center gap-1 hover:text-white/80 uppercase font-bold"
                  >
                    INVOICE
                    <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                  </button>
                </th>
                <th className="py-2.5 px-2">
                  <button
                    type="button"
                    onClick={() => handleSort('customer')}
                    className="inline-flex items-center gap-1 hover:text-white/80 uppercase font-bold"
                  >
                    CUSTOMERS
                    <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                  </button>
                </th>
                <th className="py-2.5 px-2">
                  <button
                    type="button"
                    onClick={() => handleSort('from')}
                    className="inline-flex items-center gap-1 hover:text-white/80 uppercase font-bold"
                  >
                    FROM
                    <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                  </button>
                </th>
                <th className="py-2.5 px-2">
                  <button
                    type="button"
                    onClick={() => handleSort('price')}
                    className="inline-flex items-center gap-1 hover:text-white/80 uppercase font-bold"
                  >
                    PRICE
                    <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                  </button>
                </th>
                <th className="py-2.5 pl-2 pr-4 rounded-r-md">
                  <button
                    type="button"
                    onClick={() => handleSort('status')}
                    className="inline-flex items-center gap-1 hover:text-white/80 uppercase font-bold"
                  >
                    STATUS
                    <ArrowUpDown className="w-2.5 h-2.5 opacity-60" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F5F9] text-[11px]">
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-[#89909C] text-xs"
                  >
                    No deals match "{appliedSearch}".{' '}
                    <button
                      type="button"
                      onClick={() => handleSearchChange('')}
                      className="text-[#E83E8C] font-semibold hover:underline ml-1"
                    >
                      Clear search
                    </button>
                  </td>
                </tr>
              ) : (
                items.map((deal) => {
                  const isSelected = deal.id === selectedDealId;
                  return (
                    <tr
                      key={deal.id}
                      onClick={() => setSelectedDealId(deal.id)}
                      className={`group transition-colors cursor-pointer ${
                        isSelected ? 'bg-[#FDF4F8]/70' : 'hover:bg-[#FAFBFD]'
                      }`}
                    >
                      <td className="py-2 pl-4 pr-2 font-medium text-[#5A6270] tabular-nums">
                        {deal.invoice}
                      </td>
                      <td className="py-2 px-2 font-medium text-[#5A6270]">
                        {deal.customer}
                      </td>
                      <td className="py-2 px-2 text-[#89909C]">{deal.from}</td>
                      <td className="py-2 px-2 font-semibold text-[#5A6270] tabular-nums">
                        ${deal.price}
                      </td>
                      <td className="py-2 pl-2 pr-4">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`inline-flex items-center justify-center min-w-[54px] px-2.5 py-[3px] rounded text-[10px] font-semibold leading-tight ${
                              STATUS_BADGE_STYLES[deal.status]
                            }`}
                          >
                            {deal.status}
                          </span>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenEditModal(deal);
                              }}
                              aria-label={`Edit ${deal.customer}`}
                              className="p-1 rounded hover:bg-[#EDF0F4] text-[#5A6270]"
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmDeleteId(deal.id);
                              }}
                              aria-label={`Delete ${deal.customer}`}
                              className="p-1 rounded hover:bg-[#FEE2E2] text-[#DC2626]"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer: Entry Count & Pagination */}
      <div className="pt-4 mt-2 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#89909C]">
        <div className="tabular-nums">
          Showing {startIndex} to {endIndex} of {sorted.length} entries
        </div>

        <nav aria-label="Deals table pagination" className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
            disabled={safePage <= 1}
            aria-label="Previous page"
            className="w-6 h-6 rounded-full flex items-center justify-center text-[#89909C] hover:text-[#303744] disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {[1, 2, 3, 4, 5, 6].map((pageNum) => {
            const isActive = safePage === pageNum;
            const isAvailable = pageNum <= totalPages;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => {
                  if (isAvailable) setCurrentPage(pageNum);
                }}
                aria-label={`Page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
                className={`w-6 h-6 rounded-full text-[10px] font-semibold flex items-center justify-center tabular-nums transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#EC388A] text-white shadow-xs'
                    : isAvailable
                    ? 'text-[#5A6270] hover:bg-[#F3F5F9]'
                    : 'text-[#CBD2DF] cursor-default'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
            disabled={safePage >= totalPages}
            aria-label="Next page"
            className="w-6 h-6 rounded-full flex items-center justify-center text-[#89909C] hover:text-[#303744] disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </div>
    </section>
  );
};
