import { BarChart2, DollarSign, CheckSquare, FolderOpen, ChevronDown } from 'lucide-react';

export default function HorizonKPIs() {
  const kpis = [
    {
      title: 'Earnings',
      value: '$350.4',
      icon: BarChart2,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'Spend this month',
      value: '$642.39',
      icon: DollarSign,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'Sales',
      value: '$574.34',
      change: '+23%',
      changeText: 'since last month',
      isCustom: true
    },
    {
      title: 'Your Balance',
      value: '$1,000',
      flag: '🇺🇸',
      hasDropdown: true
    },
    {
      title: 'New Tasks',
      value: '154',
      icon: CheckSquare,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'Total Projects',
      value: '2935',
      icon: FolderOpen,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 w-full">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        
        return (
          <div 
            key={idx}
            className="glass-panel rounded-2xl p-4.5 flex items-center justify-between card-inner-static relative overflow-hidden h-[90px]"
          >
            <div className="flex flex-col text-left justify-center h-full">
              <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                {kpi.title}
              </span>
              
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  {kpi.value}
                </span>
                
                {/* Sales change sub-indicator */}
                {kpi.change && (
                  <span className="text-[9px] font-black text-emerald-400">
                    {kpi.change} <span className="font-semibold text-gray-500">{kpi.changeText}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Render right-side icon or flag indicator */}
            {Icon && (
              <div className={`p-2.5 rounded-full border ${kpi.color}`}>
                <Icon size={16} className="stroke-[2.5]" />
              </div>
            )}

            {/* Render custom flag block */}
            {kpi.flag && (
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-lg select-none">{kpi.flag}</span>
                {kpi.hasDropdown && <ChevronDown size={12} className="text-gray-400" />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
