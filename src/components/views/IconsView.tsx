import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Copy,
  Check,
  Home,
  LayoutGrid,
  Sliders,
  Layers,
  FileSpreadsheet,
  FileEdit,
  BarChart2,
  Table2,
  MessageSquarePlus,
  Bell,
  Compass,
  MapPin,
  User,
  AlertCircle,
  FileText,
  ShoppingCart,
  Mail,
  Calendar,
  CheckSquare,
  Image,
  BookOpen,
  PieChart,
  DollarSign,
  TrendingUp,
  CreditCard,
  Package,
  Truck,
  Shield,
  Lock,
  Unlock,
  Key,
  Database,
  Server,
  Cloud,
  Cpu,
  Smartphone,
  Laptop,
  Monitor,
  Printer,
  Camera,
  Video,
  Mic,
  Headphones,
  Music,
  Share2,
  Download,
  Upload,
  ExternalLink,
  Plus,
  Minus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  RefreshCw,
  Settings,
  HelpCircle,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ThumbsUp,
  Star,
  Heart,
  Flag,
  Send,
  MessageCircle,
  Phone,
  Inbox,
  Paperclip,
  Bookmark,
  Zap,
  Activity,
  Flame,
  Award,
  Gift,
  Target,
  Sparkles,
  Sun,
  Moon,
  Clock,
  Compass as CompassIcon,
  Globe,
  Navigation,
} from 'lucide-react';

interface IconsViewProps {
  onBackToDashboard: () => void;
}

interface IconEntry {
  name: string;
  category: 'Navigation' | 'Actions' | 'Commerce' | 'Communication' | 'Tech & System' | 'Status & Media';
  Icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
}

const ICONS_CATALOG: IconEntry[] = [
  // Navigation
  { name: 'Home', category: 'Navigation', Icon: Home },
  { name: 'LayoutGrid', category: 'Navigation', Icon: LayoutGrid },
  { name: 'Layers', category: 'Navigation', Icon: Layers },
  { name: 'Compass', category: 'Navigation', Icon: Compass },
  { name: 'MapPin', category: 'Navigation', Icon: MapPin },
  { name: 'Globe', category: 'Navigation', Icon: Globe },
  { name: 'Navigation', category: 'Navigation', Icon: Navigation },
  { name: 'ExternalLink', category: 'Navigation', Icon: ExternalLink },

  // Actions
  { name: 'Search', category: 'Actions', Icon: Search },
  { name: 'Plus', category: 'Actions', Icon: Plus },
  { name: 'Minus', category: 'Actions', Icon: Minus },
  { name: 'Edit', category: 'Actions', Icon: Edit },
  { name: 'Trash2', category: 'Actions', Icon: Trash2 },
  { name: 'Filter', category: 'Actions', Icon: Filter },
  { name: 'RefreshCw', category: 'Actions', Icon: RefreshCw },
  { name: 'Copy', category: 'Actions', Icon: Copy },
  { name: 'Download', category: 'Actions', Icon: Download },
  { name: 'Upload', category: 'Actions', Icon: Upload },
  { name: 'Eye', category: 'Actions', Icon: Eye },
  { name: 'EyeOff', category: 'Actions', Icon: EyeOff },
  { name: 'Sliders', category: 'Actions', Icon: Sliders },
  { name: 'Settings', category: 'Actions', Icon: Settings },

  // Commerce
  { name: 'ShoppingCart', category: 'Commerce', Icon: ShoppingCart },
  { name: 'DollarSign', category: 'Commerce', Icon: DollarSign },
  { name: 'TrendingUp', category: 'Commerce', Icon: TrendingUp },
  { name: 'CreditCard', category: 'Commerce', Icon: CreditCard },
  { name: 'Package', category: 'Commerce', Icon: Package },
  { name: 'Truck', category: 'Commerce', Icon: Truck },
  { name: 'PieChart', category: 'Commerce', Icon: PieChart },
  { name: 'BarChart2', category: 'Commerce', Icon: BarChart2 },
  { name: 'Table2', category: 'Commerce', Icon: Table2 },
  { name: 'FileSpreadsheet', category: 'Commerce', Icon: FileSpreadsheet },

  // Communication
  { name: 'Mail', category: 'Communication', Icon: Mail },
  { name: 'Send', category: 'Communication', Icon: Send },
  { name: 'MessageCircle', category: 'Communication', Icon: MessageCircle },
  { name: 'MessageSquarePlus', category: 'Communication', Icon: MessageSquarePlus },
  { name: 'Phone', category: 'Communication', Icon: Phone },
  { name: 'Inbox', category: 'Communication', Icon: Inbox },
  { name: 'Paperclip', category: 'Communication', Icon: Paperclip },
  { name: 'Share2', category: 'Communication', Icon: Share2 },
  { name: 'Bell', category: 'Communication', Icon: Bell },
  { name: 'User', category: 'Communication', Icon: User },

  // Tech & System
  { name: 'Database', category: 'Tech & System', Icon: Database },
  { name: 'Server', category: 'Tech & System', Icon: Server },
  { name: 'Cloud', category: 'Tech & System', Icon: Cloud },
  { name: 'Cpu', category: 'Tech & System', Icon: Cpu },
  { name: 'Laptop', category: 'Tech & System', Icon: Laptop },
  { name: 'Monitor', category: 'Tech & System', Icon: Monitor },
  { name: 'Smartphone', category: 'Tech & System', Icon: Smartphone },
  { name: 'Lock', category: 'Tech & System', Icon: Lock },
  { name: 'Unlock', category: 'Tech & System', Icon: Unlock },
  { name: 'Key', category: 'Tech & System', Icon: Key },
  { name: 'Shield', category: 'Tech & System', Icon: Shield },
  { name: 'Printer', category: 'Tech & System', Icon: Printer },
  { name: 'Zap', category: 'Tech & System', Icon: Zap },
  { name: 'Activity', category: 'Tech & System', Icon: Activity },

  // Status & Media
  { name: 'CheckCircle2', category: 'Status & Media', Icon: CheckCircle2 },
  { name: 'AlertTriangle', category: 'Status & Media', Icon: AlertTriangle },
  { name: 'AlertCircle', category: 'Status & Media', Icon: AlertCircle },
  { name: 'XCircle', category: 'Status & Media', Icon: XCircle },
  { name: 'Info', category: 'Status & Media', Icon: Info },
  { name: 'HelpCircle', category: 'Status & Media', Icon: HelpCircle },
  { name: 'Star', category: 'Status & Media', Icon: Star },
  { name: 'Heart', category: 'Status & Media', Icon: Heart },
  { name: 'Flame', category: 'Status & Media', Icon: Flame },
  { name: 'Award', category: 'Status & Media', Icon: Award },
  { name: 'Clock', category: 'Status & Media', Icon: Clock },
  { name: 'Calendar', category: 'Status & Media', Icon: Calendar },
  { name: 'CheckSquare', category: 'Status & Media', Icon: CheckSquare },
  { name: 'Image', category: 'Status & Media', Icon: Image },
  { name: 'BookOpen', category: 'Status & Media', Icon: BookOpen },
  { name: 'Sparkles', category: 'Status & Media', Icon: Sparkles },
];

export const IconsView: React.FC<IconsViewProps> = ({ onBackToDashboard }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [iconSize, setIconSize] = useState<number>(20);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const categories = ['All', 'Navigation', 'Actions', 'Commerce', 'Communication', 'Tech & System', 'Status & Media'];

  const filteredIcons = ICONS_CATALOG.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCopy = (iconName: string) => {
    const snippet = `<${iconName} className="w-5 h-5 text-[#EC388A]" />`;
    navigator.clipboard?.writeText(snippet);
    setCopiedItem(iconName);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white p-4 lg:p-5 rounded-lg border border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-[#89909C] mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#EC388A] font-semibold">Icons</span>
          </div>
          <h1 className="text-base font-bold text-[#303744]">Lucide Icon Directory</h1>
          <p className="text-xs text-[#89909C] mt-0.5">
            Searchable design token icons with one-click JSX copy and size scaling.
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

      {/* Control Bar: Search, Category, Size */}
      <div className="bg-white p-4 rounded-lg border border-[#EDF0F4] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-[#89909C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons (e.g. Mail, Cart, Chart)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-md border border-[#DCE1EA] text-xs text-[#303744] focus:border-[#EC388A] focus:outline-none"
            />
          </div>

          <span className="text-xs text-[#89909C] tabular-nums hidden sm:inline">
            {filteredIcons.length} icons found
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Size Selector */}
          <div className="flex items-center gap-1 text-xs text-[#5A6270]">
            <span className="font-semibold text-[11px] mr-1">Size:</span>
            {[16, 20, 24, 28].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setIconSize(s)}
                className={`w-7 h-7 rounded text-[11px] font-bold tabular-nums transition-colors ${
                  iconSize === s
                    ? 'bg-[#EC388A] text-white shadow-xs'
                    : 'bg-[#F3F5F9] text-[#5A6270] hover:bg-[#E4E8F0]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-[#EC388A] text-white shadow-xs'
                : 'bg-white border border-[#EDF0F4] text-[#5A6270] hover:bg-[#FAFBFD]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Copied Feedback Toast */}
      {copiedItem && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 bg-[#293548] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in"
        >
          <Check className="w-4 h-4 text-[#4AD962]" />
          <span>Copied &lt;{copiedItem} /&gt; snippet to clipboard!</span>
        </div>
      )}

      {/* Icons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredIcons.map((item) => {
          const IconComp = item.Icon;
          const isCopied = copiedItem === item.name;

          return (
            <div
              key={item.name}
              onClick={() => handleCopy(item.name)}
              className="bg-white p-4 rounded-lg border border-[#EDF0F4] hover:border-[#EC388A]/50 hover:shadow-sm transition-all flex flex-col items-center justify-between text-center group cursor-pointer relative"
              title="Click to copy React JSX snippet"
            >
              <div className="w-12 h-12 rounded-lg bg-[#FAFBFD] group-hover:bg-[#FDF2F7] flex items-center justify-center transition-colors mb-2 text-[#303744] group-hover:text-[#EC388A]">
                <IconComp size={iconSize} strokeWidth={2} />
              </div>

              <span className="text-[11px] font-semibold text-[#303744] group-hover:text-[#EC388A] truncate w-full">
                {item.name}
              </span>
              <span className="text-[9px] text-[#89909C] mt-0.5 truncate w-full">
                {item.category}
              </span>

              {/* Hover Copy Indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#89909C] hover:text-[#EC388A]">
                {isCopied ? <Check className="w-3.5 h-3.5 text-[#4AD962]" /> : <Copy className="w-3.5 h-3.5" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
