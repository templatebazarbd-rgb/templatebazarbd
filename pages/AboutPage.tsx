
import React from 'react';
import { useLanguage } from '../App';

const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <div className="primary-blue-gradient text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('aboutUs')}</h1>
          <p className="text-blue-100">বাংলাদেশের সেরা ওয়েবসাইট ও ল্যান্ডিং পেজ টেম্পলেট মার্কেটপ্লেস</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative">
            <img src="https://picsum.photos/seed/about/800/600" alt="About Us" className="rounded-3xl shadow-2xl" />
            <div className="absolute -bottom-10 -right-10 hidden md:block w-48 h-48 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
               <div className="text-4xl font-extrabold text-[#0066FF] english-font">5+</div>
               <p className="text-gray-500 font-bold mt-2">বছরের অভিজ্ঞতা</p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#111827]">আমাদের গল্প</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Template Bazar BD শুরু হয়েছিল একটি সাধারণ লক্ষ্য নিয়ে - বাংলাদেশের উদ্যোক্তা এবং ব্যবসায়ীদের জন্য সাশ্রয়ী মূল্যে প্রফেশনাল ওয়েবসাইট টেম্পলেট প্রদান করা। আজ আমরা গর্বের সাথে বলতে পারি যে আমরা হাজার হাজার গ্রাহককে তাদের অনলাইন উপস্থিতি তৈরি করতে সাহায্য করেছি।
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              আমাদের টিম দক্ষ ডিজাইনার এবং ডেভেলপারদের নিয়ে গঠিত যারা সর্বদা নতুন এবং উন্নত টেম্পলেট তৈরি করতে কাজ করছে।
            </p>
            <div className="pt-6">
              <button className="px-8 py-3 bg-[#0066FF] text-white rounded-xl font-bold hover:shadow-lg transition-all">
                টেম্পলেট দেখুন →
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="bg-[#0066FF] p-10 rounded-3xl text-white">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl mb-6">🎯</div>
            <h3 className="text-2xl font-bold mb-4">আমাদের মিশন</h3>
            <p className="text-blue-100">বাংলাদেশের প্রতিটি ব্যবসায়ীকে সাশ্রয়ী মূল্যে প্রফেশনাল ওয়েবসাইট তৈরি করার সুযোগ দেওয়া এবং ডিজিটাল রূপান্তরে সহায়তা করা।</p>
          </div>
          <div className="bg-[#10B981] p-10 rounded-3xl text-white">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl mb-6">👁️</div>
            <h3 className="text-2xl font-bold mb-4">আমাদের ভিশন</h3>
            <p className="text-green-50">বাংলাদেশের এক নম্বর টেম্পলেট মার্কেটপ্লেস হিসেবে প্রতিষ্ঠিত হওয়া এবং দক্ষিণ এশিয়ায় আমাদের সেবা বিস্তৃত করা।</p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#111827] mb-12">আমাদের মূলবোধ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎖️', title: 'গুণগত মান', desc: 'আমরা সর্বোচ্চ মানের টেম্পলেট প্রদান করি' },
              { icon: '❤️', title: 'গ্রাহক সন্তুষ্টি', desc: 'গ্রাহকের সন্তুষ্টি আমাদের প্রথম অগ্রাধিকার' },
              { icon: '⚡', title: 'দ্রুত সেবা', desc: 'দ্রুত এবং নির্ভরযোগ্য সেবা প্রদান' }
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                <p className="text-gray-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
