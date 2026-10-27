import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Grid,
  Columns,
  Maximize2,
  Download,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Tag,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

interface GalleryViewProps {
  onBackToDashboard: () => void;
}

interface GalleryItem {
  id: string;
  title: string;
  category: 'Branding & Logos' | 'Dashboard UI' | 'Technology' | 'Global Hubs';
  imageUrl: string;
  dimensions: string;
  fileSize: string;
  tags: string[];
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Glossy Lector 3D Ribbon Prism',
    category: 'Branding & Logos',
    imageUrl: '/assets/aistudio/Glossy_Lector_Tech_Logo_387f5f41.png',
    dimensions: '1691 × 930',
    fileSize: '348 KB',
    tags: ['Brand', 'Hexagon', 'Prism', 'Official'],
  },
  {
    id: 'g-2',
    title: 'Executive Financial Analytics',
    category: 'Dashboard UI',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    dimensions: '1920 × 1080',
    fileSize: '620 KB',
    tags: ['Charts', 'Revenue', 'Telemetry'],
  },
  {
    id: 'g-3',
    title: 'Global Trade Hub - Tokyo & Seoul',
    category: 'Global Hubs',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80',
    dimensions: '1920 × 1200',
    fileSize: '810 KB',
    tags: ['Asia', 'Tokyo', 'Hub', 'Operations'],
  },
  {
    id: 'g-4',
    title: 'Cloud Infrastructure & High-Concurrency Telemetry',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    dimensions: '2560 × 1440',
    fileSize: '1.2 MB',
    tags: ['Server', 'Network', 'Realtime'],
  },
  {
    id: 'g-5',
    title: 'Data Visualization & Attribution Topology',
    category: 'Dashboard UI',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    dimensions: '1600 × 900',
    fileSize: '540 KB',
    tags: ['Traffic', 'Funnel', 'Metrics'],
  },
  {
    id: 'g-6',
    title: 'European Logistics & Italian Operations Hub',
    category: 'Global Hubs',
    imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80',
    dimensions: '1920 × 1080',
    fileSize: '790 KB',
    tags: ['Europe', 'Italy', 'Logistics'],
  },
  {
    id: 'g-7',
    title: 'Modern Workstation & Developer Cockpit',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
    dimensions: '2048 × 1365',
    fileSize: '930 KB',
    tags: ['Code', 'Workspace', 'Tools'],
  },
  {
    id: 'g-8',
    title: 'Latin America Deal Gateway - São Paulo',
    category: 'Global Hubs',
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000&q=80',
    dimensions: '1920 × 1080',
    fileSize: '880 KB',
    tags: ['Brazil', 'Americas', 'Invoices'],
  },
];

export const GalleryView: React.FC<GalleryViewProps> = ({ onBackToDashboard }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'compact'>('grid');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : 0
        );
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev === 0 ? filteredItems.length - 1 : prev - 1) : 0
        );
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  const currentLightboxItem =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handleDownload = (item: GalleryItem) => {
    const link = document.createElement('a');
    link.href = item.imageUrl;
    link.download = `${item.title.replace(/\s+/g, '_').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify(`Downloaded asset "${item.title}"`);
  };

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
            <span className="w-2 h-2 rounded-full bg-[#38B9DF]" />
            <h1 className="text-sm font-bold text-[#303744]">Media & Image Gallery</h1>
          </div>
          <p className="text-xs text-[#89909C] mt-0.5">
            Branding assets, telemetry UI screenshots, global hub photography, and full-screen lightbox viewer
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

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-lg border border-[#EDF0F4] shadow-xs p-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Branding & Logos', 'Dashboard UI', 'Technology', 'Global Hubs'].map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#EC388A] text-white shadow-xs'
                    : 'bg-[#F7F8FB] text-[#5A6270] hover:text-[#303744] hover:bg-[#FAFBFD]'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Search & Layout toggle */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-[#89909C] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-[#EDF0F4] bg-[#F7F8FB] focus:bg-white focus:border-[#EC388A] outline-none text-[#303744]"
            />
          </div>

          <div className="bg-[#F7F8FB] p-0.5 rounded-md border border-[#EDF0F4] flex items-center">
            <button
              type="button"
              onClick={() => setLayoutMode('grid')}
              className={`p-1.5 rounded cursor-pointer ${
                layoutMode === 'grid' ? 'bg-white text-[#EC388A] shadow-xs' : 'text-[#89909C]'
              }`}
              title="Standard Grid"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode('compact')}
              className={`p-1.5 rounded cursor-pointer ${
                layoutMode === 'compact' ? 'bg-white text-[#EC388A] shadow-xs' : 'text-[#89909C]'
              }`}
              title="Compact View"
            >
              <Columns className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div
        className={`grid gap-4 ${
          layoutMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="group bg-white rounded-lg border border-[#EDF0F4] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
          >
            {/* Image Thumbnail Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0c0624] flex items-center justify-center">
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[1px]">
                <button
                  type="button"
                  onClick={() => {
                    setActiveLightboxIndex(index);
                    setIsZoomed(false);
                  }}
                  className="p-2 rounded-full bg-white/90 text-[#303744] hover:bg-white hover:scale-110 transition-all cursor-pointer shadow-md"
                  title="Enlarge in Lightbox"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(item)}
                  className="p-2 rounded-full bg-white/90 text-[#303744] hover:bg-white hover:scale-110 transition-all cursor-pointer shadow-md"
                  title="Download Image"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#293548]/80 text-white backdrop-blur-xs">
                {item.category}
              </span>
            </div>

            {/* Info Footer */}
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-[#303744] truncate" title={item.title}>
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-[#89909C] mt-1">
                  <span>{item.dimensions}</span>
                  <span>•</span>
                  <span>{item.fileSize}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-[#EDF0F4]">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[#F7F8FB] text-[#5A6270]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-lg border border-[#EDF0F4] p-12 text-center text-[#89909C] shadow-xs">
          <p className="text-sm font-semibold text-[#303744]">No assets matched your filter.</p>
          <p className="text-xs mt-1">Try searching for other terms like "Prism", "Charts", or "Hub".</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 px-3 py-1.5 rounded-md bg-[#EC388A] text-white text-xs font-semibold cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {currentLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col justify-between p-4"
        >
          {/* Lightbox Topbar */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/10">
            <div>
              <h2 className="text-sm font-bold">{currentLightboxItem.title}</h2>
              <div className="text-[11px] text-white/70">
                {currentLightboxItem.dimensions} • {currentLightboxItem.fileSize} • Category:{' '}
                {currentLightboxItem.category}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                title={isZoomed ? 'Zoom out' : 'Zoom in'}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => handleDownload(currentLightboxItem)}
                className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                title="Download asset"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(null)}
                className="p-1.5 rounded bg-white/20 hover:bg-rose-600 text-white cursor-pointer"
                title="Close lightbox (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Stage with Previous / Next Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              type="button"
              onClick={() =>
                setActiveLightboxIndex((prev) =>
                  prev !== null ? (prev === 0 ? filteredItems.length - 1 : prev - 1) : 0
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/30 text-white cursor-pointer transition-all z-20"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={currentLightboxItem.imageUrl}
              alt={currentLightboxItem.title}
              className={`max-h-[80vh] max-w-[90vw] object-contain transition-transform duration-200 select-none ${
                isZoomed ? 'scale-150 cursor-grab' : 'scale-100'
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setActiveLightboxIndex((prev) =>
                  prev !== null ? (prev + 1) % filteredItems.length : 0
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/30 text-white cursor-pointer transition-all z-20"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Bottom Indicator */}
          <div className="text-center text-[11px] text-white/60">
            Image {(activeLightboxIndex ?? 0) + 1} of {filteredItems.length} • Use Arrow Keys to navigate, Esc to close
          </div>
        </div>
      )}
    </div>
  );
};
