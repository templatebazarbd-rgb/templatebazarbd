
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../App';
import { supabase } from '../supabase';
import { Template, Category } from '../types';

const AdminDashboardPage: React.FC = () => {
  const { isAdmin, language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  
  // Data States
  const [orders, setOrders] = useState<any[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState({ totalSales: 0, totalOrders: 0, totalProducts: 0, todaySales: 0 });

  // UI States
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const initialProductForm = {
    name: { bn: '', en: '' },
    description: { bn: '', en: '' },
    category: '',
    price: 0,
    old_price: 0,
    image: '',
    demo_url: '',
    tag: ''
  };

  const [productForm, setProductForm] = useState<any>(initialProductForm);

  useEffect(() => {
    if (!isAdmin) { navigate('/'); return; }
    fetchAllData();
  }, [isAdmin]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [oRes, tRes, cRes] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('templates').select('*'),
        supabase.from('categories').select('*')
      ]);

      if (oRes.data) {
        setOrders(oRes.data);
        const completed = oRes.data.filter(o => o.status === 'completed');
        const sales = completed.reduce((acc, curr) => acc + (curr.price || 0), 0);
        setStats({ totalSales: sales, totalOrders: oRes.data.length, totalProducts: tRes.data?.length || 0, todaySales: 45200 });
      }
      if (tRes.data) setTemplates(tRes.data as Template[]);
      if (cRes.data) setCategories(cRes.data as Category[]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const SidebarSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 mb-3">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );

  const NavItem = ({ id, label, icon }: { id: string, label: string, icon: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 px-6 py-3 font-bold text-sm transition-all rounded-r-full ${activeTab === id ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );

  if (!isAdmin) return null;

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar - Pro Design */}
      <aside className="w-full lg:w-64 bg-white border-r border-slate-200 h-screen sticky top-0 z-50 hidden lg:flex flex-col">
        <div className="p-8 flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">A</div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">AdminPro</h2>
        </div>
        
        <nav className="flex-grow overflow-y-auto">
          <SidebarSection title="Dashboard">
            <NavItem id="dashboard" label="Dashboard" icon="📊" />
          </SidebarSection>
          
          <SidebarSection title="Inventory">
            <NavItem id="products" label="Products" icon="📦" />
            <NavItem id="categories" label="Categories" icon="📁" />
          </SidebarSection>
          
          <SidebarSection title="Sales">
            <NavItem id="orders" label="Orders" icon="🛒" />
            <NavItem id="coupons" label="Coupons" icon="🎟️" />
          </SidebarSection>
          
          <SidebarSection title="Management">
            <NavItem id="customers" label="Customers" icon="👥" />
            <NavItem id="content" label="Site Content" icon="🖥️" />
          </SidebarSection>

          <SidebarSection title="System">
            <NavItem id="reports" label="Reports" icon="📈" />
            <NavItem id="settings" label="Settings" icon="⚙️" />
          </SidebarSection>
        </nav>

        <div className="p-8 border-t">
          <button onClick={() => navigate('/')} className="w-full p-4 bg-red-50 text-red-500 font-black text-xs rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center space-x-2">
            <span>🚪</span> <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 p-6 flex justify-between items-center sticky top-0 z-40">
          <div className="relative w-96 hidden md:block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 text-sm">🔍</span>
            <input type="text" placeholder="Search templates, orders, users..." className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 text-xs font-medium focus:ring-2 focus:ring-blue-500/10" />
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={() => { setEditingItem(null); setProductForm(initialProductForm); setShowProductModal(true); }} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-black text-xs shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
              + Add New Product
            </button>
          </div>
        </header>

        <div className="p-8 lg:p-12">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="font-bold text-slate-400">Loading Dashboard Data...</p>
            </div>
          ) : (
            <div className="animate-fadeIn">
              {activeTab === 'dashboard' && (
                <div className="space-y-10">
                  <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-400 font-bold mt-1">Welcome back, here's what's happening today.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Total Products', val: templates.length, icon: '📦', color: 'text-blue-600', bg: 'bg-blue-50', change: '+ 12% vs last month' },
                      { label: 'Total Categories', val: categories.length, icon: '📁', color: 'text-indigo-600', bg: 'bg-indigo-50', change: 'Updated recently' },
                      { label: 'Total Orders', val: orders.length, icon: '🛒', color: 'text-emerald-600', bg: 'bg-emerald-50', change: '+ 8% vs last month' },
                      { label: 'Total Revenue', val: `৳${stats.totalSales.toLocaleString()}`, icon: '💰', color: 'text-amber-600', bg: 'bg-amber-50', change: '+ 15% vs last month' }
                    ].map((s, i) => (
                      <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center text-xl mb-4`}>{s.icon}</div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                        <h3 className="text-2xl font-black text-slate-900 mt-1">{s.val}</h3>
                        <p className="text-[10px] font-bold text-emerald-500 mt-2">↗ {s.change}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                      <div className="flex justify-between items-center mb-10">
                        <h3 className="text-lg font-black text-slate-900">Sales Analytics</h3>
                        <select className="bg-slate-50 border-none rounded-lg px-4 py-2 text-[10px] font-black">
                          <option>This Week</option>
                        </select>
                      </div>
                      <div className="h-64 relative flex items-end justify-between px-4">
                        <svg className="absolute inset-0 w-full h-full text-blue-500/10" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path d="M0,80 Q25,20 50,60 T100,40 V100 H0 Z" fill="currentColor" />
                          <path d="M0,80 Q25,20 50,60 T100,40" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                          <div key={i} className="text-[10px] font-bold text-slate-300 relative z-10">{day}</div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-fit">
                        <h3 className="text-lg font-black mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <button onClick={() => setActiveTab('products')} className="p-4 bg-blue-50 text-blue-600 rounded-2xl flex flex-col items-center hover:scale-105 transition-all">
                             <span className="text-xl">📦</span>
                             <span className="text-[9px] font-black uppercase mt-1">Items</span>
                          </button>
                          <button onClick={() => setActiveTab('categories')} className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl flex flex-col items-center hover:scale-105 transition-all">
                             <span className="text-xl">📁</span>
                             <span className="text-[9px] font-black uppercase mt-1">Cats</span>
                          </button>
                          <button onClick={() => setActiveTab('orders')} className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl flex flex-col items-center hover:scale-105 transition-all">
                             <span className="text-xl">🛒</span>
                             <span className="text-[9px] font-black uppercase mt-1">Orders</span>
                          </button>
                          <button onClick={() => setActiveTab('settings')} className="p-4 bg-slate-50 text-slate-600 rounded-2xl flex flex-col items-center hover:scale-105 transition-all">
                             <span className="text-xl">⚙️</span>
                             <span className="text-[9px] font-black uppercase mt-1">Settings</span>
                          </button>
                        </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div className="space-y-8">
                  <header className="flex justify-between items-center bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-black">All Templates</h2>
                    <button onClick={() => { setEditingItem(null); setProductForm(initialProductForm); setShowProductModal(true); }} className="px-8 py-4 bg-blue-600 text-white rounded-[1.2rem] font-black shadow-xl hover:scale-105 transition-all">+ Add Product</button>
                  </header>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map(t => (
                      <div key={t.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 group">
                        <img src={t.image} className="w-full aspect-video object-cover rounded-3xl mb-4 group-hover:scale-105 transition-transform" />
                        <h4 className="font-black text-lg text-slate-900">{t.name?.[language] || t.name?.en}</h4>
                        <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-50">
                          <span className="text-xl font-black text-slate-900">৳{t.price.toLocaleString()}</span>
                          <div className="flex space-x-2">
                            <button onClick={() => { setEditingItem(t); setProductForm(t); setShowProductModal(true); }} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">✏️</button>
                            <button onClick={() => { if(window.confirm('Delete this?')) supabase.from('templates').delete().eq('id', t.id).then(()=>fetchAllData()); }} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">🗑️</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'orders' && (
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 animate-fadeIn">
                  <h2 className="text-2xl font-black mb-10">Marketplace Orders</h2>
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="text-[10px] text-slate-400 font-black uppercase tracking-widest border-b border-slate-50">
                              <th className="pb-6">Customer</th>
                              <th className="pb-6">Amount</th>
                              <th className="pb-6">Method</th>
                              <th className="pb-6">Status</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           {orders.map(o => (
                              <tr key={o.id}>
                                 <td className="py-6"><p className="font-bold">{o.customer_name}</p><p className="text-[10px] text-slate-400">{o.customer_email}</p></td>
                                 <td className="py-6 font-black">৳{o.price?.toLocaleString()}</td>
                                 <td className="py-6 uppercase text-[10px] font-black">{o.payment_method}</td>
                                 <td className="py-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${o.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{o.status}</span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] p-12 shadow-2xl relative my-10 animate-scaleUp">
            <button onClick={() => setShowProductModal(false)} className="absolute top-10 right-10 text-2xl text-slate-400 hover:text-slate-900 transition-colors">✕</button>
            <h2 className="text-3xl font-black mb-10 text-slate-900">{editingItem ? 'Edit Template' : 'Add New Template'}</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setIsSaving(true);
              const { id, ...payload } = productForm;
              let res;
              if (editingItem) res = await supabase.from('templates').update(payload).eq('id', editingItem.id);
              else res = await supabase.from('templates').insert([payload]);
              if (!res.error) { setShowProductModal(false); fetchAllData(); }
              setIsSaving(false);
            }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Name (BN)</label>
                  <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" value={productForm?.name?.bn || ''} onChange={e => setProductForm({...productForm, name: {...(productForm.name || {}), bn: e.target.value}})} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Name (EN)</label>
                  <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" value={productForm?.name?.en || ''} onChange={e => setProductForm({...productForm, name: {...(productForm.name || {}), en: e.target.value}})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Price</label>
                      <input required type="number" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" value={productForm?.price || 0} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Category Slug</label>
                      <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" value={productForm?.category || ''} onChange={e => setProductForm({...productForm, category: e.target.value})} />
                   </div>
                </div>
              </div>
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Image URL</label>
                    <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" value={productForm?.image || ''} onChange={e => setProductForm({...productForm, image: e.target.value})} />
                 </div>
                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Demo URL</label>
                    <input required type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl" value={productForm?.demo_url || ''} onChange={e => setProductForm({...productForm, demo_url: e.target.value})} />
                 </div>
                 <button disabled={isSaving} className="w-full py-6 bg-blue-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-blue-500/30">
                   {isSaving ? 'Saving...' : 'SAVE CHANGES'}
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-scaleUp { animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default AdminDashboardPage;
