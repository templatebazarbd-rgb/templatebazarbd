
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../App';
import { supabase } from '../supabase';

const LoginPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/dashboard');
    } catch (err: any) {
      setError(language === 'bn' ? 'ভুল ইমেল বা পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।' : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        <div>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-[#0066FF] rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              TB
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {language === 'bn' ? 'আপনার একাউন্টে লগইন করুন' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {language === 'bn' ? 'অথবা' : 'Or'}{' '}
            <Link to="/register" className="font-medium text-[#0066FF] hover:underline">
              {language === 'bn' ? 'নতুন একাউন্ট তৈরি করুন' : 'create a new account'}
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email address'}</label>
              <input
                required
                type="email"
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-[#0066FF] focus:border-[#0066FF] focus:z-10 sm:text-sm bg-gray-50 transition-all"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}</label>
              <input
                required
                type="password"
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-[#0066FF] focus:border-[#0066FF] focus:z-10 sm:text-sm bg-gray-50 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#0066FF] focus:ring-[#0066FF] border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-gray-900">
                {language === 'bn' ? 'আমাকে মনে রাখুন' : 'Remember me'}
              </label>
            </div>
            <a href="#" className="font-medium text-[#0066FF] hover:underline">
              {language === 'bn' ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
            </a>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-[#0066FF] hover:bg-[#0052CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066FF] transition-all shadow-lg active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                language === 'bn' ? 'লগইন করুন' : 'Sign In'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
