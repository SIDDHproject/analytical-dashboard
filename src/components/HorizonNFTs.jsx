import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import crystalArt from '../assets/img/crystal_art.png';
import brainNodeArt from '../assets/img/brain_node_art.png';

export default function HorizonNFTs() {
  const [likes, setLikes] = useState({ cardA: false, cardB: false });

  const toggleLike = (card) => {
    setLikes(prev => ({
      ...prev,
      [card]: !prev[card]
    }));
  };

  // Your Pie Chart data
  const storageData = [
    { name: 'Your Files', value: 65, color: 'var(--accent-primary)' },
    { name: 'System', value: 35, color: 'var(--accent-secondary)' }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
      
      {/* 1. Storage Donut Pie Chart */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px] w-full card-inner-static relative overflow-hidden">
        {/* Header selectors */}
        <div className="flex justify-between items-center w-full mb-2">
          <h3 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
            Your Pie Chart
          </h3>
          <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-xl cursor-pointer hover:bg-white/10 text-[9px] font-bold text-gray-400">
            <span>Monthly</span>
            <ChevronDown size={10} />
          </div>
        </div>

        {/* Donut Chart visualizer */}
        <div className="w-full h-40 relative mt-2 select-none">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={storageData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={65}
                dataKey="value"
                stroke="transparent"
                isAnimationActive={true}
              >
                {storageData.map((entry, index) => (
                  <Cell key={`storage-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Centered label */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>65%</span>
            <span className="text-[7px] uppercase font-bold text-gray-500 tracking-widest mt-0.5">Files</span>
          </div>
        </div>

        {/* Storage Legend */}
        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-2">
          <div className="flex flex-col items-center border-r border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-primary)' }} />
              <span className="text-[9px] uppercase font-extrabold text-gray-500">Your Files</span>
            </div>
            <span className="text-sm font-black mt-1" style={{ color: 'var(--text-primary)' }}>65%</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-secondary)' }} />
              <span className="text-[9px] uppercase font-extrabold text-gray-500">System</span>
            </div>
            <span className="text-sm font-black mt-1" style={{ color: 'var(--text-primary)' }}>35%</span>
          </div>
        </div>
      </div>

      {/* 2. Trending NFTs Cards Grid */}
      <div className="xl:col-span-2 glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px] w-full card-inner-static relative overflow-hidden">
        {/* Header arrow slider toggles */}
        <div className="flex justify-between items-center w-full mb-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
            Trending NFTs
          </h3>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-500 hover:text-gray-300 transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-500 hover:text-gray-300 transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* NFT Cards Dual Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
          
          {/* Card A */}
          <div className="p-3.5 rounded-2xl bg-black/20 border border-white/5 flex flex-col justify-between relative text-left">
            {/* Main artwork image canvas */}
            <div className="w-full h-32 rounded-xl relative shadow-inner flex-shrink-0 overflow-hidden">
              <img src={crystalArt} alt="Colorful Heaven" className="w-full h-full object-cover" />
              {/* Like Heart Button */}
              <button 
                onClick={() => toggleLike('cardA')}
                className="absolute right-3 top-3 w-7 h-7 rounded-full bg-slate-950/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-slate-950/60 transition-colors border border-white/10"
              >
                <Heart size={12} className={likes.cardA ? 'fill-rose-500 text-rose-500' : 'text-white'} />
              </button>
            </div>

            <div className="flex justify-between items-start mt-3">
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-black text-white">Colorful Heaven</span>
                <span className="text-[9px] text-gray-500 mt-0.5">By Mark Benjamin</span>
              </div>
              
              {/* Stacking Avatars */}
              <div className="flex items-center -space-x-1.5">
                <div className="w-5 h-5 rounded-full bg-pink-500 border border-slate-900 flex items-center justify-center text-[7px] font-bold text-white">JD</div>
                <div className="w-5 h-5 rounded-full bg-cyan-500 border border-slate-900 flex items-center justify-center text-[7px] font-bold text-white">MK</div>
                <div className="w-5 h-5 rounded-full bg-white/15 border border-slate-900 flex items-center justify-center text-[7px] font-bold text-gray-400">+18</div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
              <div className="flex flex-col leading-tight">
                <span className="text-[8px] uppercase font-black text-gray-500">Current Bid</span>
                <span className="text-xs font-black text-pink-500 mt-0.5" style={{ color: 'var(--accent-primary)' }}>1.30 ETH</span>
              </div>
              <button 
                onClick={() => alert('Placing bid on Colorful Heaven...')}
                className="px-3.5 py-1.5 rounded-lg text-[9px] font-black text-white hover:opacity-90 transition-all shadow"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              >
                Place Bid
              </button>
            </div>
          </div>

          {/* Card B */}
          <div className="p-3.5 rounded-2xl bg-black/20 border border-white/5 flex flex-col justify-between relative text-left">
            {/* Main artwork image canvas */}
            <div className="w-full h-32 rounded-xl relative shadow-inner flex-shrink-0 overflow-hidden">
              <img src={brainNodeArt} alt="Abstract Colors" className="w-full h-full object-cover" />
              {/* Like Heart Button */}
              <button 
                onClick={() => toggleLike('cardB')}
                className="absolute right-3 top-3 w-7 h-7 rounded-full bg-slate-950/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-slate-950/60 transition-colors border border-white/10"
              >
                <Heart size={12} className={likes.cardB ? 'fill-rose-500 text-rose-500' : 'text-white'} />
              </button>
            </div>

            <div className="flex justify-between items-start mt-3">
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-black text-white">Abstract Colors</span>
                <span className="text-[9px] text-gray-500 mt-0.5">By Esthera Jackson</span>
              </div>
              
              {/* Stacking Avatars */}
              <div className="flex items-center -space-x-1.5">
                <div className="w-5 h-5 rounded-full bg-purple-500 border border-slate-900 flex items-center justify-center text-[7px] font-bold text-white">SA</div>
                <div className="w-5 h-5 rounded-full bg-indigo-500 border border-slate-900 flex items-center justify-center text-[7px] font-bold text-white">NW</div>
                <div className="w-5 h-5 rounded-full bg-white/15 border border-slate-900 flex items-center justify-center text-[7px] font-bold text-gray-400">+14</div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
              <div className="flex flex-col leading-tight">
                <span className="text-[8px] uppercase font-black text-gray-500">Current Bid</span>
                <span className="text-xs font-black text-pink-500 mt-0.5" style={{ color: 'var(--accent-primary)' }}>0.91 ETH</span>
              </div>
              <button 
                onClick={() => alert('Placing bid on Abstract Colors...')}
                className="px-3.5 py-1.5 rounded-lg text-[9px] font-black text-white hover:opacity-90 transition-all shadow"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              >
                Place Bid
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
