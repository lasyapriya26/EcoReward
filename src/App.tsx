/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Leaf, LayoutDashboard, Calendar, History, Globe, Trophy, Share2,
  Building, LogOut, Menu, X, Coins, Heart, Smile, Sparkles, CheckCircle
} from 'lucide-react';

import { User, DonationRequest, Badge, DonationCategory } from './types';
import { INITIAL_BADGES, INITIAL_DONATION_HISTORY } from './data';

// Component imports
import Homepage from './components/Homepage';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import DonateWizard from './components/DonateWizard';
import TrackingPage from './components/TrackingPage';
import ImpactPage from './components/ImpactPage';
import Gamification from './components/Gamification';
import DonationHistory from './components/DonationHistory';
import ReferAndEarn from './components/ReferAndEarn';
import CommunityCauses from './components/CommunityCauses';

export default function App() {
  // Navigation / View states
  // 'landing' | 'auth' | 'app'
  const [viewMode, setViewMode] = useState<'landing' | 'auth' | 'app'>('landing');
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'donate' | 'history' | 'tracking' | 'impact' | 'gamification' | 'refer' | 'community'>('dashboard');
  
  // Mobile sidebar open/close
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Core Data States
  const [user, setUser] = useState<User | null>(null);
  const [donationRequests, setDonationRequests] = useState<DonationRequest[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  
  // Active tracking item
  const [activeTrackingId, setActiveTrackingId] = useState<string | null>(null);

  // Pre-selected cause category for wizard quick link
  const [wizardPreselectedCategory, setWizardPreselectedCategory] = useState<DonationCategory | undefined>(undefined);

  // Achievement unlock notifications
  const [badgeUnlockNotification, setBadgeUnlockNotification] = useState<string | null>(null);

  // Check login on startup
  useEffect(() => {
    const savedUserStr = localStorage.getItem('ecoreward_logged_in_user');
    const savedHistoryStr = localStorage.getItem('ecoreward_history');
    const savedBadgesStr = localStorage.getItem('ecoreward_badges');

    if (savedUserStr) {
      const parsedUser = JSON.parse(savedUserStr);
      setUser(parsedUser);
      setViewMode('app');
    }

    // Load or set initial history
    if (savedHistoryStr) {
      setDonationRequests(JSON.parse(savedHistoryStr));
    } else {
      setDonationRequests(INITIAL_DONATION_HISTORY);
      localStorage.setItem('ecoreward_history', JSON.stringify(INITIAL_DONATION_HISTORY));
    }

    // Load or set initial badges
    if (savedBadgesStr) {
      setBadges(JSON.parse(savedBadgesStr));
    } else {
      setBadges(INITIAL_BADGES);
      localStorage.setItem('ecoreward_badges', JSON.stringify(INITIAL_BADGES));
    }
  }, []);

  // Update user session in localStorage
  const updateCurrentUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('ecoreward_logged_in_user', JSON.stringify(updatedUser));

    // Also update in registered list
    const savedUsersStr = localStorage.getItem('ecoreward_users') || '[]';
    const savedUsers: User[] = JSON.parse(savedUsersStr);
    const updatedUsers = savedUsers.map(u => u.id === updatedUser.id ? updatedUser : u);
    localStorage.setItem('ecoreward_users', JSON.stringify(updatedUsers));
  };

  // Auth Callbacks
  const handleAuthSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('ecoreward_logged_in_user', JSON.stringify(loggedInUser));
    setViewMode('app');
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('ecoreward_logged_in_user');
    setUser(null);
    setViewMode('landing');
    setCurrentTab('dashboard');
    setMobileSidebarOpen(false);
  };

  // Add new Donation schedule
  const handleAddRequest = (request: DonationRequest) => {
    const updatedHistory = [request, ...donationRequests];
    setDonationRequests(updatedHistory);
    localStorage.setItem('ecoreward_history', JSON.stringify(updatedHistory));

    // Automatically select this item for tracking
    setActiveTrackingId(request.id);
    setCurrentTab('tracking');

    // Reset pre-selection category
    setWizardPreselectedCategory(undefined);
  };

  // Simulated status advancement & Wallet points payout!
  const handleAdvanceStatus = (requestId: string) => {
    if (!user) return;

    // Status cycle transition
    const statusCycle: { [key: string]: string } = {
      'Submitted': 'Collector Assigned',
      'Collector Assigned': 'In Transit',
      'In Transit': 'Collected',
      'Collected': 'Verifying',
      'Verifying': 'Verified',
      'Verified': 'Completed'
    };

    const updatedHistory = donationRequests.map((req) => {
      if (req.id === requestId) {
        const nextStatus = statusCycle[req.status] || req.status;
        const updatedReq = { ...req, status: nextStatus as any };

        // If newly COMPLETED, credit points to wallet & check badges!
        if (nextStatus === 'Completed') {
          const pointsEarned = req.estimatedPoints;
          const updatedUserPoints = user.points + pointsEarned;
          
          updateCurrentUser({
            ...user,
            points: updatedUserPoints
          });

          // Trigger badge checking
          checkAndProgressBadges(req);
        }

        return updatedReq;
      }
      return req;
    });

    setDonationRequests(updatedHistory);
    localStorage.setItem('ecoreward_history', JSON.stringify(updatedHistory));
  };

  const handleResetStatus = (requestId: string) => {
    const updatedHistory = donationRequests.map((req) => {
      if (req.id === requestId) {
        return { ...req, status: 'Submitted' as any };
      }
      return req;
    });
    setDonationRequests(updatedHistory);
    localStorage.setItem('ecoreward_history', JSON.stringify(updatedHistory));
  };

  // Badge unlock / progress criteria engine
  const checkAndProgressBadges = (completedRequest: DonationRequest) => {
    if (!user) return;

    // Load latest badges
    const updatedBadges = badges.map((badge) => {
      let currentProgress = badge.progressCurrent;

      // 1. First Donation Badge check
      if (badge.id === 'first_donation' && badge.progressCurrent < badge.progressMax) {
        currentProgress = 1;
      }

      // 2. Community Helper item totals check
      if (badge.id === 'community_helper') {
        let itemsCount = 0;
        if (completedRequest.details.books) itemsCount += completedRequest.details.books.count;
        if (completedRequest.details.toys) itemsCount += completedRequest.details.toys.quantity;
        if (completedRequest.details.clothes) itemsCount += completedRequest.details.clothes.quantity;
        
        currentProgress = Math.min(badge.progressMax, badge.progressCurrent + itemsCount);
      }

      // 3. Recycling Hero weights check
      if (badge.id === 'recycling_hero') {
        let weightRecycled = 0;
        if (completedRequest.details.plastic) weightRecycled += completedRequest.details.plastic.weight;
        if (completedRequest.details.paper) weightRecycled += completedRequest.details.paper.weight;
        if (completedRequest.details.metal) weightRecycled += completedRequest.details.metal.weight;

        currentProgress = Math.min(badge.progressMax, Math.round((badge.progressCurrent + weightRecycled) * 10) / 10);
      }

      // 4. Book Champion check
      if (badge.id === 'book_champion' && completedRequest.details.books) {
        currentProgress = Math.min(badge.progressMax, badge.progressCurrent + completedRequest.details.books.count);
      }

      // 5. Toy Giver check
      if (badge.id === 'toy_giver' && completedRequest.details.toys) {
        currentProgress = Math.min(badge.progressMax, badge.progressCurrent + completedRequest.details.toys.quantity);
      }

      // 6. Eco Warrior points check
      if (badge.id === 'eco_warrior') {
        const totalPointsEarned = user.points + completedRequest.estimatedPoints;
        currentProgress = Math.min(badge.progressMax, totalPointsEarned);
      }

      // Check if newly unlocked
      const previouslyLocked = badge.progressCurrent < badge.progressMax;
      const newlyUnlocked = currentProgress >= badge.progressMax;

      if (previouslyLocked && newlyUnlocked) {
        setBadgeUnlockNotification(badge.title);
        setTimeout(() => setBadgeUnlockNotification(null), 4000);
      }

      return {
        ...badge,
        progressCurrent: currentProgress,
        unlockedAt: newlyUnlocked ? new Date().toISOString() : badge.unlockedAt
      };
    });

    setBadges(updatedBadges);
    localStorage.setItem('ecoreward_badges', JSON.stringify(updatedBadges));
  };

  // Nav helper for community causes link
  const handleContributeToCause = (category: DonationCategory) => {
    setWizardPreselectedCategory(category);
    setCurrentTab('donate');
  };

  // NAVIGATION ITEMS LIST
  const NAV_ITEMS = [
    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { id: 'donate', label: 'Schedule Pickup', icon: Calendar },
    { id: 'history', label: 'Donation History', icon: History },
    { id: 'community', label: 'Community Requests', icon: Building },
    { id: 'impact', label: 'Impact Center', icon: Globe },
    { id: 'gamification', label: 'Leaderboard & Badges', icon: Trophy },
    { id: 'refer', label: 'Refer & Earn', icon: Share2 },
  ] as const;

  // View routing switcher
  if (viewMode === 'landing') {
    return (
      <Homepage
        onGetStarted={() => setViewMode('auth')}
        onLoginClick={() => setViewMode('auth')}
      />
    );
  }

  if (viewMode === 'auth') {
    return (
      <AuthScreen
        onAuthSuccess={handleAuthSuccess}
        onBackToHome={() => setViewMode('landing')}
      />
    );
  }

  // Dashboard / App Workspace View
  const activeRequest = activeTrackingId 
    ? donationRequests.find(r => r.id === activeTrackingId) || donationRequests[0]
    : donationRequests[0];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* Achievement Unlock Popup */}
      {badgeUnlockNotification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-slate-950 text-white px-6 py-4 rounded-3xl flex items-center gap-4 shadow-2xl z-50 border border-amber-400 animate-[bounce_1s_infinite]">
          <div className="p-2 bg-amber-500 rounded-2xl text-slate-950">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">NEW BADGE UNLOCKED!</div>
            <div className="text-sm font-black text-white">Congratulations! Unlocked "{badgeUnlockNotification}"</div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Panel */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 sticky top-0 h-screen py-6 px-4">
        
        {/* Brand Brand logo */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className="p-2 bg-emerald-600 rounded-xl text-white">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg text-white tracking-tight">ECOREWARD</span>
          </div>

          {/* Nav links */}
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  id={`sidebar-link-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    if (item.id === 'donate') setWizardPreselectedCategory(undefined);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-extrabold tracking-wide text-left transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                      : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Quick Info Box & Logout */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          {user && (
            <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-emerald-600 text-white font-extrabold text-xs rounded-full flex items-center justify-center">
                  {user.fullName.substring(0, 2).toUpperCase()}
                </div>
                <div className="max-w-[100px] truncate">
                  <span className="font-bold text-xs text-white block truncate">{user.fullName.split(' ')[0]}</span>
                  <span className="text-[10px] text-slate-400 font-medium">Eco-citizen</span>
                </div>
              </div>
              
              {/* Point pill */}
              <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full text-[10px] font-black">
                <Coins className="w-3.5 h-3.5" />
                <span>{user.points + (user.id === 'user_ravi' ? 350 : 0)}</span>
              </div>
            </div>
          )}

          <button
            id="sidebar-logout-btn"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all text-left"
          >
            <LogOut className="w-4 h-4" />
            Log Out Session
          </button>
        </div>

      </aside>

      {/* Mobile Drawer Navigation Panel */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 lg:hidden" onClick={() => setMobileSidebarOpen(false)}>
          <aside className="w-64 bg-slate-900 text-slate-300 h-full p-6 flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-500" />
                  <span className="font-bold text-white tracking-tight">ECOREWARD</span>
                </div>
                <button onClick={() => setMobileSidebarOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTab(item.id);
                        setMobileSidebarOpen(false);
                        if (item.id === 'donate') setWizardPreselectedCategory(undefined);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
                        isActive ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-800">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all text-left"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main viewport Container */}
      <div className="flex-grow flex flex-col min-h-screen">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-100 sticky top-0 z-40 px-4 sm:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-50 border border-slate-100 rounded-xl text-slate-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-extrabold text-sm sm:text-lg text-slate-900 tracking-tight capitalize">
              {NAV_ITEMS.find(n => n.id === currentTab)?.label || 'EcoReward Hub'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-3.5 py-1.5 rounded-2xl shadow-sm">
                <span className="text-[10px] text-slate-500 font-bold hidden sm:inline">WALLET WALLET</span>
                <div className="flex items-center gap-1 text-sm font-black text-amber-500">
                  <Coins className="w-4 h-4" />
                  <span>{user.points + (user.id === 'user_ravi' ? 350 : 0)} Pts</span>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-grow p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {user && (
            <>
              {currentTab === 'dashboard' && (
                <Dashboard
                  user={user}
                  onNavigateToDonate={() => setCurrentTab('donate')}
                  onNavigateToTracking={(id) => {
                    setActiveTrackingId(id);
                    setCurrentTab('tracking');
                  }}
                  donationRequests={donationRequests}
                  onNavigateToImpact={() => setCurrentTab('impact')}
                  onNavigateToLeaderboard={() => setCurrentTab('gamification')}
                />
              )}

              {currentTab === 'donate' && (
                <DonateWizard
                  userId={user.id}
                  onAddRequest={handleAddRequest}
                  onBackToDashboard={() => setCurrentTab('dashboard')}
                  preselectedCategory={wizardPreselectedCategory}
                />
              )}

              {currentTab === 'tracking' && activeRequest && (
                <TrackingPage
                  request={activeRequest}
                  onAdvanceStatus={handleAdvanceStatus}
                  onResetStatus={handleResetStatus}
                  onBackToDashboard={() => setCurrentTab('dashboard')}
                />
              )}

              {currentTab === 'history' && (
                <DonationHistory
                  requests={donationRequests}
                  onNavigateToTracking={(id) => {
                    setActiveTrackingId(id);
                    setCurrentTab('tracking');
                  }}
                />
              )}

              {currentTab === 'community' && (
                <CommunityCauses
                  onContributeToCause={handleContributeToCause}
                />
              )}

              {currentTab === 'impact' && (
                <ImpactPage />
              )}

              {currentTab === 'gamification' && (
                <Gamification
                  user={user}
                  badges={badges}
                />
              )}

              {currentTab === 'refer' && (
                <ReferAndEarn
                  user={user}
                />
              )}
            </>
          )}
        </main>

      </div>

    </div>
  );
}
