import { useState } from 'react';
import {
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Eye, EyeOff, BarChart2, DollarSign, Target } from 'lucide-react';

// Custom glassmorphism tooltip declared outside of render
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-4 rounded-xl shadow-2xl border border-opacity-30 flex flex-col gap-2 min-w-[200px]"
           style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <p className="text-sm font-bold border-b pb-1.5 opacity-90" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
          {label}
        </p>
        <div className="flex flex-col gap-1.5 mt-0.5">
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between items-center text-xs gap-4">
              <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                {entry.name === 'Revenue' && <DollarSign size={12} />}
                {entry.name === 'Transactions' && <BarChart2 size={12} />}
                {entry.name === 'AdSpend' && <Target size={12} />}
                {entry.name}
              </span>
              <span className="font-extrabold" style={{ color: 'var(--text-primary)' }}>
                {entry.name === 'Revenue' || entry.name === 'AdSpend' ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};
export default function SalesChart({ data }) {
  // Interactive visibility toggles for datasets
  const [visibleSeries, setVisibleSeries] = useState({
    Revenue: true,
    Transactions: true,
    AdSpend: false,
  });

  const toggleSeries = (series) => {
    setVisibleSeries(prev => ({
      ...prev,
      [series]: !prev[series]
    }));
  };

  // Determine colors based on active theme
  const colors = {
    Revenue: 'var(--accent-primary)',
    Transactions: 'var(--accent-secondary)',
    AdSpend: '#eab308',
    grid: 'var(--chart-grid)',
    text: 'var(--text-secondary)'
  };

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col h-[400px] w-full card-inner-static relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header controls row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 z-10">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Revenue & Performance Trends
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Analyze business throughput, conversions, and ad efficiency.
          </p>
        </div>

        {/* Dynamic series selectors */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => toggleSeries('Revenue')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 ${
              visibleSeries.Revenue
                ? 'bg-pink-500/10 text-pink-400 border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.1)]'
                : 'bg-transparent text-gray-500 border-gray-500/20 hover:border-gray-500/40'
            }`}
            style={{
              color: visibleSeries.Revenue ? 'var(--accent-primary)' : '',
              borderColor: visibleSeries.Revenue ? 'var(--accent-primary)' : '',
              backgroundColor: visibleSeries.Revenue ? 'rgba(var(--glow-color), 0.1)' : ''
            }}
          >
            {visibleSeries.Revenue ? <Eye size={12} /> : <EyeOff size={12} />}
            Revenue
          </button>

          <button
            onClick={() => toggleSeries('Transactions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 ${
              visibleSeries.Transactions
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]'
                : 'bg-transparent text-gray-500 border-gray-500/20 hover:border-gray-500/40'
            }`}
            style={{
              color: visibleSeries.Transactions ? 'var(--accent-secondary)' : '',
              borderColor: visibleSeries.Transactions ? 'var(--accent-secondary)' : '',
            }}
          >
            {visibleSeries.Transactions ? <Eye size={12} /> : <EyeOff size={12} />}
            Transactions
          </button>

          <button
            onClick={() => toggleSeries('AdSpend')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 ${
              visibleSeries.AdSpend
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                : 'bg-transparent text-gray-500 border-gray-500/20 hover:border-gray-500/40'
            }`}
          >
            {visibleSeries.AdSpend ? <Eye size={12} /> : <EyeOff size={12} />}
            Ad Spend
          </button>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="flex-1 w-full z-10 text-[10px] sm:text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: -5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.Revenue} stopOpacity={0.35}/>
                <stop offset="95%" stopColor={colors.Revenue} stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.grid} />
            
            <XAxis 
              dataKey="date" 
              tick={{ fill: colors.text, fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              dy={8}
            />
            
            <YAxis 
              yAxisId="left"
              tick={{ fill: colors.text, fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v}`}
            />

            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fill: colors.text, fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}`}
              hide={!visibleSeries.Transactions}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: colors.grid, strokeWidth: 1.5 }} />

            {/* Composite Area, Bar and Line elements */}
            {visibleSeries.Revenue && (
              <Area
                yAxisId="left"
                type="monotone"
                name="Revenue"
                dataKey="Revenue"
                stroke={colors.Revenue}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                isAnimationActive={true}
              />
            )}

            {visibleSeries.Transactions && (
              <Bar
                yAxisId="right"
                name="Transactions"
                dataKey="Transactions"
                fill={colors.Transactions}
                radius={[4, 4, 0, 0]}
                barSize={16}
                opacity={0.75}
                isAnimationActive={true}
              />
            )}

            {visibleSeries.AdSpend && (
              <Line
                yAxisId="left"
                type="monotone"
                name="AdSpend"
                dataKey="AdSpend"
                stroke={colors.AdSpend}
                strokeWidth={2.5}
                dot={{ stroke: colors.AdSpend, strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive={true}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
