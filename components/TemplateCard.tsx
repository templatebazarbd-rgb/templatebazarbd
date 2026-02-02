
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../App';
import { Template } from '../types';

interface TemplateCardProps {
  item: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ item }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isHovered && item.images && item.images.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % item.images.length);
      }, 1800);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCurrentImg(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, item.images]);

  const handleCardClick = () => {
    navigate(`/template/${item.id}`);
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100 cursor-pointer flex flex-col h-full transform hover:-translate-y-2"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
        <img 
          src={item.images && item.images.length > 0 ? item.images[currentImg] : item.image} 
          alt={item?.name?.[language] || item?.name?.en} 
          className="w-full h-full object-cover transition-opacity duration-700 ease-in-out" 
        />
        
        {/* Discount Badge */}
        {item.discount && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-xl font-black text-[10px] tracking-widest shadow-lg z-20">
            {item.discount} OFF
          </div>
        )}

        {/* Hover Badges Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 flex items-end p-4 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
           <div className="flex space-x-2">
              <span className="bg-white/20 backdrop-blur-md text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest border border-white/10">
                {item.category}
              </span>
              <span className="bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">
                Responsive
              </span>
           </div>
        </div>

        {/* Slider Indicators */}
        {isHovered && item.images && item.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
            {item.images.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${i === currentImg ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Middle Content Section */}
      <div className="p-7 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0066FF] transition-colors line-clamp-1 mb-2">
          {item?.name?.[language] || item?.name?.en}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
          {item?.description?.[language] || item?.description?.en}
        </p>
        
        {/* Bottom Price and Actions */}
        <div className="mt-auto pt-6 border-t border-gray-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
              {item.old_price && (
                <span className="text-xs text-gray-300 line-through font-bold price">৳{item.old_price.toLocaleString()}</span>
              )}
              <span className="text-2xl font-black text-[#0066FF] price">৳{item.price.toLocaleString()}</span>
            </div>
            {item.tag && (
              <div className="bg-amber-100 text-amber-600 px-3 py-1 rounded-xl font-black text-[9px] tracking-widest uppercase">
                {item.tag}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); navigate(`/template/${item.id}`); }}
              className="py-4 bg-[#0066FF] text-white text-[11px] font-black rounded-2xl hover:bg-[#0052CC] transition-all shadow-xl shadow-blue-500/20 active:scale-95 uppercase tracking-widest"
            >
              এখনই কিনুন
            </button>
            <a 
              href={item.demo_url} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="py-4 bg-gray-50 text-gray-900 text-[11px] font-black rounded-2xl text-center hover:bg-gray-100 transition-all border border-gray-100 uppercase tracking-widest"
            >
              ডেমো দেখুন
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
