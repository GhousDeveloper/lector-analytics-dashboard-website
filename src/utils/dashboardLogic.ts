import {
  ActivityItem,
  DealFormInput,
  DealFormValidationErrors,
  DealRecord,
  NavItemId,
  NotificationItem,
  PeriodAnalytics,
  ReportingPeriod,
  SortDirection,
  SortField,
  TrafficSegment,
} from '../types/dashboard';

export const SIDEBAR_NAV_ITEMS: NavItemId[] = [
  'Dashboard',
  'Widgets',
  'UI Elements',
  'Advanced UI',
  'Form Elements',
  'Editors',
  'Charts',
  'Tables',
  'Popups',
  'Notifications',
  'Icons',
  'Maps',
  'User Pages',
  'Error Pages',
  'General Pages',
  'E-Commerce',
  'Email',
  'Calendar',
  'Todo List',
  'Gallery',
  'Documentation',
];

export const PERIOD_ANALYTICS_MAP: Record<ReportingPeriod, PeriodAnalytics> = {
  Monthly: {
    period: 'Monthly',
    earnings: 3468.96,
    sales: 82,
    lastMonthEarnings: 3120.45,
    lastMonthSales: 74,
    chartData: [
      { label: 'Jan', online: 0.5, store: 0.8, referral: 0.5 },
      { label: 'Feb', online: 6.5, store: 11.2, referral: 9.8 },
      { label: 'Mar', online: 15.2, store: 11.8, referral: 7.5 },
      { label: 'Apr', online: 8.8, store: 17.6, referral: 14.2 },
      { label: 'May', online: 29.5, store: 16.4, referral: 13.5 },
      { label: 'Jun', online: 1.2, store: 0.8, referral: 0.5 },
    ],
    kpis: [
      { id: 'wallet', label: 'Wallet Balance', value: '$4,567.53', color: 'pink' },
      { id: 'referral', label: 'Referral Earning', value: '$1689.53', color: 'purple' },
      { id: 'sales', label: 'Estimate Sales', value: '$2851.53', color: 'cyan' },
      { id: 'earning', label: 'Earning', value: '$52,567.53', color: 'orange' },
    ],
  },
  Daily: {
    period: 'Daily',
    earnings: 412.80,
    sales: 14,
    lastMonthEarnings: 389.20,
    lastMonthSales: 11,
    chartData: [
      { label: 'Jan', online: 4.5, store: 6.2, referral: 3.1 },
      { label: 'Feb', online: 9.2, store: 7.4, referral: 6.0 },
      { label: 'Mar', online: 11.5, store: 14.0, referral: 9.2 },
      { label: 'Apr', online: 15.4, store: 11.8, referral: 12.0 },
      { label: 'May', online: 19.0, store: 16.5, referral: 13.5 },
      { label: 'Jun', online: 22.8, store: 18.2, referral: 14.8 },
    ],
    kpis: [
      { id: 'wallet', label: 'Wallet Balance', value: '$1,240.10', color: 'pink' },
      { id: 'referral', label: 'Referral Earning', value: '$412.80', color: 'purple' },
      { id: 'sales', label: 'Estimate Sales', value: '$890.00', color: 'cyan' },
      { id: 'earning', label: 'Earning', value: '$8,420.15', color: 'orange' },
    ],
  },
  Weekly: {
    period: 'Weekly',
    earnings: 1284.50,
    sales: 31,
    lastMonthEarnings: 1150.00,
    lastMonthSales: 28,
    chartData: [
      { label: 'Jan', online: 3.8, store: 5.1, referral: 4.0 },
      { label: 'Feb', online: 8.4, store: 11.2, referral: 7.1 },
      { label: 'Mar', online: 12.6, store: 9.8, referral: 8.5 },
      { label: 'Apr', online: 10.2, store: 15.6, referral: 10.4 },
      { label: 'May', online: 17.5, store: 14.2, referral: 12.1 },
      { label: 'Jun', online: 25.0, store: 19.5, referral: 14.0 },
    ],
    kpis: [
      { id: 'wallet', label: 'Wallet Balance', value: '$2,890.40', color: 'pink' },
      { id: 'referral', label: 'Referral Earning', value: '$945.20', color: 'purple' },
      { id: 'sales', label: 'Estimate Sales', value: '$1,640.75', color: 'cyan' },
      { id: 'earning', label: 'Earning', value: '$21,340.80', color: 'orange' },
    ],
  },
  Yearly: {
    period: 'Yearly',
    earnings: 42890.75,
    sales: 984,
    lastMonthEarnings: 38450.20,
    lastMonthSales: 890,
    chartData: [
      { label: 'Jan', online: 6.0, store: 8.0, referral: 5.5 },
      { label: 'Feb', online: 12.5, store: 14.0, referral: 9.0 },
      { label: 'Mar', online: 18.2, store: 15.6, referral: 12.4 },
      { label: 'Apr', online: 14.0, store: 22.4, referral: 16.0 },
      { label: 'May', online: 21.8, store: 19.0, referral: 17.5 },
      { label: 'Jun', online: 32.4, store: 26.8, referral: 21.0 },
    ],
    kpis: [
      { id: 'wallet', label: 'Wallet Balance', value: '$54,810.36', color: 'pink' },
      { id: 'referral', label: 'Referral Earning', value: '$19,274.36', color: 'purple' },
      { id: 'sales', label: 'Estimate Sales', value: '$34,218.36', color: 'cyan' },
      { id: 'earning', label: 'Earning', value: '$630,810.36', color: 'orange' },
    ],
  },
};

export const TRAFFIC_SEGMENTS: TrafficSegment[] = [
  {
    id: 'referrals',
    name: 'Referrals',
    subLabel: 'Youtube',
    percentage: 55,
    value: 55,
    color: '#EC388A',
  },
  {
    id: 'direct',
    name: 'Direct Traffic',
    subLabel: 'Facebook',
    percentage: 33,
    value: 33,
    color: '#7E51C8',
  },
  {
    id: 'search',
    name: 'Search Traffic',
    subLabel: 'Direct Search',
    percentage: 12,
    value: 12,
    color: '#FFB22B',
  },
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Task Updated',
    person: 'Rachel',
    actionText: 'Updated a Task',
    subtitle: 'Rachel Updated a Task',
    timeAgo: '42 Mins Ago',
    color: 'pink',
  },
  {
    id: 'act-2',
    title: 'Deal Added',
    person: 'Patrick',
    actionText: 'Submitted a Deal',
    subtitle: 'Patrick Submitted a Deal',
    timeAgo: '1 Day Ago',
    color: 'purple',
  },
  {
    id: 'act-3',
    title: 'Published Article',
    person: 'Rachel',
    actionText: 'Published an Article',
    subtitle: 'Rachel Published an Article',
    timeAgo: '42 Hours Ago',
    color: 'cyan',
  },
  {
    id: 'act-4',
    title: 'Dock Updated',
    person: 'Rachel',
    actionText: 'Updated a Dock',
    subtitle: 'Rachel Updated a Dock',
    timeAgo: '1 Day Ago',
    color: 'orange',
  },
  {
    id: 'act-5',
    title: 'Replied Comment',
    person: 'Jonathan',
    actionText: 'Added a Comment',
    subtitle: 'Jonathan Added a Comment',
    timeAgo: '3 Days Ago',
    color: 'green',
  },
];

export const INITIAL_DEALS: DealRecord[] = [
  {
    id: 'deal-1',
    invoice: '12386',
    customer: 'Charly Dues',
    from: 'Brazil',
    price: 299,
    status: 'Process',
  },
  {
    id: 'deal-2',
    invoice: '12386',
    customer: 'Marko',
    from: 'Italy',
    price: 2642,
    status: 'Open',
  },
  {
    id: 'deal-3',
    invoice: '12386',
    customer: 'Denyel Onak',
    from: 'Russia',
    price: 981,
    status: 'On Hold',
  },
  {
    id: 'deal-4',
    invoice: '12386',
    customer: 'Belga Rostam',
    from: 'Korea',
    price: 369,
    status: 'Pending',
  },
  {
    id: 'deal-5',
    invoice: '12386',
    customer: 'Sari Onuka',
    from: 'Japan',
    price: 1240,
    status: 'Done',
  },
  {
    id: 'deal-6',
    invoice: '12387',
    customer: 'Elena Vance',
    from: 'Germany',
    price: 1850,
    status: 'Process',
  },
  {
    id: 'deal-7',
    invoice: '12388',
    customer: 'Lucas Silva',
    from: 'Portugal',
    price: 740,
    status: 'Open',
  },
  {
    id: 'deal-8',
    invoice: '12389',
    customer: 'Hana Kim',
    from: 'Korea',
    price: 3120,
    status: 'Done',
  },
  {
    id: 'deal-9',
    invoice: '12390',
    customer: 'Mateo Rossi',
    from: 'Italy',
    price: 520,
    status: 'Pending',
  },
  {
    id: 'deal-10',
    invoice: '12391',
    customer: 'Sofia Lindqvist',
    from: 'Sweden',
    price: 1490,
    status: 'On Hold',
  },
  {
    id: 'deal-11',
    invoice: '12392',
    customer: 'Kenji Takahashi',
    from: 'Japan',
    price: 2150,
    status: 'Done',
  },
  {
    id: 'deal-12',
    invoice: '12393',
    customer: 'Amara Okafor',
    from: 'Canada',
    price: 890,
    status: 'Process',
  },
  {
    id: 'deal-13',
    invoice: '12394',
    customer: 'Liam OConnor',
    from: 'Ireland',
    price: 1120,
    status: 'Open',
  },
  {
    id: 'deal-14',
    invoice: '12395',
    customer: 'Chloe Dubois',
    from: 'France',
    price: 675,
    status: 'Done',
  },
  {
    id: 'deal-15',
    invoice: '12396',
    customer: 'Noah Meyer',
    from: 'Switzerland',
    price: 2310,
    status: 'Process',
  },
  {
    id: 'deal-16',
    invoice: '12397',
    customer: 'Zara Al-Mansoor',
    from: 'UAE',
    price: 3450,
    status: 'On Hold',
  },
  {
    id: 'deal-17',
    invoice: '12398',
    customer: 'Oliver Wright',
    from: 'UK',
    price: 940,
    status: 'Pending',
  },
  {
    id: 'deal-18',
    invoice: '12399',
    customer: 'Mei Lin',
    from: 'Singapore',
    price: 1780,
    status: 'Done',
  },
  {
    id: 'deal-19',
    invoice: '12400',
    customer: 'Diego Fernandez',
    from: 'Spain',
    price: 615,
    status: 'Open',
  },
  {
    id: 'deal-20',
    invoice: '12401',
    customer: 'Freja Nielsen',
    from: 'Denmark',
    price: 1320,
    status: 'Process',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Deal Submitted',
    description: 'Patrick added invoice #12386 ($2,642)',
    time: '12 mins ago',
    unread: true,
    type: 'alert',
  },
  {
    id: 'notif-2',
    title: 'Monthly Target Reached',
    description: 'Store revenue exceeded $3,400 milestone',
    time: '1 hour ago',
    unread: true,
    type: 'alert',
  },
  {
    id: 'notif-3',
    title: 'Invoice #12386 Updated',
    description: 'Status changed to Done for Sari Onuka',
    time: '3 hours ago',
    unread: false,
    type: 'alert',
  },
  {
    id: 'msg-1',
    title: 'Rachel commented on Task',
    description: 'Updated Q3 revenue projections in the dock.',
    time: '42 mins ago',
    unread: true,
    type: 'message',
  },
  {
    id: 'msg-2',
    title: 'Jonathan replied to Deal',
    description: 'Approved the Brazil distribution contract.',
    time: '2 hours ago',
    unread: true,
    type: 'message',
  },
];

export function filterDeals(deals: DealRecord[], searchQuery: string): DealRecord[] {
  const normalized = searchQuery.trim().toLowerCase();
  if (!normalized) return deals;

  return deals.filter(
    (deal) =>
      deal.invoice.toLowerCase().includes(normalized) ||
      deal.customer.toLowerCase().includes(normalized) ||
      deal.from.toLowerCase().includes(normalized) ||
      deal.status.toLowerCase().includes(normalized) ||
      String(deal.price).includes(normalized)
  );
}

export function sortDeals(
  deals: DealRecord[],
  field: SortField | null,
  direction: SortDirection
): DealRecord[] {
  if (!field) return deals;
  const copy = [...deals];
  copy.sort((a, b) => {
    let comparison = 0;
    if (field === 'price') {
      comparison = a.price - b.price;
    } else {
      comparison = String(a[field]).localeCompare(String(b[field]), undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    }
    return direction === 'asc' ? comparison : -comparison;
  });
  return copy;
}

export function paginateDeals(
  deals: DealRecord[],
  currentPage: number,
  pageSize: number
): {
  items: DealRecord[];
  totalPages: number;
  safePage: number;
  startIndex: number;
  endIndex: number;
} {
  const totalPages = Math.max(1, Math.ceil(deals.length / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, deals.length);
  const items = deals.slice(startIndex, endIndex);

  return {
    items,
    totalPages,
    safePage,
    startIndex: deals.length === 0 ? 0 : startIndex + 1,
    endIndex,
  };
}

export function validateDealForm(input: DealFormInput): DealFormValidationErrors {
  const errors: DealFormValidationErrors = {};

  if (!input.invoice || input.invoice.trim().length < 3) {
    errors.invoice = 'Invoice number must be at least 3 characters.';
  }

  if (!input.customer || input.customer.trim().length < 2) {
    errors.customer = 'Customer name is required.';
  }

  if (!input.from || input.from.trim().length < 2) {
    errors.from = 'Country / origin is required.';
  }

  const parsedPrice = Number(input.price);
  if (!input.price || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
    errors.price = 'Enter a valid price greater than 0.';
  }

  return errors;
}

export function formatCurrency(amount: number, includeDecimals = true): string {
  if (!includeDecimals) {
    return `$${Math.round(amount)}`;
  }
  return `$${amount.toFixed(2)}`;
}
