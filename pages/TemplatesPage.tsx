
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../App';
import { TEMPLATES, CATEGORIES } from '../constants';
import TemplateCard from '../components/TemplateCard';

const TemplatesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sync category from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) setSelectedCategory(cat);
  }, [location]);

  const filteredTemplates = TEMPLATES.filter(item => {
    const itemName = item?.name?.[language] || item?.name?.en || '';
    const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-32 font-bangla">
      {/* Page Header */}
      <div className="primary-blue-gradient text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight animate-fadeIn">টেম্পলেট লাইব্রেরি</h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium opacity-90 max-w-2xl leading-relaxed animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            আপনার ব্যবসার জন্য আধুনিক ও প্রফেশনাল ওয়েবসাইট টেম্পলেট এবং হাই-কনভার্টিং ল্যান্ডিং পেজ কালেকশন খুঁজে নিন।
          </p>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div>

      {/* Search & Filter Bar */}
      <div className="container mx-auto max-w-7xl px-6 -mt-10 md:-mt-14 relative z-20">
        <div className="bg-white p-4 md:p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col md:flex-row gap-4 items-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="relative flex-grow w-full">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl opacity-40">🔍</span>
            <input 
              type="text" 
              placeholder="পছন্দের টেম্পলেট বা ওয়েবসাইট খুঁজুন..." 
              className="w-full pl-14 pr-6 py-4 md:py-5 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all text-base md:text-lg font-bold placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-72">
            <select 
              className="w-full px-6 py-4 md:py-5 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-600 focus:bg-white outline-none font-black text-slate-700 text-sm md:text-base appearance-none cursor-pointer shadow-sm transition-all"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">সব ক্যাটাগরি (All Categories)</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat?.name?.[language] || cat?.name?.en}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="container mx-auto max-w-7xl px-6 mt-16 md:mt-24">
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <div className="flex items-center space-x-4">
             <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
             <h2 className="text-xl md:text-2xl font-black text-slate-900">
                {`${filteredTemplates.length}টি টেমপ্লেট পাওয়া গেছে`}
             </h2>
          </div>
        </div>
        
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {filteredTemplates.map(item => (
              <TemplateCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 md:py-32 bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100 shadow-inner">
            <div className="text-7xl md:text-9xl mb-8 animate-bounce">🔍</div>
            <h3 className="text-2xl md:text-4xl font-black text-slate-800 mb-4">দুঃখিত, কোনো রেজাল্ট পাওয়া যায়নি</h3>
            <p className="text-slate-400 text-base md:text-lg font-bold">অন্য কোনো কি-ওয়ার্ড ব্যবহার করে চেষ্টা করুন অথবা ক্যাটাগরি পরিবর্তন করুন।</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default TemplatesPage;
