/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DonationCategory = 'books' | 'toys' | 'clothes' | 'plastic' | 'paper' | 'ewaste' | 'metal';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  points: number;
  referralCode: string;
  referredCount: number;
  referredPoints: number;
}

export interface BookDetail {
  count: number;
  condition: 'New' | 'Good' | 'Fair' | 'Damaged';
}

export interface ToyDetail {
  quantity: number;
  ageGroup: '3-5 Years' | '6-10 Years' | '11+ Years';
}

export interface ClothesDetail {
  quantity: number;
  category: 'Men' | 'Women' | 'Kids';
}

export interface PlasticDetail {
  weight: number; // in KG
  type: 'Bottles' | 'Containers' | 'Mixed Plastic';
}

export interface PaperDetail {
  weight: number; // in KG
  type: 'Newspaper' | 'Cardboard' | 'Mixed Paper';
}

export interface EWasteDetail {
  weight: number; // in KG
  type: 'Mobile' | 'Laptop' | 'Cable' | 'Battery' | 'Other';
}

export interface MetalDetail {
  weight: number; // in KG
  type: 'Iron' | 'Steel' | 'Aluminium' | 'Mixed Metal';
}

export interface DonationDetails {
  books?: BookDetail;
  toys?: ToyDetail;
  clothes?: ClothesDetail;
  plastic?: PlasticDetail;
  paper?: PaperDetail;
  ewaste?: EWasteDetail;
  metal?: MetalDetail;
}

export type PickupStatus =
  | 'Submitted'
  | 'Collector Assigned'
  | 'In Transit'
  | 'Collected'
  | 'Verifying'
  | 'Verified'
  | 'Completed';

export interface DonationRequest {
  id: string;
  userId: string;
  categories: DonationCategory[];
  details: DonationDetails;
  images: string[]; // Base64 or object URLs
  estimatedPoints: number;
  pickupDate: string;
  pickupTimeSlot: '9 AM - 12 PM' | '12 PM - 3 PM' | '3 PM - 6 PM';
  addressType: 'Home' | 'Hostel' | 'Office' | 'Custom';
  address: string;
  status: PickupStatus;
  createdAt: string;
  collectorName?: string;
  collectorPhone?: string;
  actualWeight?: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  progressMax: number;
  progressCurrent: number;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  avatarSeed: string;
  isMe?: boolean;
}

export interface Champion {
  type: 'Recycler' | 'Donor' | 'Book Worm' | 'Toy Giver' | 'Active';
  title: string;
  userName: string;
  avatarSeed: string;
  achievement: string;
}

export interface CommunityRequest {
  id: string;
  organization: string;
  title: string;
  description: string;
  category: DonationCategory;
  neededAmount: number;
  collectedAmount: number;
  urgency: 'High' | 'Medium' | 'Low';
}
