/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Search, Filter, FileText, Download, CheckCircle, Calendar,
  Coins, ArrowUpRight, ArrowDown, ChevronRight, HelpCircle, Tag
} from 'lucide-react';
import { DonationRequest, DonationCategory, PickupStatus } from '../types';

interface DonationHistoryProps {
  requests: DonationRequest[];
  onNavigateToTracking: (requestId: string) => void;
}

export default function DonationHistory({ requests, onNavigateToTracking }: DonationHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [exportingType, setExportingType] = useState<'pdf' | 'csv' | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  // Handle simulated exports
  const handleSimulateExport = (type: 'pdf' | 'csv') => {
    setExportingType(type);
    setTimeout(() => {
      setExportingType(null);
      setToastMessage(`EcoReward_${Date.now()}.${type} report generated and downloaded successfully!`);
      setTimeout(() => setToastMessage(''), 3000);
    }, 1500);
  };

  // Filtering logic
  const filteredRequests = requests.filter((req) => {
    // Search match
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      req.id.toLowerCase().includes(searchLower) ||
      req.address.toLowerCase().includes(searchLower) ||
      req.categories.some(c => c.toLowerCase().includes(searchLower));

    // Category match
    const matchesCategory =
      categoryFilter === 'all' ||
      req.categories.includes(categoryFilter as DonationCategory);

    // Status match
    const matchesStatus =
      statusFilter === 'all' ||
      req.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm glow-shadow space-y-6 font-sans">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-2xl z-50 text-xs font-bold animate-bounce border border-slate-800">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section with exporting CTA */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-slate-900">Donation & Recycling History Ledger</h2>
          <p className="text-xs text-slate-500">Search and filter your entire history logs of doorstep pickup schedules.</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleSimulateExport('pdf')}
            disabled={exportingType !== null}
            className="px-4 py-2 text-xs font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {exportingType === 'pdf' ? (
              <span className="animate-spin rounded-full h-3.5 w-3.5 border-t border-b border-slate-700"></span>
            ) : (
              <FileText className="w-4 h-4 text-red-500" />
            )}
            Export PDF
          </button>
          <button
            type="button"
            onClick={() => handleSimulateExport('csv')}
            disabled={exportingType !== null}
            className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-2 transition-all shadow-sm shadow-emerald-200 disabled:opacity-50"
          >
            {exportingType === 'csv' ? (
              <span className="animate-spin rounded-full h-3.5 w-3.5 border-t border-b border-white"></span>
            ) : (
              <Download className="w-4 h-4" />
            )}
            Download Report
          </button>
        </div>
      </div>

      {/* Filters & Searches Control Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Pickup ID, categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-3.5 w-3.5 h-3.5 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white font-medium"
          >
            <option value="all">All Categories</option>
            <option value="books">Books</option>
            <option value="toys">Toys</option>
            <option value="clothes">Clothes</option>
            <option value="plastic">Plastic</option>
            <option value="paper">Paper</option>
            <option value="ewaste">E-Waste</option>
            <option value="metal">Metal</option>
          </select>
        </div>

        {/* Status filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-3.5 w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="collector assigned">Collector Assigned</option>
            <option value="collected">Collected</option>
            <option value="verified">Verified</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table Ledger view */}
      <div className="overflow-x-auto border border-slate-100 rounded-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] text-slate-400 font-black tracking-wider uppercase">
              <th className="py-4 px-6">Pickup ID</th>
              <th className="py-4 px-4">Date</th>
              <th className="py-4 px-4">Categories</th>
              <th className="py-4 px-4">Total Weight</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-6 text-right">Points Earned</th>
              <th className="py-4 px-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => {
                // Calculate weight text representation
                let totalWeight = req.actualWeight !== undefined ? req.actualWeight : 0;
                if (totalWeight === 0) {
                  if (req.details.plastic) totalWeight += req.details.plastic.weight;
                  if (req.details.paper) totalWeight += req.details.paper.weight;
                  if (req.details.ewaste) totalWeight += req.details.ewaste.weight;
                  if (req.details.metal) totalWeight += req.details.metal.weight;
                }

                return (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* ID */}
                    <td className="py-4 px-6 font-mono text-xs text-slate-900 font-bold">{req.id}</td>
                    
                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {req.pickupDate}
                    </td>

                    {/* Categories tag pills */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {req.categories.map((cat) => (
                          <span
                            key={cat}
                            className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase bg-emerald-50 text-emerald-800 border border-emerald-100/50"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Weight */}
                    <td className="py-4 px-4 font-mono">
                      {totalWeight > 0 ? `${totalWeight.toFixed(1)} KG` : 'N/A (Reusable)'}
                    </td>

                    {/* Status badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          req.status === 'Completed' || req.status === 'Verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'Submitted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>

                    {/* Points */}
                    <td className="py-4 px-6 text-right font-black text-slate-950 font-mono">
                      +{req.estimatedPoints} Pts
                    </td>

                    {/* Action tracker */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onNavigateToTracking(req.id)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center justify-end gap-0.5"
                      >
                        Track <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400 font-medium text-xs">
                  No matching donation records found. Try modifying your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
