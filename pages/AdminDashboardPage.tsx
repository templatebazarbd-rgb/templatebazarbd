
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../App';
import { supabase } from '../supabase';
import { Template } from '../types';

interface Order {
  id: string;
  created_at: string;
  template_id: string;
  customer_name: string;
  customer_email: string;
  status: string;
}

const AdminDashboardPage: React.FC = () => {
  const { language, t, user, isAdmin } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchData();
  }, [isAdmin, navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: ordData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      const { data: tempData } = await supabase.from('templates').select('*');
      
      if (ordData) setOrders(ordData);
      if (tempData) setTemplates(tempData as unknown as Template[]);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
      if (error) throw error;
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে');
    }
  };

  const deleteTemplate = async (templateId: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই টেম্পলেটটি মুছতে চান?')) return;
    try {
      const { error } = await supabase.from('templates').delete().eq('id', templateId);
      if (error) throw error;
      setTemplates(templates.filter(t => t.id !== templateId));
    } catch (err) {
      alert('টেম্পলেট মুছতে সমস্যা হয়েছে');
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="bg-[#F3F4F6] min-h-screen pb-20">
      <div className="bg-[#111827] text-white pt-20 pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">👑 অ্যাডমিন ড্যাশবোর্ড</h1>
              <p className="text-gray-400">Template Bazar BD কন্ট্রোল প্যানেল</p>
            </div>
            <div className="mt-6 md:mt-0 flex space-x-4">
               <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">
                  <p className="text-xs text-gray-400 uppercase">মোট অর্ডার</p>
                  <p className="text-2xl font-bold english-font">{orders.length}</p>
               </div>
               <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">
                  <p className="text-xs text-gray-400 uppercase">টেম্পলেট</p>
                  <p className="text-2xl font-bold english-font">{templates.length}</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Admin Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-[#0066FF] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              📦 {t('manageOrders')}
            </button>
            <button 
              onClick={() => setActiveTab('templates')}
              className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'templates' ? 'bg-[#0066FF] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              📄 {t('manageTemplates')}
            </button>
            <button 
              onClick={() => setActiveTab('add')}
              className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'add' ? 'bg-[#10B981] text-white shadow-lg' : 'bg-white text-green-600 hover:bg-green-50'}`}
            >
              ➕ {t('addTemplate')}
            </button>
          </div>

          {/* Admin Main Content */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 min-h-[600px]">
              
              {isLoading ? (
                <div className="flex items-center justify-center h-full py-20">
                  <div className="w-12 h-12 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {activeTab === 'orders' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6">সকল অর্ডারসমূহ</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b text-gray-500 text-sm">
                              <th className="pb-4 font-medium">অর্ডার আইডি</th>
                              <th className="pb-4 font-medium">কাস্টমার</th>
                              <th className="pb-4 font-medium">টেম্পলেট আইডি</th>
                              <th className="pb-4 font-medium">স্ট্যাটাস</th>
                              <th className="pb-4 font-medium">অ্যাকশন</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {orders.length > 0 ? orders.map(order => (
                              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 text-xs font-mono text-gray-400">{order.id.slice(0, 8)}...</td>
                                <td className="py-4">
                                  <div className="font-bold text-gray-900">{order.customer_name}</div>
                                  <div className="text-xs text-gray-500">{order.customer_email}</div>
                                </td>
                                <td className="py-4 font-medium">{order.template_id}</td>
                                <td className="py-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                    order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {order.status}
                                  </span>
                                </td>
                                <td className="py-4">
                                  <select 
                                    className="text-xs bg-gray-100 border-none rounded p-1 focus:ring-0"
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                    value={order.status}
                                  >
                                    <option value="pending">পেন্ডিং</option>
                                    <option value="completed">কমপ্লিট</option>
                                    <option value="cancelled">ক্যান্সেল</option>
                                  </select>
                                </td>
                              </tr>
                            )) : (
                              <tr>
                                <td colSpan={5} className="py-20 text-center text-gray-400">কোনো অর্ডার পাওয়া যায়নি</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'templates' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6">টেম্পলেট লিস্ট</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {templates.map(temp => (
                          <div key={temp.id} className="border rounded-2xl p-4 flex items-center space-x-4 hover:shadow-md transition-all">
                            <img src={temp.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                            <div className="flex-grow">
                              <h4 className="font-bold">{temp.name?.[language] || temp.name?.en}</h4>
                              <p className="text-sm text-[#0066FF] font-bold price">৳{temp.price}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">✏️</button>
                              <button 
                                onClick={() => deleteTemplate(temp.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'add' && (
                    <div className="max-w-2xl">
                      <h2 className="text-2xl font-bold mb-6">নতুন টেম্পলেট যুক্ত করুন</h2>
                      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('সাকসেসফুলি সেভ হয়েছে (সুপাবেস লজিক ডেমো)'); setActiveTab('templates'); }}>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="block text-sm font-bold mb-1">আইডি (Unique)</label>
                              <input required type="text" className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="t4" />
                           </div>
                           <div>
                              <label className="block text-sm font-bold mb-1">ক্যাটাগরি</label>
                              <select className="w-full p-3 bg-gray-50 border rounded-xl">
                                 <option value="business">Business</option>
                                 <option value="landing">Landing</option>
                                 <option value="ecommerce">Ecommerce</option>
                              </select>
                           </div>
                        </div>
                        <div>
                           <label className="block text-sm font-bold mb-1">নাম (বাংলা)</label>
                           <input required type="text" className="w-full p-3 bg-gray-50 border rounded-xl" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="block text-sm font-bold mb-1">মূল্য (৳)</label>
                              <input required type="number" className="w-full p-3 bg-gray-50 border rounded-xl" />
                           </div>
                           <div>
                              <label className="block text-sm font-bold mb-1">পুরানো মূল্য</label>
                              <input type="number" className="w-full p-3 bg-gray-50 border rounded-xl" />
                           </div>
                        </div>
                        <div>
                           <label className="block text-sm font-bold mb-1">ইমেজ লিঙ্ক</label>
                           <input required type="text" className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="https://..." />
                        </div>
                        <div>
                           <label className="block text-sm font-bold mb-1">ডেমো লিঙ্ক</label>
                           <input required type="text" className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="https://demo..." />
                        </div>
                        <button type="submit" className="w-full py-4 bg-[#10B981] text-white font-bold rounded-xl shadow-lg hover:bg-green-600 transition-all">
                           সেভ করুন
                        </button>
                      </form>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
