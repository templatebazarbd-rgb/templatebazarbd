
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../App';
import { supabase } from '../supabase';

const RegisterPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const LOGO_URL = 'https://image2url.com/r2/default/images/1770036962144-eb903fec-66ae-4ed6-a5ae-5e1b98677ccc.png';

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (error) throw error;
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err: any) {
      setError(language === 'bn' ? 'রেজিস্ট্রেশন ব্যর্থ হয়েছে। এই ইমেল সম্ভবত আগে ব্যবহার করা হয়েছে।' : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        <div>
          <div className="flex justify-center">
            <img 
              src={LOGO_URL} 
              alt="Template Bazar BD" 
              className="w-20 h-20 object-contain drop-shadow-md rounded-full border-4 border-blue-50" 
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {language === 'bn' ? 'নতুন একাউন্ট তৈরি করুন' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {language === 'bn' ? 'ইতিমধ্যে একাউন্ট আছে?' : 'Already have an account?'}{' '}
            <Link to="/login" className="font-medium text-[#10B981] hover:underline">
              {language === 'bn' ? 'লগইন করুন' : 'Sign in'}
            </Link>
          </p>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl text-center">
            <span className="text-4xl block mb-4">🎉</span>
            <h3 className="text-xl font-bold">রেজিস্ট্রেশন সফল হয়েছে!</h3>
            <p className="mt-2">আপনাকে ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...</p>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleRegister}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">{language === 'bn' ? 'পুরো নাম' : 'Full Name'}</label>
                  <input
                    required
                    type="text"
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-[#10B981] focus:border-[#10B981] focus:z-10 sm:text-sm bg-gray-50 transition-all"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">{language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email address'}</label>
                  <input
                    required
                    type="email"
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-[#10B981] focus:border-[#10B981] focus:z-10 sm:text-sm bg-gray-50 transition-all"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">{language === 'bn' ? 'পাসওয়ার্ড (ন্যূনতম ৬ অক্ষর)' : 'Password (min 6 chars)'}</label>
                  <input
                    required
                    minLength={6}
                    type="password"
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-[#10B981] focus:border-[#10B981] focus:z-10 sm:text-sm bg-gray-50 transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="text-xs text-gray-500 text-center">
                {language === 'bn' 
                  ? 'একাউন্ট তৈরি করার মাধ্যমে আপনি আমাদের শর্তাবলী এবং গোপনীয়তা নীতি মেনে নিচ্ছেন।' 
                  : 'By creating an account, you agree to our Terms and Privacy Policy.'}
              </div>

              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-[#10B981] hover:bg-[#059669] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10B981] transition-all shadow-lg active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    language === 'bn' ? 'একাউন্ট তৈরি করুন' : 'Register Now'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
