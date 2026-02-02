
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../App';
import { supabase } from '../supabase';

const DashboardPage: React.FC = () => {
  const { language, t, user } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('templates');
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState<any>(null);
  const [userOrders, setUserOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').eq('customer_email', user.email);
    if (data) setUserOrders(data);
  };

  const handleTrack = async () => {
    const { data } = await supabase.from('orders').select('*').eq('id', trackId).single();
    setTrackResult(data || 'not_found');
  };

  if (!user) return null;

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-20">
      <div className="primary-blue-gradient text-white pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-black">স্বাগতম, {user.user_metadata?.full_name}</h1>
          <p className="opacity-70 text-sm mt-1">আপনার সব অর্ডার ও ডিরেক্টরি এখান থেকে ম্যানেজ করুন</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            <button onClick={() => setActiveTab('templates')} className={`w-full px-6 py-4 rounded-xl font-bold text-left ${activeTab === 'templates' ? 'bg-blue-600 text-white' : 'bg-white'}`}>আমার টেম্পলেট</button>
            <button onClick={() => setActiveTab('track')} className={`w-full px-6 py-4 rounded-xl font-bold text-left ${activeTab === 'track' ? 'bg-blue-600 text-white' : 'bg-white'}`}>অর্ডার ট্র্যাক করুন</button>
            <button onClick={() => supabase.auth.signOut().then(() => navigate('/'))} className="w-full px-6 py-4 rounded-xl font-bold text-left bg-red-50 text-red-600">লগআউট</button>
          </div>

          <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-sm min-h-[500px]">
            {activeTab === 'templates' && (
              <div>
                <h2 className="text-xl font-black mb-6">আপনার কেনা টেম্পলেটসমূহ</h2>
                {userOrders.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userOrders.filter(o => o.status === 'completed').map(o => (
                      <div key={o.id} className="p-4 border rounded-xl flex justify-between items-center">
                        <div>
                           <p className="font-bold">টেম্পলেট আইডি: {o.template_id}</p>
                           <p className="text-xs text-gray-400">অর্ডার আইডি: {o.id}</p>
                        </div>
                        <button className="text-blue-600 text-xs font-bold">ডাউনলোড</button>
                      </div>
                    ))}
                  </div>
                ) : <div className="text-center py-20 text-gray-400 italic">কোনো টেম্পলেট পাওয়া যায়নি।</div>}
              </div>
            )}

            {activeTab === 'track' && (
              <div>
                <h2 className="text-xl font-black mb-6">অর্ডার ট্র্যাকিং</h2>
                <div className="flex space-x-2 mb-8">
                  <input type="text" placeholder="অর্ডার আইডি দিন (উদাঃ TB-123456)" className="flex-grow p-4 bg-gray-50 border rounded-xl outline-none" value={trackId} onChange={e => setTrackId(e.target.value)} />
                  <button onClick={handleTrack} className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold">ট্র্যাক</button>
                </div>

                {trackResult && trackResult !== 'not_found' && (
                  <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                    <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl mb-4 ${trackResult.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                       {trackResult.status === 'completed' ? '✅' : '⏳'}
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-widest">{trackResult.status}</h3>
                    <p className="text-sm text-gray-500 mt-2">অর্ডার আইডি: {trackResult.id}</p>
                    <p className="text-sm text-gray-500">তারিখ: {new Date(trackResult.created_at).toLocaleDateString()}</p>
                  </div>
                )}
                {trackResult === 'not_found' && <p className="text-center text-red-500 font-bold">দুঃখিত, এই আইডিতে কোনো অর্ডার পাওয়া যায়নি।</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
