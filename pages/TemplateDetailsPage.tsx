
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../App';
import { TEMPLATES } from '../constants';
import { Template } from '../types';
import { supabase } from '../supabase';

const TemplateDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, user } = useLanguage();
  const [template, setTemplate] = useState<Template | null>(null);
  const [currentImg, setCurrentImg] = useState(0);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [accountLastDigits, setAccountLastDigits] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  
  const checkoutRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    phone: '',
    email: user?.email || '',
    businessName: ''
  });

  // Comprehensive payment methods matching the prompt request
  const paymentMethods = [
    { id: 'bkash', name: 'bKash', url: 'https://image2url.com/r2/default/images/1770034551352-bce8eb59-ce29-4756-9bd7-b19bbd8fc845.png' },
    { id: 'nagad', name: 'Nagad', url: 'https://image2url.com/r2/default/images/1770034633368-3010ec7f-6a55-45ed-a917-05b6c01f4d76.png' },
    { id: 'rocket', name: 'Rocket', url: 'https://image2url.com/r2/default/images/1770034676886-58ef4ddd-11e6-4d49-b399-bdbbda81fe16.webp' },
    { id: 'upay', name: 'Upay', url: 'https://image2url.com/r2/default/images/1770034713354-99062c15-34e2-442f-a51e-6ebcb8dc2976.webp' },
    { id: 'dbbl', name: 'Dutch Bangla Bank', url: 'https://image2url.com/r2/default/images/1770035176108-6716ebfd-6c6a-4eba-a6d0-3ba308b4e92c.webp' },
    { id: 'city_bank', name: 'City Bank', url: 'https://image2url.com/r2/default/images/1770035237923-613e7015-32c0-4f14-97f3-c9385c011de0.png' },
    { id: 'prime_bank', name: 'Prime Bank', url: 'https://image2url.com/r2/default/images/1770035196546-c8863862-73d4-4e2a-a296-0e160fbc708d.jpg' },
    { id: 'my_prime', name: 'My Prime', url: 'https://image2url.com/r2/default/images/1770035255267-484ef4e8-da39-44e5-b06d-447e5795c758.jpg' },
    { id: 'city_touch', name: 'City Touch', url: 'https://image2url.com/r2/default/images/1770035278075-92afe3b6-d70e-4d21-a0ce-c1df463ed425.png' },
    { id: 'visa', name: 'Visa', url: 'https://image2url.com/r2/default/images/1770035792573-93ca0db2-6aa0-4956-9f4c-345560376c20.jpg' },
    { id: 'mastercard', name: 'Mastercard', url: 'https://image2url.com/r2/default/images/1770035758550-8d77c3a1-3d77-4289-b6d1-d48a820ca867.png' },
    { id: 'paypal', name: 'PayPal', url: 'https://image2url.com/r2/default/images/1770035814205-32e7f8ae-2575-4dd0-b889-fae03303f01c.png' },
    { id: 'payoneer', name: 'Payoneer', url: 'https://image2url.com/r2/default/images/1770037154398-4a0d1f52-91fd-4d05-bdb4-9148f22afb44.png' },
    { id: 'amex', name: 'Amex', url: 'https://image2url.com/r2/default/images/1770037198092-71f7730f-a944-4fcb-be61-da6fbf2f5546.png' },
    { id: 'redot_pay', name: 'Redot Pay', url: 'https://image2url.com/r2/default/images/1770035830520-bb117173-bfbf-43dc-95d5-a7d0854044cb.webp' },
    { id: 'american_express', name: 'American Express', url: 'https://image2url.com/r2/default/images/1770037198092-71f7730f-a944-4fcb-be61-da6fbf2f5546.png' }
  ];

  // Specific content as per prompt for Free Gifts
  const finalFreeGifts = [
    { id: 'fg1', title: { bn: 'Free Installation Guide', en: 'Free Installation Guide' }, desc: { bn: 'কিভাবে টেমপ্লেটটি সেটআপ করবেন তার পূর্ণাঙ্গ ভিডিও ও গাইড।', en: 'Complete video and text guide for easy setup.' }, icon: '📚' },
    { id: 'fg2', title: { bn: 'Free Image Pack', en: 'Free Image Pack' }, desc: { bn: 'আপনার প্রজেক্টের জন্য হাই-কোয়ালিটি গ্রাফিক্স ও ইমেজ প্যাক।', en: 'High-quality graphics and images for your project.' }, icon: '🖼️' },
    { id: 'fg3', title: { bn: '7 Days Free Support', en: '7 Days Free Support' }, desc: { bn: 'যেকোনো কারিগরি সমস্যায় আমাদের টিমের কাছ থেকে ফ্রি সাপোর্ট।', en: 'Free technical support from our expert team.' }, icon: '🛡️' }
  ];

  useEffect(() => {
    const found = TEMPLATES.find(t => t.id === id);
    if (found) setTemplate(found);
    window.scrollTo(0, 0);
  }, [id]);

  if (!template) return <div className="py-32 text-center font-black text-2xl">টেম্পলেট পাওয়া যায়নি।</div>;

  const scrollToCheckout = () => {
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'WELCOME10') {
      const discount = Math.round(template.price * 0.1);
      setDiscountAmount(discount);
      alert('কুপন সফলভাবে যুক্ত হয়েছে! ১০% ডিসকাউন্ট পেয়েছেন।');
    } else {
      alert('দুঃখিত, কুপনটি সঠিক নয়।');
    }
  };

  const finalPayable = template.price - discountAmount;

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (accountLastDigits.length !== 4) {
      alert('অনুগ্রহ করে আপনার পেমেন্ট একাউন্টের শেষ ৪টি ডিজিট সঠিকভাবে লিখুন।');
      return;
    }
    setIsSubmitting(true);
    try {
      const orderId = `TB-${Math.floor(100000 + Math.random() * 900000)}`;
      const { error } = await supabase.from('orders').insert([{
        id: orderId,
        template_id: template.id,
        customer_name: formData.name,
        customer_email: formData.email,
        phone: formData.phone,
        price: finalPayable,
        payment_method: paymentMethod,
        payment_last_digits: accountLastDigits,
        status: 'pending',
        created_at: new Date()
      }]);
      if (error) throw error;
      setOrderComplete(orderId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert('অর্ডার করতে সমস্যা হয়েছে। অনুগ্রহ করে হোয়াটসঅ্যাপে যোগাযোগ করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 relative font-bangla">
      {/* 📱 WHATSAPP CTA - UNCHANGED POSITION */}
      <a 
        href="https://wa.me/8801764471819" 
        className="fixed bottom-6 right-6 z-[100] bg-[#10B981] text-white p-4 md:px-8 md:py-5 rounded-full shadow-[0_20px_60px_rgba(16,185,129,0.4)] flex items-center space-x-3 hover:scale-110 transition-all animate-pulse-slow"
      >
        <span className="text-2xl md:text-3xl">💬</span>
        <span className="font-black text-xs md:text-sm hidden sm:block uppercase tracking-wider">কেনার পূর্বে অবশ্যই WhatsApp-এ যোগাযোগ করুন</span>
      </a>

      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-8 md:py-16">
        {orderComplete ? (
          <div className="max-w-3xl mx-auto bg-white p-10 md:p-20 rounded-[3.5rem] md:rounded-[4.5rem] shadow-3xl text-center border border-gray-100 animate-scaleUp">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-4xl md:text-5xl mx-auto mb-8 border border-emerald-100 shadow-sm">✓</div>
            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-slate-900 leading-tight">অর্ডার সফল হয়েছে!</h1>
            <p className="text-slate-400 mb-8 text-lg md:text-xl font-bold">আপনার অর্ডার আইডি: <span className="text-blue-600 font-black">{orderComplete}</span></p>
            
            <div className="bg-blue-50/30 p-8 md:p-12 rounded-[2.5rem] mb-10 text-left border border-blue-100/50">
              <h3 className="font-black mb-6 text-blue-900 text-lg md:text-xl">অর্ডারের সংক্ষিপ্ত বিবরণ:</h3>
              <ul className="space-y-4 text-sm md:text-base font-bold text-slate-600">
                <li className="flex justify-between border-b border-blue-100/30 pb-3"><span>টেমপ্লেট:</span> <span className="text-slate-900">{template.name[language]}</span></li>
                <li className="flex justify-between border-b border-blue-100/30 pb-3"><span>পেমেন্ট মেথড:</span> <span className="uppercase text-slate-900">{paymentMethod}</span></li>
                <li className="pt-2 font-black text-blue-600 text-xl md:text-2xl flex justify-between"><span>টোটাল পেমেন্ট:</span> <span className="price">৳{finalPayable.toLocaleString()}</span></li>
              </ul>
            </div>

            <button onClick={() => navigate('/dashboard')} className="w-full py-5 md:py-6 bg-blue-600 text-white rounded-2xl font-black text-lg md:text-xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all">আমার ড্যাশবোর্ড</button>
          </div>
        ) : (
          <div className="space-y-12 md:space-y-20">
            
            {/* 1. Header & Image Preview (Strictly Same Order) */}
            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl overflow-hidden border border-gray-100 grid grid-cols-1 lg:grid-cols-2 animate-fadeIn">
              <div className="p-4 md:p-8 bg-slate-50/50">
                <div className="relative aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-inner bg-slate-200 group">
                  <img src={template.images[currentImg]} alt="" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                  {template.discount && (
                    <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-red-600 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs shadow-2xl animate-bounce">
                      {template.discount} OFF
                    </div>
                  )}
                </div>
                <div className="mt-4 md:mt-8 flex space-x-3 md:space-x-5 overflow-x-auto scrollbar-hide py-2 px-1">
                  {template.images.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentImg(i)}
                      className={`w-20 h-14 md:w-32 md:h-20 rounded-2xl overflow-hidden border-2 md:border-4 transition-all shrink-0 ${currentImg === i ? 'border-blue-600 scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center">
                 <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 w-fit">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                    <span>Verified Premium Item</span>
                 </div>
                 <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
                    {template.name[language]}
                 </h1>
                 <p className="text-slate-500 text-base md:text-xl leading-relaxed mb-10 font-medium opacity-80">
                    {template.description[language]}
                 </p>
                 
                 <div className="flex items-center space-x-6 md:space-x-10 mb-12 md:mb-16">
                    <div className="flex flex-col">
                       {template.old_price && <span className="text-lg md:text-xl text-slate-300 line-through font-bold price">৳{template.old_price.toLocaleString()}</span>}
                       <span className="text-5xl md:text-6xl font-black text-blue-600 price">৳{template.price.toLocaleString()}</span>
                    </div>
                    <div className="h-14 w-px bg-slate-100"></div>
                    <div className="bg-emerald-50 text-emerald-600 px-4 py-2 md:px-6 md:py-3 rounded-2xl md:rounded-[1.5rem] text-[10px] md:text-xs font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
                       Best Marketplace Choice
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <button 
                      onClick={scrollToCheckout}
                      className="py-5 md:py-6 bg-blue-600 text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl hover:bg-blue-700 shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center active:scale-95"
                    >
                      এখনই অর্ডার করুন →
                    </button>
                    <a 
                      href={template.demo_url} 
                      target="_blank" 
                      className="py-5 md:py-6 bg-slate-900 text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl hover:bg-black transition-all flex items-center justify-center space-x-3 active:scale-95 shadow-xl"
                    >
                      <span>👁️</span> <span>লাইভ ডেমো দেখুন</span>
                    </a>
                 </div>
              </div>
            </div>

            {/* 2. Feature & Free Gifts Section (Content Updated as requested) */}
            <div className="bg-white p-8 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-xl border border-gray-50">
                <div className="text-center mb-16 md:mb-24">
                   <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">🎁 এই টেমপ্লেটটির সাথে আপনি যা যা ফ্রি পাবেন</h2>
                   <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">কোনো অতিরিক্ত চার্জ ছাড়াই আমাদের বিশেষ উপহার</p>
                   <div className="h-2 w-24 bg-blue-600 mx-auto rounded-full mt-8"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                   {finalFreeGifts.map((gift) => (
                      <div key={gift.id} className="group p-10 md:p-12 bg-slate-50/50 rounded-[3rem] border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-2xl transition-all duration-500 text-center">
                         <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-[2rem] flex items-center justify-center text-4xl md:text-5xl mb-8 mx-auto shadow-sm group-hover:scale-110 transition-transform">
                            {gift.icon}
                         </div>
                         <h4 className="font-black text-xl md:text-2xl mb-4 text-slate-900 leading-tight">{gift.title[language]}</h4>
                         <p className="text-slate-400 text-sm md:text-base font-bold leading-relaxed">{gift.desc[language]}</p>
                         <div className="mt-8 inline-flex bg-emerald-100 text-emerald-600 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                            FREE GIFT
                         </div>
                      </div>
                   ))}
                </div>
            </div>

            {/* 🧾 MEGA CHECKOUT SECTION (Structure Strictly Maintained) */}
            <div ref={checkoutRef} className="bg-white p-6 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-3xl border border-slate-50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
               
               <div className="text-center mb-16 md:mb-24 relative z-10">
                  <span className="text-5xl md:text-7xl mb-8 block">🛒</span>
                  <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">আপনার অর্ডারটি সম্পন্ন করুন</h2>
                  <p className="text-slate-400 font-bold text-lg md:text-2xl">নিচের তথ্যগুলো পূরণ করে প্রজেক্টটি আজই শুরু করুন</p>
               </div>

               <form onSubmit={handleOrder} className="max-w-5xl mx-auto space-y-12 md:space-y-24 relative z-10">
                  
                  {/* Step 1: Personal Details (Unchanged Order) */}
                  <div className="bg-slate-50/50 p-8 md:p-16 rounded-[3.5rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center space-x-5 mb-12 md:mb-16 border-b border-slate-200 pb-8">
                      <span className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl md:text-2xl shadow-lg">1</span>
                      <h4 className="text-2xl md:text-3xl font-black text-slate-900">পার্সোনাল ডিটেইলস (Personal Details)</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                       <div className="space-y-3">
                          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-3">আপনার পুরো নাম * (Full Name)</label>
                          <input required type="text" placeholder="উদাঃ আব্দুল্লাহ আল মামুন" className="w-full px-8 py-5 md:py-6 bg-white border border-slate-200 rounded-[1.5rem] md:rounded-3xl font-bold focus:border-blue-600 outline-none transition-all shadow-sm text-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-3">মোবাইল নাম্বার * (Mobile Number)</label>
                          <input required type="text" placeholder="017XXXXXXXX" className="w-full px-8 py-5 md:py-6 bg-white border border-slate-200 rounded-[1.5rem] md:rounded-3xl font-black english-font focus:border-blue-600 outline-none transition-all shadow-sm text-lg" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-3">ইমেইল এড্রেস * (Email Address)</label>
                          <input required type="email" placeholder="example@mail.com" className="w-full px-8 py-5 md:py-6 bg-white border border-slate-200 rounded-[1.5rem] md:rounded-3xl font-bold english-font focus:border-blue-600 outline-none transition-all shadow-sm text-lg" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-3">ব্যবসা বা প্রজেক্টের নাম (Business Name)</label>
                          <input type="text" placeholder="আপনার প্রতিষ্ঠানের নাম" className="w-full px-8 py-5 md:py-6 bg-white border border-slate-200 rounded-[1.5rem] md:rounded-3xl font-bold focus:border-blue-600 outline-none transition-all shadow-sm text-lg" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
                       </div>
                    </div>
                  </div>

                  {/* Step 2: Payment & Coupon (Unchanged Order) */}
                  <div className="bg-slate-50/50 p-8 md:p-16 rounded-[3.5rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center space-x-5 mb-12 md:mb-16 border-b border-slate-200 pb-8">
                      <span className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl md:text-2xl shadow-lg">2</span>
                      <h4 className="text-2xl md:text-3xl font-black text-slate-900">পেমেন্ট এবং কুপন (Payment & Coupon)</h4>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
                       <div className="space-y-10">
                          {/* Payment Dropdown */}
                          <div className="space-y-4">
                             <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-3">পেমেন্ট মেথড নির্বাচন করুন (Payment Method) *</label>
                             <div className="relative">
                                <select 
                                   required
                                   className="w-full px-8 py-5 md:py-6 bg-white border border-slate-200 rounded-[1.5rem] md:rounded-3xl font-black text-slate-700 outline-none focus:border-blue-600 appearance-none cursor-pointer shadow-sm transition-all"
                                   value={paymentMethod}
                                   onChange={e => setPaymentMethod(e.target.value)}
                                >
                                   {paymentMethods.map(m => (
                                      <option key={m.id} value={m.id}>{m.name}</option>
                                   ))}
                                </select>
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▼</span>
                             </div>
                          </div>

                          {/* Last 4 Digits */}
                          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-dashed border-blue-200 shadow-sm text-center">
                             <label className="block text-[11px] font-black text-blue-600 mb-6 uppercase tracking-widest">🔐 একাউন্টের শেষ ৪ ডিজিট লিখুন (Last 4 Digits)</label>
                             <input 
                                required 
                                type="text" 
                                maxLength={4} 
                                placeholder="X X X X" 
                                className="w-full py-5 md:py-6 bg-slate-50 border border-slate-100 rounded-2xl md:rounded-[1.5rem] text-center text-4xl md:text-5xl font-black tracking-[0.6em] english-font outline-none focus:border-blue-600 focus:bg-white transition-all shadow-inner"
                                value={accountLastDigits}
                                onChange={e => setAccountLastDigits(e.target.value.replace(/\D/g, ''))}
                             />
                          </div>
                       </div>

                       <div className="space-y-10">
                          {/* Coupon Code */}
                          <div className="space-y-4">
                             <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-3">ডিসকাউন্ট কুপন (Coupon Code)</label>
                             <div className="bg-white p-3 md:p-4 rounded-[2rem] md:rounded-full flex items-center border border-slate-100 shadow-sm">
                                <input 
                                   type="text" 
                                   placeholder="উদাঃ WELCOME10" 
                                   className="flex-grow bg-transparent px-6 py-2 md:py-4 font-black uppercase text-sm outline-none placeholder:normal-case" 
                                   value={couponCode}
                                   onChange={e => setCouponCode(e.target.value)}
                                />
                                <button type="button" onClick={handleApplyCoupon} className="px-10 md:px-14 py-4 md:py-5 bg-slate-900 text-white rounded-[1.5rem] md:rounded-full font-black text-xs md:text-sm hover:bg-blue-600 transition-all active:scale-95 shadow-lg">Apply</button>
                             </div>
                          </div>

                          {/* Order Summary In Form */}
                          <div className="bg-[#F0F9FF] p-8 md:p-10 rounded-[2.5rem] border border-blue-100 space-y-4">
                             <div className="flex justify-between font-bold text-slate-500">
                                <span>টেমপ্লেট মূল্য:</span>
                                <span className="price">৳{template.price.toLocaleString()}</span>
                             </div>
                             {discountAmount > 0 && (
                                <div className="flex justify-between font-bold text-emerald-600">
                                   <span>ডিসকাউন্ট:</span>
                                   <span className="price">- ৳{discountAmount.toLocaleString()}</span>
                                </div>
                             )}
                             <div className="h-px bg-blue-200/50 my-2"></div>
                             <div className="flex justify-between items-center pt-2">
                                <span className="text-xl font-black text-slate-900">মোট পেমেন্ট:</span>
                                <span className="text-3xl font-black text-blue-600 price">৳{finalPayable.toLocaleString()}</span>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Final Action Button (Unchanged Structure) */}
                  <div className="flex flex-col items-center">
                     <button 
                        disabled={isSubmitting} 
                        className="w-full max-w-2xl py-7 md:py-10 bg-blue-600 text-white rounded-[2rem] md:rounded-[3rem] font-black text-2xl md:text-4xl shadow-[0_30px_70px_rgba(0,102,255,0.3)] hover:bg-blue-700 hover:scale-105 transition-all active:scale-95 group overflow-hidden relative"
                     >
                        <span className="relative z-10">{isSubmitting ? 'অর্ডার প্রসেসিং হচ্ছে...' : 'অর্ডার কনফার্ম করুন →'}</span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                     </button>
                     <p className="mt-8 text-slate-400 font-bold text-sm italic">"অর্ডার সফল হওয়ার পর আমাদের প্রতিনিধি ২৪ ঘণ্টার মধ্যে যোগাযোগ করবেন।"</p>
                  </div>

               </form>

               {/* Trust Badges */}
               <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 mt-20 md:mt-32 opacity-30 grayscale hover:opacity-60 transition-opacity duration-500">
                  <div className="flex items-center space-x-4 font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
                     <span className="text-4xl">🛡️</span> <span>SSL SECURE PAY</span>
                  </div>
                  <div className="flex items-center space-x-4 font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
                     <span className="text-4xl">✅</span> <span>SATISFACTION</span>
                  </div>
                  <div className="flex items-center space-x-4 font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
                     <span className="text-4xl">💎</span> <span>PREMIUM ITEMS</span>
                  </div>
               </div>
            </div>

          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); box-shadow: 0 20px 60px rgba(16,185,129,0.4); }
          50% { transform: scale(1.06); box-shadow: 0 30px 80px rgba(16,185,129,0.6); }
        }
        .animate-pulse-slow { animation: pulse-slow 3s infinite ease-in-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .price { font-variant-numeric: tabular-nums; }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scaleUp { animation: scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default TemplateDetailsPage;
