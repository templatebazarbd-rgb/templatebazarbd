
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../App';
import { TEMPLATES, CATEGORIES } from '../constants';

const HomePage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className="primary-blue-gradient text-white pt-12 pb-20 md:pb-32 px-4 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white blur-3xl animate-pulse"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-2xl text-blue-100 font-light">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6">
              <Link to="/templates" className="w-full sm:w-auto px-10 py-4 bg-white text-[#0066FF] rounded-full font-bold text-lg hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all active:scale-95">
                {t('browseTemplates')} →
              </Link>
              <Link to="/templates" className="w-full sm:w-auto px-10 py-4 border-2 border-white/40 text-white rounded-full font-bold text-lg hover:bg-white hover:text-[#0066FF] transition-all active:scale-95 backdrop-blur-sm">
                সব দেখুন
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-16 border-t border-white/10 max-w-2xl mx-auto">
              <div className="group">
                <h3 className="text-3xl font-bold english-font group-hover:scale-110 transition-transform">100+</h3>
                <p className="text-blue-200">{t('templates')}</p>
              </div>
              <div className="group">
                <h3 className="text-3xl font-bold english-font group-hover:scale-110 transition-transform">1.2k+</h3>
                <p className="text-blue-200">বিক্রয়</p>
              </div>
              <div className="col-span-2 md:col-span-1 group">
                <h3 className="text-3xl font-bold english-font group-hover:scale-110 transition-transform">4.9/5</h3>
                <p className="text-blue-200">রেটিং</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[#0066FF] font-bold tracking-widest uppercase text-sm mb-4 block">এক্সপ্লোর করুন</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111827] mb-6">{t('categoryTitle')}</h2>
            <div className="h-1.5 w-24 bg-[#0066FF] mx-auto rounded-full mb-6"></div>
            <p className="text-[#6B7280] text-lg">{t('categorySubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {CATEGORIES.map(cat => (
              <Link 
                key={cat.id} 
                to={`/templates?category=${cat.slug}`}
                className="group p-6 md:p-8 bg-white rounded-3xl border border-gray-100 hover:border-transparent hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col items-center text-center overflow-hidden relative"
              >
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform relative z-10"
                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                >
                  {cat.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#111827] mb-2 relative z-10">{cat?.name?.[language] || cat?.name?.en}</h3>
                <p className="text-[#9CA3AF] english-font text-sm relative z-10">{cat.count} আইটেম</p>
                <div 
                  className="absolute bottom-0 left-0 w-full h-1 transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: cat.color }}
                ></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[#0066FF] font-bold tracking-widest uppercase text-sm mb-4 block">টপ রেটেড</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#111827]">{t('popularTemplates')}</h2>
            </div>
            <Link to="/templates" className="px-8 py-3 bg-[#F3F4F6] text-[#111827] rounded-full font-bold hover:bg-[#0066FF] hover:text-white transition-all group flex items-center space-x-2">
              <span>সব দেখুন</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {TEMPLATES.map(item => (
              <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 group flex flex-col h-full border border-gray-100">
                {/* Image Wrap */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={item.image} alt={item?.name?.[language]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Badges */}
                  <div className="absolute top-5 left-5 flex flex-col space-y-2">
                    {item.discount && (
                      <div className="bg-[#EF4444] text-white px-3 py-1.5 rounded-xl font-bold text-xs english-font shadow-lg">
                        {item.discount} ছাড়
                      </div>
                    )}
                    {item.tag && (
                      <div className="bg-[#F59E0B] text-white px-3 py-1.5 rounded-xl font-bold text-xs shadow-lg">
                        {item.tag}
                      </div>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
                    <div className="flex space-x-3">
                      <a href={item.demoUrl} className="flex-1 py-3 bg-white text-gray-900 rounded-2xl font-bold text-center hover:bg-gray-100 transition-all flex items-center justify-center space-x-2">
                        <span>👁️</span> <span>ডেমো</span>
                      </a>
                      <button className="flex-1 py-3 bg-[#0066FF] text-white rounded-2xl font-bold text-center hover:bg-[#0052CC] transition-all shadow-xl">
                        কিনুন
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="mb-4">
                    <span className="text-xs font-bold text-[#0066FF] uppercase tracking-widest mb-2 block">{item.category}</span>
                    <h3 className="text-2xl font-bold text-[#111827] group-hover:text-[#0066FF] transition-colors">{item?.name?.[language]}</h3>
                  </div>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-8 flex-grow">{item?.description?.[language]}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400 font-medium">মূল্য</span>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-extrabold text-[#0066FF] price">৳{(item.price || 0).toLocaleString()}</span>
                        {item.oldPrice && <span className="text-sm text-gray-300 line-through price">৳{item.oldPrice.toLocaleString()}</span>}
                      </div>
                    </div>
                    <button className="w-12 h-12 bg-[#F3F4F6] text-[#111827] rounded-2xl flex items-center justify-center group-hover:bg-[#0066FF] group-hover:text-white transition-all shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-[#111827] mb-6">{t('whyChooseUs')}</h2>
            <p className="text-[#6B7280] text-lg">বাংলাদেশের সবচেয়ে নির্ভরযোগ্য টেম্পলেট মার্কেটপ্লেস</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { icon: '📱', title: t('responsiveDesign'), color: '#0066FF' },
              { icon: '🔄', title: t('lifetimeUpdate'), color: '#10B981' },
              { icon: '🎧', title: t('support247'), color: '#F59E0B' },
              { icon: '⚙️', title: t('easyCustomization'), color: '#8B5CF6' },
              { icon: '⚡', title: t('instantDelivery'), color: '#EF4444' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 text-center group border border-gray-50">
                <div 
                  className="w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-8 transition-all group-hover:scale-110 group-hover:rotate-6 shadow-sm"
                  style={{ backgroundColor: `${feature.color}10` }}
                >
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-[#111827]">{feature.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="relative primary-blue-gradient rounded-[3rem] p-10 md:p-20 text-center text-white overflow-hidden shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="0" cy="0" r="40" fill="white" />
                <circle cx="100" cy="100" r="40" fill="white" />
              </svg>
            </div>
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">{t('ctaTitle')}</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">প্রিমিয়াম ডিজাইনের টেম্পলেট দিয়ে আপনার বিজনেসকে নিয়ে যান অনন্য উচ্চতায়।</p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/templates" className="w-full sm:w-auto px-12 py-5 bg-white text-[#0066FF] rounded-2xl font-extrabold text-xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all active:scale-95">
                  টেম্পলেট দেখুন
                </Link>
                <a href="https://wa.me/8801764471819" className="w-full sm:w-auto px-12 py-5 bg-[#10B981] text-white rounded-2xl font-extrabold text-xl hover:bg-[#059669] transition-all flex items-center justify-center space-x-3 shadow-xl">
                  <span>💬</span>
                  <span>হোয়াটসঅ্যাপ</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
