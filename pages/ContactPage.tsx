
import React, { useState } from 'react';
import { useLanguage } from '../App';
import { supabase } from '../supabase';

const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: ''
  });

  const serviceOptions = [
    { bn: 'Custom Website Development', en: 'Custom Website Development' },
    { bn: 'Custom Landing Page', en: 'Custom Landing Page' },
    { bn: 'Template Purchase', en: 'Template Purchase' },
    { bn: 'Plugin / Theme Development', en: 'Plugin / Theme Development' },
    { bn: 'Digital Marketing / Ads', en: 'Digital Marketing / Ads' },
    { bn: 'SEO Service', en: 'SEO Service' },
    { bn: 'Other', en: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.serviceType) {
      alert(language === 'bn' ? 'অনুগ্রহ করে একটি সার্ভিস নির্বাচন করুন।' : 'Please select a service type.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('contacts').insert([{ 
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.serviceType,
        message: formData.message,
        created_at: new Date()
      }]);
      if (error) throw error;
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert('Error sending message. Please try WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-bangla pb-20 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="primary-blue-gradient text-white py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10 animate-fadeIn">
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight">যোগাযোগ করুন</h1>
          <h2 className="text-xl md:text-3xl font-bold text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            আপনার যেকোনো প্রশ্ন, প্রজেক্ট বা সার্ভিসের জন্য আমাদের সাথে যোগাযোগ করুন
          </h2>
          <p className="text-blue-50/80 text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            আমরা সবসময় প্রস্তুত আপনার ব্যবসার জন্য সঠিক ডিজিটাল সমাধান দিতে। নিচের যেকোনো মাধ্যম ব্যবহার করে সহজেই আমাদের সাথে যোগাযোগ করতে পারেন।
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </section>

      {/* 2. QUICK CONTACT OPTIONS */}
      <section className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: WhatsApp */}
          <a href="https://wa.me/8801764471819" className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-3 transition-all">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">💬</div>
            <h4 className="text-lg font-black text-slate-900 mb-2">WhatsApp</h4>
            <p className="text-slate-400 text-xs font-bold mb-6">দ্রুত রিপ্লাই ও তাৎক্ষণিক সাপোর্টের জন্য মেসেজ দিন।</p>
            <span className="mt-auto px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">Message করুন</span>
          </a>

          {/* Card 2: Phone */}
          <a href="tel:01764471819" className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-3 transition-all">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">📞</div>
            <h4 className="text-lg font-black text-slate-900 mb-2">Phone Call</h4>
            <p className="text-slate-400 text-xs font-bold mb-6">সরাসরি কথা বলে আপনার প্রজেক্ট নিয়ে আলোচনা করুন।</p>
            <span className="mt-auto px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">কল করুন</span>
          </a>

          {/* Card 3: Email */}
          <a href="mailto:templatebazarbd@gmail.com" className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-3 transition-all">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm">✉️</div>
            <h4 className="text-lg font-black text-slate-900 mb-2">Email</h4>
            <p className="text-slate-400 text-xs font-bold mb-6">বিস্তারিত প্রজেক্ট ইনফরমেশন পাঠাতে ইমেইল করুন।</p>
            <span className="mt-auto px-6 py-3 bg-red-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-500/20">ইমেইল করুন</span>
          </a>

          {/* Card 4: Facebook */}
          <a href="#" className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-3 transition-all">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">👥</div>
            <h4 className="text-lg font-black text-slate-900 mb-2">Facebook</h4>
            <p className="text-slate-400 text-xs font-bold mb-6">আমাদের অফিশিয়াল ফেসবুক পেজে ইনবক্স করুন।</p>
            <span className="mt-auto px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20">ইনবক্স করুন</span>
          </a>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* 3. CONTACT FORM */}
        <div className="lg:col-span-7">
           <div className="bg-white p-8 md:p-16 rounded-[3.5rem] shadow-2xl border border-gray-100">
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">আমাদের সাথে যোগাযোগ করুন</h2>
              <p className="text-slate-400 font-bold text-base mb-12">নিচের ফর্মটি পূরণ করুন। আমাদের টিম খুব শীঘ্রই যোগাযোগ করবে।</p>
              
              {submitted ? (
                <div className="py-20 text-center animate-scaleUp">
                   <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 border border-emerald-200">✓</div>
                   <h3 className="text-2xl font-black text-slate-900">আপনার বার্তা সফলভাবে পৌঁছেছে!</h3>
                   <p className="text-slate-500 font-bold mt-4">আমাদের প্রতিনিধি খুব দ্রুত আপনার সাথে যোগাযোগ করবে।</p>
                   <button onClick={() => setSubmitted(false)} className="mt-10 text-blue-600 font-black uppercase tracking-widest text-xs hover:underline">আবার বার্তা পাঠান</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">আপনার পুরো নাম *</label>
                         <input required type="text" placeholder="উদাঃ আব্দুল্লাহ আল মামুন" className="w-full px-6 py-4 md:py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-blue-600 focus:bg-white outline-none transition-all" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">মোবাইল নাম্বার *</label>
                         <input required type="text" placeholder="017XXXXXXXX" className="w-full px-6 py-4 md:py-5 bg-slate-50 border border-slate-100 rounded-2xl font-black english-font focus:border-blue-600 focus:bg-white outline-none transition-all" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">ইমেইল এড্রেস *</label>
                      <input required type="email" placeholder="example@mail.com" className="w-full px-6 py-4 md:py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold english-font focus:border-blue-600 focus:bg-white outline-none transition-all" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">সার্ভিসের ধরণ (Service Type) *</label>
                      <select required className="w-full px-6 py-4 md:py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-blue-600 focus:bg-white outline-none transition-all appearance-none cursor-pointer" value={formData.serviceType} onChange={e=>setFormData({...formData, serviceType: e.target.value})}>
                         <option value="">নির্বাচন করুন</option>
                         {serviceOptions.map((opt, i) => (
                           <option key={i} value={opt.en}>{opt[language]}</option>
                         ))}
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">বিস্তারিত প্রজেক্ট ইনফরমেশন *</label>
                      <textarea required rows={5} placeholder="আপনার প্রজেক্ট বা কি কি সার্ভিস লাগবে তা সংক্ষেপে লিখুন..." className="w-full px-6 py-4 md:py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-blue-600 focus:bg-white outline-none transition-all" value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})}></textarea>
                   </div>
                   
                   <p className="text-[10px] text-slate-400 font-bold italic">"আপনার তথ্য সম্পূর্ণ নিরাপদ রাখা হবে এবং শুধুমাত্র যোগাযোগের জন্য ব্যবহার করা হবে।"</p>
                   
                   <button disabled={loading} className="w-full py-6 bg-blue-600 text-white rounded-[1.5rem] font-black text-xl md:text-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-95 group overflow-hidden relative">
                      <span className="relative z-10">{loading ? 'বার্তা পাঠানো হচ্ছে...' : '👉 মেসেজ পাঠান'}</span>
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                   </button>
                </form>
              )}
           </div>
        </div>

        {/* 4. BUSINESS INFORMATION & HOURS */}
        <div className="lg:col-span-5 space-y-12">
           {/* Business Info Section */}
           <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 space-y-10">
              <h3 className="text-2xl font-black text-slate-900 border-l-4 border-blue-600 pl-4 uppercase tracking-wider">আমাদের অফিস তথ্য</h3>
              <div className="space-y-8">
                 <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shrink-0">📍</div>
                    <div>
                       <h5 className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-1">ঠিকানা</h5>
                       <p className="text-slate-800 font-bold text-lg leading-snug">সাভার, ঢাকা (সারা বাংলাদেশে সার্ভিস প্রদান করা হয়)</p>
                    </div>
                 </div>
                 <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shrink-0">📞</div>
                    <div>
                       <h5 className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-1">মোবাইল</h5>
                       <p className="text-slate-800 font-black text-lg english-font">01764471819</p>
                    </div>
                 </div>
                 <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shrink-0">📧</div>
                    <div>
                       <h5 className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-1">ইমেইল</h5>
                       <p className="text-slate-800 font-black text-base english-font">templatebazarbd@gmail.com</p>
                    </div>
                 </div>
                 <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shrink-0">🌐</div>
                    <div>
                       <h5 className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-1">ওয়েবসাইট</h5>
                       <p className="text-slate-800 font-black text-base english-font">www.templatebazarbd.com</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Support & Working Hours Section - Updated with Emerald Gradient and 24/7 */}
           <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              <h3 className="text-2xl font-black mb-8 border-l-4 border-white pl-4 uppercase tracking-wider relative z-10">সাপোর্ট সময়সূচি</h3>
              <div className="space-y-6 relative z-10">
                 <div className="flex justify-between items-center border-b border-white/20 pb-4">
                    <span className="font-bold text-emerald-50">২৪ ঘণ্টা, সপ্তাহের ৭ দিন</span>
                    <span className="font-black english-font bg-white/20 px-3 py-1 rounded-lg">24/7 SUPPORT</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/20 pb-4">
                    <span className="font-bold text-emerald-50">শুক্রবার</span>
                    <span className="font-black">ফুল সাপোর্ট চালু</span>
                 </div>
                 <div className="pt-4 flex items-start space-x-4 bg-white/10 p-4 rounded-2xl border border-white/20">
                    <span className="text-2xl">⚡</span>
                    <p className="text-sm font-bold text-emerald-50">যেকোনো সময় আমাদের বিশেষজ্ঞ টিমের সাথে সরাসরি কথা বলুন।</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 5. GOOGLE MAP SECTION */}
      <section className="container mx-auto px-6 mb-32">
         <div className="bg-white p-4 rounded-[3.5rem] shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-12">
               <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">আমাদের অবস্থান</h3>
               <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.3em]">Savar, Dhaka Based Online Solutions</p>
            </div>
            <div className="h-96 md:h-[500px] w-full bg-slate-100 relative">
               <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116752.4172535064!2d90.22271618721345!3d23.864620677494447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755ebd36592231f%3A0xc078f44d85608b0b!2sSavar!5e0!3m2!1sen!2sbd!4v1715000000000!5m2!1sen!2sbd" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Google Map"
               ></iframe>
               <div className="absolute top-10 left-10 bg-white p-6 rounded-2xl shadow-2xl border border-blue-50 max-w-xs hidden md:block">
                  <h4 className="font-black text-blue-600 text-lg mb-2">সাভার অফিস</h4>
                  <p className="text-slate-500 font-bold text-xs leading-relaxed">আমরা ঢাকা সাভার সহ সারা বাংলাদেশে অনলাইনে আমাদের সকল সেবা অত্যন্ত দক্ষতার সাথে প্রদান করে থাকি।</p>
               </div>
            </div>
         </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="container mx-auto px-6">
         <div className="primary-blue-gradient p-12 md:p-24 rounded-[4rem] text-center shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="relative z-10 space-y-12">
               <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight leading-tight">
                 আপনার প্রজেক্ট শুরু করতে প্রস্তুত? <br className="hidden md:block" /> আজই আমাদের সাথে যোগাযোগ করুন।
               </h2>
               <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
                  <a 
                    href="https://wa.me/8801764471819" 
                    className="w-full sm:w-auto px-16 py-7 bg-[#10B981] text-white rounded-[2rem] font-black text-xl md:text-3xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-4 animate-pulse-slow"
                  >
                     <span className="text-4xl">💬</span>
                     <span>Get Started Now</span>
                  </a>
                  <button onClick={() => window.scrollTo({top: 500, behavior: 'smooth'})} className="text-blue-100 font-black text-xl md:text-2xl hover:text-white transition-colors underline underline-offset-8">
                    অথবা কন্টাক্ট ফর্ম পূরণ করুন →
                  </button>
               </div>
            </div>
         </div>
      </section>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scaleUp { animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
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

export default ContactPage;
