
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../App';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#111827] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-[#0066FF] rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2">
                TB
              </div>
              <span className="text-2xl font-bold">Template <span className="text-[#0066FF]">Bazar</span></span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              {t('footerAbout')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#0066FF] transition-colors">
                <span className="sr-only">Facebook</span>
                <i className="fab fa-facebook-f"></i>
                <span className="text-lg">F</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#0066FF] transition-colors">
                <span className="sr-only">Instagram</span>
                <span className="text-lg">I</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#0066FF] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <span className="text-lg">L</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-l-4 border-[#0066FF] pl-3">{t('quickLinks')}</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/templates" className="hover:text-[#0066FF] transition-colors">→ {t('templates')}</Link></li>
              <li><Link to="/categories" className="hover:text-[#0066FF] transition-colors">→ {t('categories')}</Link></li>
              <li><Link to="/services" className="hover:text-[#0066FF] transition-colors">→ {t('services')}</Link></li>
              <li><Link to="/about" className="hover:text-[#0066FF] transition-colors">→ {t('aboutUs')}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-l-4 border-[#0066FF] pl-3">{t('support')}</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/contact" className="hover:text-[#0066FF] transition-colors">→ {t('contact')}</Link></li>
              <li><Link to="/faq" className="hover:text-[#0066FF] transition-colors">→ {t('faq')}</Link></li>
              <li><Link to="/terms" className="hover:text-[#0066FF] transition-colors">→ {t('terms')}</Link></li>
              <li><Link to="/privacy" className="hover:text-[#0066FF] transition-colors">→ {t('privacy')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-l-4 border-[#0066FF] pl-3">{t('contact')}</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <span className="text-[#0066FF]">📍</span>
                <span>ঢাকা, বাংলাদেশ</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#0066FF]">📞</span>
                <span className="english-font">01764471819</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#0066FF]">✉️</span>
                <span className="english-font">templatebazarbd@gmail.com</span>
              </li>
              <li className="mt-6">
                 <a href="https://wa.me/8801764471819" className="inline-flex items-center space-x-2 text-[#10B981] font-bold hover:underline">
                  <span>💬</span>
                  <span>{t('whatsappContact')}</span>
                 </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-12 border-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p className="english-font">&copy; 2026 Template Bazar BD. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
             <img src="https://i.ibb.co/VvW3P2G/payment-methods.png" alt="Payment Methods" className="h-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
