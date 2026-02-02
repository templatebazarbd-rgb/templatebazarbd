
import React from 'react';

export type Language = 'bn' | 'en';

export interface Template {
  id: string;
  name: { bn: string; en: string };
  description: { bn: string; en: string };
  price: number;
  old_price?: number;
  image: string;
  images: string[];
  features: { bn: string[]; en: string[] };
  free_gifts: { 
    id: string;
    title: { bn: string; en: string };
    desc: { bn: string; en: string };
    icon: string;
  }[];
  category: string;
  tag?: string;
  discount?: string;
  demo_url: string;
}

export interface Category {
  id: string;
  name: { bn: string; en: string };
  slug: string;
  count: number;
  icon: string;
  color: string;
}

export interface Service {
  id: string;
  title: { bn: string; en: string };
  description: { bn: string; en: string };
  icon: React.ReactNode;
}
