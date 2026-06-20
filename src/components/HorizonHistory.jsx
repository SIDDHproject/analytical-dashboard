import { useState } from 'react';
import { Clock, Play, Flame, ChevronDown } from 'lucide-react';
import crystalArt from '../assets/img/crystal_art.png';
import brainNodeArt from '../assets/img/brain_node_art.png';
import liquidGoldArt from '../assets/img/liquid_gold_art.png';

export default function HorizonHistory() {
  const [selectedDay, setSelectedDay] = useState({ day: 20, isCurrentMonth: true });

  const historyItems = [
    {
      title: 'Colorful Heaven',
      author: 'By Mark Benjamin',
      price: '1.30 ETH',
      img: crystalArt
    },
    {
      title: 'Abstract Colors',
      author: 'By Esthera Jackson',
      price: '0.91 ETH',
      img: brainNodeArt
    },
    {
      title: 'ETH AI Brain',
      author: 'By Nick Wilson',
      price: '2.82 ETH',
      img: liquidGoldArt
    }
  ];

  // Calendar days grid for June 2026 (Starts on Monday June 1st)
  // Rendering from Sunday May 31st to Saturday July 11th matching the screenshot.
  const calendarDays = [
    { day: 31, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true }, // Highlighted Day
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false },
    { day: 5, isCurrentMonth: false },
    { day: 6, isCurrentMonth: false },
    { day: 7, isCurrentMonth: false },
    { day: 8, isCurrentMonth: false },
    { day: 9, isCurrentMonth: false },
    { day: 10, isCurrentMonth: false },
    { day: 11, isCurrentMonth: false }
  ];

  const weekHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'St'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
      
      {/* CARD 1: NFT History Ledger */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px] w-full card-inner-static relative overflow-hidden">
        <div className="flex justify-between items-center w-full mb-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
            History
          </h3>
          <button className="text-[10px] font-black uppercase text-pink-500 hover:underline px-3 py-1.5 rounded-xl bg-white/5 border border-white/5" style={{ color: 'var(--accent-primary)' }}>
            See all
          </button>
        </div>

        {/* NFT Rows */}
        <div className="flex-1 flex flex-col gap-4">
          {historyItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 border border-white/5" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-3">
                {/* Visual Artwork image thumbnail */}
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-12 h-12 rounded-xl object-cover shadow flex-shrink-0 border border-white/5" 
                />
                
                <div className="flex flex-col text-left justify-center leading-tight">
                  <span className="text-xs font-black" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </span>
                  <span className="text-[9px] text-gray-500 mt-0.5">
                    {item.author}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 font-mono text-xs font-black" style={{ color: 'var(--text-primary)' }}>
                <span>💎</span>
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 2: Calendar Panel */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col h-[360px] w-full card-inner-static relative overflow-hidden">
        {/* Month/Year selectors */}
        <div className="flex items-center justify-center gap-4 mb-4 text-xs font-bold text-gray-400">
          <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-2.5 py-1 rounded-xl cursor-pointer hover:bg-white/10" style={{ color: 'var(--text-primary)' }}>
            <span>June</span>
            <ChevronDown size={10} />
          </div>
          <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-2.5 py-1 rounded-xl cursor-pointer hover:bg-white/10" style={{ color: 'var(--text-primary)' }}>
            <span>2026</span>
            <ChevronDown size={10} />
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-extrabold uppercase text-gray-500 pb-2 border-b border-white/5 mb-2">
          {weekHeaders.map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar days grid */}
        <div className="grid grid-cols-7 gap-x-1.5 gap-y-2 text-center text-xs">
          {calendarDays.map((item, idx) => {
            const isSelected = item.day === selectedDay.day && item.isCurrentMonth === selectedDay.isCurrentMonth;
            
            return (
              <div 
                key={idx}
                onClick={() => setSelectedDay(item)}
                className={`h-7 flex items-center justify-center font-semibold rounded-full select-none cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-pink-500 text-white font-extrabold shadow-md shadow-pink-500/20' 
                    : item.isCurrentMonth
                      ? 'text-slate-200 hover:bg-white/5'
                      : 'text-gray-600 hover:bg-white/5'
                }`}
                style={{ 
                  backgroundColor: isSelected ? 'var(--accent-primary)' : '',
                  color: isSelected ? '#ffffff' : ''
                }}
              >
                {item.day}
              </div>
            );
          })}
        </div>
      </div>

      {/* CARD 3: Business Design Lesson Promo */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px] w-full card-inner-static relative overflow-hidden">
        {/* Flame Badge */}
        <div className="flex justify-between items-start w-full">
          <div className="p-3 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 animate-pulse">
            <Flame size={18} className="fill-rose-500/10" />
          </div>
          <div className="text-right flex flex-col leading-none">
            <span className="text-[8px] uppercase font-black text-gray-500 tracking-wider">Business Design</span>
            <span className="text-[10px] font-black text-pink-500 mt-1" style={{ color: 'var(--accent-primary)' }}>New lesson is available</span>
          </div>
        </div>

        {/* Central Pitch question */}
        <div className="text-left my-4">
          <h4 className="text-lg font-black leading-tight text-white tracking-tight">
            What do you need to know to create better products?
          </h4>
        </div>

        {/* Video tags */}
        <div className="flex gap-4 text-[10px] font-bold text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            85 mins
          </span>
          <span className="flex items-center gap-1">
            <Play size={12} className="fill-gray-500/10" />
            Video format
          </span>
        </div>

        {/* Student Avatars and CTA Button */}
        <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4">
          {/* Avatar stacking pile */}
          <div className="flex items-center -space-x-2">
            <div className="w-6 h-6 rounded-full bg-pink-500 border border-slate-900 flex items-center justify-center text-[8px] font-bold text-white">JD</div>
            <div className="w-6 h-6 rounded-full bg-cyan-500 border border-slate-900 flex items-center justify-center text-[8px] font-bold text-white">MK</div>
            <div className="w-6 h-6 rounded-full bg-emerald-500 border border-slate-900 flex items-center justify-center text-[8px] font-bold text-white">SA</div>
            <div className="w-6 h-6 rounded-full bg-white/10 border border-slate-900 flex items-center justify-center text-[8px] font-bold text-gray-400">+18</div>
          </div>

          <button 
            onClick={() => alert('Starting Lesson...')}
            className="px-5 py-2.5 rounded-xl text-xs font-black text-white hover:opacity-90 transition-all shadow-md"
            style={{ 
              backgroundColor: 'var(--accent-primary)',
              boxShadow: `0 4px 14px -4px rgba(var(--glow-color), 0.3)`
            }}
          >
            Get Started
          </button>
        </div>
      </div>

    </div>
  );
}
