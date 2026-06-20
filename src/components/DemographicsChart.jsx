import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { useTheme } from '../context/ThemeContext';

export default function DemographicsChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // Base colors for pie chart. Direct and Referral use context variables.
  const getCellColor = (item) => {
    if (item.name === "Direct") return "var(--accent-primary)";
    if (item.name === "Referral") return "var(--accent-secondary)";
    
    // Forest / Solar green and amber adjustments
    if (theme === 'forest') {
      if (item.name === "Organic Search") return "#10b981"; // Mint
      return "#f59e0b"; // Gold
    }
    if (theme === 'solar') {
      if (item.name === "Organic Search") return "#eab308"; // Amber
      return "#ef4444"; // Red
    }
    // Default Cyberpunk
    if (item.name === "Organic Search") return "#10b981"; // Emerald
    return "#f59e0b"; // Gold/Orange
  };

  // Custom center active shape renderer
  const renderActiveShape = (props) => {
    const { 
      cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value 
    } = props;

    return (
      <g>
        {/* Center Text Category */}
        <text 
          x={cx} 
          y={cy - 6} 
          textAnchor="middle" 
          fill="var(--text-primary)" 
          stroke="none"
          className="font-extrabold text-sm sm:text-base tracking-tight"
        >
          {payload.name}
        </text>
        {/* Center Text Value */}
        <text 
          x={cx} 
          y={cy + 14} 
          textAnchor="middle" 
          fill="var(--text-secondary)" 
          stroke="none"
          className="font-bold text-xs"
        >
          {`${value.toLocaleString()} users`}
        </text>
        {/* Center Text Share */}
        <text 
          x={cx} 
          y={cy + 30} 
          textAnchor="middle" 
          fill={fill} 
          stroke="none"
          className="font-extrabold text-[10px] tracking-wider uppercase"
        >
          {`${(percent * 100).toFixed(1)}% Share`}
        </text>
        
        {/* Enlarged Hover Slice */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{ filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.3))' }}
        />
        {/* Concentric Glow Band */}
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 9}
          outerRadius={outerRadius + 12}
          fill={fill}
          opacity={0.35}
        />
      </g>
    );
  };

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col h-[360px] w-full card-inner-static relative overflow-hidden">
      {/* Background neon accent */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      <div>
        <h2 className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Acquisition Channels
        </h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          Demographics split of inbound traffic funnels.
        </p>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row justify-center items-center gap-6 mt-4 z-10">
        {/* Donut Pie Chart */}
        <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={75}
                dataKey="value"
                onMouseEnter={onPieEnter}
                stroke="transparent"
                isAnimationActive={true}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getCellColor(entry)} 
                    style={{ outline: 'none' }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Panel */}
        <div className="flex flex-col gap-2.5 flex-1 w-full sm:w-auto">
          {data.map((entry, index) => {
            const cellColor = getCellColor(entry);
            const isActive = index === activeIndex;
            return (
              <div 
                key={entry.name}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex items-center justify-between p-2 rounded-xl border border-transparent transition-all duration-300 cursor-pointer ${
                  isActive ? 'bg-white/5 border-white/10 scale-[1.02]' : 'hover:bg-white/5 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: cellColor, boxShadow: isActive ? `0 0 8px ${cellColor}` : 'none' }}
                  />
                  <span className="text-xs font-semibold" style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {entry.name}
                  </span>
                </div>
                <span className="text-xs font-extrabold" style={{ color: 'var(--text-primary)' }}>
                  {entry.value.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
