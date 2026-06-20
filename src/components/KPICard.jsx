import { useRef, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import * as Icons from 'lucide-react';

export default function KPICard({ title, value, change, isPositive, sparkline, icon }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Dynamically retrieve the Icon component from lucide-react
  const IconComponent = Icons[icon] || Icons.TrendingUp;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate cursor position inside the card relative to center (0 to 1 scale)
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation is 8 degrees
    const rotateX = -((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Sparkline color based on positive/negative trend
  const getSparklineColor = () => {
    return isPositive ? '#10b981' : '#ef4444';
  };

  const sparkColor = getSparklineColor();

  // Create data structure for Recharts Area
  const chartData = sparkline.map((val, idx) => ({ id: idx, value: val }));

  return (
    <div 
      className="perspective-card w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="card-inner glass-panel rounded-2xl p-6 flex flex-col justify-between h-48 cursor-pointer relative overflow-hidden"
        style={{
          transform: isHovered 
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)` 
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          boxShadow: isHovered 
            ? 'var(--accent-glow)' 
            : '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
          transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
        }}
      >
        {/* Background glow node on hover */}
        <div 
          className="absolute w-24 h-24 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500"
          style={{
            background: 'var(--accent-primary)',
            top: isHovered ? '10%' : '-50%',
            right: isHovered ? '10%' : '-50%',
          }}
        />

        {/* Top Header Row */}
        <div className="flex justify-between items-start z-10">
          <div>
            <p className="text-sm font-medium tracking-wide uppercase text-opacity-80" style={{ color: 'var(--text-secondary)' }}>
              {title}
            </p>
            <h3 className="text-3xl font-extrabold mt-1 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {value}
            </h3>
          </div>
          <div 
            className="p-3 rounded-xl transition-all duration-300"
            style={{ 
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--accent-primary)',
              boxShadow: isHovered ? '0 0 10px rgba(var(--glow-color), 0.2)' : 'none'
            }}
          >
            <IconComponent size={20} className="stroke-[2.5]" />
          </div>
        </div>

        {/* Bottom Sparkline and Badge Row */}
        <div className="flex items-end justify-between mt-auto z-10">
          <div className="flex items-center space-x-1.5">
            <span 
              className={`text-xs font-bold px-2 py-1 rounded-full flex items-center ${
                isPositive 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : 'bg-rose-500/10 text-rose-400'
              }`}
            >
              {isPositive ? (
                <Icons.ArrowUpRight size={12} className="mr-0.5" />
              ) : (
                <Icons.ArrowDownRight size={12} className="mr-0.5" />
              )}
              {change}
            </span>
            <span className="text-[10px] uppercase font-semibold text-opacity-60" style={{ color: 'var(--text-secondary)' }}>
              vs last week
            </span>
          </div>

          {/* Sparkline Container */}
          <div className="w-24 h-12 opacity-80 hover:opacity-100 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                <defs>
                  <linearGradient id={`colorSpark-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={sparkColor} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={sparkColor} stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={sparkColor}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#colorSpark-${title.replace(/\s+/g, '')})`}
                  dot={false}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
