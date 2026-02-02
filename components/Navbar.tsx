
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

  const LOGO_URL = 'https://image2url.com/r2/default/images/1770036962144-eb903fec-66ae-4ed6-a5ae-5e1b98677ccc.png';

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
        className={`px-4 py-2 transition-all duration-200 font-black tracking-tight text-sm ${
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
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
      {/* 1. TOP BAR */}
      <div className="bg-[#F0F9FF] text-[#111827] border-b border-blue-100 relative z-[110]">
        <div className="container mx-auto max-w-[1440px] px-4 md:px-6 h-10 md:h-12 flex justify-between items-center text-[8px] md:text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-blue-600">✉️</span>
            <span className="font-bold english-font opacity-80">templatebazarbd@gmail.com</span>
          </div>

          <div className="hidden sm:flex items-center space-x-2 px-4 py-1 rounded-full bg-blue-600/5 border border-blue-100">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] text-blue-600">২৪/৭ আওয়ার্স সাপোর্ট</span>
          </div>

          <div className="flex items-center space-x-3 md:space-x-8">
            <span className="flex items-center english-font font-black">
              <span className="mr-1 text-blue-600">📞</span> 01764471819
            </span>
            <div className="flex items-center bg-white rounded-full p-0.5 border border-blue-100">
              <button onClick={() => setLanguage('bn')} className={`px-2 md:px-3 py-1 rounded-full text-[7px] md:text-[9px] font-black transition-all ${language === 'bn' ? 'bg-[#0066FF] text-white' : 'text-blue-400'}`}>বাংলা</button>
              <button onClick={() => setLanguage('en')} className={`px-2 md:px-3 py-1 rounded-full text-[7px] md:text-[9px] font-black transition-all ${language === 'en' ? 'bg-[#0066FF] text-white' : 'text-blue-400'}`}>EN</button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAV BAR */}
      <nav className={`transition-all duration-300 border-b border-gray-100 ${isScrolled ? 'bg-white shadow-xl py-2' : 'bg-white/95 backdrop-blur-md py-4'}`}>
        <div className="container mx-auto max-w-[1440px] px-4 md:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center group shrink-0">
            <img 
              src={LOGO_URL} 
              alt="Template Bazar BD" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain mr-2 rounded-full border-2 border-blue-50 group-hover:rotate-6 transition-transform duration-300" 
            />
            <div className="flex flex-col">
              <span className="text-base md:text-xl font-black text-[#111827] leading-none">
                Template <span className="text-[#0066FF]">Bazar BD</span>
              </span>
              <span className="text-[7px] font-black uppercase tracking-[0.2em] text-gray-400">Marketplace</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink to="/" label={t('home')} />
            <NavLink to="/templates" label={t('templates')} />
            <NavLink to="/services" label={t('services')} />
            <NavLink to="/about" label={t('aboutUs')} />
            <NavLink to="/contact" label={t('contact')} />
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
               <div className="flex items-center space-x-3">
                  <Link to={isAdmin ? "/admin" : "/dashboard"} className="px-5 py-2.5 bg-blue-50 text-[#0066FF] rounded-xl font-black text-[10px] uppercase tracking-wider hover:bg-blue-100 transition-all">
                    {isAdmin ? "Admin" : "Dashboard"}
                  </Link>
                  <button onClick={handleLogout} className="text-red-500 font-black text-[10px] uppercase hover:underline">Logout</button>
               </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="px-6 py-2.5 bg-white text-[#111827] border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-[#0066FF] hover:text-[#0066FF] transition-all shadow-sm">
                  Login
                </Link>
                <Link to="/register" className="px-7 py-3 bg-[#0066FF] text-white rounded-xl font-black hover:bg-[#0052CC] transition-all shadow-lg shadow-blue-500/20 text-[10px] uppercase tracking-widest">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-[#111827] bg-gray-50 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-white z-[90] transition-transform duration-500 pt-40 px-6 flex flex-col space-y-4 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <NavLink to="/" label={t('home')} />
        <NavLink to="/templates" label={t('templates')} />
        <NavLink to="/services" label={t('services')} />
        <NavLink to="/about" label={t('aboutUs')} />
        <NavLink to="/contact" label={t('contact')} />
        {!user && (
          <div className="pt-8 flex flex-col space-y-4">
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center text-slate-900 border border-slate-200 rounded-2xl font-black uppercase text-xs tracking-widest">Login</Link>
            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 text-center bg-[#0066FF] text-white rounded-2xl font-black shadow-lg uppercase text-xs tracking-widest">Register Now</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
