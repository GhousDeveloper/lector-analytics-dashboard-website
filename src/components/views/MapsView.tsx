import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  ZoomIn,
  ZoomOut,
  Layers,
  Compass,
  Globe,
  Info,
  DollarSign,
  TrendingUp,
  Key,
} from 'lucide-react';

interface MapsViewProps {
  onBackToDashboard: () => void;
}

interface MapLocation {
  id: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  // SVG coordinates on 800x420 world map
  svgX: number;
  svgY: number;
  revenue: string;
  dealsCount: number;
  leadCustomer: string;
  status: 'Process' | 'Open' | 'On Hold' | 'Done';
  manager: string;
}

const GLOBAL_HUBS: MapLocation[] = [
  {
    id: 'loc-1',
    country: 'Brazil',
    city: 'São Paulo',
    lat: -23.5505,
    lng: -46.6333,
    svgX: 275,
    svgY: 285,
    revenue: '$14,290.00',
    dealsCount: 18,
    leadCustomer: 'Charly Dues',
    status: 'Process',
    manager: 'Carlos Silva',
  },
  {
    id: 'loc-2',
    country: 'Italy',
    city: 'Milan',
    lat: 45.4642,
    lng: 9.19,
    svgX: 422,
    svgY: 135,
    revenue: '$28,642.00',
    dealsCount: 26,
    leadCustomer: 'Marko',
    status: 'Open',
    manager: 'Matteo Rossi',
  },
  {
    id: 'loc-3',
    country: 'Russia',
    city: 'Moscow',
    lat: 55.7558,
    lng: 37.6173,
    svgX: 505,
    svgY: 108,
    revenue: '$9,810.00',
    dealsCount: 12,
    leadCustomer: 'Denyel Onak',
    status: 'On Hold',
    manager: 'Dmitri V.',
  },
  {
    id: 'loc-4',
    country: 'Korea',
    city: 'Seoul',
    lat: 37.5665,
    lng: 126.978,
    svgX: 660,
    svgY: 155,
    revenue: '$19,369.00',
    dealsCount: 22,
    leadCustomer: 'Belga Rostam',
    status: 'Open',
    manager: 'Hana Kim',
  },
  {
    id: 'loc-5',
    country: 'Japan',
    city: 'Tokyo',
    lat: 35.6762,
    lng: 139.6503,
    svgX: 692,
    svgY: 160,
    revenue: '$31,240.00',
    dealsCount: 34,
    leadCustomer: 'Sari Onuka',
    status: 'Done',
    manager: 'Kenji T.',
  },
  {
    id: 'loc-6',
    country: 'United States',
    city: 'San Francisco',
    lat: 37.7749,
    lng: -122.4194,
    svgX: 145,
    svgY: 150,
    revenue: '$54,820.00',
    dealsCount: 48,
    leadCustomer: 'Acme Enterprise',
    status: 'Done',
    manager: 'Rachel Adams',
  },
  {
    id: 'loc-7',
    country: 'United Kingdom',
    city: 'London',
    lat: 51.5074,
    lng: -0.1278,
    svgX: 395,
    svgY: 120,
    revenue: '$22,450.00',
    dealsCount: 19,
    leadCustomer: 'Oliver Wright',
    status: 'Open',
    manager: 'James Wilson',
  },
];

export const MapsView: React.FC<MapsViewProps> = ({ onBackToDashboard }) => {
  const [selectedHub, setSelectedHub] = useState<MapLocation>(GLOBAL_HUBS[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapTheme, setMapTheme] = useState<'clean' | 'dark' | 'satellite'>('clean');

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white p-4 lg:p-5 rounded-lg border border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-[#89909C] mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#EC388A] font-semibold">Maps</span>
          </div>
          <h1 className="text-base font-bold text-[#303744]">Global Logistics & Hub Coordinates</h1>
          <p className="text-xs text-[#89909C] mt-0.5">
            Geographic distribution of global distribution centers, transaction volume, and operational hubs.
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

      {/* Map Provider Notice Banner */}
      <div className="p-4 rounded-lg bg-[#FAFBFD] border border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#EBF8FC] text-[#38B9DF] flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#303744]">Interactive Vector Topology Active</h4>
            <p className="text-[11px] text-[#89909C]">
              High-performance client-side vector projection. For satellite aerial orthophotos, configure a Google Maps Platform API key in workspace environment.
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded bg-white border border-[#DCE1EA] text-[10px] font-mono text-[#5A6270]">
          PROVIDER: VECTOR_CHOROPLETH_V2
        </span>
      </div>

      {/* Map Container and Controls */}
      <div className="bg-white rounded-lg border border-[#EDF0F4] shadow-xs overflow-hidden">
        {/* Map Toolbar */}
        <div className="p-3.5 border-b border-[#EDF0F4] flex flex-wrap items-center justify-between gap-3 bg-[#FAFBFD]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#303744]">Theme Style:</span>
            {(['clean', 'dark', 'satellite'] as const).map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setMapTheme(style)}
                className={`px-2.5 py-1 rounded text-xs font-semibold capitalize transition-colors ${
                  mapTheme === style
                    ? 'bg-[#EC388A] text-white shadow-2xs'
                    : 'bg-white border border-[#DCE1EA] text-[#5A6270] hover:bg-[#F3F5F9]'
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(2, z + 0.25))}
              className="p-1.5 rounded bg-white border border-[#DCE1EA] text-[#5A6270] hover:text-[#EC388A] cursor-pointer"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
              className="p-1.5 rounded bg-white border border-[#DCE1EA] text-[#5A6270] hover:text-[#EC388A] cursor-pointer"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="px-2 py-1 rounded bg-white border border-[#DCE1EA] text-[10px] font-bold text-[#5A6270] hover:text-[#EC388A] cursor-pointer tabular-nums"
            >
              Reset ({Math.round(zoomLevel * 100)}%)
            </button>
          </div>
        </div>

        {/* Vector SVG World Map Canvas */}
        <div
          className={`relative w-full h-[400px] overflow-hidden flex items-center justify-center transition-colors ${
            mapTheme === 'dark'
              ? 'bg-[#0f172a]'
              : mapTheme === 'satellite'
              ? 'bg-[#061826]'
              : 'bg-[#F4F7FB]'
          }`}
        >
          <div
            className="w-full h-full transition-transform duration-200 ease-out origin-center flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              viewBox="0 0 800 420"
              className="w-full h-full max-h-[380px]"
              aria-label="World Map"
            >
              {/* Simplified Continents Silhouette */}
              <g
                fill={
                  mapTheme === 'dark'
                    ? '#1e293b'
                    : mapTheme === 'satellite'
                    ? '#13354c'
                    : '#E2E8F0'
                }
                stroke={
                  mapTheme === 'dark'
                    ? '#334155'
                    : mapTheme === 'satellite'
                    ? '#1f4e6e'
                    : '#CBD5E1'
                }
                strokeWidth="1"
              >
                {/* North America */}
                <path d="M 80,80 Q 120,60 170,70 Q 210,100 230,140 Q 190,170 160,200 Q 130,170 90,140 Z" />
                {/* South America */}
                <path d="M 230,220 Q 280,240 290,290 Q 270,360 250,390 Q 230,340 220,270 Z" />
                {/* Europe */}
                <path d="M 370,80 Q 420,70 450,100 Q 440,140 400,150 Q 370,130 360,100 Z" />
                {/* Africa */}
                <path d="M 370,160 Q 450,170 470,220 Q 450,310 400,340 Q 360,260 360,200 Z" />
                {/* Asia */}
                <path d="M 460,70 Q 600,60 700,90 Q 720,160 670,220 Q 560,240 480,180 Q 450,130 460,70 Z" />
                {/* Australia */}
                <path d="M 640,270 Q 720,260 730,310 Q 690,360 640,330 Z" />
              </g>

              {/* Connecting Global Trade Lines */}
              <g stroke="#EC388A" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" fill="none">
                <path d="M 145,150 Q 270,135 395,120" />
                <path d="M 395,120 Q 410,127 422,135" />
                <path d="M 422,135 Q 460,120 505,108" />
                <path d="M 505,108 Q 580,130 660,155" />
                <path d="M 660,155 Q 676,157 692,160" />
                <path d="M 145,150 Q 210,217 275,285" />
                <path d="M 275,285 Q 350,210 422,135" />
              </g>

              {/* Hub Markers */}
              {GLOBAL_HUBS.map((hub) => {
                const isSelected = selectedHub.id === hub.id;
                return (
                  <g
                    key={hub.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedHub(hub)}
                  >
                    {/* Pulsing ring */}
                    <circle
                      cx={hub.svgX}
                      cy={hub.svgY}
                      r={isSelected ? 14 : 9}
                      fill={hub.status === 'Done' ? '#4AD962' : '#EC388A'}
                      fillOpacity={isSelected ? 0.35 : 0.2}
                      className={isSelected ? 'animate-pulse' : ''}
                    />
                    {/* Inner solid marker */}
                    <circle
                      cx={hub.svgX}
                      cy={hub.svgY}
                      r={isSelected ? 5 : 3.5}
                      fill={hub.status === 'Done' ? '#4AD962' : '#EC388A'}
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
                    />
                    {/* Tooltip on pin */}
                    <text
                      x={hub.svgX}
                      y={hub.svgY - 10}
                      textAnchor="middle"
                      fill={mapTheme === 'dark' || mapTheme === 'satellite' ? '#FFFFFF' : '#303744'}
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {hub.city}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Floating Selected Hub Card Overlay */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-[2px] p-3 rounded-lg border border-[#EDF0F4] shadow-md max-w-xs text-xs">
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="font-bold text-[#303744] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#EC388A]" />
                {selectedHub.city}, {selectedHub.country}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold text-white ${
                  selectedHub.status === 'Done'
                    ? 'bg-[#4AD962]'
                    : selectedHub.status === 'Open'
                    ? 'bg-[#8052C7]'
                    : selectedHub.status === 'On Hold'
                    ? 'bg-[#38B9DF]'
                    : 'bg-[#EC388A]'
                }`}
              >
                {selectedHub.status}
              </span>
            </div>
            <p className="text-[11px] text-[#89909C]">
              Lead Customer: <strong>{selectedHub.leadCustomer}</strong>
            </p>
            <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-[#EDF0F4]">
              <span>Revenue: <strong className="text-[#303744]">{selectedHub.revenue}</strong></span>
              <span>Deals: <strong className="text-[#303744]">{selectedHub.dealsCount}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Hub Location Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {GLOBAL_HUBS.map((hub) => (
          <div
            key={hub.id}
            onClick={() => setSelectedHub(hub)}
            className={`p-4 rounded-lg bg-white border transition-all cursor-pointer ${
              selectedHub.id === hub.id
                ? 'border-[#EC388A] ring-1 ring-[#EC388A] shadow-xs'
                : 'border-[#EDF0F4] hover:shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-[#303744]">{hub.city}</h3>
              <span className="text-[10px] text-[#89909C] font-semibold">{hub.country}</span>
            </div>
            <div className="text-[16px] font-extrabold text-[#303744] tabular-nums">
              {hub.revenue}
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F1F3F7] text-[10px] text-[#89909C]">
              <span>Manager: {hub.manager}</span>
              <span className="font-bold text-[#EC388A]">{hub.dealsCount} active deals</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
