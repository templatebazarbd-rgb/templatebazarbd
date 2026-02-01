
import React from 'react';
import { useLanguage } from '../App';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';

const ServicesPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <div className="primary-blue-gradient text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('services')}</h1>
          <p className="text-blue-100">আপনার ওয়েব প্রয়োজনের জন্য প্রয়োজনীয় সকল সেবা এক জায়গায়</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map(service => (
            <div key={service.id} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service?.title?.[language] || service?.title?.en || 'Service'}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                {service?.description?.[language] || service?.description?.en || ''}
              </p>
              <Link to="/contact" className="inline-flex items-center text-[#0066FF] font-bold hover:underline">
                বিস্তারিত জানতে যোগাযোগ করুন →
              </Link>
            </div>
          ))}
          
          {/* Static ones for layout */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-orange-500">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{language === 'bn' ? 'ডোমেইন রেজিস্ট্রেশন' : 'Domain Registration'}</h3>
            <p className="text-gray-600 mb-8">{language === 'bn' ? 'আপনার ব্যবসার জন্য পারফেক্ট ডোমেইন নাম রেজিস্ট্রেশন করুন।' : 'Register the perfect domain name for your business.'}</p>
            <Link to="/contact" className="text-[#0066FF] font-bold">যোগাযোগ করুন →</Link>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-pink-500">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{language === 'bn' ? 'এসইও অপটিমাইজেশন' : 'SEO Optimization'}</h3>
            <p className="text-gray-600 mb-8">{language === 'bn' ? 'আপনার ওয়েবসাইটকে গুগল র‍্যাঙ্ক করার জন্য সেরা এসইও সার্ভিস।' : 'Top-notch SEO services to rank your website on Google.'}</p>
            <Link to="/contact" className="text-[#0066FF] font-bold">যোগাযোগ করুন →</Link>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="mt-20 bg-[#10B981] rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">আমাদের সাথে যোগাযোগ করুন</h2>
          <p className="text-green-50 mb-8 max-w-2xl mx-auto">কোনো সেবা সম্পর্কে জানতে বা কাস্টম কোট পেতে আমাদের সাথে যোগাযোগ করুন</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/contact" className="px-8 py-3 bg-white text-[#10B981] font-bold rounded-full hover:shadow-lg transition-all">
              যোগাযোগ করুন →
            </Link>
            <a href="https://wa.me/8801764471819" className="px-8 py-3 bg-[#111827] text-white font-bold rounded-full hover:bg-black transition-all">
              হোয়াটসঅ্যাপ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
