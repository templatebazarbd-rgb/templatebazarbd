
import React, { useState } from 'react';
import { useLanguage } from '../App';
import { supabase } from '../supabase';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            phone: formData.phone, 
            subject: formData.subject, 
            message: formData.message,
            created_at: new Date()
          }
        ]);

      if (error) throw error;
      
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error: any) {
      alert('দুঃখিত, আপনার বার্তা পাঠানো সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন বা সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন।');
      console.error('Error submitting to Supabase:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <div className="primary-blue-gradient text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">যোগাযোগ করুন</h1>
          <p className="text-blue-100">আমাদের সাথে যোগাযোগ করুন। আমরা আপনাকে সাহায্য করতে সর্বদা প্রস্তুত।</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#111827] mb-8">যোগাযোগ তথ্য</h2>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-50 text-[#0066FF] rounded-xl flex items-center justify-center text-xl shrink-0">📞</div>
              <div>
                <h4 className="font-bold text-gray-900">ফোন</h4>
                <p className="text-gray-500 english-font">01764471819</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
              <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center text-xl shrink-0">✉️</div>
              <div>
                <h4 className="font-bold text-gray-900">ইমেইল</h4>
                <p className="text-gray-500 english-font">templatebazarbd@gmail.com</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-50 text-[#10B981] rounded-xl flex items-center justify-center text-xl shrink-0">💬</div>
              <div>
                <h4 className="font-bold text-gray-900">হোয়াটসঅ্যাপ</h4>
                <p className="text-gray-500 english-font">01764471819</p>
              </div>
            </div>

            <div className="bg-[#10B981] p-8 rounded-2xl text-white">
              <h4 className="text-xl font-bold mb-3">দ্রুত উত্তর পেতে</h4>
              <p className="text-green-50 mb-6">হোয়াটসঅ্যাপে মেসেজ করুন, তাৎক্ষণিক উত্তর পান!</p>
              <a href="https://wa.me/8801764471819" className="w-full bg-white text-[#10B981] py-3 rounded-xl font-bold inline-block text-center hover:shadow-lg transition-all">
                হোয়াটসঅ্যাপে যোগাযোগ করুন
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-[#111827] mb-8">বার্তা পাঠান</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl text-center animate-bounce">
                <span className="text-4xl block mb-4">✅</span>
                <h3 className="text-xl font-bold">বার্তা সফলভাবে পাঠানো হয়েছে!</h3>
                <p>আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">নাম *</label>
                    <input 
                      required
                      type="text" 
                      placeholder="আপনার নাম" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">ইমেইল *</label>
                    <input 
                      required
                      type="email" 
                      placeholder="আপনার ইমেইল" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">ফোন নাম্বার</label>
                    <input 
                      type="text" 
                      placeholder="01XXXXXXXXX" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">বিষয় *</label>
                    <input 
                      required
                      type="text" 
                      placeholder="বিষয়" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] outline-none transition-all"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">বার্তা *</label>
                  <textarea 
                    required
                    rows={5} 
                    placeholder="আপনার বার্তা লিখুন..." 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] outline-none transition-all"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  disabled={loading}
                  className={`w-full bg-[#0066FF] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#0052CC] transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>🚀</span>
                      <span>বার্তা পাঠান</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
