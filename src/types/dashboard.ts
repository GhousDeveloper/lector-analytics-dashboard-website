export type ReportingPeriod = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export type DealStatus = 'Process' | 'Open' | 'On Hold' | 'Pending' | 'Done';

export interface DealRecord {
  id: string;
  invoice: string;
  customer: string;
  from: string;
  price: number;
  status: DealStatus;
  createdAt?: string;
}

export interface DealFormInput {
  invoice: string;
  customer: string;
  from: string;
  price: string;
  status: DealStatus;
}

export interface DealFormValidationErrors {
  invoice?: string;
  customer?: string;
  from?: string;
  price?: string;
}

export interface ChartDataPoint {
  label: string;
  online: number;
  store: number;
  referral: number;
}

export interface BottomKpiItem {
  id: string;
  label: string;
  value: string;
  color: 'pink' | 'purple' | 'cyan' | 'orange';
}

export interface PeriodAnalytics {
  period: ReportingPeriod;
  earnings: number;
  sales: number;
  lastMonthEarnings: number;
  lastMonthSales: number;
  chartData: ChartDataPoint[];
  kpis: BottomKpiItem[];
}

export interface TrafficSegment {
  id: string;
  name: string;
  subLabel: string;
  percentage: number;
  value: number;
  color: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  person: string;
  actionText: string;
  subtitle: string;
  timeAgo: string;
  color: 'pink' | 'purple' | 'cyan' | 'orange' | 'green';
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: 'alert' | 'message';
}

export type SortField = 'invoice' | 'customer' | 'from' | 'price' | 'status';
export type SortDirection = 'asc' | 'desc';

export type NavItemId =
  | 'Dashboard'
  | 'Widgets'
  | 'UI Elements'
  | 'Advanced UI'
  | 'Form Elements'
  | 'Editors'
  | 'Charts'
  | 'Tables'
  | 'Popups'
  | 'Notifications'
  | 'Icons'
  | 'Maps'
  | 'User Pages'
  | 'Error Pages'
  | 'General Pages'
  | 'E-Commerce'
  | 'Email'
  | 'Calendar'
  | 'Todo List'
  | 'Gallery'
  | 'Documentation';
