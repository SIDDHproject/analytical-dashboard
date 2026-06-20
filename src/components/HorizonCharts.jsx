import { LineChart, Line, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, CheckCircle2, BarChart2 } from 'lucide-react';

export default function HorizonCharts() {
  // Mock data for Column 1: Total Spent Line Chart
  const spentData = [
    { name: 'SEP', Spent: 25, Budget: 18 },
    { name: 'OCT', Spent: 32, Budget: 22 },
    { name: 'NOV', Spent: 28, Budget: 35 },
    { name: 'DEC', Spent: 55, Budget: 28 },
    { name: 'JAN', Spent: 38, Budget: 42 },
    { name: 'FEB', Spent: 45, Budget: 30 }
  ];

  // Mock data for Column 2: Weekly Revenue Stacked Bar
  const revenueData = [
    { day: '17', SegmentA: 25, SegmentB: 20, SegmentC: 15 },
    { day: '18', SegmentA: 20, SegmentB: 18, SegmentC: 12 },
    { day: '19', SegmentA: 15, SegmentB: 15, SegmentC: 10 },
    { day: '20', SegmentA: 28, SegmentB: 22, SegmentC: 18 },
    { day: '21', SegmentA: 22, SegmentB: 20, SegmentC: 14 },
    { day: '22', SegmentA: 12, SegmentB: 14, SegmentC: 8 },
    { day: '23', SegmentA: 20, SegmentB: 18, SegmentC: 15 },
    { day: '24', SegmentA: 26, SegmentB: 24, SegmentC: 16 },
    { day: '25', SegmentA: 18, SegmentB: 16, SegmentC: 11 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      
      {/* 1. Total Spent Line Chart */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col h-[320px] w-full card-inner-static relative overflow-hidden">
        {/* Header Controls */}
        <div className="flex justify-between items-start w-full mb-4">
          <div className="flex flex-col text-left">
            {/* Calendar pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[9px] font-bold text-gray-400 self-start mb-2">
              <Calendar size={12} />
              Jan 2026
            </div>
            <span className="text-2xl font-black text-white">$37.5K</span>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] font-bold text-gray-500">
              <span>Total Spent</span>
              <span className="text-emerald-400 flex items-center gap-0.5">
                ▲ +2.45%
              </span>
            </div>
            
            {/* On Track Status */}
            <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-black uppercase tracking-wider mt-3">
              <CheckCircle2 size={12} className="fill-emerald-500/10" />
              On Track
            </div>
          </div>
          
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-indigo-400">
            <BarChart2 size={16} />
          </div>
        </div>

        {/* Double line Recharts container */}
        <div className="flex-1 w-full text-[9px] select-none">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spentData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="Spent" 
                stroke="var(--accent-primary)" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="Budget" 
                stroke="var(--accent-secondary)" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Weekly Revenue Stacked Column Chart */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col h-[320px] w-full card-inner-static relative overflow-hidden">
        <div className="flex justify-between items-start w-full mb-6">
          <div className="text-left">
            <h2 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
              Weekly Revenue
            </h2>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-indigo-400">
            <BarChart2 size={16} />
          </div>
        </div>

        {/* Stacked bar Recharts container */}
        <div className="flex-1 w-full text-[9px] select-none">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fill: 'var(--text-secondary)', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip />
              
              {/* Stacked bar segments matching wireframe color scheme */}
              <Bar dataKey="SegmentA" name="Platform Revenue" stackId="a" fill="var(--accent-primary)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="SegmentB" name="API Subscriptions" stackId="a" fill="var(--accent-secondary)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="SegmentC" name="Third-Party Audits" stackId="a" fill="rgba(255, 255, 255, 0.05)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
