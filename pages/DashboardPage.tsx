
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../App';
import { supabase } from '../supabase';

const DashboardPage: React.FC = () => {
  const { language, t, user } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('templates');

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      const checkSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          navigate('/login');
        }
      };
      checkSession();
    }
  }, [user, navigate]);

  if (!user) return null;

  const TabButton = ({ id, label, icon }: { id: string, label: string, icon: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-bold transition-all ${
        activeTab === id 
          ? 'bg-[#0066FF] text-white shadow-lg' 
          : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-20">
      {/* Dashboard Header */}
      <div className="primary-blue-gradient text-white pt-20 pb-24 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl border-4 border-white/30">
              👤
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {t('welcomeBack')} {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </h1>
              <p className="text-blue-100 flex items-center justify-center md:justify-start">
                <span className="mr-2">✉️</span> {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-3">
            <TabButton id="templates" label={t('myTemplates')} icon="📦" />
            <TabButton id="orders" label={t('orderHistory')} icon="📜" />
            <TabButton id="settings" label={t('settings')} icon="⚙️" />
            <button 
              onClick={() => supabase.auth.signOut().then(() => navigate('/'))}
              className="w-full flex items-center space-x-3 px-6 py-4 rounded-xl font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-all mt-4"
            >
              <span className="text-xl">🚪</span>
              <span>{t('logout')}</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 min-h-[500px]">
              {activeTab === 'templates' && (
                <div>
                  <h2 className="text-2xl font-bold mb-8 flex items-center">
                    <span className="mr-3 text-[#0066FF]">📦</span> {t('myTemplates')}
                  </h2>
                  
                  {/* Empty State */}
                  <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="text-6xl mb-6">🛒</div>
                    <h3 className="text-xl font-bold text-gray-800">আপনি এখনও কোনো টেম্পলেট কিনেননি</h3>
                    <p className="text-gray-500 mt-2 mb-8">আমাদের সেরা টেম্পলেটগুলো দেখে নিন এবং আপনার পছন্দমতো কিনুন</p>
                    <Link to="/templates" className="px-8 py-3 bg-[#0066FF] text-white rounded-xl font-bold hover:bg-[#0052CC] transition-all">
                      টেম্পলেট ব্রাউজ করুন
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold mb-8 flex items-center">
                    <span className="mr-3 text-orange-500">📜</span> {t('orderHistory')}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b text-gray-400 text-sm">
                          <th className="pb-4 font-medium">অর্ডার আইডি</th>
                          <th className="pb-4 font-medium">তারিখ</th>
                          <th className="pb-4 font-medium">আইটেম</th>
                          <th className="pb-4 font-medium">মূল্য</th>
                          <th className="pb-4 font-medium">স্ট্যাটাস</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-gray-400">
                            আপনার কোনো অর্ডারের তথ্য পাওয়া যায়নি
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-8 flex items-center">
                    <span className="mr-3 text-gray-500">⚙️</span> {t('settings')}
                  </h2>
                  <form className="space-y-6 max-w-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ফুল নাম</label>
                        <input 
                          type="text" 
                          defaultValue={user.user_metadata?.full_name}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#0066FF] outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ইমেইল (অপরিবর্তনযোগ্য)</label>
                        <input 
                          type="email" 
                          disabled
                          value={user.email}
                          className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">ফোন নাম্বার</label>
                      <input 
                        type="text" 
                        placeholder="01XXXXXXXXX"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#0066FF] outline-none" 
                      />
                    </div>
                    <div className="pt-4">
                      <button className="px-8 py-3 bg-[#0066FF] text-white rounded-xl font-bold hover:bg-[#0052CC] transition-all">
                        সেভ করুন
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
