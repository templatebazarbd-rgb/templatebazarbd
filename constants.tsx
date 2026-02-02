
import React from 'react';
import { Template, Category, Service } from './types';

export const COLORS = {
  primary: '#0066FF',
  primaryDark: '#0052CC',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray600: '#4B5563',
  gray900: '#111827',
};

export const CATEGORIES: Category[] = [
  { id: '1', name: { bn: 'Business Website', en: 'Business Website' }, slug: 'business', count: 24, icon: '🏢', color: '#0066FF' },
  { id: '2', name: { bn: 'E-commerce Website', en: 'E-commerce Website' }, slug: 'ecommerce', count: 18, icon: '🛒', color: '#10B981' },
  { id: '3', name: { bn: 'Agency Website', en: 'Agency Website' }, slug: 'agency', count: 12, icon: '🚀', color: '#6366F1' },
  { id: '4', name: { bn: 'Portfolio Website', en: 'Portfolio Website' }, slug: 'portfolio', count: 15, icon: '📁', color: '#EC4899' },
  { id: '5', name: { bn: 'Real Estate Website', en: 'Real Estate Website' }, slug: 'realestate', count: 8, icon: '🏠', color: '#14B8A6' },
  { id: '6', name: { bn: 'LMS / Education', en: 'LMS / Education' }, slug: 'education', count: 10, icon: '🎓', color: '#F43F5E' },
  { id: '7', name: { bn: 'Restaurant Website', en: 'Restaurant Website' }, slug: 'restaurant', count: 20, icon: '🍽️', color: '#FB923C' },
  { id: '8', name: { bn: 'Landing Page', en: 'Landing Page' }, slug: 'landing', count: 32, icon: '⚡', color: '#06B6D4' },
  { id: '9', name: { bn: 'Premium Plugin', en: 'Premium Plugin' }, slug: 'plugins', count: 45, icon: '🔌', color: '#8B5CF6' },
  { id: '10', name: { bn: 'Theme & Template', en: 'Theme & Template' }, slug: 'themes', count: 28, icon: '🎨', color: '#F59E0B' },
];

const DEFAULT_GIFTS = [
  { id: 'fg1', title: { bn: 'Free Installation Guide', en: 'Free Installation Guide' }, desc: { bn: 'কিভাবে টেমপ্লেটটি সেটআপ করবেন তার পূর্ণাঙ্গ ভিডিও ও গাইড।', en: 'Complete video and text guide for easy setup.' }, icon: '📚' },
  { id: 'fg2', title: { bn: 'Free Image Pack', en: 'Free Image Pack' }, desc: { bn: 'আপনার প্রজেক্টের জন্য হাই-কোয়ালিটি গ্রাফিক্স ও ইমেজ প্যাক।', en: 'High-quality graphics and images for your project.' }, icon: '🖼️' },
  { id: 'fg3', title: { bn: '7 Days Free Support', en: '7 Days Free Support' }, desc: { bn: 'যেকোনো কারিগরি সমস্যায় আমাদের টিমের কাছ থেকে ফ্রি সাপোর্ট।', en: 'Free technical support from our expert team.' }, icon: '🛡️' }
];

export const TEMPLATES: Template[] = [
  {
    id: 't1',
    name: { bn: 'বিজনেস প্রো ম্যাক্স', en: 'Business Pro Max' },
    description: { bn: 'কর্পোরেট এবং মডার্ন এজেন্সিগুলোর জন্য সেরা চয়েস। হাই-স্পিড এবং এসইও অপ্টিমাইজড।', en: 'Best choice for corporate and modern agencies.' },
    price: 2500,
    old_price: 4000,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80'
    ],
    features: {
      bn: ['সম্পূর্ণ রেসপন্সিভ ডিজাইন', 'এসইও ফ্রেন্ডলি কোড', 'ফাস্ট লোডিং স্পিড', 'মডার্ন ইউআই/ইউএক্স', 'সহজ কাস্টমাইজেশন'],
      en: ['Fully Responsive Design', 'SEO Friendly Code', 'Fast Loading Speed', 'Modern UI/UX', 'Easy Customization']
    },
    free_gifts: DEFAULT_GIFTS,
    category: 'business',
    tag: 'বেস্ট সেলার',
    discount: '-37%',
    demo_url: 'https://demo.templatebazar.com/business-pro',
  },
  {
    id: 't2',
    name: { bn: 'আলটিমেট শপ ই-কমার্স', en: 'Ultimate Shop E-commerce' },
    description: { bn: 'সম্পূর্ণ ই-কমার্স ফিচার সম্বলিত প্রিমিয়াম টেম্পলেট। পেমেন্ট গেটওয়ে রেডি।', en: 'Premium template with complete e-commerce features.' },
    price: 4500,
    old_price: 6000,
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80'
    ],
    features: {
      bn: ['কার্ট এবং চেকআউট সিস্টেম', 'পেমেন্ট গেটওয়ে ইন্টিগ্রেশন', 'ইনভেন্টরি ম্যানেজমেন্ট', 'অর্ডার ট্র্যাকিং', 'কুপন সিস্টেম'],
      en: ['Cart & Checkout System', 'Payment Gateway Ready', 'Inventory Management', 'Order Tracking', 'Coupon System']
    },
    free_gifts: DEFAULT_GIFTS,
    category: 'ecommerce',
    tag: 'জনপ্রিয়',
    discount: '-25%',
    demo_url: 'https://demo.templatebazar.com/shop',
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: { bn: 'কাস্টম ওয়েবসাইট ডেভেলপমেন্ট', en: 'Custom Website Development' },
    description: { bn: 'আপনার প্রয়োজন অনুযায়ী সম্পূর্ণ কাস্টম ওয়েবসাইট ডেভেলপমেন্ট সার্ভিস।', en: 'Full custom website development services as per your needs.' },
    icon: <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  }
];
