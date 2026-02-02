
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../App';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const LOGO_URL = 'https://image2url.com/r2/default/images/1770036962144-eb903fec-66ae-4ed6-a5ae-5e1b98677ccc.png';

  return (
    <footer className="bg-[#F0F9FF] text-gray-900 pt-20 pb-10 border-t border-blue-100">
      <div className="container mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand Info */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center group">
              <img 
                src={LOGO_URL} 
                alt="Template Bazar BD" 
                className="w-16 h-16 object-contain mr-3 rounded-full border border-blue-200 group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="flex flex-col">
                <span className="text-2xl font-black">Template <span className="text-[#0066FF]">Bazar BD</span></span>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mt-1">Quality Marketplace</span>
              </div>
            </Link>
            <p className="text-gray-500 leading-relaxed text-base font-medium">
              {t('footerAbout')} আমাদের প্রতিটি ডিজাইন ব্যবসার প্রসারের কথা মাথায় রেখে তৈরি করা হয়েছে।
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all shadow-sm border border-blue-50 group">
                <svg className="w-6 h-6 fill-current group-hover:text-white text-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:text-white transition-all shadow-sm border border-blue-50 group">
                <svg className="w-6 h-6 fill-current text-[#ee2a7b] group-hover:text-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* TikTok */}
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm border border-blue-50 group">
                <svg className="w-5 h-5 fill-current text-black group-hover:text-white" viewBox="0 0 448 512">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all shadow-sm border border-blue-50 group">
                <svg className="w-6 h-6 fill-current text-[#FF0000] group-hover:text-white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-10">
            <h4 className="text-sm font-black mb-8 border-l-4 border-[#0066FF] pl-4 uppercase tracking-[0.3em] text-gray-800">Quick Links</h4>
            <ul className="space-y-5 text-gray-500 font-bold">
              <li><Link to="/templates" className="hover:text-[#0066FF] transition-colors flex items-center"><span className="mr-2 opacity-30">→</span> {t('templates')}</Link></li>
              <li><Link to="/services" className="hover:text-[#0066FF] transition-colors flex items-center"><span className="mr-2 opacity-30">→</span> {t('services')}</Link></li>
              <li><Link to="/about" className="hover:text-[#0066FF] transition-colors flex items-center"><span className="mr-2 opacity-30">→</span> {t('aboutUs')}</Link></li>
              <li><Link to="/contact" className="hover:text-[#0066FF] transition-colors flex items-center"><span className="mr-2 opacity-30">→</span> {t('contact')}</Link></li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div>
            <h4 className="text-sm font-black mb-8 border-l-4 border-[#0066FF] pl-4 uppercase tracking-[0.3em] text-gray-800">Resources</h4>
            <ul className="space-y-5 text-gray-500 font-bold">
              <li><Link to="/faq" className="hover:text-[#0066FF] transition-colors flex items-center"><span className="mr-2 opacity-30">→</span> {t('faq')}</Link></li>
              <li><Link to="/terms" className="hover:text-[#0066FF] transition-colors flex items-center"><span className="mr-2 opacity-30">→</span> {t('terms')}</Link></li>
              <li><Link to="/privacy" className="hover:text-[#0066FF] transition-colors flex items-center"><span className="mr-2 opacity-30">→</span> {t('privacy')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-black mb-8 border-l-4 border-[#0066FF] pl-4 uppercase tracking-[0.3em] text-gray-800">Get In Touch</h4>
            <ul className="space-y-6 text-gray-600 font-bold">
              <li className="flex items-start space-x-4">
                <span className="text-xl">📍</span>
                <span className="text-sm">ঢাকা, বাংলাদেশ - আপনার ডিজিটাল পার্টনার</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-xl text-blue-500">📞</span>
                <span className="english-font text-base tracking-tight">01764471819</span>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-xl text-red-400">✉️</span>
                <span className="english-font text-sm">templatebazarbd@gmail.com</span>
              </li>
              <li className="mt-8">
                 <a href="https://wa.me/8801764471819" className="inline-flex items-center space-x-3 px-8 py-4 bg-[#10B981] text-white rounded-2xl font-black text-sm hover:shadow-xl transition-all active:scale-95">
                  <span className="text-2xl">💬</span>
                  <span>{t('whatsappContact')}</span>
                 </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-16 border-blue-100/50" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs font-black tracking-widest uppercase">
          <p className="english-font text-center md:text-left">&copy; 2026 Template Bazar BD. All rights reserved.</p>
          <div className="mt-6 md:mt-0 flex items-center space-x-6 opacity-60">
             <span className="flex items-center"><span className="mr-2">⚡</span> Powered by Excellence</span>
             <span className="flex items-center"><span className="mr-2">🛡️</span> 100% Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
