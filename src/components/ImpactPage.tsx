/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Recycle, Heart, BookOpen, Smile, Sparkles, TrendingUp,
  Award, Globe, Leaf, Zap, ShieldCheck, HelpCircle
} from 'lucide-react';

// Monthly trend data for the SVG area chart
const MONTHLY_WASTE_TRENDS = [
  { month: 'Jan', weight: 450 },
  { month: 'Feb', weight: 620 },
  { month: 'Mar', weight: 890 },
  { month: 'Apr', weight: 1100 },
  { month: 'May', weight: 1450 },
  { month: 'Jun', weight: 1850 }
];

// Distribution category stats for the SVG bar chart
const CATEGORY_BARS = [
  { name: 'Books', value: 1240, color: 'fill-blue-500' },
  { name: 'Toys', value: 850, color: 'fill-amber-500' },
  { name: 'Clothes', value: 2100, color: 'fill-indigo-500' },
  { name: 'Recyclables', value: 4300, color: 'fill-emerald-500' }
];

export default function ImpactPage() {
  const [activeTab, setActiveTab] = useState<'environmental' | 'social'>('environmental');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Stats
  const envStats = [
    { label: 'Plastic Recycled', value: '4,850 KG', desc: 'Prevented oceanic plastic loops', icon: Recycle, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { label: 'CO2 Saved', value: '7,275 KG', desc: 'Equivalent greenhouse gas prevented', icon: Globe, color: 'text-cyan-600 bg-cyan-50 border-cyan-100' },
    { label: 'Waste Diverted', value: '12.5 Tons', desc: 'Kept away from city landfills', icon: Leaf, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { label: 'Trees Equivalent', value: '242 Trees', desc: 'Monthly carbon consumption', icon: Zap, color: 'text-amber-500 bg-amber-50 border-amber-100' }
  ];

  const socialStats = [
    { label: 'Books Donated', value: '1,480 Books', desc: 'Shared with rural public schools', icon: BookOpen, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Students Benefited', value: '290 Students', desc: 'Expanded learning resources', icon: Award, color: 'text-violet-600 bg-violet-50 border-violet-100' },
    { label: 'Toys Distributed', value: '620 Toys', desc: 'Distributed at child daycare hubs', icon: Smile, color: 'text-amber-500 bg-amber-50 border-amber-100' },
    { label: 'Families Helped', value: '142 Families', desc: 'Recipients of winter clothing kits', icon: Heart, color: 'text-red-600 bg-red-50 border-red-100' }
  ];

  // SVG Area Chart calculations
  const maxWeight = 2000;
  const chartHeight = 160;
  const chartWidth = 500;
  const padding = 40;

  const points = MONTHLY_WASTE_TRENDS.map((item, idx) => {
    const x = padding + (idx * (chartWidth - padding * 2)) / (MONTHLY_WASTE_TRENDS.length - 1);
    const y = chartHeight - padding - (item.weight / maxWeight) * (chartHeight - padding * 2);
    return { x, y, ...item };
  });

  const areaPath = points.length > 0
    ? `M ${points[0].x} ${points[0].y} ` +
      points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') +
      ` L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`
    : '';

  const linePath = points.length > 0
    ? `M ${points[0].x} ${points[0].y} ` +
      points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
    : '';

  return (
    <div className="space-y-8 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="text-emerald-600 w-6 h-6" /> Community & Environmental Impact
          </h2>
          <p className="text-sm text-slate-500">Track how EcoReward donations are actively improving ecological and social structures.</p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-100 p-1 rounded-2xl inline-flex self-start sm:self-center">
          <button
            onClick={() => setActiveTab('environmental')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'environmental'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Environmental Impact
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'social'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Social Impact
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(activeTab === 'environmental' ? envStats : socialStats).map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm glow-shadow flex flex-col justify-between gap-4">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl ${stat.color} inline-block`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Live
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">{stat.label}</div>
                <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{stat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* SVG Charts Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Trend chart left */}
        <div className="lg:col-span-7 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm glow-shadow space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-slate-900">Monthly Recycling Trends</h3>
              <p className="text-xs text-slate-500">KG of waste successfully diverted from urban landfills.</p>
            </div>
            <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +28% YoY
            </div>
          </div>

          {/* Interactive SVG Area Chart */}
          <div className="relative">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#f1f5f9" strokeWidth="2" />
              <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
              <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />

              {/* Area */}
              <path d={areaPath} fill="url(#areaGrad)" />

              {/* Line */}
              <path d={linePath} fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />

              {/* Data points */}
              {points.map((p, idx) => (
                <circle
                  key={idx}
                  cx={p.x}
                  cy={p.y}
                  r={hoveredPoint === idx ? 6 : 4}
                  className="fill-white stroke-emerald-500 stroke-[3] cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              ))}

              {/* Labels */}
              {points.map((p, idx) => (
                <text
                  key={idx}
                  x={p.x}
                  y={chartHeight - 12}
                  textAnchor="middle"
                  className="fill-slate-400 font-sans text-[10px] font-bold"
                >
                  {p.month}
                </text>
              ))}

              {/* Axis label */}
              <text x={padding} y={padding - 10} className="fill-slate-400 font-mono text-[9px] font-bold">KG</text>
            </svg>

            {/* Hover tooltip overlay */}
            {hoveredPoint !== null && (
              <div
                className="absolute bg-slate-950 text-white rounded-xl px-3 py-2 text-xs font-bold shadow-md pointer-events-none transform -translate-x-1/2 -translate-y-12"
                style={{
                  left: `${(points[hoveredPoint].x / chartWidth) * 100}%`,
                  top: `${(points[hoveredPoint].y / chartHeight) * 100}%`
                }}
              >
                {MONTHLY_WASTE_TRENDS[hoveredPoint].month}: {MONTHLY_WASTE_TRENDS[hoveredPoint].weight} KG
              </div>
            )}
          </div>
        </div>

        {/* Categories Bar chart right */}
        <div className="lg:col-span-5 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm glow-shadow space-y-6">
          <div className="space-y-1">
            <h3 className="font-extrabold text-lg text-slate-900">Item Distribution Breakdown</h3>
            <p className="text-xs text-slate-500">Breakdown of community items deployed.</p>
          </div>

          <div className="relative pt-4">
            <svg viewBox="0 0 300 160" className="w-full h-auto overflow-visible">
              {/* Bars */}
              {CATEGORY_BARS.map((bar, idx) => {
                const barWidth = 35;
                const gap = 30;
                const x = 30 + idx * (barWidth + gap);
                const barHeight = (bar.value / 5000) * 110;
                const y = 130 - barHeight;

                return (
                  <g key={bar.name}>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={Math.max(barHeight, 4)}
                      rx="6"
                      className={`${bar.color} opacity-90 cursor-pointer hover:opacity-100 transition-all`}
                      onMouseEnter={() => setHoveredBar(idx)}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                    <text
                      x={x + barWidth / 2}
                      y={145}
                      textAnchor="middle"
                      className="fill-slate-400 font-sans text-[9px] font-bold"
                    >
                      {bar.name}
                    </text>
                  </g>
                );
              })}

              <line x1="10" y1="130" x2="290" y2="130" stroke="#f1f5f9" strokeWidth="2" />
            </svg>

            {/* Bar Tooltip */}
            {hoveredBar !== null && (
              <div
                className="absolute bg-slate-950 text-white rounded-xl px-3 py-1.5 text-[10px] font-extrabold shadow-md pointer-events-none transform -translate-y-6"
                style={{
                  left: `${((30 + hoveredBar * 65 + 17.5) / 300) * 100}%`,
                  top: '10%'
                }}
              >
                {CATEGORY_BARS[hoveredBar].name}: {CATEGORY_BARS[hoveredBar].value} units
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
