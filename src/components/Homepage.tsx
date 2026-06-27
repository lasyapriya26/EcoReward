/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Leaf, Award, Heart, ArrowRight, Shield, BookOpen, Smile, Recycle } from 'lucide-react';
import { motion } from 'motion/react';

interface HomepageProps {
  onGetStarted: () => void;
  onLoginClick: () => void;
}

export default function Homepage({ onGetStarted, onLoginClick }: HomepageProps) {
  return (
    <div className="min-h-screen gradient-bg text-slate-800 font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/70 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-600 rounded-xl text-white">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-emerald-800">ECOREWARD</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              id="nav-login-btn"
              onClick={onLoginClick}
              className="px-4 py-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-all"
            >
              Log In
            </button>
            <button
              id="nav-get-started-btn"
              onClick={onGetStarted}
              className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm shadow-emerald-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold tracking-wide uppercase">
              <Award className="w-4 h-4" /> Earn Rewards for Sustainability
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1]">
              Give Your Unused Items a <span className="text-emerald-600">New Life</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
              Donate books, toys, clothes and recyclable materials while earning rewards and helping your community. We pickup directly from your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                id="hero-cta-btn"
                onClick={onGetStarted}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-2xl transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transform hover:-translate-y-0.5"
              >
                Schedule First Pickup
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-2xl transition-all"
              >
                How it works
              </a>
            </div>

            {/* Micro Statistics Panel */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100">
              <div>
                <div className="text-3xl font-extrabold text-slate-900">45k+</div>
                <div className="text-sm text-slate-500 font-medium">Items Donated</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-emerald-600">12.5t</div>
                <div className="text-sm text-slate-500 font-medium">Waste Recycled</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-indigo-600">₹2.4M+</div>
                <div className="text-sm text-slate-500 font-medium">Community Value</div>
              </div>
            </div>
          </div>

          {/* Hero Illustration / Bento Teaser */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-emerald-400 rounded-3xl filter blur-3xl opacity-20 -z-10"></div>
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-xl glow-shadow space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                <span className="font-bold text-lg text-slate-900">Live Environmental Impact</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>

              {/* Stats item */}
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-emerald-600 text-white rounded-xl">
                    <Recycle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 font-semibold">CO2 EMISSIONS PREVENTED</div>
                    <div className="text-lg font-extrabold text-slate-800">48,250 KG</div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-blue-600 text-white rounded-xl">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 font-semibold">BOOKS DONATED TO SCHOOLS</div>
                    <div className="text-lg font-extrabold text-slate-800">14,810 Books</div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-amber-500 text-white rounded-xl">
                    <Smile className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 font-semibold">CHILDREN SMILED (TOYS GIVEN)</div>
                    <div className="text-lg font-extrabold text-slate-800">3,492 Smiles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-white py-24 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">How EcoReward Works</h2>
              <p className="text-lg text-slate-600">
                It takes less than 2 minutes to schedule a doorstep collection and make an impact.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative group hover:bg-emerald-50/50 hover:border-emerald-200 transition-all">
                <div className="absolute top-6 right-6 text-6xl font-black text-slate-200/50 group-hover:text-emerald-200/40 select-none">01</div>
                <div className="space-y-6">
                  <div className="p-3.5 bg-emerald-100 text-emerald-800 rounded-2xl inline-block">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">List and Categorize</h3>
                    <p className="text-slate-600">
                      Select multiple categories like plastic, books, clothes, or metal and snap a picture of them.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative group hover:bg-emerald-50/50 hover:border-emerald-200 transition-all">
                <div className="absolute top-6 right-6 text-6xl font-black text-slate-200/50 group-hover:text-emerald-200/40 select-none">02</div>
                <div className="space-y-6">
                  <div className="p-3.5 bg-indigo-100 text-indigo-800 rounded-2xl inline-block">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">Doorstep Collection</h3>
                    <p className="text-slate-600">
                      Select a preferred date and time slot. Our verified collectors will safely pickup and weight-check the items.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative group hover:bg-emerald-50/50 hover:border-emerald-200 transition-all">
                <div className="absolute top-6 right-6 text-6xl font-black text-slate-200/50 group-hover:text-emerald-200/40 select-none">03</div>
                <div className="space-y-6">
                  <div className="p-3.5 bg-amber-100 text-amber-800 rounded-2xl inline-block">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">Earn & Distribute</h3>
                    <p className="text-slate-600">
                      Get instant rewards points added to your wallet. Materials go to vetted recycling hubs or local needy organizations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="font-bold text-white tracking-tight">ECOREWARD</span>
          </div>
          <div className="text-sm">
            © 2026 EcoReward Platform. Empowering sustainable circular economies.
          </div>
        </div>
      </footer>
    </div>
  );
}
