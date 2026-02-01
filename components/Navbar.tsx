
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../App';
import { supabase } from '../supabase';

const Navbar: React.FC = () => {
  const { language, setLanguage, t, user, isAdmin } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const NavLink = ({ to, label }: { to: string; label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        onClick={() => setIsMobileMenuOpen(false)}
        className={`px-4 py-2 transition-colors duration-200 font-medium ${
          isActive 
            ? 'text-[#0066FF] border-b-2 border-[#0066FF]' 
            : 'text-[#4B5563] hover:text-[#0066FF]'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      {/* Top Bar */}
      <div className={`bg-[#111827] text-white transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-10'}`}>
        <div className="container mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center english-font"><span className="mr-2">📞</span> 01764471819</span>
          </div>
          <div className="flex items-center bg-gray-800 rounded-md p-1">
            <button 
              onClick={() => setLanguage('bn')}
              className={`px-3 py-0.5 rounded transition-all ${language === 'bn' ? 'bg-[#0066FF] text-white shadow-sm' : 'text-gray-400'}`}
            >
              বাংলা
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-0.5 rounded transition-all ${language === 'en' ? 'bg-[#0066FF] text-white shadow-sm' : 'text-gray-400'}`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`container mx-auto px-4 py-4 flex justify-between items-center bg-white ${isScrolled ? 'rounded-b-none' : 'rounded-b-lg'}`}>
        <Link to="/" className="flex items-center">
          <div className="w-10 h-10 bg-[#0066FF] rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2 shadow-lg text-white">
            TB
          </div>
          <span className="text-xl md:text-2xl font-bold text-[#111827]">
            Template <span className="text-[#0066FF]">Bazar</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-2">
          <NavLink to="/" label={t('home')} />
          <NavLink to="/templates" label={t('templates')} />
          <NavLink to="/services" label={t('services')} />
          <NavLink to="/about" label={t('aboutUs')} />
          <NavLink to="/contact" label={t('contact')} />
        </div>

        <div className="hidden lg:flex items-center space-x-3">
          {isAdmin && (
             <Link to="/admin" className="px-5 py-2 bg-purple-100 text-purple-700 rounded-full font-bold hover:bg-purple-200 transition-all">
                👑 {t('adminPanel')}
             </Link>
          )}
          {user ? (
            <div className="flex items-center space-x-3">
              <Link to="/dashboard" className="px-5 py-2 bg-blue-50 text-[#0066FF] rounded-full font-bold hover:bg-blue-100 transition-all flex items-center">
                <span className="mr-2">👤</span>
                {t('dashboard')}
              </Link>
              <button 
                onClick={handleLogout}
                className="px-6 py-2 border border-[#EF4444] text-[#EF4444] rounded-full font-bold hover:bg-[#EF4444] hover:text-white transition-all active:scale-95"
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-5 py-2 text-[#4B5563] font-semibold hover:text-[#0066FF] transition-colors">
                {t('login')}
              </Link>
              <Link to="/register" className="px-6 py-2 bg-[#0066FF] text-white rounded-full font-bold hover:bg-[#0052CC] transition-all shadow-md active:scale-95">
                {t('register')}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-[#111827] bg-gray-100 rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-white z-[90] transition-transform duration-300 pt-32 px-6 flex flex-col space-y-4 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {isAdmin && (
           <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center bg-purple-100 text-purple-700 rounded-lg font-bold">
              👑 অ্যাডমিন প্যানেল
           </Link>
        )}
        <NavLink to="/" label={t('home')} />
        <NavLink to="/templates" label={t('templates')} />
        <NavLink to="/services" label={t('services')} />
        <NavLink to="/about" label={t('aboutUs')} />
        <NavLink to="/contact" label={t('contact')} />
        <hr />
        <div className="flex flex-col space-y-3 pt-4">
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center bg-blue-50 text-[#0066FF] rounded-lg font-bold">
                {t('dashboard')}
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full py-3 text-center bg-[#EF4444] text-white rounded-lg font-bold"
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center border border-gray-200 rounded-lg text-[#111827] font-bold">
                {t('login')}
              </Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center bg-[#0066FF] text-white rounded-lg font-bold">
                {t('register')}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
