/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Heart, BookOpen, Smile, ShoppingBag, ShieldAlert, BadgeAlert,
  ArrowRight, Users, CheckCircle, Sparkles, Building
} from 'lucide-react';
import { CommunityRequest, DonationCategory } from '../types';
import { INITIAL_COMMUNITY_REQUESTS } from '../data';

interface CommunityCausesProps {
  requests?: CommunityRequest[];
  onContributeToCause: (category: DonationCategory) => void;
}

export default function CommunityCauses({
  requests = INITIAL_COMMUNITY_REQUESTS,
  onContributeToCause
}: CommunityCausesProps) {

  // Category Icon helper
  const getCategoryIcon = (category: DonationCategory) => {
    switch (category) {
      case 'books': return BookOpen;
      case 'toys': return Smile;
      case 'clothes': return ShoppingBag;
      default: return Heart;
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Community Causes Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Building className="text-emerald-600 w-6 h-6" /> Community Requests
          </h2>
          <p className="text-sm text-slate-500">Support vetted local public schools, orphanages, and night shelters directly with your donations.</p>
        </div>
      </div>

      {/* Grid of Causes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requests.map((cause) => {
          const Icon = getCategoryIcon(cause.category);
          const percent = Math.round((cause.collectedAmount / cause.neededAmount) * 100);
          
          return (
            <div
              key={cause.id}
              className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm glow-shadow flex flex-col justify-between gap-6 hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Background gradient hint */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>

              {/* Top Row: Organization, Urgency Badge */}
              <div className="flex justify-between items-start">
                <div className="space-y-1.5 max-w-[70%]">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    {cause.organization}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-950 leading-snug">
                    {cause.title}
                  </h3>
                </div>

                <span
                  className={`text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    cause.urgency === 'High'
                      ? 'bg-red-100 text-red-800'
                      : cause.urgency === 'Medium'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {cause.urgency} Urgency
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed">
                {cause.description}
              </p>

              {/* Middle Row: Progress Slider and Counter */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Icon className="w-4 h-4 text-emerald-600" />
                    Goal Progress
                  </span>
                  <span className="font-bold text-slate-900">
                    {cause.collectedAmount} of {cause.neededAmount} collected
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                <div className="text-[10px] font-bold text-slate-400 text-right">
                  {percent}% completed
                </div>
              </div>

              {/* CTA button: Contribute to Cause */}
              <div className="pt-4 border-t border-slate-50">
                <button
                  type="button"
                  onClick={() => onContributeToCause(cause.category)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-xl text-xs font-extrabold tracking-wide border border-slate-150 hover:border-emerald-200 transition-all cursor-pointer"
                >
                  Contribute directly to cause
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
