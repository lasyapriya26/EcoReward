/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  MapPin, CheckCircle, Clock, Truck, ShieldCheck, Coins, Award,
  AlertTriangle, Phone, Star, ChevronRight, UserCheck, Play
} from 'lucide-react';
import { DonationRequest, PickupStatus } from '../types';

interface TrackingPageProps {
  request: DonationRequest;
  onAdvanceStatus: (requestId: string) => void;
  onResetStatus: (requestId: string) => void;
  onBackToDashboard: () => void;
}

const TIMELINE_STEPS: { status: PickupStatus; label: string; desc: string }[] = [
  { status: 'Submitted', label: 'Request Submitted', desc: 'Doorstep pickup request received. Pending scheduling verification.' },
  { status: 'Collector Assigned', label: 'Collector Assigned', desc: 'Vetted Eco-partner assigned. Preparing vehicle checklist.' },
  { status: 'In Transit', label: 'Collector On The Way', desc: 'Partner has left the recycling depot. Arriving at address shortly.' },
  { status: 'Collected', label: 'Collected', desc: 'Items safely collected from address and weighed.' },
  { status: 'Verifying', label: 'Verification In Progress', desc: 'Depot quality checks underway to validate materials category.' },
  { status: 'Verified', label: 'Verified', desc: 'Classification complete. Item catalog and weight checks approved.' },
  { status: 'Completed', label: 'Points Credited', desc: 'Reward points securely credited to your user wallet!' }
];

export default function TrackingPage({
  request,
  onAdvanceStatus,
  onResetStatus,
  onBackToDashboard
}: TrackingPageProps) {
  
  // Find current step index
  const currentStepIndex = TIMELINE_STEPS.findIndex(s => s.status === request.status);

  // Simulated collector profile
  const collector = {
    name: request.collectorName || 'Karthik Gowda',
    phone: request.collectorPhone || '+91 98450 12345',
    rating: 4.8,
    trips: 124,
    avatarSeed: 'Karthik'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <button
          onClick={onBackToDashboard}
          className="text-sm font-semibold text-slate-500 hover:text-emerald-800 transition-all"
        >
          ← Back to Dashboard
        </button>
        <span className="text-xs font-mono text-slate-400 bg-slate-100 px-3 py-1 rounded-full font-bold">
          Pickup ID: {request.id}
        </span>
      </div>

      {/* SANDBOX SIMULATION CONTROL PANEL */}
      <div className="bg-emerald-50 border-2 border-emerald-200 p-5 rounded-3xl space-y-4 glow-shadow">
        <div className="flex items-center gap-2">
          <Play className="w-5 h-5 text-emerald-700" />
          <h3 className="text-emerald-800 font-extrabold text-base">Sandbox Status Simulator</h3>
        </div>
        <p className="text-xs text-emerald-800 font-medium">
          In a real-world scenario, the driver and depot partners update status logs. 
          Use these control triggers to simulate real-time pickup actions and watch your reward points be credited!
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onAdvanceStatus(request.id)}
            disabled={request.status === 'Completed'}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 rounded-xl transition-all shadow-sm"
          >
            {request.status === 'Completed' ? '✓ Fully Credited' : 'Advance Next Stage →'}
          </button>
          <button
            onClick={() => onResetStatus(request.id)}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-sm"
          >
            Reset to Submitted ↺
          </button>
        </div>
      </div>

      {/* Two Columns: Timeline left, Collector right */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Timeline Progress UI */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-8 glow-shadow">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900">Doorstep Collection Tracking</h2>
            <p className="text-xs text-slate-500">Live progress feed updates directly from dispatch team.</p>
          </div>

          <div className="relative pl-6 space-y-8">
            {/* Background connecting bar */}
            <div className="absolute left-10 top-2 bottom-2 w-0.5 bg-slate-100"></div>

            {TIMELINE_STEPS.map((step, idx) => {
              const isPast = currentStepIndex > idx;
              const isCurrent = currentStepIndex === idx;
              const isFuture = currentStepIndex < idx;

              return (
                <div key={step.status} className="relative flex gap-6 items-start">
                  
                  {/* Circle indicators */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        isPast
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-white border-emerald-600 text-emerald-800 ring-4 ring-emerald-50 scale-110 z-10'
                          : 'bg-white border-slate-200 text-slate-300'
                      }`}
                    >
                      {isPast ? (
                        <span className="text-[10px] font-black">✓</span>
                      ) : (
                        <span className="text-xs font-bold">{idx + 1}</span>
                      )}
                    </div>
                  </div>

                  {/* Text descriptions */}
                  <div className="space-y-1">
                    <h4
                      className={`font-extrabold text-sm ${
                        isCurrent ? 'text-emerald-800' : isFuture ? 'text-slate-400' : 'text-slate-700'
                      }`}
                    >
                      {step.label}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-md">{step.desc}</p>
                    {isCurrent && (
                      <span className="inline-block mt-2 text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                        Active Step
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Collector profile & Summary */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Collector profile */}
          {currentStepIndex >= 1 && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-6">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Assigned Dispatcher</span>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center font-black text-white text-xl uppercase shadow-md">
                  {collector.name.substring(0, 2)}
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-100">{collector.name}</h4>
                  <div className="flex items-center gap-1.5 mt-1 text-xs">
                    <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" /> {collector.rating}
                    </span>
                    <span className="text-slate-400">• {collector.trips} verified pickups</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <a
                  href={`tel:${collector.phone}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold tracking-wide text-slate-200 border border-slate-700 transition-all"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  Call Collector
                </a>
              </div>
            </div>
          )}

          {/* Quick Details summaries */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm glow-shadow space-y-4">
            <h4 className="font-extrabold text-slate-900 text-sm">Pickup Parameters</h4>
            
            <div className="space-y-3 text-xs text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>Estimated Points</span>
                <span className="font-bold text-amber-600">+{request.estimatedPoints} Points</span>
              </div>
              <div className="flex justify-between">
                <span>Date Selected</span>
                <span className="font-bold text-slate-800">{request.pickupDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Timeslot Slot</span>
                <span className="font-bold text-slate-800">{request.pickupTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span>Address Node</span>
                <span className="font-bold text-slate-800 uppercase">{request.addressType}</span>
              </div>
              <div className="pt-2 border-t border-slate-50 flex flex-col gap-1 text-[11px] text-slate-400">
                <span>Delivery Address:</span>
                <span className="text-slate-600 leading-normal line-clamp-2">{request.address}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
