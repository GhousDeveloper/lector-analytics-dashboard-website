import React, { useState } from 'react';
import {
  ShoppingCart,
  TrendingUp,
  PackageCheck,
  CreditCard,
  Search,
  ArrowLeft,
  Filter,
} from 'lucide-react';

interface EcommerceViewProps {
  onBackToDashboard: () => void;
}

interface OrderItem {
  id: string;
  orderNumber: string;
  customer: string;
  product: string;
  amount: number;
  date: string;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
}

const ORDERS: OrderItem[] = [
  {
    id: 'ord-1',
    orderNumber: '#ORD-8821',
    customer: 'Sophia Loren',
    product: 'Enterprise Analytics Suite',
    amount: 1450,
    date: 'Oct 26, 2026',
    status: 'Delivered',
  },
  {
    id: 'ord-2',
    orderNumber: '#ORD-8822',
    customer: 'Liam Henderson',
    product: 'Cloud Data Sync Pro',
    amount: 620,
    date: 'Oct 26, 2026',
    status: 'Shipped',
  },
  {
    id: 'ord-3',
    orderNumber: '#ORD-8823',
    customer: 'Elena Rostova',
    product: 'Real-time Telemetry Addon',
    amount: 340,
    date: 'Oct 25, 2026',
    status: 'Processing',
  },
  {
    id: 'ord-4',
    orderNumber: '#ORD-8824',
    customer: 'Carlos Mendez',
    product: 'API Gateway Connector',
    amount: 890,
    date: 'Oct 25, 2026',
    status: 'Delivered',
  },
  {
    id: 'ord-5',
    orderNumber: '#ORD-8825',
    customer: 'Naomi Tanaka',
    product: 'Multi-User Seat Pack (10x)',
    amount: 1950,
    date: 'Oct 24, 2026',
    status: 'Delivered',
  },
  {
    id: 'ord-6',
    orderNumber: '#ORD-8826',
    customer: 'David Smith',
    product: 'Monthly Maintenance Contract',
    amount: 290,
    date: 'Oct 24, 2026',
    status: 'Cancelled',
  },
];

const ORDER_STATUS_CLASSES: Record<OrderItem['status'], string> = {
  Delivered: 'bg-[#4AD962] text-white',
  Shipped: 'bg-[#38B9DF] text-white',
  Processing: 'bg-[#FFA62B] text-white',
  Cancelled: 'bg-[#DC2626] text-white',
};

export const EcommerceView: React.FC<EcommerceViewProps> = ({
  onBackToDashboard,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredOrders = ORDERS.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <h1 className="text-sm font-bold text-[#303744]">E-Commerce & Orders</h1>
          <p className="text-xs text-[#89909C]">
            Live transaction monitoring and sales performance
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#89909C]">Total Revenue</p>
            <p className="text-lg font-bold text-[#303744] mt-1 tabular-nums">
              $54,820.00
            </p>
            <span className="text-[10px] text-[#4AD962] font-semibold">
              +14.2% vs last month
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#FDF2F7] text-[#EC388A] flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#89909C]">Total Orders</p>
            <p className="text-lg font-bold text-[#303744] mt-1 tabular-nums">
              1,248
            </p>
            <span className="text-[10px] text-[#4AD962] font-semibold">
              +8.5% new orders
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F3F0FA] text-[#8052C7] flex items-center justify-center">
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#89909C]">Delivered Packages</p>
            <p className="text-lg font-bold text-[#303744] mt-1 tabular-nums">
              1,192
            </p>
            <span className="text-[10px] text-[#38B9DF] font-semibold">
              95.5% fulfillment
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#EBF8FC] text-[#38B9DF] flex items-center justify-center">
            <PackageCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#89909C]">Avg. Order Value</p>
            <p className="text-lg font-bold text-[#303744] mt-1 tabular-nums">
              $43.92
            </p>
            <span className="text-[10px] text-[#FFA62B] font-semibold">
              +3.1% basket size
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#FFF7EB] text-[#FFA62B] flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#89909C] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders or products..."
                className="pl-8 pr-3 py-1.5 rounded-md border border-[#DCE1EA] text-xs text-[#303744] focus:border-[#EC388A] focus:outline-none w-56"
              />
            </div>

            <div className="flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#89909C]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs px-2 py-1.5 rounded-md border border-[#DCE1EA] text-[#5A6270] bg-white focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
                <option value="Processing">Processing</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <span className="text-xs text-[#89909C] tabular-nums">
            Showing {filteredOrders.length} of {ORDERS.length} orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#293548] text-white text-[10px] font-bold uppercase tracking-wider">
                <th className="py-2.5 pl-4 pr-2 rounded-l-md">Order ID</th>
                <th className="py-2.5 px-2">Customer</th>
                <th className="py-2.5 px-2">Product</th>
                <th className="py-2.5 px-2">Amount</th>
                <th className="py-2.5 px-2">Date</th>
                <th className="py-2.5 pl-2 pr-4 rounded-r-md">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F5F9]">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAFBFD] transition-colors">
                  <td className="py-2.5 pl-4 pr-2 font-medium text-[#303744] tabular-nums">
                    {ord.orderNumber}
                  </td>
                  <td className="py-2.5 px-2 font-medium text-[#5A6270]">
                    {ord.customer}
                  </td>
                  <td className="py-2.5 px-2 text-[#5A6270]">{ord.product}</td>
                  <td className="py-2.5 px-2 font-bold text-[#303744] tabular-nums">
                    ${ord.amount}
                  </td>
                  <td className="py-2.5 px-2 text-[#89909C] tabular-nums">
                    {ord.date}
                  </td>
                  <td className="py-2.5 pl-2 pr-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold leading-tight ${
                        ORDER_STATUS_CLASSES[ord.status]
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
