
export type Language = 'bn' | 'en';

export interface Template {
  id: string;
  name: { bn: string; en: string };
  description: { bn: string; en: string };
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  tag?: string;
  discount?: string;
  demoUrl: string;
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
