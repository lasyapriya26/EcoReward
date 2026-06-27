/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Share2, Copy, CheckCircle, Award, Users, PlusCircle,
  HelpCircle, ArrowRight, Star, HeartHandshake, Gift
} from 'lucide-react';
import { User } from '../types';

interface ReferAndEarnProps {
  user: User;
}

export default function ReferAndEarn({ user }: ReferAndEarnProps) {
  const [copied, setCopied] = useState(false);
  const referralCode = user.referralCode || 'ECO50RAVI';

  // Copy helper
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock referred friends dataset
  const referredFriends = [
    { name: 'Amit Singh', registeredDate: '2026-06-12', firstPickupStatus: 'Completed', rewardPoints: 50 },
    { name: 'Neha Gupta', registeredDate: '2026-06-19', firstPickupStatus: 'Scheduled', rewardPoints: 0 },
    { name: 'Karthik Raja', registeredDate: '2026-06-23', firstPickupStatus: 'Registered', rewardPoints: 0 },
  ];

  return (
    <div className="space-y-8 font-sans">
      
      {/* Referral Hub Banner */}
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-700/40 rounded-full blur-3xl"></div>
        <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="md:col-span-8 space-y-4">
            <span className="text-[10px] bg-emerald-600 font-extrabold text-white px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
              Eco-Community expansion
            </span>
            <h2 className="text-3xl font-black tracking-tight leading-tight">
              Spread Sustainability, <br />Earn <span className="text-emerald-400">Bonus Points</span>
            </h2>
            <p className="text-sm text-slate-300 max-w-lg">
              Invite friends to join the EcoReward revolution. For every friend who registers and completes their first doorstep donation, you receive 50 bonus points!
            </p>
          </div>

          {/* Quick Copy Card */}
          <div className="md:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-4">
            <div className="text-xs text-slate-200 font-semibold uppercase tracking-wider">YOUR UNIQUE CODE</div>
            
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
              <span className="font-mono font-black text-lg text-emerald-400 tracking-wider">
                {referralCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="text-white hover:text-emerald-400 p-1.5 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
              >
                {copied ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            <p className="text-[10px] text-slate-300 font-medium">
              Click copy, share via WhatsApp or social platforms.
            </p>
          </div>

        </div>
      </div>

      {/* Reward flow roadmap */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm glow-shadow space-y-6">
        <h3 className="font-extrabold text-base text-slate-900">How the Referral Loop Works</h3>
        
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="space-y-4 relative">
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl inline-block">
              <Share2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">1. Share Invitation Code</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Send your unique referral code or link to friends, family, or colleagues who have unwanted clutter at home.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-4 relative">
            <div className="p-3 bg-blue-50 text-blue-800 rounded-2xl inline-block">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">2. Friend Completes Setup</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your friend enters the referral code during sign-up and registers their secure EcoReward account.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-4 relative">
            <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl inline-block">
              <Gift className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">3. Both Earn Rewards</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upon successful completion of your friend's first doorstep collection, 50 points are credited to your wallet!
            </p>
          </div>
        </div>
      </div>

      {/* Referral Statistics list */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Referral Stats Counter Left */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm glow-shadow flex flex-col justify-between min-h-[220px]">
          <div className="space-y-2">
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl inline-block">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">Referral Impact Ledger</h4>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">FRIENDS JOINED</span>
              <span className="text-2xl font-black text-slate-900">3 Friends</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">POINTS EARNED</span>
              <span className="text-2xl font-black text-emerald-600">+50 Pts</span>
            </div>
          </div>
        </div>

        {/* Referred Friends progress list right */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm glow-shadow space-y-4">
          <h4 className="font-extrabold text-slate-900 text-base">Referred Friends List</h4>
          
          <div className="divide-y divide-slate-100">
            {referredFriends.map((friend) => (
              <div key={friend.name} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-900">{friend.name}</div>
                  <div className="text-[10px] text-slate-400">Joined on {friend.registeredDate}</div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Status */}
                  <span
                    className={`text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      friend.firstPickupStatus === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : friend.firstPickupStatus === 'Scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {friend.firstPickupStatus === 'Completed' ? '1st Pickup Done' : friend.firstPickupStatus}
                  </span>

                  {/* Points */}
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    {friend.rewardPoints > 0 ? `+${friend.rewardPoints} Pts` : '--'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
