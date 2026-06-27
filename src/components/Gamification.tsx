/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Award, Heart, Leaf, BookOpen, Smile, Zap, Lock, Unlock,
  Shield, Star, Trophy, Target, Sparkles, TrendingUp
} from 'lucide-react';
import { Badge, LeaderboardUser, User } from '../types';
import { INITIAL_LEADERBOARD, MONTHLY_CHAMPIONS, INITIAL_BADGES } from '../data';

interface GamificationProps {
  user: User;
  badges: Badge[];
}

export default function Gamification({ user, badges }: GamificationProps) {
  const [subTab, setSubTab] = useState<'leaderboard' | 'badges'>('leaderboard');

  // Insert current user into leaderboard dynamically for visual realism!
  const userTotalPoints = user.points + (user.id === 'user_ravi' ? 350 : 0);
  const meOnLeaderboard: LeaderboardUser = {
    rank: 4,
    name: `${user.fullName} (You)`,
    points: userTotalPoints,
    avatarSeed: user.fullName.substring(0, 2),
    isMe: true
  };

  // Construct complete sorted leaderboard
  const rawLeaderboard = [...INITIAL_LEADERBOARD];
  // Remove duplicate of 'Ravi' if logged in as ravi
  const filteredLeaderboard = user.id === 'user_ravi' 
    ? rawLeaderboard.filter(u => u.name !== 'Ravi Kumar') 
    : rawLeaderboard;

  const fullLeaderboard = [...filteredLeaderboard, meOnLeaderboard]
    .sort((a, b) => b.points - a.points)
    .map((usr, index) => ({ ...usr, rank: index + 1 }));

  // Badge icon mapper
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return Award;
      case 'Heart': return Heart;
      case 'Leaf': return Leaf;
      case 'BookOpen': return BookOpen;
      case 'Smile': return Smile;
      case 'Zap': return Zap;
      default: return Shield;
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Tab Select Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Trophy className="text-amber-500 w-6 h-6" /> Gamification & Achievements
          </h2>
          <p className="text-sm text-slate-500">Compete with friends, unlock legendary badges, and help save the environment.</p>
        </div>

        <div className="bg-slate-100 p-1 rounded-2xl inline-flex">
          <button
            onClick={() => setSubTab('leaderboard')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              subTab === 'leaderboard'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Regional Leaderboard
          </button>
          <button
            onClick={() => setSubTab('badges')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              subTab === 'badges'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            My Badge Gallery
          </button>
        </div>
      </div>

      {/* LEADERBOARD VIEW */}
      {subTab === 'leaderboard' && (
        <div className="space-y-8">
          
          {/* Monthly Champions Banner Carousel */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> Monthly Champions Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {MONTHLY_CHAMPIONS.map((champ) => (
                <div
                  key={champ.type}
                  className="bg-white border-2 border-amber-200/60 p-5 rounded-2xl flex flex-col justify-between gap-4 shadow-sm relative overflow-hidden group hover:border-amber-400 transition-all"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-lg"></div>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {champ.type}
                    </span>
                    <Trophy className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-slate-400 font-bold">{champ.title}</div>
                    <div className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">{champ.userName}</div>
                    <div className="text-[10px] text-slate-500 font-medium leading-tight">{champ.achievement}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Standings Board */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Top 3 Podium showcase */}
            <div className="lg:col-span-4 bg-slate-950 text-white rounded-3xl p-6 shadow-xl space-y-6 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
              
              <div className="space-y-2 relative z-10">
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest block">Regional Podium</span>
                <h4 className="text-lg font-black text-slate-100">Top Local Recyclers</h4>
                <p className="text-xs text-slate-400">Standings computed dynamically across Bengaluru South.</p>
              </div>

              {/* Podium display */}
              <div className="flex justify-center items-end gap-3 pt-12 relative z-10 select-none">
                {/* Rank 2 */}
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-10 h-10 bg-slate-800 border border-slate-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    PS
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 truncate w-20 text-center">Priya</span>
                  <div className="w-full bg-slate-800 h-16 rounded-t-xl flex items-center justify-center border-t border-slate-700">
                    <span className="font-extrabold text-slate-300 text-sm">2nd</span>
                  </div>
                </div>

                {/* Rank 1 */}
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-12 h-12 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center font-bold text-base shadow-lg ring-4 ring-amber-500/20">
                    RK
                  </div>
                  <span className="text-[10px] font-bold text-white truncate w-20 text-center">Ravi K</span>
                  <div className="w-full bg-emerald-600 h-24 rounded-t-xl flex items-center justify-center border-t border-emerald-500 shadow-lg">
                    <span className="font-extrabold text-white text-lg">🥇</span>
                  </div>
                </div>

                {/* Rank 3 */}
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-10 h-10 bg-slate-800 border border-slate-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    KP
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 truncate w-20 text-center">Kiran</span>
                  <div className="w-full bg-slate-800 h-12 rounded-t-xl flex items-center justify-center border-t border-slate-700">
                    <span className="font-extrabold text-slate-400 text-sm">3rd</span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-500 text-center pt-2">
                Scores refresh every 24 hours
              </div>
            </div>

            {/* List Board of Rank positions */}
            <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm glow-shadow space-y-4">
              <h4 className="font-extrabold text-slate-900 text-base">City Standings</h4>
              
              <div className="divide-y divide-slate-50">
                {fullLeaderboard.map((u) => (
                  <div
                    key={u.name}
                    className={`flex justify-between items-center py-4 ${
                      u.isMe ? 'bg-emerald-50/50 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl border-x-2 border-emerald-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Tag */}
                      <span className={`w-6 text-center font-mono font-extrabold text-sm ${
                        u.rank === 1 ? 'text-amber-500' : u.rank === 2 ? 'text-slate-400' : u.rank === 3 ? 'text-amber-800' : 'text-slate-500'
                      }`}>
                        #{u.rank}
                      </span>
                      {/* Avatar */}
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-xs text-slate-700 uppercase ${
                        u.isMe ? 'bg-emerald-600 text-white' : 'bg-slate-100'
                      }`}>
                        {u.avatarSeed.substring(0, 2)}
                      </div>
                      <span className={`font-bold text-sm ${u.isMe ? 'text-emerald-950 font-black' : 'text-slate-800'}`}>
                        {u.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-950">{u.points}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">PTS</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* BADGES GALLERY VIEW */}
      {subTab === 'badges' && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm glow-shadow space-y-6">
          <div className="space-y-1">
            <h3 className="font-extrabold text-lg text-slate-900">Achievement Milestones</h3>
            <p className="text-sm text-slate-500">Complete tasks to unlock official community recognition badges.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => {
              const Icon = getBadgeIcon(badge.iconName);
              const isUnlocked = badge.progressCurrent >= badge.progressMax;
              const pct = Math.min((badge.progressCurrent / badge.progressMax) * 100, 100);

              return (
                <div
                  id={`badge-card-${badge.id}`}
                  key={badge.id}
                  className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between gap-6 relative overflow-hidden ${
                    isUnlocked
                      ? 'border-emerald-600 bg-emerald-50/25 shadow-sm'
                      : 'border-slate-100 bg-white opacity-85'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div
                      className={`p-4 rounded-2xl ${
                        isUnlocked
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
                      {isUnlocked ? (
                        <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Unlock className="w-3 h-3" /> Unlocked
                        </span>
                      ) : (
                        <span className="text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-black text-slate-900 text-base">{badge.title}</h4>
                    <p className="text-xs text-slate-500 leading-normal min-h-[32px]">{badge.description}</p>
                  </div>

                  {/* Progress Criteria Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>CRITERIA CRITERIA</span>
                      <span>{badge.progressCurrent} / {badge.progressMax}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isUnlocked ? 'bg-emerald-600' : 'bg-slate-300'
                        }`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
