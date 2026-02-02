
import React from 'react';
import { useLanguage } from '../App';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();

  const services = [
    { title: 'কাস্টম ওয়েবসাইট ডেভেলপমেন্ট', icon: '💻' },
    { title: 'কাস্টম ল্যান্ডিং পেজ ডেভেলপমেন্ট', icon: '🚀' },
    { title: 'কাস্টম টেম্পলেট ডিজাইন ও ডেভেলপমেন্ট', icon: '🎨' },
    { title: 'কাস্টম প্লাগইন ও থিম ডেভেলপমেন্ট', icon: '🔌' },
    { title: 'ফেসবুক ও গুগল অ্যাড ক্যাম্পেইন', icon: '📈' },
    { title: 'SEO (Search Engine Optimization)', icon: '🔍' },
    { title: 'বিজনেস অটোমেশন সল্যুশন', icon: '⚙️' }
  ];

  const chooseUsPoints = [
    { title: 'প্রফেশনাল ও অভিজ্ঞ টিম', icon: '✅' },
    { title: 'সাশ্রয়ী ও স্বচ্ছ প্রাইসিং', icon: '✅' },
    { title: 'সময়মতো ডেলিভারি', icon: '✅' },
    { title: 'লাইফটাইম সাপোর্ট অপশন', icon: '✅' },
    { title: 'ক্লায়েন্ট-ফোকাসড সল্যুশন', icon: '✅' },
    { title: 'দেশি ও আন্তর্জাতিক সাপোর্ট', icon: '✅' }
  ];

  const paymentLogos = [
    { name: 'bKash', url: 'https://image2url.com/r2/default/images/1770034551352-bce8eb59-ce29-4756-9bd7-b19bbd8fc845.png' },
    { name: 'Nagad', url: 'https://image2url.com/r2/default/images/1770034633368-3010ec7f-6a55-45ed-a917-05b6c01f4d76.png' },
    { name: 'Rocket', url: 'https://image2url.com/r2/default/images/1770034676886-58ef4ddd-11e6-4d49-b399-bdbbda81fe16.webp' },
    { name: 'Upay', url: 'https://image2url.com/r2/default/images/1770034713354-99062c15-34e2-442f-a51e-6ebcb8dc2976.webp' },
    { name: 'DBBL', url: 'https://image2url.com/r2/default/images/1770035176108-6716ebfd-6c6a-4eba-a6d0-3ba308b4e92c.webp' },
    { name: 'City Bank', url: 'https://image2url.com/r2/default/images/1770035237923-613e7015-32c0-4f14-97f3-c9385c011de0.png' },
    { name: 'Prime Bank', url: 'https://image2url.com/r2/default/images/1770035196546-c8863862-73d4-4e2a-a296-0e160fbc708d.jpg' },
    { name: 'City Touch', url: 'https://image2url.com/r2/default/images/1770035278075-92afe3b6-d70e-4d21-a0ce-c1df463ed425.png' },
    { name: 'Visa', url: 'https://image2url.com/r2/default/images/1770035792573-93ca0db2-6aa0-4956-9f4c-345560376c20.jpg' },
    { name: 'Mastercard', url: 'https://image2url.com/r2/default/images/1770035758550-8d77c3a1-3d77-4289-b6d1-d48a820ca867.png' },
    { name: 'PayPal', url: 'https://image2url.com/r2/default/images/1770035814205-32e7f8ae-2575-4dd0-b889-fae03303f01c.png' },
    { name: 'Payoneer', url: 'https://image2url.com/r2/default/images/1770037154398-4a0d1f52-91fd-4d05-bdb4-9148f22afb44.png' },
    { name: 'RedotPay', url: 'https://image2url.com/r2/default/images/1770035830520-bb117173-bfbf-43dc-95d5-a7d0854044cb.webp' },
    { name: 'Amex', url: 'https://image2url.com/r2/default/images/1770037198092-71f7730f-a944-4fcb-be61-da6fbf2f5546.png' },
    { name: 'Cellfin', url: 'https://image2url.com/r2/default/images/1770035255267-484ef4e8-da39-44e5-b06d-447e5795c758.jpg' },
    { name: 'Wise', url: 'https://image2url.com/r2/default/images/1770035196546-c8863862-73d4-4e2a-a296-0e160fbc708d.jpg' }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-bangla pb-20 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="primary-blue-gradient text-white py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10 animate-fadeIn">
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight">আমাদের সম্পর্কে</h1>
          <h2 className="text-xl md:text-3xl font-bold text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            ডিজিটাল সল্যুশনের মাধ্যমে আপনার ব্যবসাকে এগিয়ে নেওয়াই আমাদের লক্ষ্য
          </h2>
          <p className="text-blue-50/80 text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            আমরা একটি প্রফেশনাল ডিজিটাল সার্ভিস টিম, যারা ওয়েবসাইট ডেভেলপমেন্ট, ল্যান্ডিং পেজ, কাস্টম টেমপ্লেট, প্লাগইন, থিম, ডিজিটাল মার্কেটিং ও SEO সার্ভিস প্রদান করে থাকি। আমাদের লক্ষ্য হচ্ছে সহজ, কার্যকর ও বাজেট-ফ্রেন্ডলি সমাধান দিয়ে ক্লায়েন্টের ব্যবসার গ্রোথ নিশ্চিত করা।
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
      </section>

      <div className="container mx-auto px-6 md:px-12 py-20 space-y-32">
        
        {/* 2. WHO WE ARE */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/5 rounded-[3rem] blur-2xl transition-all group-hover:bg-blue-600/10"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Team Work" 
              className="relative z-10 rounded-[2.5rem] shadow-2xl border border-white"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100 z-20 hidden md:block animate-bounce-slow">
               <div className="text-4xl font-black text-blue-600 english-font">5+</div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Years Experience</p>
            </div>
          </div>
          <div className="space-y-8 animate-fadeInRight">
             <div className="inline-block px-5 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100">
               আমরা কারা (Who We Are)
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">ডিজিটাল উদ্যোক্তাদের স্বপ্ন পূরণে বিশ্বস্ত সহযোগী</h2>
             <div className="space-y-6 text-slate-500 text-lg leading-relaxed font-medium">
               <p>আমরা একটি বাংলাদেশভিত্তিক ডিজিটাল সার্ভিস প্ল্যাটফর্ম, যেখানে অভিজ্ঞ ডেভেলপার, ডিজাইনার ও মার্কেটিং এক্সপার্টরা একসাথে কাজ করি।</p>
               <p>আমরা বিশ্বাস করি—একটি ভালো ওয়েবসাইট বা ডিজিটাল সিস্টেম শুধু সুন্দর হলেই হয় না, সেটি হতে হবে ব্যবসা-ফোকাসড, ইউজার-ফ্রেন্ডলি এবং কনভার্সন-রেডি।</p>
               <p>আমাদের প্রতিটি সার্ভিস ডিজাইন করা হয় ক্লায়েন্টের প্রয়োজন, বাজেট এবং ভবিষ্যৎ গ্রোথ চিন্তা করে।</p>
             </div>
          </div>
        </section>

        {/* 3. WHAT WE DO - Updated with Clickable Links to /services */}
        <section className="bg-white p-12 md:p-24 rounded-[3.5rem] shadow-xl border border-gray-50">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">আমাদের সেবাসমূহ</h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Professional Digital Services we provide</p>
              <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full mt-8"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <Link to="/services" key={i} className="flex items-center space-x-6 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all group cursor-pointer">
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                      {s.icon}
                   </div>
                   <h4 className="text-lg font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{s.title}</h4>
                </Link>
              ))}
           </div>
           <p className="mt-16 text-center text-slate-500 font-bold text-lg md:text-xl max-w-4xl mx-auto italic border-t pt-10 border-slate-100">
             "আমরা প্রতিটি প্রজেক্টে কোয়ালিটি, পারফরম্যান্স এবং ক্লায়েন্ট স্যাটিসফ্যাকশনকে সর্বোচ্চ গুরুত্ব দেই।"
           </p>
        </section>

        {/* 4. MISSION & VISION - Updated background to Indigo Gradient */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="bg-gradient-to-br from-slate-800 to-indigo-900 p-12 md:p-16 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-4xl mb-10 shadow-lg shadow-blue-500/20">🎯</div>
              <h3 className="text-2xl md:text-4xl font-black mb-6">আমাদের মিশন (Mission)</h3>
              <p className="text-white/70 text-lg font-medium leading-relaxed">
                 বাংলাদেশসহ বিশ্বের যেকোনো প্রান্তের ব্যবসার জন্য সহজ, আধুনিক ও কার্যকর ডিজিটাল সমাধান তৈরি করা—যা বাস্তব ফলাফল দেয়।
              </p>
           </div>
           <div className="bg-blue-600 p-12 md:p-16 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl mb-10 shadow-lg border border-white/30">👁️</div>
              <h3 className="text-2xl md:text-4xl font-black mb-6">আমাদের ভিশন (Vision)</h3>
              <p className="text-white/80 text-lg font-medium leading-relaxed">
                 একটি বিশ্বস্ত ডিজিটাল সার্ভিস ব্র্যান্ড হিসেবে প্রতিষ্ঠিত হওয়া, যেখানে ক্লায়েন্টরা নিশ্চিন্তে দীর্ঘমেয়াদী সাপোর্ট পাবে।
              </p>
           </div>
        </section>

        {/* 5. WHY CHOOSE US */}
        <section className="text-center">
           <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">কেন আমাদের বেছে নেবেন?</h2>
           <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-16">Why clients trust template bazar bd</p>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {chooseUsPoints.map((p, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center group hover:shadow-xl transition-all">
                   <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                      {p.icon}
                   </div>
                   <h4 className="text-xl font-black text-slate-900">{p.title}</h4>
                </div>
              ))}
           </div>
        </section>

        {/* 6. PAYMENT METHODS */}
        <section className="bg-white p-12 md:p-24 rounded-[3.5rem] md:rounded-[5rem] shadow-xl border border-gray-100">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">আমাদের পেমেন্ট পদ্ধতি</h2>
              <p className="text-slate-500 font-bold text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                আমরা ক্লায়েন্টের সুবিধার কথা মাথায় রেখে নিরাপদ ও জনপ্রিয় একাধিক পেমেন্ট পদ্ধতি সাপোর্ট করি।
              </p>
              <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
           </div>

           <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 items-center">
              {paymentLogos.map((logo, i) => (
                <div key={i} className="h-20 bg-slate-50 p-3 rounded-2xl flex items-center justify-center border border-slate-100 hover:shadow-lg hover:bg-white hover:scale-110 transition-all group">
                   <img src={logo.url} alt={logo.name} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
           </div>

           <div className="mt-16 text-center space-y-4">
              <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">💳 Supported Methods: bKash, Nagad, Rocket, Upay, Bank Transfer, Wise/Card</p>
              <p className="text-emerald-600 font-black text-sm italic">"সকল পেমেন্ট সম্পূর্ণ নিরাপদ ও ট্রান্সপারেন্ট পদ্ধতিতে গ্রহণ করা হয়।"</p>
           </div>
        </section>

        {/* 7. TRUST & COMMITMENT */}
        <section className="bg-blue-50/50 p-12 md:p-24 rounded-[4rem] border border-blue-100 text-center relative overflow-hidden">
           <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>
           <div className="relative z-10 max-w-4xl mx-auto space-y-10">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900">আমাদের অঙ্গীকার</h2>
              <div className="space-y-6 text-slate-600 text-lg md:text-xl font-bold leading-relaxed">
                 <p>আমরা প্রতিটি ক্লায়েন্টকে দীর্ঘমেয়াদী পার্টনার হিসেবে দেখি। প্রজেক্ট শেষ হওয়ার পরও আমরা সাপোর্ট দিয়ে থাকি, যেন আপনার ব্যবসা নিরবচ্ছিন্নভাবে চলতে পারে।</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
                 <div className="flex flex-col items-center space-y-3">
                    <span className="text-3xl">✔️</span>
                    <span className="font-black text-slate-800">নিশ্চিন্ত ডেলিভারি</span>
                 </div>
                 <div className="flex flex-col items-center space-y-3">
                    <span className="text-3xl">✔️</span>
                    <span className="font-black text-slate-800">পরিষ্কার কমিউনিকেশন</span>
                 </div>
                 <div className="flex flex-col items-center space-y-3">
                    <span className="text-3xl">✔️</span>
                    <span className="font-black text-slate-800">বাস্তব ফলাফল</span>
                 </div>
              </div>
           </div>
        </section>

        {/* 8. FINAL CALL TO ACTION - Updated from Black to Blue Gradient */}
        <section className="primary-blue-gradient p-12 md:p-24 rounded-[4rem] text-center shadow-3xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
           <div className="relative z-10 space-y-12">
              <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight">
                আপনার ব্যবসার জন্য সঠিক ডিজিটাল সমাধান খুঁজছেন?
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
                 <a 
                   href="https://wa.me/8801764471819" 
                   className="w-full sm:w-auto px-16 py-7 bg-[#10B981] text-white rounded-[2rem] font-black text-xl md:text-3xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-4 animate-pulse-slow"
                 >
                    <span className="text-4xl">💬</span>
                    <span>এখনই যোগাযোগ করুন</span>
                 </a>
                 <Link to="/contact" className="text-blue-100 font-black text-xl md:text-2xl hover:text-white transition-colors underline underline-offset-8">
                   অথবা ইনকোয়ারি পাঠান →
                 </Link>
              </div>
           </div>
        </section>

      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fadeInRight { animation: fadeInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); box-shadow: 0 20px 60px rgba(16,185,129,0.3); }
          50% { transform: scale(1.05); box-shadow: 0 30px 80px rgba(16,185,129,0.5); }
        }
        .animate-pulse-slow { animation: pulse-slow 3s infinite ease-in-out; }
        .english-font { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
};

export default AboutPage;
