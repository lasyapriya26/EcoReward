/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Coins, Heart, Recycle, BookOpen, Smile, Calendar, ArrowRight, Sparkles, TrendingUp, ShieldAlert, BadgeAlert } from 'lucide-react';
import { User, DonationRequest } from '../types';

interface DashboardProps {
  user: User;
  onNavigateToDonate: () => void;
  onNavigateToTracking: (requestId: string) => void;
  donationRequests: DonationRequest[];
  onNavigateToImpact: () => void;
  onNavigateToLeaderboard: () => void;
}

export default function Dashboard({
  user,
  onNavigateToDonate,
  onNavigateToTracking,
  donationRequests,
  onNavigateToImpact,
  onNavigateToLeaderboard,
}: DashboardProps) {
  // Aggregate stats based on donation requests
  const completedDonations = donationRequests.filter(r => r.status === 'Completed' || r.status === 'Verified');
  const pendingDonations = donationRequests.filter(r => r.status !== 'Completed' && r.status !== 'Verified');

  let totalItemsDonated = 0;
  let totalWeightRecycled = 0;
  let booksDonated = 0;
  let toysDonated = 0;
  let plasticRecycled = 0;

  // Let's add default numbers for pre-registered Ravi Kumar to match Step 3
  if (user.id === 'user_ravi' || user.id === 'default_user') {
    booksDonated += 22;
    toysDonated += 14;
    plasticRecycled += 18;
    totalItemsDonated += 44; // books, toys, clothes
    totalWeightRecycled += 32.5; // plastic, metal, paper
  }

  donationRequests.forEach((req) => {
    // Only count verified or completed for total verified items, or include pending for active stats
    const detail = req.details;
    if (detail.books) {
      booksDonated += detail.books.count;
      totalItemsDonated += detail.books.count;
    }
    if (detail.toys) {
      toysDonated += detail.toys.quantity;
      totalItemsDonated += detail.toys.quantity;
    }
    if (detail.clothes) {
      totalItemsDonated += detail.clothes.quantity;
    }
    if (detail.plastic) {
      plasticRecycled += detail.plastic.weight;
      totalWeightRecycled += detail.plastic.weight;
    }
    if (detail.paper) {
      totalWeightRecycled += detail.paper.weight;
    }
    if (detail.ewaste) {
      totalWeightRecycled += detail.ewaste.weight;
    }
    if (detail.metal) {
      totalWeightRecycled += detail.metal.weight;
    }
  });

  // Calculate environmental impacts based on weights
  const co2Saved = Math.round(totalWeightRecycled * 1.5 * 10) / 10; // 1.5kg CO2 saved per kg recycled
  const treesSaved = Math.round(totalWeightRecycled * 0.05 * 10) / 10; // 0.05 tree equivalent saved per kg recycled
  const landfillPrevented = totalWeightRecycled; // 1:1 ratio

  // Get active pickup request to display
  const activePickup = pendingDonations[0];

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome & Call-to-Action Panel */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden shadow-xl">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-emerald-500/20 to-transparent pointer-events-none -z-0"></div>
        
        <div className="space-y-4 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-800/40 text-emerald-400 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Environmental Leaderboard Active
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome Back, <span className="text-emerald-400">{user.fullName.split(' ')[0]}</span>!
          </h1>
          <p className="text-slate-300 max-w-lg text-sm sm:text-base">
            Your recycling and donations have helped save local landfill areas. Schedule a pickup today and turn your items into points.
          </p>
        </div>

        <div className="z-10 shrink-0 w-full sm:w-auto">
          <button
            id="schedule-donation-dashboard-btn"
            onClick={onNavigateToDonate}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-2xl transition-all shadow-lg shadow-emerald-400/10 cursor-pointer"
          >
            Schedule a Donation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Active Pickup Tracker Teaser */}
      {activePickup && (
        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 glow-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-600 text-white rounded-2xl animate-pulse">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-emerald-800 font-bold tracking-wider uppercase">Active Pickup Pending</div>
              <div className="text-sm font-semibold text-slate-700">
                Scheduled on {activePickup.pickupDate} ({activePickup.pickupTimeSlot})
              </div>
              <div className="text-xs text-slate-500">
                Status: <span className="font-bold text-emerald-700 capitalize">{activePickup.status}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateToTracking(activePickup.id)}
            className="text-xs font-bold bg-white text-emerald-800 px-4 py-2 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-all shadow-sm"
          >
            Track Status Timeline →
          </button>
        </div>
      )}

      {/* Primary Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Points */}
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm glow-shadow flex justify-between items-center">
          <div className="space-y-2">
            <div className="text-xs text-slate-500 font-bold tracking-wider uppercase">Total Points Earned</div>
            <div className="text-3xl font-black text-slate-900 flex items-center gap-1">
              {user.points + (user.id === 'user_ravi' ? 350 : 0)} <span className="text-emerald-500 text-sm font-semibold">Points</span>
            </div>
            <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +245 pts from last week
            </div>
          </div>
          <div className="p-4 bg-amber-50 text-amber-500 rounded-3xl">
            <Coins className="w-8 h-8" />
          </div>
        </div>

        {/* Total Items Donated */}
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm glow-shadow flex justify-between items-center">
          <div className="space-y-2">
            <div className="text-xs text-slate-500 font-bold tracking-wider uppercase">Total Items Donated</div>
            <div className="text-3xl font-black text-slate-900 flex items-center gap-1">
              {totalItemsDonated} <span className="text-indigo-500 text-sm font-semibold">Items</span>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Books, toys, clothing and apparel
            </div>
          </div>
          <div className="p-4 bg-indigo-50 text-indigo-500 rounded-3xl">
            <Heart className="w-8 h-8" />
          </div>
        </div>

        {/* Total Weight Recycled */}
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm glow-shadow flex justify-between items-center sm:col-span-2 lg:col-span-1">
          <div className="space-y-2">
            <div className="text-xs text-slate-500 font-bold tracking-wider uppercase">Total Weight Recycled</div>
            <div className="text-3xl font-black text-slate-900 flex items-center gap-1">
              {totalWeightRecycled.toFixed(1)} <span className="text-emerald-500 text-sm font-semibold">KG</span>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Plastic, metals, paper, e-waste
            </div>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-3xl">
            <Recycle className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Category Level Breakdowns */}
      <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm glow-shadow">
        <h3 className="font-extrabold text-lg text-slate-950 mb-6">Item Category Contributions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Books */}
          <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-800 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-bold">Books Donated</div>
              <div className="text-lg font-black text-slate-800">{booksDonated} Books</div>
            </div>
          </div>

          {/* Toys */}
          <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-bold">Toys Donated</div>
              <div className="text-lg font-black text-slate-800">{toysDonated} Toys</div>
            </div>
          </div>

          {/* Plastic */}
          <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-bold">Plastic Recycled</div>
              <div className="text-lg font-black text-emerald-800">{plasticRecycled.toFixed(1)} KG</div>
            </div>
          </div>

          {/* Impact score */}
          <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-white/20 text-white rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-white/80 font-bold">Carbon Offset</div>
              <div className="text-lg font-black">{co2Saved.toFixed(1)} KG CO₂</div>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental & Social Impact Summary Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Environmental Indicators */}
        <div className="lg:col-span-7 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm glow-shadow space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-lg text-slate-900">Environmental Savings Score</h3>
            <button
              onClick={onNavigateToImpact}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Detailed Impact →
            </button>
          </div>

          <div className="space-y-4">
            {/* Metric 1 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Trees Equivalent Saved</span>
                <span className="font-bold">{treesSaved} Trees</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((treesSaved / 10) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Landfill Area Diverted</span>
                <span className="font-bold">{landfillPrevented.toFixed(1)} KG</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-teal-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((landfillPrevented / 50) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Community Happiness (Items Donated)</span>
                <span className="font-bold">{totalItemsDonated} / 100 Items</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((totalItemsDonated / 100) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivation Card */}
        <div className="lg:col-span-5 bg-emerald-800 text-emerald-50 p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-700/50 rounded-full blur-2xl -z-0"></div>
          
          <div className="space-y-4 z-10">
            <div className="p-2.5 bg-white/10 rounded-xl inline-block">
              <Sparkles className="w-6 h-6 text-emerald-300" />
            </div>
            <h4 className="text-xl font-bold tracking-tight">Eco-Hero Status</h4>
            <p className="text-sm text-emerald-100 leading-relaxed">
              "Your small step of recycling a single beverage plastic container saves enough power to run a laptop for 25 minutes!"
            </p>
          </div>

          <div className="pt-6 border-t border-emerald-700 mt-6 flex justify-between items-center z-10">
            <span className="text-xs font-bold text-emerald-300 uppercase">Current Tier: Gold Recycler</span>
            <button
              onClick={onNavigateToLeaderboard}
              className="text-xs font-bold bg-white text-emerald-900 px-3 py-1.5 rounded-xl hover:bg-emerald-50 transition-all"
            >
              Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
