/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Leaf, Mail, Lock, Phone, User, CheckCircle, AlertTriangle } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthScreenProps {
  onAuthSuccess: (user: UserType) => void;
  onBackToHome: () => void;
}

export default function AuthScreen({ onAuthSuccess, onBackToHome }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  
  // Registration States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Login States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Errors
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Pre-fill helpers for easy testing
  const handlePreFillTestUser = () => {
    if (isLogin) {
      setLoginEmail('ravi.kumar@ecoreward.org');
      setLoginPassword('ravi1234');
    } else {
      setFullName('Ravi Kumar');
      setEmail('ravi.kumar@ecoreward.org');
      setPhone('9876543210');
      setPassword('ravi1234');
      setConfirmPassword('ravi1234');
    }
    setError('');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Load registered users from localStorage
    const savedUsersStr = localStorage.getItem('ecoreward_users') || '[]';
    const savedUsers: UserType[] = JSON.parse(savedUsersStr);

    if (isLogin) {
      // Login flow
      if (!loginEmail || !loginPassword) {
        setError('Please fill in all fields.');
        return;
      }

      // We do a mock validation or search
      const foundUser = savedUsers.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
      
      // For instant onboarding, if they use the prefill we register or log them in automatically
      if (loginEmail === 'ravi.kumar@ecoreward.org' && loginPassword === 'ravi1234' && !foundUser) {
        // Create Ravi on the fly
        const newRavi: UserType = {
          id: 'user_ravi',
          fullName: 'Ravi Kumar',
          email: 'ravi.kumar@ecoreward.org',
          phone: '9876543210',
          points: 350, // ravi starts with some points!
          referralCode: 'RAVI50',
          referredCount: 2,
          referredPoints: 100
        };
        savedUsers.push(newRavi);
        localStorage.setItem('ecoreward_users', JSON.stringify(savedUsers));
        setSuccess('Success! Logging you in...');
        setTimeout(() => {
          onAuthSuccess(newRavi);
        }, 800);
        return;
      }

      if (!foundUser) {
        setError('User not found. Try registering first!');
        return;
      }

      setSuccess('Logged in successfully!');
      setTimeout(() => {
        onAuthSuccess(foundUser);
      }, 800);

    } else {
      // Registration validation
      if (!fullName || !email || !phone || !password || !confirmPassword) {
        setError('Please complete all form fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }

      // Phone validation (10 digits)
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone)) {
        setError('Please enter a valid 10-digit phone number.');
        return;
      }

      // Password length
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }

      // Confirm match
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      // Duplicate check
      const emailExists = savedUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        setError('An account with this email address already exists.');
        return;
      }

      // Generate a new user
      const newUser: UserType = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        fullName,
        email,
        phone,
        points: 0,
        referralCode: fullName.toUpperCase().split(' ')[0] + Math.floor(100 + Math.random() * 900),
        referredCount: 0,
        referredPoints: 0
      };

      savedUsers.push(newUser);
      localStorage.setItem('ecoreward_users', JSON.stringify(savedUsers));

      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        onAuthSuccess(newUser);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg px-4 py-12 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 p-8 shadow-xl glow-shadow space-y-8 relative">
        
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="absolute top-6 left-6 text-xs font-semibold text-slate-500 hover:text-emerald-700 hover:bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 transition-all"
        >
          ← Home
        </button>

        {/* Brand Header */}
        <div className="text-center pt-4">
          <div className="inline-flex p-3 bg-emerald-600 rounded-2xl text-white mb-3">
            <Leaf className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Join EcoReward'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {isLogin ? 'Access your dashboard & schedules' : 'Earn rewards by saving our landfills'}
          </p>
        </div>

        {/* Testing Shortcut */}
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-emerald-800 font-medium text-center sm:text-left">
            <span className="font-bold">Sandbox Mode:</span> Want to test immediately? Try our prefill account.
          </div>
          <button
            type="button"
            onClick={handlePreFillTestUser}
            className="text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl whitespace-nowrap transition-all"
          >
            Auto Prefill
          </button>
        </div>

        {/* Error / Success Banners */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-800 rounded-xl text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}
        {success && (
          <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span className="font-medium">{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {!isLogin && (
            <>
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ravi Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email Address */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="ravi.kumar@ecoreward.org"
                value={isLogin ? loginEmail : email}
                onChange={(e) => isLogin ? setLoginEmail(e.target.value) : setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="Min 6 characters"
                value={isLogin ? loginPassword : password}
                onChange={(e) => isLogin ? setLoginPassword(e.target.value) : setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {!isLogin && (
            /* Confirm Password */
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="Verify password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-100 hover:shadow-emerald-200 transition-all flex items-center justify-center mt-6"
          >
            {isLogin ? 'Sign In to EcoReward' : 'Complete Registration'}
          </button>
        </form>

        {/* Toggle link */}
        <div className="text-center pt-2 border-t border-slate-100 text-sm">
          <span className="text-slate-500">
            {isLogin ? "Don't have an account?" : "Already registered?"}
          </span>{' '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
            }}
            className="text-emerald-700 font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}
