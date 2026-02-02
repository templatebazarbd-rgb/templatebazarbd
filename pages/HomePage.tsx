
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../App';
import { TEMPLATES, CATEGORIES } from '../constants';
import TemplateCard from '../components/TemplateCard';

const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  const heroImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&w=1920&q=80'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const paymentLogos = [
    { name: 'bKash', url: 'https://image2url.com/r2/default/images/1770034551352-bce8eb59-ce29-4756-9bd7-b19bbd8fc845.png' },
    { name: 'Nagad', url: 'https://image2url.com/r2/default/images/1770034633368-3010ec7f-6a55-45ed-a917-05b6c01f4d76.png' },
    { name: 'Rocket', url: 'https://image2url.com/r2/default/images/1770034676886-58ef4ddd-11e6-4d49-b399-bdbbda81fe16.webp' },
    { name: 'Upay', url: 'https://image2url.com/r2/default/images/1770034713354-99062c15-34e2-442f-a51e-6ebcb8dc2976.webp' },
    { name: 'DBBL', url: 'https://image2url.com/r2/default/images/1770035176108-6716ebfd-6c6a-4eba-a6d0-3ba308b4e92c.webp' },
    { name: 'City Bank', url: 'https://image2url.com/r2/default/images/1770035237923-613e7015-32c0-4f14-97f3-c9385c011de0.png' },
    { name: 'Prime Bank', url: 'https://image2url.com/r2/default/images/1770035196546-c8863862-73d4-4e2a-a296-0e160fbc708d.jpg' },
    { name: 'My Prime', url: 'https://image2url.com/r2/default/images/1770035255267-484ef4e8-da39-44e5-b06d-447e5795c758.jpg' },
    { name: 'City Touch', url: 'https://image2url.com/r2/default/images/1770035278075-92afe3b6-d70e-4d21-a0ce-c1df463ed425.png' },
    { name: 'Visa', url: 'https://image2url.com/r2/default/images/1770035792573-93ca0db2-6aa0-4956-9f4c-345560376c20.jpg' },
    { name: 'Mastercard', url: 'https://image2url.com/r2/default/images/1770035758550-8d77c3a1-3d77-4289-b6d1-d48a820ca867.png' },
    { name: 'PayPal', url: 'https://image2url.com/r2/default/images/1770035814205-32e7f8ae-2575-4dd0-b889-fae03303f01c.png' },
    { name: 'Payoneer', url: 'https://image2url.com/r2/default/images/1770037154398-4a0d1f52-91fd-4d05-bdb4-9148f22afb44.png' },
    { name: 'Amex', url: 'https://image2url.com/r2/default/images/1770037198092-71f7730f-a944-4fcb-be61-da6fbf2f5546.png' },
    { name: 'American Express', url: 'https://image2url.com/r2/default/images/1770037198092-71f7730f-a944-4fcb-be61-da6fbf2f5546.png' },
    { name: 'Redot Pay', url: 'https://image2url.com/r2/default/images/1770035830520-bb117173-bfbf-43dc-95d5-a7d0854044cb.webp' }
  ];

  const categoriesWithCounts = useMemo(() => {
    return CATEGORIES.map(cat => {
      const count = TEMPLATES.filter(t => t.category === cat.slug).length;
      return { ...cat, actualCount: count };
    });
  }, []);

  const trustPoints = [
    { title: 'দ্রুত & রেডি-মেড টেমপ্লেট', icon: '🚀', desc: 'আমাদের প্রফেশনাল টেমপ্লেট ব্যবহার করে মাত্র কয়েক মিনিটে আপনার ওয়েবসাইট লাইভ করুন।', badge: 'Instant Setup' },
    { title: 'নিরাপদ & ১৬টি পেমেন্ট অপশন', icon: '🔒', desc: 'bKash, Nagad, PayPal, Visa সহ ১৬টিরও বেশি নিরাপদ পেমেন্ট পদ্ধতি সাপোর্ট করি।', badge: 'Trusted Payments' },
    { title: 'ফ্রি গিফট & এক্সক্লুসিভ বোনাস', icon: '🎁', desc: 'প্রতিটি টেমপ্লেটের সাথে পাবেন Free Setup Guide, Image Pack এবং এক্সট্রা সাপোর্ট।', badge: 'Bonus Included' },
    { title: '২৪/৭ সাপোর্ট & কনসাল্টেশন', icon: '📞', desc: 'কোনো সমস্যা বা প্রশ্ন থাকলে আমাদের সাপোর্ট টিম সবসময় আপনার পাশে আছে।', badge: 'Always Available' },
    { title: 'লাইফটাইম আপডেট & গাইড', icon: '📄', desc: 'প্রতিটি টেমপ্লেট নিয়মিত আপডেট হবে এবং সাথে পাবেন সহজ কাস্টমাইজেশন গাইড।', badge: 'Lifetime Access' },
    { title: 'রেস্পন্সিভ & SEO-ফ্রেন্ডলি', icon: '🌐', desc: 'সমস্ত টেমপ্লেট Mobile, Tablet, Desktop রেডি এবং সার্চ ইঞ্জিনে র‍্যাঙ্ক করার জন্য অপ্টিমাইজড।', badge: 'SEO Ready' }
  ];

  const shortServices = [
    { title: { bn: 'Custom Website Development', en: 'Custom Website Development' }, icon: '💻', desc: 'আপনার প্রয়োজন অনুযায়ী সম্পূর্ণ কাস্টম ওয়েবসাইট।' },
    { title: { bn: 'Custom Landing Page', en: 'Custom Landing Page' }, icon: '🚀', desc: 'অ্যাডস এবং ক্যাম্পেইনের জন্য হাই-কনভার্টিং পেজ।' },
    { title: { bn: 'SEO Service', en: 'SEO Service' }, icon: '🔍', desc: 'সার্চ ইঞ্জিনের প্রথম পাতায় র‍্যাঙ্ক নিশ্চিত করুন। ' },
    { title: { bn: 'Ads Campaign', en: 'Ads Campaign' }, icon: '📈', desc: 'ফেসবুক ও গুগল অ্যাডের মাধ্যমে সেলস বৃদ্ধি। ' },
    { title: { bn: 'Custom Plugin & Theme', en: 'Custom Plugin & Theme' }, icon: '🔌', desc: 'সাইটে বিশেষ কোনো ফিচার বা অটোমেশন যুক্ত করুন। ' }
  ];

  const blogs = [
    { title: 'আপনার বিজনেসের জন্য সঠিক টেম্পলেট কীভাবে বেছে নেবেন?', img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80', desc: 'একটি ভালো টেমপ্লেট আপনার বিজনেসের গ্রোথকে ত্বরান্বিত করতে পারে। সঠিক নির্বাচনের মাধ্যমে আপনি আপনার অনলাইন প্রেজেন্সকে প্রফেশনাল লেভেলে নিয়ে যেতে পারেন।' },
    { title: '৫টি সহজ ধাপে আপনার ওয়েবসাইটটি দ্রুত লঞ্চ করুন', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', desc: 'নতুন ওয়েবসাইট তৈরির পরিকল্পনা করছেন? প্রথমে টেমপ্লেট পছন্দ করুন, ডোমেইন ও হোস্টিং কিনুন এবং কন্টেন্ট আপডেট করুন।' },
    { title: 'ওয়েবসাইট এসইও টিপস: কীভাবে সার্চ ইঞ্জিনের প্রথম পাতায় আসবেন?', img: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&w=800&q=80', desc: 'এসইও এখন বিজনেসের জন্য বাধ্যতামূলক একটি অংশ। মেটা ট্যাগ এবং কি-ওয়ার্ড রিসার্চের মাধ্যমে আপনি গুগল র‍্যাঙ্কিং এ এগিয়ে থাকতে পারেন।' }
  ];

  return (
    <div className="overflow-x-hidden bg-white font-bangla w-full">
      {/* 3. HERO SECTION */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden">
        {heroImages.map((img, i) => (
          <div 
            key={i} 
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${currentSlide === i ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
          >
            <img src={img} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-slate-900/20 backdrop-blur-[0.5px]"></div>
          </div>
        ))}
        
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10 text-left">
          <div className="max-w-4xl space-y-4 md:space-y-8 animate-fadeInLeft">
            <div className="inline-flex items-center space-x-2 md:space-x-3 bg-blue-600/30 backdrop-blur-md px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-blue-400/30">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
              <span className="text-[8px] md:text-xs font-black uppercase tracking-[0.2em] text-blue-100">বাংলাদেশের সেরা টেম্পলেট মার্কেটপ্লেস</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
              প্রফেশনাল ওয়েবসাইট <br /> <span className="text-blue-400">টেমপ্লেট</span> আপনার <br /> ব্যবসার জন্য
            </h1>
            
            <p className="text-sm md:text-xl text-blue-50/90 max-w-2xl font-medium leading-relaxed">
              রেডি-মেড টেমপ্লেট ব্যবহার করে দ্রুত আপনার অনলাইন বিজনেস শুরু করুন। আমাদের প্রতিটি টেমপ্লেট কোয়ালিটি নিশ্চিত করে তৈরি করা হয়েছে।
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
              <Link to="/templates" className="px-8 py-4 md:px-10 md:py-5 bg-[#0066FF] text-white rounded-2xl font-black text-base md:text-lg hover:bg-blue-700 transition-all shadow-xl active:scale-95 text-center">
                Templates দেখুন
              </Link>
              <Link to="/templates" className="px-8 py-4 md:px-10 md:py-5 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white rounded-2xl font-black text-base md:text-lg hover:bg-white/25 transition-all text-center flex items-center justify-center space-x-2">
                <span>👁️</span> <span>লাইভ ডেমো</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AWARDS / STATS */}
      <section className="py-12 md:py-24 bg-blue-50/30 border-b border-blue-100/50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-xl md:text-4xl font-black text-slate-900 tracking-tight">আমাদের অর্জনসমূহ</h2>
            <div className="h-1 w-12 bg-blue-600 mx-auto rounded-full mt-4"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { val: '৫০০+', label: 'টেমপ্লেট সোল্ড', icon: '🏆', color: 'text-blue-600' },
              { val: '১০+', label: 'ক্যাটাগরি', icon: '📂', color: 'text-emerald-600' },
              { val: '২৪/৭', label: 'সাপোর্ট', icon: '📞', color: 'text-indigo-600' },
              { val: '১০০%', label: 'সন্তুষ্টি', icon: '⭐', color: 'text-amber-600' }
            ].map((s, i) => (
              <div key={i} className="text-center group bg-white p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-blue-50 shadow-sm hover:shadow-xl transition-all">
                <div className="text-2xl md:text-3xl mb-2 md:mb-4">{s.icon}</div>
                <h3 className={`text-xl md:text-4xl font-black ${s.color}`}>{s.val}</h3>
                <p className="text-[8px] md:text-xs font-black uppercase tracking-widest text-slate-400 mt-1 md:mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CATEGORY SECTION */}
      <section className="py-16 md:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">ক্যাটাগরি অনুযায়ী টেমপ্লেট</h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[8px] md:text-xs">Find the exact design for your industry</p>
            <div className="h-1.5 w-16 bg-blue-600 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {categoriesWithCounts.map(cat => (
              <Link key={cat.id} to={`/templates?category=${cat.slug}`} className="group p-6 md:p-8 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-blue-600 hover:shadow-2xl transition-all flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 group-hover:scale-110 transition-all shadow-sm" style={{ backgroundColor: `${cat.color}10`, color: cat.color }}>
                  {cat.icon}
                </div>
                <h3 className="text-xs md:text-base font-black text-slate-800 leading-tight mb-2">{cat?.name?.[language] || cat?.name?.en}</h3>
                <div className="px-2 py-1 bg-blue-50 text-blue-600 text-[7px] md:text-[9px] font-black rounded-full uppercase tracking-widest border border-blue-100">
                   {cat.actualCount}টি টেমপ্লেট
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. POPULAR TEMPLATES */}
      <section className="py-16 md:py-28 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tight">জনপ্রিয় টেমপ্লেটসমূহ</h2>
            </div>
            <Link to="/templates" className="px-8 py-4 bg-[#0066FF] text-white rounded-xl md:rounded-2xl font-black text-sm md:text-lg shadow-xl active:scale-95">
              সবগুলো দেখুন →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {TEMPLATES.slice(0, 4).map(item => (
              <TemplateCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. কেন টেমপ্লেট বাজার বিডি সেরা */}
      <section className="py-16 md:py-28 bg-white border-t border-slate-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">কেন Template Bazar BD সেরা?</h2>
            <div className="h-1.5 w-16 bg-blue-600 mx-auto rounded-full mt-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {trustPoints.map((p, i) => (
              <div key={i} className="bg-slate-50 p-8 md:p-10 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                   <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-4xl shadow-sm">
                      {p.icon}
                   </div>
                </div>
                <h4 className="text-lg md:text-xl font-black mb-3 text-slate-900">{p.title}</h4>
                <p className="text-slate-500 font-bold text-xs md:text-sm leading-relaxed opacity-80">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. কীভাবে কাজ করে (Updated grid for mobile: 2 items per line) */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">কীভাবে কাজ করে?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 relative">
             <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-100 -translate-y-1/2 z-0"></div>
             {[
               { icon: '🔍', title: 'পছন্দ করুন', desc: 'ডিজাইনটি বেছে নিন' },
               { icon: '👁️', title: 'লাইভ ডেমো', desc: 'দেখে নিন ডেমো' },
               { icon: '💳', title: 'পেমেন্ট করুন', desc: 'অর্ডার সম্পন্ন করুন' },
               { icon: '🚀', title: 'লাইভ করুন', desc: 'সাইট হবে রেডি' }
             ].map((s, i) => (
               <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-3 bg-white p-4 rounded-3xl md:bg-transparent md:p-0 shadow-sm md:shadow-none border border-slate-100 md:border-none">
                 <div className="w-12 h-12 md:w-20 md:h-20 bg-white border-2 md:border-4 border-blue-600 rounded-full flex items-center justify-center text-xl md:text-3xl shadow-xl">{s.icon}</div>
                 <h4 className="font-black text-slate-900 text-[10px] md:text-lg leading-tight">{s.title}</h4>
                 <p className="text-slate-400 text-[8px] md:text-xs font-bold leading-relaxed">{s.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 9. আমাদের সেবা সমূহ */}
      <section className="py-16 md:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
           <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">আমাদের সেবা সমূহ</h2>
           </div>
           <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              {shortServices.map((s, i) => (
                <div key={i} className="bg-slate-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 flex flex-col items-center text-center">
                  <div className="text-2xl md:text-4xl mb-4">{s.icon}</div>
                  <h4 className="text-[10px] md:text-base font-black text-slate-900 mb-2 leading-tight">{s.title[language]}</h4>
                  <Link to="/services" className="mt-auto text-blue-600 font-black text-[8px] md:text-[10px] uppercase tracking-widest hover:underline">Details →</Link>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 12. টিপস এবং গাইড (Blog) */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
           <div className="text-center mb-12">
              <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">টিপস এবং গাইড</h2>
              <div className="h-1 w-12 bg-blue-600 mx-auto mt-4 rounded-full"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {blogs.map((b, i) => (
                <div key={i} className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all flex flex-col">
                   <div className="aspect-video overflow-hidden">
                      <img src={b.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                   </div>
                   <div className="p-6 md:p-8 space-y-3 flex flex-col flex-grow">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{b.title}</h4>
                      <p className="text-slate-400 text-[10px] md:text-sm font-bold leading-relaxed line-clamp-2">{b.desc}</p>
                      <button 
                        onClick={() => setSelectedBlog(b)}
                        className="mt-auto text-blue-600 font-black text-[10px] md:text-xs uppercase tracking-widest hover:underline text-left"
                      >
                        Read More →
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 13. হোয়াটসঅ্যাপ সেকশন (Relocated between Blog and Payment) */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="border-4 border-dashed border-emerald-500 py-6 md:py-8 px-8 md:px-16 rounded-[2rem] md:rounded-full flex flex-col md:flex-row items-center justify-between group transition-all hover:bg-emerald-50/20 shadow-sm bg-white">
             <div className="flex items-center space-x-4 md:space-x-6 mb-6 md:mb-0">
                <span className="text-3xl md:text-5xl animate-bounce-slow">💬</span>
                <div className="flex flex-col text-left">
                  <h2 className="text-lg md:text-2xl font-black text-emerald-600 leading-tight">
                    কেনার পূর্বে অবশ্যই হোয়াটসঅ্যাপে যোগাযোগ করুন
                  </h2>
                  <p className="text-[8px] md:text-xs font-black text-slate-400 uppercase tracking-widest mt-1">
                    Get Expert Consultation Instantly for your dream project
                  </p>
                </div>
             </div>
             <a 
                href="https://wa.me/8801764471819" 
                className="px-8 py-4 md:px-12 md:py-5 bg-emerald-600 text-white rounded-full font-black text-sm md:text-xl shadow-[0_15px_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-all flex items-center justify-center space-x-3 w-full md:w-auto"
              >
                 <span>WhatsApp Support</span>
                 <span>→</span>
              </a>
          </div>
        </div>
      </section>

      {/* 14. পেমেন্ট মেথড (Enhanced Header) */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto max-w-[1440px] px-4 md:px-6 text-center">
          <div className="mb-12 md:mb-16">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-100">Trusted Partners</div>
            <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">আমরা যেসব মাধ্যমে পেমেন্ট গ্রহণ করি</h2>
            <p className="text-slate-500 font-bold text-xs md:text-lg max-w-2xl mx-auto opacity-80 leading-relaxed">দেশের সব জনপ্রিয় পেমেন্ট মেথড সাপোর্ট করি যাতে আপনার লেনদেন হয় নিরাপদ ও সহজ।</p>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-6 items-center max-w-6xl mx-auto">
            {paymentLogos.map((logo, i) => (
              <div key={i} className="h-12 md:h-20 bg-white p-2 md:p-4 rounded-xl md:rounded-2xl flex items-center justify-center border border-slate-50 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                <img src={logo.url} alt={logo.name} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white w-full max-w-3xl rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl animate-scaleUp max-h-[90vh] flex flex-col">
            <div className="relative h-40 md:h-64 shrink-0">
               <img src={selectedBlog.img} className="w-full h-full object-cover" alt="" />
               <button onClick={() => setSelectedBlog(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center text-xl backdrop-blur-md shadow-xl">✕</button>
            </div>
            <div className="p-6 md:p-12 overflow-y-auto">
               <h2 className="text-xl md:text-4xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">{selectedBlog.title}</h2>
               <p className="text-slate-600 text-sm md:text-lg font-medium leading-relaxed">{selectedBlog.desc}</p>
               <button onClick={() => setSelectedBlog(null)} className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-xl font-black text-xs uppercase shadow-lg">Close</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scaleUp { animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .english-font { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
};

export default HomePage;
