
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../App';

const ServicesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    projectDetails: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [accountLastDigits, setAccountLastDigits] = useState('');

  const services = [
    {
      id: 's1',
      title: { bn: 'Custom Website Development', en: 'Custom Website Development' },
      desc: { bn: 'আপনার বিজনেসের জন্য একটি আধুনিক, প্রফেশনাল এবং কাস্টম ডিজাইনের ওয়েবসাইট যা আপনার ব্র্যান্ড ভ্যালু বহুগুণ বাড়িয়ে দিবে।', en: 'A modern, professional, and custom-designed website for your business to boost your brand value.' },
      points: { 
        bn: ['Business-focused design', 'Mobile & SEO friendly', 'Fast loading & secure', 'Full customization'],
        en: ['Business-focused design', 'Mobile & SEO friendly', 'Fast loading & secure', 'Full customization']
      },
      price: { bn: '১৫,০০০', en: '15,000' },
      delivery: { bn: '১০-১৫ দিন', en: '10-15 Days' },
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      icon: '💻'
    },
    {
      id: 's2',
      title: { bn: 'Custom Landing Page Development', en: 'Custom Landing Page Development' },
      desc: { bn: 'অ্যাডস এবং ক্যাম্পেইনের জন্য হাই-কনভার্টিং ল্যান্ডিং পেজ যা সরাসরি সেলস বৃদ্ধিতে অত্যন্ত কার্যকর ভূমিকা পালন করে।', en: 'High-converting landing pages for ads and campaigns effective for boosting direct sales.' },
      points: { 
        bn: ['High conversion layout', 'Ads & campaign ready', 'CTA optimized design', 'Fast & lightweight'],
        en: ['High conversion layout', 'Ads & campaign ready', 'CTA optimized design', 'Fast & lightweight']
      },
      price: { bn: '৭,০০০', en: '7,000' },
      delivery: { bn: '৩-৫ দিন', en: '3-5 Days' },
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      icon: '🚀'
    },
    {
      id: 's3',
      title: { bn: 'Custom Template Development', en: 'Custom Template Development' },
      desc: { bn: 'ইউনিক এবং রেসপন্সিভ টেম্পলেট ডিজাইন যা আপনার ব্যবসাকে প্রতিযোগীদের থেকে আলাদা এবং আকর্ষণীয় করে তুলবে।', en: 'Unique and responsive template designs to set your business apart from others.' },
      points: { 
        bn: ['Unique template design', 'Brand-based UI', 'Reusable & scalable', 'Easy customization'],
        en: ['Unique template design', 'Brand-based UI', 'Reusable & scalable', 'Easy customization']
      },
      price: { bn: '১০,০০০', en: '10,000' },
      delivery: { bn: '৫-৭ দিন', en: '5-7 Days' },
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
      icon: '🎨'
    },
    {
      id: 's4',
      title: { bn: 'Custom Plugin Development', en: 'Custom Plugin Development' },
      desc: { bn: 'আপনার সাইটে বিশেষ কোনো ফিচার বা অটোমেশন যুক্ত করতে আমাদের দক্ষ ডেভেলপার দিয়ে কাস্টম প্লাগ-ইন তৈরি করুন।', en: 'Take our custom plugin services to add specific features or automation to your site.' },
      points: { 
        bn: ['Business automation', 'Custom functionality', 'Secure & optimized code', 'Future update support'],
        en: ['Business automation', 'Custom functionality', 'Secure & optimized code', 'Future update support']
      },
      price: { bn: '১২,০০০', en: '12,000' },
      delivery: { bn: '৭-১০ দিন', en: '7-10 Days' },
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      icon: '🔌'
    },
    {
      id: 's5',
      title: { bn: 'Theme Customization & Development', en: 'Theme Customization & Development' },
      desc: { bn: 'ওয়ার্ডপ্রেস বা অন্যান্য প্ল্যাটফর্মের থিম কাস্টমাইজেশনের মাধ্যমে আপনার সাইটকে দিন এক নতুন ও আধুনিক লুক।', en: 'Give your site a new look through WordPress or other theme customizations.' },
      points: { 
        bn: ['Theme customization', 'Speed & design optimization', 'SEO-ready structure', 'Bug fixing'],
        en: ['Theme customization', 'Speed & design optimization', 'SEO-ready structure', 'Bug fixing']
      },
      price: { bn: '৫,০০০', en: '5,000' },
      delivery: { bn: '৩-৪ দিন', en: '3-4 Days' },
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      icon: '🛠️'
    },
    {
      id: 's6',
      title: { bn: 'Ads Campaign Management', en: 'Ads Campaign Management' },
      desc: { bn: 'টার্গেটেড কাস্টমারদের কাছে পৌঁছাতে এবং সেলস নিশ্চিত করতে আমাদের প্রফেশনাল অ্যাডস ক্যাম্পেইন সার্ভিস।', en: 'Professional ads campaign services to reach your targeted customers effectively.' },
      points: { 
        bn: ['Facebook & Google Ads', 'Conversion tracking', 'Target audience research', 'ROI-focused strategy'],
        en: ['Facebook & Google Ads', 'Conversion tracking', 'Target audience research', 'ROI-focused strategy']
      },
      price: { bn: '৬,০০০', en: '6,000' },
      delivery: { bn: 'চলমান (Monthly)', en: 'Ongoing (Monthly)' },
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      icon: '📈'
    },
    {
      id: 's7',
      title: { bn: 'SEO Service', en: 'SEO Service' },
      desc: { bn: 'আপনার ওয়েবসাইটকে সার্চ ইঞ্জিনের প্রথম পাতায় র‍্যাঙ্ক করাতে আমাদের অভিজ্ঞ টিমের অ্যাডভান্স এসইও সার্ভিস।', en: 'Advanced SEO to rank your website on the first page of search engines.' },
      points: { 
        bn: ['On-page SEO', 'Technical SEO', 'Keyword research', 'Google ranking improvement'],
        en: ['On-page SEO', 'Technical SEO', 'Keyword research', 'Google ranking improvement']
      },
      price: { bn: '৫,০০০', en: '5,000' },
      delivery: { bn: 'চলমান (Monthly)', en: 'Ongoing (Monthly)' },
      image: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&w=800&q=80',
      icon: '🔍'
    }
  ];

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', url: 'https://image2url.com/r2/default/images/1770034551352-bce8eb59-ce29-4756-9bd7-b19bbd8fc845.png' },
    { id: 'nagad', name: 'Nagad', url: 'https://image2url.com/r2/default/images/1770034633368-3010ec7f-6a55-45ed-a917-05b6c01f4d76.png' },
    { id: 'rocket', name: 'Rocket', url: 'https://image2url.com/r2/default/images/1770034676886-58ef4ddd-11e6-4d49-b399-bdbbda81fe16.webp' },
    { id: 'upay', name: 'Upay', url: 'https://image2url.com/r2/default/images/1770034713354-99062c15-34e2-442f-a51e-6ebcb8dc2976.webp' },
    { id: 'dbbl', name: 'DBBL', url: 'https://image2url.com/r2/default/images/1770035176108-6716ebfd-6c6a-4eba-a6d0-3ba308b4e92c.webp' },
    { id: 'city_bank', name: 'City Bank', url: 'https://image2url.com/r2/default/images/1770035237923-613e7015-32c0-4f14-97f3-c9385c011de0.png' },
    { id: 'prime_bank', name: 'Prime Bank', url: 'https://image2url.com/r2/default/images/1770035196546-c8863862-73d4-4e2a-a296-0e160fbc708d.jpg' },
    { id: 'city_touch', name: 'City Touch', url: 'https://image2url.com/r2/default/images/1770035278075-92afe3b6-d70e-4d21-a0ce-c1df463ed425.png' },
    { id: 'visa', name: 'Visa', url: 'https://image2url.com/r2/default/images/1770035792573-93ca0db2-6aa0-4956-9f4c-345560376c20.jpg' },
    { id: 'mastercard', name: 'Mastercard', url: 'https://image2url.com/r2/default/images/1770035758550-8d77c3a1-3d77-4289-b6d1-d48a820ca867.png' },
    { id: 'paypal', name: 'PayPal', url: 'https://image2url.com/r2/default/images/1770035814205-32e7f8ae-2575-4dd0-b889-fae03303f01c.png' },
    { id: 'payoneer', name: 'Payoneer', url: 'https://image2url.com/r2/default/images/1770037154398-4a0d1f52-91fd-4d05-bdb4-9148f22afb44.png' },
    { id: 'redotpay', name: 'Redot Pay', url: 'https://image2url.com/r2/default/images/1770035830520-bb117173-bfbf-43dc-95d5-a7d0854044cb.webp' },
    { id: 'amex', name: 'Amex', url: 'https://image2url.com/r2/default/images/1770037198092-71f7730f-a944-4fcb-be61-da6fbf2f5546.png' },
    { id: 'cellfin', name: 'Cellfin', url: 'https://image2url.com/r2/default/images/1770035255267-484ef4e8-da39-44e5-b06d-447e5795c758.jpg' },
    { id: 'prime_prime', name: 'My Prime', url: 'https://image2url.com/r2/default/images/1770035255267-484ef4e8-da39-44e5-b06d-447e5795c758.jpg' }
  ];

  const supportBenefits = [
    { title: 'লাইফটাইম সাপোর্ট', icon: '🎧', desc: 'আমাদের যেকোনো সার্ভিসের সাথে পাবেন লাইফটাইম ফ্রি টেকনিক্যাল সাপোর্ট।' },
    { title: 'দ্রুত ডেলিভারি', icon: '⚡', desc: 'নির্ধারিত সময়ের মধ্যে সর্বোচ্চ গুণমান নিশ্চিত করে প্রজেক্ট ডেলিভারি করি।' },
    { title: 'নিরাপদ পেমেন্ট', icon: '🛡️', desc: 'বিকাশ, নগদ সহ দেশের সব পেমেন্ট গেটওয়েতে নিরাপদ লেনদেনের সুবিধা।' },
    { title: 'অভিজ্ঞ টিম', icon: '🏆', desc: '৫ বছরেরও বেশি অভিজ্ঞ ডিজাইনার এবং ডেভেলপারদের সমন্বয়ে আমাদের টিম গঠিত।' }
  ];

  const handleSelectService = (service: any) => {
    setSelectedService(service);
    setIsSuccess(false);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountLastDigits.length !== 4) {
      alert('আপনার পেমেন্ট একাউন্টের শেষ ৪টি ডিজিট লিখুন।');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 font-bangla">
      {/* Floating WhatsApp CTA */}
      <a 
        href="https://wa.me/8801764471819" 
        className="fixed bottom-6 right-6 z-[100] bg-[#10B981] text-white p-4 md:px-8 md:py-5 rounded-full shadow-[0_20px_60px_rgba(16,185,129,0.4)] flex items-center space-x-3 hover:scale-110 transition-all animate-pulse-slow"
      >
        <span className="text-2xl md:text-3xl">💬</span>
        <span className="font-black text-xs md:text-sm hidden sm:block uppercase tracking-wider">Help? WhatsApp</span>
      </a>

      {/* Hero Header */}
      <div className="primary-blue-gradient text-white py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-7xl font-black mb-6 animate-fadeIn">{t('services')}</h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium opacity-80 uppercase tracking-widest">Premium Digital Solutions for Your Business</p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        {isSuccess ? (
          <div className="max-w-3xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] md:rounded-[4rem] shadow-3xl text-center border border-gray-100 mt-20 animate-scaleUp">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-4xl md:text-5xl mx-auto mb-10 border border-emerald-100">✓</div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">রিকোয়েস্ট সফল হয়েছে!</h2>
            <p className="text-slate-500 text-lg md:text-xl font-bold">আমাদের প্রতিনিধি খুব দ্রুত আপনার সাথে যোগাযোগ করবে।</p>
            <button onClick={() => {setSelectedService(null); setIsSuccess(false);}} className="mt-12 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl">সব সেবা দেখুন</button>
          </div>
        ) : !selectedService ? (
          <div className="py-12 md:py-20">
            {/* Intro Description Section */}
            <div className="max-w-5xl mx-auto text-center mb-12 md:mb-20 space-y-6 md:space-y-8">
               <h2 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tight">আমাদের সেবা সমূহ সম্পর্কে বিস্তারিত</h2>
               <p className="text-slate-500 text-sm md:text-xl font-medium leading-relaxed max-w-4xl mx-auto">
                  টেমপ্লেট বাজার বিডি শুধুমাত্র একটি টেমপ্লেট মার্কেটপ্লেস নয়, আমরা আপনার বিজনেসের ডিজিটাল পার্টনার। আমাদের লক্ষ্য হলো বাংলাদেশের উদ্যোক্তাদের জন্য সাশ্রয়ী মূল্যে আধুনিক ও বিশ্বমানের ওয়েবসাইট এবং টেকনিক্যাল সলিউশন প্রদান করা।
               </p>
               <div className="h-1.5 md:h-2 w-20 md:w-32 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            {/* Service Grid - Mobile optimized sizing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mb-32">
              {services.map((service) => (
                <div key={service.id} className="group bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col h-full transform hover:-translate-y-3">
                   {/* Top Image - smaller height on mobile */}
                   <div className="relative aspect-[16/9] md:aspect-[16/10] overflow-hidden">
                      <img src={service.image} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute top-4 left-4 md:top-5 md:left-5 bg-white/95 backdrop-blur-md w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-xl md:text-3xl shadow-xl z-10 border border-white">
                        {service.icon}
                      </div>
                   </div>
                   
                   {/* Card Content */}
                   <div className="p-6 md:p-10 flex flex-col flex-grow">
                      <h3 className="text-lg md:text-2xl font-black text-slate-900 mb-2 md:mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                        {service.title[language]}
                      </h3>
                      <p className="text-slate-400 text-[10px] md:text-base mb-6 md:mb-8 font-medium leading-relaxed line-clamp-2 md:line-clamp-3">
                         {service.desc[language]}
                      </p>
                      
                      <div className="space-y-2 md:space-y-3 mb-6 md:mb-10">
                         {service.points[language].slice(0, 3).map((point, i) => (
                           <div key={i} className="flex items-center space-x-2 md:space-x-3 text-slate-600 font-bold text-[9px] md:text-sm">
                             <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                             <span>{point}</span>
                           </div>
                         ))}
                      </div>

                      <div className="mt-auto pt-6 md:pt-8 border-t border-slate-50 flex flex-col items-center justify-between gap-4 md:gap-6">
                         <div className="text-center">
                            <span className="text-slate-300 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] block mb-1">Starting Price</span>
                            <span className="text-xl md:text-3xl font-black text-blue-600 price">৳{service.price[language]}</span>
                         </div>
                         <button 
                           onClick={() => handleSelectService(service)}
                           className="w-full py-4 md:py-5 bg-slate-900 text-white rounded-xl md:rounded-2xl font-black text-sm md:text-lg hover:bg-blue-600 transition-all shadow-xl active:scale-95 group relative overflow-hidden"
                         >
                           <span className="relative z-10">Get Started →</span>
                           <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                         </button>
                      </div>
                   </div>
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="bg-white p-8 md:p-24 rounded-[3rem] md:rounded-[5rem] shadow-xl border border-gray-50">
               <div className="text-center mb-12 md:mb-24">
                  <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">আমরা কেন সেরা?</h2>
                  <div className="h-1.5 md:h-2 w-16 md:w-24 bg-blue-600 mx-auto rounded-full mt-6 md:mt-8"></div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                  {supportBenefits.map((benefit, i) => (
                    <div key={i} className="text-center group">
                       <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-3xl md:text-5xl mx-auto mb-6 md:mb-8 shadow-sm group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-500 border border-slate-100">
                          {benefit.icon}
                       </div>
                       <h4 className="font-black text-base md:text-xl text-slate-900 mb-2 md:mb-4">{benefit.title}</h4>
                       <p className="text-slate-400 text-[10px] md:text-sm font-bold leading-relaxed">{benefit.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        ) : (
          /* Detailed View remains same with minor responsive tweaks */
          <div ref={detailsRef} className="animate-scaleUp py-12 md:py-16">
             <button 
                onClick={() => setSelectedService(null)}
                className="flex items-center space-x-2 md:space-x-3 text-slate-400 hover:text-blue-600 font-black text-[10px] md:text-sm uppercase tracking-[0.2em] transition-all mb-8 md:mb-12 group"
             >
                <span className="group-hover:-translate-x-2 transition-transform">←</span> <span>সব সেবা দেখুন (Back)</span>
             </button>

             <div className="bg-white rounded-[2.5rem] md:rounded-[4.5rem] shadow-3xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
                <div className="lg:w-5/12 bg-slate-50 border-r border-slate-100 flex flex-col">
                   <div className="h-52 md:h-80 overflow-hidden relative">
                      <img src={selectedService.image} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 md:bottom-6 md:left-10 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl text-2xl md:text-4xl">
                         {selectedService.icon}
                      </div>
                   </div>
                   
                   <div className="p-8 md:p-16 space-y-8 md:space-y-10">
                      <div>
                         <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight leading-tight">{selectedService.title[language]}</h2>
                         <p className="text-slate-500 text-sm md:text-xl font-medium leading-relaxed">{selectedService.desc[language]}</p>
                      </div>
                      
                      <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 md:space-y-8">
                         <div>
                            <h4 className="text-[8px] md:text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 border-b pb-2 w-fit">What's Included</h4>
                            <div className="grid grid-cols-1 gap-3 md:gap-4">
                               {selectedService.points[language].map((p: string, i: number) => (
                                  <div key={i} className="flex items-center space-x-2 md:space-x-3 text-slate-700 font-black text-[10px] md:text-sm">
                                     <span className="text-blue-600">✓</span>
                                     <span>{p}</span>
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="lg:w-7/12 p-6 md:p-20">
                   <div className="mb-8 md:mb-12">
                      <h3 className="text-xl md:text-4xl font-black text-slate-900 mb-2 md:mb-4">অর্ডার কনফার্ম করুন</h3>
                      <p className="text-slate-400 font-bold text-xs md:text-base">নিচের তথ্যগুলো পূরণ করে আপনার প্রজেক্টটি আজই শুরু করুন।</p>
                   </div>
                   
                   <form onSubmit={handleInquirySubmit} className="space-y-6 md:space-y-10">
                      <div className="bg-slate-50/50 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 space-y-6 md:space-y-8">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-1">
                               <label className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">পুরো নাম *</label>
                               <input required type="text" placeholder="উদাঃ আব্দুল্লাহ মামুন" className="w-full px-5 py-3 md:py-5 bg-white border border-slate-200 rounded-xl md:rounded-2xl font-bold focus:border-blue-600 outline-none transition-all shadow-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                               <label className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">মোবাইল নাম্বার *</label>
                               <input required type="text" placeholder="017XXXXXXXX" className="w-full px-5 py-3 md:py-5 bg-white border border-slate-200 rounded-xl md:rounded-2xl font-black english-font focus:border-blue-600 outline-none transition-all shadow-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                            </div>
                         </div>
                         <div className="space-y-1">
                            <label className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">ইমেইল এড্রেস *</label>
                            <input required type="email" placeholder="example@mail.com" className="w-full px-5 py-3 md:py-5 bg-white border border-slate-200 rounded-xl md:rounded-2xl font-bold english-font focus:border-blue-600 outline-none transition-all shadow-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                            <label className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">প্রজেক্ট বিস্তারিত *</label>
                            {/* Fixed invalid 'md:rows' attribute by setting a fixed 'rows' value */}
                            <textarea required rows={4} placeholder="রিকোয়ারমেন্ট লিখুন..." className="w-full px-5 py-3 md:py-5 bg-white border border-slate-200 rounded-xl md:rounded-2xl font-bold focus:border-blue-600 outline-none transition-all shadow-sm" value={formData.projectDetails} onChange={e => setFormData({...formData, projectDetails: e.target.value})}></textarea>
                         </div>
                      </div>

                      <div className="bg-[#F0F9FF] p-8 md:p-16 rounded-[2.5rem] md:rounded-[4.5rem] text-center space-y-6 md:space-y-8 relative overflow-hidden border border-blue-100 shadow-xl">
                         <div className="relative z-10">
                            <h4 className="text-3xl md:text-7xl font-black text-blue-600 price mb-6">৳{selectedService.price[language]}</h4>
                            <button disabled={isSubmitting} className="w-full py-5 md:py-9 bg-blue-600 text-white rounded-xl md:rounded-[2.5rem] font-black text-base md:text-3xl hover:bg-blue-700 shadow-2xl transition-all active:scale-95 group overflow-hidden relative">
                               <span className="relative z-10">{isSubmitting ? 'প্রসেসিং হচ্ছে...' : 'অর্ডার কনফার্ম করুন →'}</span>
                            </button>
                         </div>
                      </div>
                   </form>
                </div>
             </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); box-shadow: 0 20px 60px rgba(16,185,129,0.4); }
          50% { transform: scale(1.05); box-shadow: 0 30px 60px rgba(16,185,129,0.6); }
        }
        .animate-pulse-slow { animation: pulse-slow 3s infinite ease-in-out; }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scaleUp { animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .price { font-variant-numeric: tabular-nums; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default ServicesPage;
