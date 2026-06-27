/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Badge, LeaderboardUser, Champion, CommunityRequest, DonationRequest } from './types';

// Points calculation rules
export const POINTS_MULTIPLIERS = {
  books: 15,    // 15 pts per book
  toys: 20,     // 20 pts per toy
  clothes: 15,  // 15 pts per clothing item
  plastic: 5,   // 5 pts per kg
  paper: 4,     // 4 pts per kg
  ewaste: 30,   // 30 pts per kg
  metal: 10,    // 10 pts per kg
};

// Initial leaderboard
export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Ravi Kumar', points: 2300, avatarSeed: 'Ravi' },
  { rank: 2, name: 'Priya Sharma', points: 1900, avatarSeed: 'Priya' },
  { rank: 3, name: 'Kiran Patel', points: 1650, avatarSeed: 'Kiran' },
  { rank: 4, name: 'Sneha Reddy', points: 1420, avatarSeed: 'Sneha' },
  { rank: 5, name: 'Amit Singh', points: 1180, avatarSeed: 'Amit' },
  { rank: 6, name: 'Arjun Das', points: 950, avatarSeed: 'Arjun' },
  { rank: 7, name: 'Meera Nair', points: 820, avatarSeed: 'Meera' },
];

// Champions of the month
export const MONTHLY_CHAMPIONS: Champion[] = [
  {
    type: 'Recycler',
    title: 'Top Recycler',
    userName: 'Sneha Reddy',
    avatarSeed: 'Sneha',
    achievement: 'Recycled 42 KG of Plastic & Metal'
  },
  {
    type: 'Donor',
    title: 'Top Donor',
    userName: 'Priya Sharma',
    avatarSeed: 'Priya',
    achievement: 'Donated 35 items of apparel'
  },
  {
    type: 'Book Worm',
    title: 'Most Books Donated',
    userName: 'Ravi Kumar',
    avatarSeed: 'Ravi',
    achievement: 'Donated 52 Educational Books'
  },
  {
    type: 'Toy Giver',
    title: 'Most Toys Donated',
    userName: 'Amit Singh',
    avatarSeed: 'Amit',
    achievement: 'Donated 18 toys to Children\'s home'
  },
  {
    type: 'Active',
    title: 'Most Active User',
    userName: 'Kiran Patel',
    avatarSeed: 'Kiran',
    achievement: 'Scheduled 6 successful pickups'
  }
];

// Initial Badge gallery
export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_donation',
    title: 'First Donation',
    description: 'Successfully scheduled and completed your first pickup.',
    iconName: 'Award',
    progressMax: 1,
    progressCurrent: 1,
    unlockedAt: '2026-06-10T14:30:00.000Z'
  },
  {
    id: 'community_helper',
    title: 'Community Helper',
    description: 'Donate 15 total items (books, toys, clothes) to families in need.',
    iconName: 'Heart',
    progressMax: 15,
    progressCurrent: 8
  },
  {
    id: 'recycling_hero',
    title: 'Recycling Hero',
    description: 'Recycle more than 20 KG of recyclable materials (plastic, metal, paper).',
    iconName: 'Leaf',
    progressMax: 20,
    progressCurrent: 12
  },
  {
    id: 'book_champion',
    title: 'Book Champion',
    description: 'Donate 20 educational or story books for public schools.',
    iconName: 'BookOpen',
    progressMax: 20,
    progressCurrent: 5
  },
  {
    id: 'toy_giver',
    title: 'Toy Giver',
    description: 'Donate 10 toys to orphanages or preschool centers.',
    iconName: 'Smile',
    progressMax: 10,
    progressCurrent: 0
  },
  {
    id: 'eco_warrior',
    title: 'Eco Warrior',
    description: 'Earn a total of 1,000 reward points.',
    iconName: 'Zap',
    progressMax: 1000,
    progressCurrent: 350
  }
];

// Initial Community requests
export const INITIAL_COMMUNITY_REQUESTS: CommunityRequest[] = [
  {
    id: 'req_1',
    organization: 'Sunshine Primary School',
    title: 'Needs 50 Children\'s Books',
    description: 'We are expanding our library corner for grade 1-5 students. Any primary educational, comic, or story books are highly appreciated.',
    category: 'books',
    neededAmount: 50,
    collectedAmount: 38,
    urgency: 'High'
  },
  {
    id: 'req_2',
    organization: 'Grace Orphanage Home',
    title: 'Needs 30 Soft & Educational Toys',
    description: 'Seeking toddler-friendly soft toys, blocks, and board games for 15 newly admitted children (ages 3 to 10 years).',
    category: 'toys',
    neededAmount: 30,
    collectedAmount: 14,
    urgency: 'Medium'
  },
  {
    id: 'req_3',
    organization: 'Hope Night Shelter',
    title: 'Needs 100 Winter Clothes',
    description: 'Urgent requirement of sweaters, jackets, socks, and blankets for men and women at our temporary shelter.',
    category: 'clothes',
    neededAmount: 100,
    collectedAmount: 76,
    urgency: 'High'
  },
  {
    id: 'req_4',
    organization: 'Little Buds Preschool',
    title: 'Needs 25 Educational Craft Kits',
    description: 'Requesting craft materials, building blocks, and learning puzzles to support interactive learning.',
    category: 'toys',
    neededAmount: 25,
    collectedAmount: 22,
    urgency: 'Low'
  }
];

// Initial historical donations
export const INITIAL_DONATION_HISTORY: DonationRequest[] = [
  {
    id: 'TXN-98214',
    userId: 'default_user',
    categories: ['plastic', 'paper'],
    details: {
      plastic: { weight: 5, type: 'Bottles' },
      paper: { weight: 8, type: 'Cardboard' }
    },
    images: [],
    estimatedPoints: 57, // (5 * 5) + (8 * 4) = 25 + 32 = 57
    pickupDate: '2026-06-12',
    pickupTimeSlot: '12 PM - 3 PM',
    addressType: 'Home',
    address: 'Flat 402, Green Meadows, Sector 12, Bengaluru',
    status: 'Completed',
    createdAt: '2026-06-10T11:20:00.000Z',
    collectorName: 'Ramesh Kumar',
    collectorPhone: '+91 98765 43210',
    actualWeight: 13
  },
  {
    id: 'TXN-87421',
    userId: 'default_user',
    categories: ['books', 'clothes'],
    details: {
      books: { count: 12, condition: 'Good' },
      clothes: { quantity: 8, category: 'Kids' }
    },
    images: [],
    estimatedPoints: 300, // (12 * 15) + (8 * 15) = 180 + 120 = 300
    pickupDate: '2026-06-18',
    pickupTimeSlot: '9 AM - 12 PM',
    addressType: 'Home',
    address: 'Flat 402, Green Meadows, Sector 12, Bengaluru',
    status: 'Completed',
    createdAt: '2026-06-16T09:15:00.000Z',
    collectorName: 'Suresh Patel',
    collectorPhone: '+91 99887 76655',
    actualWeight: 10
  },
  {
    id: 'TXN-43109',
    userId: 'default_user',
    categories: ['ewaste'],
    details: {
      ewaste: { weight: 2.5, type: 'Laptop' }
    },
    images: [],
    estimatedPoints: 75, // 2.5 * 30 = 75
    pickupDate: '2026-06-22',
    pickupTimeSlot: '3 PM - 6 PM',
    addressType: 'Office',
    address: 'WeWork Tech Park, Tower B, Level 4, Bengaluru',
    status: 'Verified',
    createdAt: '2026-06-21T15:45:00.000Z',
    collectorName: 'Vikram Singh',
    collectorPhone: '+91 91234 56789',
    actualWeight: 2.5
  }
];

// Presets for Simulated Image Analysis
export const SIMULATED_AI_PRESETS = [
  {
    name: 'Stack of textbooks',
    category: 'books',
    details: { count: 8, condition: 'Good' },
    estimatedPoints: 120,
    confidence: 94,
    detectedLabel: '8x Books (Textbooks)'
  },
  {
    name: 'Plastic soft drink bottles',
    category: 'plastic',
    details: { weight: 4, type: 'Bottles' },
    estimatedPoints: 20,
    confidence: 91,
    detectedLabel: '4.0 KG PET Bottles'
  },
  {
    name: 'Kids cardboard playset',
    category: 'toys',
    details: { quantity: 3, ageGroup: '3-5 Years' },
    estimatedPoints: 60,
    confidence: 88,
    detectedLabel: '3x Soft/Plastic Toys'
  },
  {
    name: 'Assorted clothes pile',
    category: 'clothes',
    details: { quantity: 10, category: 'Women' },
    estimatedPoints: 150,
    confidence: 95,
    detectedLabel: '10x Clothes'
  },
  {
    name: 'Old electronics & cords',
    category: 'ewaste',
    details: { weight: 3, type: 'Cable' },
    estimatedPoints: 90,
    confidence: 86,
    detectedLabel: '3.0 KG E-Waste (Cables & Charger)'
  }
];
