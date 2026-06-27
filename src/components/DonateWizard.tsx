/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BookOpen, Smile, Recycle, ShoppingBag, Radio, Cpu, HardHat,
  Sparkles, Calendar, Clock, MapPin, ArrowLeft, ArrowRight,
  Upload, AlertCircle, CheckCircle, Image, Coins
} from 'lucide-react';
import {
  DonationCategory, DonationDetails, DonationRequest,
  BookDetail, ToyDetail, ClothesDetail, PlasticDetail,
  PaperDetail, EWasteDetail, MetalDetail
} from '../types';
import { POINTS_MULTIPLIERS, SIMULATED_AI_PRESETS } from '../data';

interface DonateWizardProps {
  userId: string;
  onAddRequest: (request: DonationRequest) => void;
  onBackToDashboard: () => void;
  preselectedCategory?: DonationCategory;
}

const CATEGORY_INFO: { id: DonationCategory; label: string; icon: any; color: string; desc: string }[] = [
  { id: 'books', label: 'Books', icon: BookOpen, color: 'text-blue-600 bg-blue-50 border-blue-100', desc: 'Textbooks, stories, literature' },
  { id: 'toys', label: 'Toys', icon: Smile, color: 'text-amber-500 bg-amber-50 border-amber-100', desc: 'Blocks, dolls, educational toys' },
  { id: 'clothes', label: 'Clothes', icon: ShoppingBag, color: 'text-indigo-600 bg-indigo-50 border-indigo-100', desc: 'Apparel, towels, blankets' },
  { id: 'plastic', label: 'Plastic', icon: Recycle, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', desc: 'Bottles, plastic jugs, tubs' },
  { id: 'paper', label: 'Paper', icon: Radio, color: 'text-stone-600 bg-stone-50 border-stone-100', desc: 'Cardboard, newspapers, flyers' },
  { id: 'ewaste', label: 'E-Waste', icon: Cpu, color: 'text-cyan-600 bg-cyan-50 border-cyan-100', desc: 'Cables, battery, chargers, phones' },
  { id: 'metal', label: 'Metal', icon: HardHat, color: 'text-zinc-600 bg-zinc-50 border-zinc-100', desc: 'Soda cans, iron pipes, steel frames' },
];

export default function DonateWizard({ userId, onAddRequest, onBackToDashboard, preselectedCategory }: DonateWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<DonationCategory[]>(
    preselectedCategory ? [preselectedCategory] : []
  );

  // Smart Form State details
  const [booksState, setBooksState] = useState<BookDetail>({ count: 5, condition: 'Good' });
  const [toysState, setToysState] = useState<ToyDetail>({ quantity: 3, ageGroup: '6-10 Years' });
  const [clothesState, setClothesState] = useState<ClothesDetail>({ quantity: 6, category: 'Kids' });
  const [plasticState, setPlasticState] = useState<PlasticDetail>({ weight: 2.0, type: 'Bottles' });
  const [paperState, setPaperState] = useState<PaperDetail>({ weight: 4.0, type: 'Newspaper' });
  const [ewasteState, setEWasteState] = useState<EWasteDetail>({ weight: 1.5, type: 'Cable' });
  const [metalState, setMetalState] = useState<MetalDetail>({ weight: 2.0, type: 'Aluminium' });

  // AI Image upload states
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<{
    detectedCategory: string;
    confidence: number;
    pointsGained: number;
    label: string;
  } | null>(null);

  // Scheduling states
  const [pickupDate, setPickupDate] = useState('2026-06-25');
  const [pickupTimeSlot, setPickupTimeSlot] = useState<'9 AM - 12 PM' | '12 PM - 3 PM' | '3 PM - 6 PM'>('12 PM - 3 PM');
  const [addressType, setAddressType] = useState<'Home' | 'Hostel' | 'Office' | 'Custom'>('Home');
  const [addressLine, setAddressLine] = useState('Flat 402, Green Meadows, Sector 12, Bengaluru');

  // Error/validation messages
  const [wizardError, setWizardError] = useState('');

  // Handle auto-population of address type
  useEffect(() => {
    if (addressType === 'Home') {
      setAddressLine('Flat 402, Green Meadows, Sector 12, Bengaluru');
    } else if (addressType === 'Office') {
      setAddressLine('WeWork Tech Park, Tower B, Level 4, Bengaluru');
    } else if (addressType === 'Hostel') {
      setAddressLine('Room 214, Block C, Green Oasis Student Hostel, Bengaluru');
    }
  }, [addressType]);

  // Toggle Category selection
  const handleToggleCategory = (cat: DonationCategory) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
    setWizardError('');
  };

  // Image scanner helper
  const triggerImageUploadSim = (presetIdx?: number) => {
    setAiAnalyzing(true);
    setAiAnalysisResult(null);

    // Simulate analysis delay
    setTimeout(() => {
      let preset = SIMULATED_AI_PRESETS[presetIdx !== undefined ? presetIdx : 0];
      setUploadedImage('https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300&auto=format&fit=crop'); // beautiful mockup placeholder
      
      // Auto-toggle that category
      const targetCat = preset.category as DonationCategory;
      if (!selectedCategories.includes(targetCat)) {
        setSelectedCategories(prev => [...prev, targetCat]);
      }

      // Auto fill target detail states
      if (targetCat === 'books') {
        setBooksState(preset.details as BookDetail);
      } else if (targetCat === 'plastic') {
        setPlasticState(preset.details as PlasticDetail);
      } else if (targetCat === 'toys') {
        setToysState(preset.details as ToyDetail);
      } else if (targetCat === 'clothes') {
        setClothesState(preset.details as ClothesDetail);
      } else if (targetCat === 'ewaste') {
        setEWasteState(preset.details as EWasteDetail);
      }

      setAiAnalysisResult({
        detectedCategory: preset.category,
        confidence: preset.confidence,
        pointsGained: preset.estimatedPoints,
        label: preset.detectedLabel
      });
      setAiAnalyzing(false);
    }, 2200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Any file acts as a trigger to run standard simulator for Books stack
      triggerImageUploadSim(0);
    }
  };

  // Calculate points on the fly
  const calculateEstimatedPoints = () => {
    let pts = 0;
    if (selectedCategories.includes('books')) {
      pts += booksState.count * POINTS_MULTIPLIERS.books;
    }
    if (selectedCategories.includes('toys')) {
      pts += toysState.quantity * POINTS_MULTIPLIERS.toys;
    }
    if (selectedCategories.includes('clothes')) {
      pts += clothesState.quantity * POINTS_MULTIPLIERS.clothes;
    }
    if (selectedCategories.includes('plastic')) {
      pts += Math.ceil(plasticState.weight * POINTS_MULTIPLIERS.plastic);
    }
    if (selectedCategories.includes('paper')) {
      pts += Math.ceil(paperState.weight * POINTS_MULTIPLIERS.paper);
    }
    if (selectedCategories.includes('ewaste')) {
      pts += Math.ceil(ewasteState.weight * POINTS_MULTIPLIERS.ewaste);
    }
    if (selectedCategories.includes('metal')) {
      pts += Math.ceil(metalState.weight * POINTS_MULTIPLIERS.metal);
    }
    return pts;
  };

  // Navigations with checks
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (selectedCategories.length === 0) {
        setWizardError('Please select at least one donation category to proceed.');
        return;
      }
    }
    if (currentStep === 4) {
      if (!addressLine.trim()) {
        setWizardError('Please enter a pickup address.');
        return;
      }
    }
    setWizardError('');
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setWizardError('');
    setCurrentStep(prev => prev - 1);
  };

  const handleFinalSubmit = () => {
    const finalDetails: DonationDetails = {};
    if (selectedCategories.includes('books')) finalDetails.books = booksState;
    if (selectedCategories.includes('toys')) finalDetails.toys = toysState;
    if (selectedCategories.includes('clothes')) finalDetails.clothes = clothesState;
    if (selectedCategories.includes('plastic')) finalDetails.plastic = plasticState;
    if (selectedCategories.includes('paper')) finalDetails.paper = paperState;
    if (selectedCategories.includes('ewaste')) finalDetails.ewaste = ewasteState;
    if (selectedCategories.includes('metal')) finalDetails.metal = metalState;

    const newRequest: DonationRequest = {
      id: 'TXN-' + Math.floor(10000 + Math.random() * 90000),
      userId,
      categories: selectedCategories,
      details: finalDetails,
      images: uploadedImage ? [uploadedImage] : [],
      estimatedPoints: calculateEstimatedPoints(),
      pickupDate,
      pickupTimeSlot,
      addressType,
      address: addressLine,
      status: 'Submitted',
      createdAt: new Date().toISOString()
    };

    onAddRequest(newRequest);
  };

  const currentPoints = calculateEstimatedPoints();

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-emerald-800 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <span className="text-xs font-bold text-slate-400">STEP {currentStep} OF 4</span>
      </div>

      {/* Wizard Progress Line */}
      <div className="flex justify-between items-center relative">
        <div className="absolute left-0 right-0 h-1 bg-slate-100 top-4 -z-10 rounded-full"></div>
        <div
          className="absolute left-0 h-1 bg-emerald-500 top-4 -z-10 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        ></div>

        {[
          { label: 'Categories', step: 1 },
          { label: 'Item Details', step: 2 },
          { label: 'AI Scanner', step: 3 },
          { label: 'Pickup Details', step: 4 },
        ].map((s) => (
          <div key={s.step} className="flex flex-col items-center gap-2">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                currentStep > s.step
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : currentStep === s.step
                  ? 'bg-white border-emerald-600 text-emerald-800 ring-4 ring-emerald-50'
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              {s.step}
            </div>
            <span className={`text-xs font-bold ${currentStep === s.step ? 'text-emerald-800' : 'text-slate-400'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {wizardError && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-800 rounded-2xl flex items-center gap-2 text-sm font-semibold">
          <AlertCircle className="w-4 h-4" /> {wizardError}
        </div>
      )}

      {/* STEP 1: CATEGORY SELECTION */}
      {currentStep === 1 && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 glow-shadow">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">What would you like to donate or recycle?</h2>
            <p className="text-sm text-slate-500">Select one or multiple categories in the same request.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORY_INFO.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <div
                  id={`cat-card-${cat.id}`}
                  key={cat.id}
                  onClick={() => handleToggleCategory(cat.id)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between gap-4 h-40 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/60 ring-4 ring-emerald-50'
                      : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-xl ${cat.color} inline-block`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <span className="text-[10px] font-black">✓</span>}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900">{cat.label}</div>
                    <div className="text-xs text-slate-500 line-clamp-1">{cat.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: SMART ITEM DETAILS */}
      {currentStep === 2 && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-8 glow-shadow">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Provide Specific Quantities & Weights</h2>
            <p className="text-sm text-slate-500">Provide accurate details to get an estimated point reward before pickup.</p>
          </div>

          <div className="space-y-8 divide-y divide-slate-100">
            {/* Books Form */}
            {selectedCategories.includes('books') && (
              <div className="pt-6 first:pt-0 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg">
                  <BookOpen className="w-5 h-5 text-blue-500" /> Books Details
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">NUMBER OF BOOKS</label>
                    <input
                      type="number"
                      min={1}
                      value={booksState.count}
                      onChange={(e) => setBooksState({ ...booksState, count: Math.max(1, parseInt(e.target.value) || 0) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">CONDITION</label>
                    <select
                      value={booksState.condition}
                      onChange={(e) => setBooksState({ ...booksState, condition: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>New</option>
                      <option>Good</option>
                      <option>Fair</option>
                      <option>Damaged</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Toys Form */}
            {selectedCategories.includes('toys') && (
              <div className="pt-6 first:pt-0 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg">
                  <Smile className="w-5 h-5 text-amber-500" /> Toys Details
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">QUANTITY</label>
                    <input
                      type="number"
                      min={1}
                      value={toysState.quantity}
                      onChange={(e) => setToysState({ ...toysState, quantity: Math.max(1, parseInt(e.target.value) || 0) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">AGE GROUP</label>
                    <select
                      value={toysState.ageGroup}
                      onChange={(e) => setToysState({ ...toysState, ageGroup: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>3-5 Years</option>
                      <option>6-10 Years</option>
                      <option>11+ Years</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Clothes Form */}
            {selectedCategories.includes('clothes') && (
              <div className="pt-6 first:pt-0 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg">
                  <ShoppingBag className="w-5 h-5 text-indigo-500" /> Clothes Details
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">QUANTITY</label>
                    <input
                      type="number"
                      min={1}
                      value={clothesState.quantity}
                      onChange={(e) => setClothesState({ ...clothesState, quantity: Math.max(1, parseInt(e.target.value) || 0) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">CATEGORY</label>
                    <select
                      value={clothesState.category}
                      onChange={(e) => setClothesState({ ...clothesState, category: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Men</option>
                      <option>Women</option>
                      <option>Kids</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Plastic Form */}
            {selectedCategories.includes('plastic') && (
              <div className="pt-6 first:pt-0 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg">
                  <Recycle className="w-5 h-5 text-emerald-500" /> Plastic Details
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">ESTIMATED WEIGHT (KG)</label>
                    <input
                      type="number"
                      step={0.1}
                      min={0.1}
                      value={plasticState.weight}
                      onChange={(e) => setPlasticState({ ...plasticState, weight: Math.max(0.1, parseFloat(e.target.value) || 0) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">PLASTIC TYPE</label>
                    <select
                      value={plasticState.type}
                      onChange={(e) => setPlasticState({ ...plasticState, type: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Bottles</option>
                      <option>Containers</option>
                      <option>Mixed Plastic</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Paper Form */}
            {selectedCategories.includes('paper') && (
              <div className="pt-6 first:pt-0 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg">
                  <Radio className="w-5 h-5 text-stone-500" /> Paper Details
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">ESTIMATED WEIGHT (KG)</label>
                    <input
                      type="number"
                      step={0.1}
                      min={0.1}
                      value={paperState.weight}
                      onChange={(e) => setPaperState({ ...paperState, weight: Math.max(0.1, parseFloat(e.target.value) || 0) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">PAPER TYPE</label>
                    <select
                      value={paperState.type}
                      onChange={(e) => setPaperState({ ...paperState, type: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Newspaper</option>
                      <option>Cardboard</option>
                      <option>Mixed Paper</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* E-Waste Form */}
            {selectedCategories.includes('ewaste') && (
              <div className="pt-6 first:pt-0 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg">
                  <Cpu className="w-5 h-5 text-cyan-500" /> E-Waste Details
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">ESTIMATED WEIGHT (KG)</label>
                    <input
                      type="number"
                      step={0.1}
                      min={0.1}
                      value={ewasteState.weight}
                      onChange={(e) => setEWasteState({ ...ewasteState, weight: Math.max(0.1, parseFloat(e.target.value) || 0) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">E-WASTE TYPE</label>
                    <select
                      value={ewasteState.type}
                      onChange={(e) => setEWasteState({ ...ewasteState, type: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Mobile</option>
                      <option>Laptop</option>
                      <option>Cable</option>
                      <option>Battery</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Metal Form */}
            {selectedCategories.includes('metal') && (
              <div className="pt-6 first:pt-0 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg">
                  <HardHat className="w-5 h-5 text-zinc-500" /> Metal Details
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">ESTIMATED WEIGHT (KG)</label>
                    <input
                      type="number"
                      step={0.1}
                      min={0.1}
                      value={metalState.weight}
                      onChange={(e) => setMetalState({ ...metalState, weight: Math.max(0.1, parseFloat(e.target.value) || 0) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">METAL TYPE</label>
                    <select
                      value={metalState.type}
                      onChange={(e) => setMetalState({ ...metalState, type: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Iron</option>
                      <option>Steel</option>
                      <option>Aluminium</option>
                      <option>Mixed Metal</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: PHOTO UPLOAD AND SMART AI SCANNER MOCKUP */}
      {currentStep === 3 && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-8 glow-shadow">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-600" /> Upload Photo & Run AI Vision Scanner
            </h2>
            <p className="text-sm text-slate-500">
              Upload a picture of your items. Our Eco-Vision AI scanner predicts the categories, weights, quantities and estimates rewards automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Upload Zone */}
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all bg-slate-50 hover:bg-emerald-50/20 relative">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="p-4 bg-white rounded-full text-slate-400 border border-slate-100 shadow-sm">
                  <Upload className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-center">
                  <span className="font-bold text-slate-700 block text-sm">Drag and drop file here</span>
                  <span className="text-xs text-slate-400 block mt-1">Supports JPEG, PNG, WEBP files</span>
                </div>
              </div>

              {/* Sandbox Sample Images */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Sandbox Sample Presets (Click to test scanner)</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SIMULATED_AI_PRESETS.map((preset, idx) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => triggerImageUploadSim(idx)}
                      className="px-3 py-2 text-left bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/50 hover:border-emerald-200 rounded-xl text-xs font-bold transition-all line-clamp-1"
                    >
                      📷 {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Scanner Visualizer Display */}
            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl glow-shadow space-y-6 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
              
              {/* Scan effect lines */}
              {aiAnalyzing && (
                <div className="absolute inset-x-0 h-1 bg-emerald-500 top-0 shadow-lg shadow-emerald-400 animate-[bounce_2s_infinite]"></div>
              )}

              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full bg-emerald-400 ${aiAnalyzing ? 'animate-ping' : ''}`}></span>
                  Eco-Vision AI Core
                </span>
                <span className="text-[10px] text-slate-500 font-mono">v1.4.2_ONLINE</span>
              </div>

              {/* Screen feedback */}
              <div className="flex-grow flex flex-col items-center justify-center py-6">
                {aiAnalyzing ? (
                  <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400 mx-auto"></div>
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-emerald-300">SCANNING IMAGE CONTOURS...</div>
                      <div className="text-[10px] font-mono text-slate-400">Comparing density parameters</div>
                    </div>
                  </div>
                ) : aiAnalysisResult ? (
                  <div className="w-full space-y-4">
                    <div className="p-4 bg-emerald-950/50 border border-emerald-800/50 rounded-xl flex items-start gap-4">
                      <div className="p-2.5 bg-emerald-600 text-white rounded-lg">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-mono text-emerald-400">OBJECT DETECTED SUCCESSFULLY</div>
                        <div className="text-lg font-extrabold text-white">{aiAnalysisResult.label}</div>
                        <div className="text-xs text-slate-300">Category classified as <span className="font-bold text-emerald-400 uppercase">{aiAnalysisResult.detectedCategory}</span></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                      <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/30">
                        <span className="text-slate-400 block">Confidence Score</span>
                        <span className="text-emerald-400 font-extrabold text-base">{aiAnalysisResult.confidence}%</span>
                      </div>
                      <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/30">
                        <span className="text-slate-400 block">Est. Rewards</span>
                        <span className="text-amber-400 font-extrabold text-base">+{aiAnalysisResult.pointsGained} Pts</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3 py-6">
                    <Image className="w-12 h-12 text-slate-600 mx-auto" />
                    <div className="text-sm text-slate-400 font-medium">Camera Feed Standby</div>
                    <p className="text-xs text-slate-500 max-w-xs">
                      Drag a photo or choose a sandbox preset image on the left to activate smart scanning.
                    </p>
                  </div>
                )}
              </div>

              <div className="text-[10px] font-mono text-slate-500 flex justify-between items-center pt-4 border-t border-slate-800">
                <span>GPU Acceleration Enabled</span>
                <span>FP-16 Precision Mode</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: SUMMARY & SCHEDULING DETAILS */}
      {currentStep === 4 && (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Scheduling details (Date, Time, Address) */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 glow-shadow">
            <h2 className="text-2xl font-black text-slate-900">Pickup Scheduling & Address</h2>
            <p className="text-xs text-slate-500">Pick a preferred timeslot and doorstep location for our representative.</p>

            {/* Date & Time Slot */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 block">PICKUP DATE</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 block">TIME SLOT</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <select
                    value={pickupTimeSlot}
                    onChange={(e) => setPickupTimeSlot(e.target.value as any)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option>9 AM - 12 PM</option>
                    <option>12 PM - 3 PM</option>
                    <option>3 PM - 6 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address Type selection buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 block font-bold">ADDRESS PRESETS</label>
              <div className="grid grid-cols-4 gap-2">
                {(['Home', 'Hostel', 'Office', 'Custom'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAddressType(type)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      addressType === type
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom address box */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 block">COMPLETE DOORSTEP ADDRESS</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <textarea
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="Street name, landmark, house number, area"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[80px]"
                />
              </div>
            </div>

            {/* GPS Map mockup */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Doorstep GPS Tagging (Future Map Integration)</span>
              <div className="h-28 bg-slate-100 rounded-2xl border border-slate-200 relative overflow-hidden flex items-center justify-center">
                {/* SVG Mock Map Grid */}
                <svg className="absolute inset-0 w-full h-full text-slate-200 opacity-60" fill="none">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <path d="M 0,40 Q 150,80 300,50 T 600,80" fill="none" stroke="#22c55e" strokeWidth="3" opacity="0.4" />
                  <circle cx="150" cy="50" r="40" fill="#22c55e" fillOpacity="0.1" />
                </svg>
                <div className="relative z-10 flex flex-col items-center gap-1 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <MapPin className="w-3.5 h-3.5 text-red-500 animate-bounce" /> Verified Pin Coordinate
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Lat 12.9716, Long 77.5946 (Bengaluru Central)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reward Estimation invoice summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/30 rounded-full blur-xl"></div>
              
              <div className="pb-4 border-b border-slate-800">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">REWARD POINTS CALCULATOR</span>
                <h3 className="font-extrabold text-xl mt-1">Invoice Statement</h3>
              </div>

              {/* Items Detail breakdown */}
              <div className="space-y-4">
                {selectedCategories.includes('books') && (
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <div className="flex items-center gap-2 text-slate-300">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <span>Books ({booksState.count})</span>
                    </div>
                    <span className="text-amber-400 font-bold">+{booksState.count * POINTS_MULTIPLIERS.books} Pts</span>
                  </div>
                )}
                {selectedCategories.includes('toys') && (
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Smile className="w-4 h-4 text-amber-400" />
                      <span>Toys ({toysState.quantity})</span>
                    </div>
                    <span className="text-amber-400 font-bold">+{toysState.quantity * POINTS_MULTIPLIERS.toys} Pts</span>
                  </div>
                )}
                {selectedCategories.includes('clothes') && (
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <div className="flex items-center gap-2 text-slate-300">
                      <ShoppingBag className="w-4 h-4 text-indigo-400" />
                      <span>Clothes ({clothesState.quantity})</span>
                    </div>
                    <span className="text-amber-400 font-bold">+{clothesState.quantity * POINTS_MULTIPLIERS.clothes} Pts</span>
                  </div>
                )}
                {selectedCategories.includes('plastic') && (
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Recycle className="w-4 h-4 text-emerald-400" />
                      <span>Plastic ({plasticState.weight} KG)</span>
                    </div>
                    <span className="text-amber-400 font-bold">+{Math.ceil(plasticState.weight * POINTS_MULTIPLIERS.plastic)} Pts</span>
                  </div>
                )}
                {selectedCategories.includes('paper') && (
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Radio className="w-4 h-4 text-stone-400" />
                      <span>Paper ({paperState.weight} KG)</span>
                    </div>
                    <span className="text-amber-400 font-bold">+{Math.ceil(paperState.weight * POINTS_MULTIPLIERS.paper)} Pts</span>
                  </div>
                )}
                {selectedCategories.includes('ewaste') && (
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>E-Waste ({ewasteState.weight} KG)</span>
                    </div>
                    <span className="text-amber-400 font-bold">+{Math.ceil(ewasteState.weight * POINTS_MULTIPLIERS.ewaste)} Pts</span>
                  </div>
                )}
                {selectedCategories.includes('metal') && (
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <div className="flex items-center gap-2 text-slate-300">
                      <HardHat className="w-4 h-4 text-zinc-400" />
                      <span>Metal ({metalState.weight} KG)</span>
                    </div>
                    <span className="text-amber-400 font-bold">+{Math.ceil(metalState.weight * POINTS_MULTIPLIERS.metal)} Pts</span>
                  </div>
                )}
              </div>

              {/* Total Summary */}
              <div className="pt-6 border-t border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-semibold text-xs">TOTAL ESTIMATED POINTS</span>
                  <div className="flex items-center gap-1.5 text-2xl font-black text-amber-400">
                    <Coins className="w-6 h-6" />
                    <span>{currentPoints}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-2xl flex items-center gap-2 text-[11px] text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified collectors weight-check items live to validate points.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Button Controls */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={currentStep === 1 ? onBackToDashboard : handlePrevStep}
          className="px-5 py-3 text-sm font-bold border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 hover:text-slate-700 transition-all"
        >
          {currentStep === 1 ? 'Cancel Schedule' : 'Go Back'}
        </button>

        {currentStep === 4 ? (
          <button
            id="wizard-complete-submit-btn"
            type="button"
            onClick={handleFinalSubmit}
            className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-lg shadow-emerald-200"
          >
            Confirm & Book Pickup
            <CheckCircle className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextStep}
            className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-lg shadow-emerald-200"
          >
            Continue Step
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
