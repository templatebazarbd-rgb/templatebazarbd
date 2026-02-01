
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../App';
import { TEMPLATES as FALLBACK_TEMPLATES, CATEGORIES } from '../constants';
import { supabase } from '../supabase';
import { Template } from '../types';

const TemplatesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [templates, setTemplates] = useState<Template[]>(FALLBACK_TEMPLATES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('templates')
          .select('*');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setTemplates(data as unknown as Template[]);
        }
      } catch (err) {
        console.warn('Using local fallback templates:', err);
        setTemplates(FALLBACK_TEMPLATES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter(item => {
    const itemName = item?.name?.[language] || item?.name?.en || item?.name?.bn || '';
    const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-24">
      {/* Header */}
      <div className="primary-blue-gradient text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">প্রিমিয়াম টেম্পলেট লাইব্রেরি</h1>
          <p className="text-blue-100 text-lg md:text-xl font-light max-w-2xl mx-auto">আপনার স্বপ্নের প্রজেক্ট শুরু করার জন্য সেরা ডিজাইনের সংগ্রহ থেকে বেছে নিন</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="container mx-auto px-4 -mt-12">
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative flex-grow w-full">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
            <input 
              type="text" 
              placeholder="পছন্দের টেম্পলেট খুঁজুন..." 
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#F9FAFB] border border-gray-100 focus:border-[#0066FF] focus:bg-white focus:ring-4 focus:ring-[#0066FF]/5 transition-all outline-none text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <select 
              className="px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-gray-100 focus:border-[#0066FF] focus:bg-white transition-all outline-none font-bold text-gray-700 appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">সব ক্যাটাগরি</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat?.name?.[language] || cat?.name?.en}</option>
              ))}
            </select>
            <select className="px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-gray-100 focus:border-[#0066FF] focus:bg-white transition-all outline-none font-bold text-gray-700">
              <option>সর্বশেষ আইটেম</option>
              <option>জনপ্রিয়তা</option>
              <option>মূল্য: কম থেকে বেশি</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 mt-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-gray-900">
             {isLoading ? 'লোড হচ্ছে...' : `${filteredTemplates.length}টি টেম্পলেট পাওয়া গেছে`}
          </h2>
          <div className="h-px flex-grow mx-8 bg-gray-100 hidden md:block"></div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-[2rem] h-[500px] animate-pulse shadow-sm border border-gray-50"></div>
            ))}
          </div>
        ) : filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTemplates.map(item => (
              <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-500 group flex flex-col h-full border border-gray-100/50">
                <div className="relative h-64 overflow-hidden">
                  <img src={item.image || 'https://via.placeholder.com/600x400?text=No+Image'} alt={item?.name?.[language]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  {item.discount && (
                    <div className="absolute top-5 left-5 bg-[#EF4444] text-white px-4 py-1.5 rounded-xl font-bold text-xs english-font shadow-lg">
                      {item.discount} অফ
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6 translate-y-4 group-hover:translate-y-0">
                    <a href={item.demoUrl} target="_blank" rel="noreferrer" className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-[#0066FF] hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                      <span>👁️</span> <span>লাইভ ডেমো</span>
                    </a>
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-black text-[#0066FF] uppercase tracking-widest">{item.category}</span>
                    {item.tag && <span className="bg-blue-50 text-[#0066FF] px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">{item.tag}</span>}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[#0066FF] transition-colors">{item?.name?.[language]}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">{item?.description?.[language]}</p>
                  
                  <div className="flex items-center justify-between border-t border-gray-50 pt-6 mt-auto">
                    <div className="flex flex-col">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-extrabold text-[#0066FF] price">৳{(item.price || 0).toLocaleString()}</span>
                        {item.oldPrice && <span className="text-sm text-gray-300 line-through price font-medium">৳{item.oldPrice.toLocaleString()}</span>}
                      </div>
                    </div>
                    <button className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-[0_10px_20px_rgba(0,102,255,0.2)] hover:shadow-[0_15px_30px_rgba(0,102,255,0.4)] active:scale-95">
                      কিনুন
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-dashed border-gray-200">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-6xl">🏜️</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">কোনো টেম্পলেট পাওয়া যায়নি</h3>
            <p className="text-gray-500 max-w-md mx-auto">অনুগ্রহ করে অন্য কোনো কীওয়ার্ড ব্যবহার করে সার্চ করুন অথবা ক্যাটাগরি পরিবর্তন করুন।</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}
              className="mt-8 px-10 py-4 bg-[#0066FF] text-white rounded-2xl font-bold hover:shadow-xl transition-all"
            >
              সবগুলো আবার দেখুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesPage;
