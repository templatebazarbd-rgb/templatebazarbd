
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
  {
    id: '1',
    name: { bn: 'ব্যবসায়িক ওয়েবসাইট', en: 'Business Website' },
    slug: 'business',
    count: 24,
    icon: '🏢',
    color: '#0066FF',
  },
  {
    id: '2',
    name: { bn: 'ল্যান্ডিং পেজ', en: 'Landing Page' },
    slug: 'landing',
    count: 18,
    icon: '🚀',
    color: '#10B981',
  },
  {
    id: '3',
    name: { bn: 'ই-কমার্স টেম্পলেট', en: 'E-commerce Templates' },
    slug: 'ecommerce',
    count: 12,
    icon: '🛒',
    color: '#F59E0B',
  },
  {
    id: '4',
    name: { bn: 'এজেন্সি ওয়েবসাইট', en: 'Agency Websites' },
    slug: 'agency',
    count: 15,
    icon: '🤝',
    color: '#8B5CF6',
  },
  {
    id: '5',
    name: { bn: 'পোর্টফোলিও ওয়েবসাইট', en: 'Portfolio Websites' },
    slug: 'portfolio',
    count: 20,
    icon: '🎨',
    color: '#EC4899',
  },
  {
    id: '6',
    name: { bn: 'রিয়েল এস্টেট ওয়েবসাইট', en: 'Real Estate Websites' },
    slug: 'realestate',
    count: 8,
    icon: '🏠',
    color: '#6366F1',
  },
  {
    id: '7',
    name: { bn: 'এডুকেশন ওয়েবসাইট', en: 'Education Websites' },
    slug: 'education',
    count: 10,
    icon: '🎓',
    color: '#F97316',
  },
  {
    id: '8',
    name: { bn: 'রেস্টুরেন্ট ওয়েবসাইট', en: 'Restaurant Websites' },
    slug: 'restaurant',
    count: 9,
    icon: '🍕',
    color: '#EF4444',
  },
];

export const TEMPLATES: Template[] = [
  {
    id: 't1',
    name: { bn: 'বিজনেস প্রো ম্যাক্স', en: 'Business Pro Max' },
    description: { bn: 'কর্পোরেট এবং মডার্ন এজেন্সিগুলোর জন্য সেরা চয়েস।', en: 'Best choice for corporate and modern agencies.' },
    price: 2500,
    oldPrice: 4000,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    category: 'business',
    tag: 'বেস্ট সেলার',
    discount: '-37%',
    demoUrl: '#',
  },
  {
    id: 't2',
    name: { bn: 'আলটিমেট শপ ই-কমার্স', en: 'Ultimate Shop E-commerce' },
    description: { bn: 'সম্পূর্ণ ই-কমার্স ফিচার সম্বলিত প্রিমিয়াম টেম্পলেট।', en: 'Premium template with complete e-commerce features.' },
    price: 4500,
    oldPrice: 6000,
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    category: 'ecommerce',
    tag: 'জনপ্রিয়',
    discount: '-25%',
    demoUrl: '#',
  },
  {
    id: 't3',
    name: { bn: 'এজেন্সি হিরো টেম্পলেট', en: 'Agency Hero Template' },
    description: { bn: 'ক্রিয়েটিভ এজেন্সি এবং ফ্রিল্যান্সারদের জন্য আদর্শ।', en: 'Ideal for creative agencies and freelancers.' },
    price: 1800,
    oldPrice: 2500,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
    category: 'agency',
    tag: 'নতুন',
    discount: '-28%',
    demoUrl: '#',
  },
  {
    id: 't4',
    name: { bn: 'স্মার্ট লার্নিং এলএমএস', en: 'Smart Learning LMS' },
    description: { bn: 'অনলাইন কোর্স এবং শিক্ষা প্রতিষ্ঠানের জন্য ওয়েবসাইট।', en: 'Website for online courses and educational institutions.' },
    price: 3200,
    oldPrice: 5000,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    category: 'education',
    tag: 'প্রিমিয়াম',
    discount: '-36%',
    demoUrl: '#',
  },
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: { bn: 'কাস্টম ওয়েবসাইট ডেভেলপমেন্ট', en: 'Custom Website Development' },
    description: { bn: 'আপনার প্রয়োজন অনুযায়ী সম্পূর্ণ কাস্টম ওয়েবসাইট ডেভেলপমেন্ট সার্ভিস।', en: 'Full custom website development services as per your needs.' },
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 's2',
    title: { bn: 'টেম্পলেট কাস্টমাইজেশন', en: 'Template Customization' },
    description: { bn: 'আমাদের টেম্পলেট কিনে আপনার ব্র্যান্ড অনুযায়ী কাস্টমাইজ করিয়ে নিন।', en: 'Buy our templates and customize them according to your brand.' },
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 015.656 0l1.172 1.172a4 4 0 010 5.656l-1.172 1.172a4 4 0 01-5.656 0L11 7.343z" />
      </svg>
    ),
  },
  {
    id: 's3',
    title: { bn: 'হোস্টিং সাপোর্ট', en: 'Hosting Support' },
    description: { bn: 'নির্ভরযোগ্য এবং দ্রুত ওয়েব হোস্টিং সেটআপ এবং ম্যানেজমেন্ট।', en: 'Reliable and fast web hosting setup and management.' },
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-7 0V4" />
      </svg>
    ),
  },
];
