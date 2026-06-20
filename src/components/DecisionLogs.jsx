import { AlertTriangle } from 'lucide-react';

export default function DecisionLogs() {
  const logRows = [
    { date: '2026-06-20', labelB: 'Scale Web Nodes', labelC: 'Critical', labelD: 'Low' },
    { date: '2026-06-20', labelB: 'Verify SSL Uplink', labelC: 'High', labelD: 'Medium' },
    { date: '2026-06-19', labelB: 'Initiate Fraud Check', labelC: 'Standard', labelD: 'High' },
    { date: '2026-06-18', labelB: 'DB Optimization', labelC: 'Low', labelD: 'Low' },
  ];

  const getPriorityStyle = (priority) => {
    if (priority === 'Critical') return 'text-rose-400 font-extrabold';
    if (priority === 'High') return 'text-amber-400 font-bold';
    return 'text-cyan-400 font-semibold';
  };

  const getRiskStyle = (risk) => {
    if (risk === 'High') return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    if (risk === 'Medium') return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  };

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[280px] w-full card-inner-static relative overflow-hidden">
      
      {/* Table section */}
      <div className="flex-1 w-full text-[10px] sm:text-xs overflow-hidden">
        <h2 className="text-sm font-extrabold uppercase tracking-wider mb-3.5" style={{ color: 'var(--text-primary)' }}>
          Decision Logs & Alerts
        </h2>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-opacity-10 text-[9px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
              <th className="pb-2">Date</th>
              <th className="pb-2">Decision</th>
              <th className="pb-2">Priority</th>
              <th className="pb-2">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-all">
                <td className="py-2 text-[10px]" style={{ color: 'var(--text-secondary)' }}>{row.date}</td>
                <td className="py-2 font-semibold" style={{ color: 'var(--text-primary)' }}>{row.labelB}</td>
                <td className={`py-2 text-[10px] ${getPriorityStyle(row.labelC)}`}>{row.labelC}</td>
                <td className="py-2">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${getRiskStyle(row.labelD)}`}>
                    {row.labelD}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Warning alert panel */}
      <div className="mt-4 p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-rose-500/15 text-rose-400 flex-shrink-0 animate-pulse">
          <AlertTriangle size={16} />
        </div>
        
        <div className="flex-1 flex flex-col gap-1 text-[10px] leading-relaxed">
          <span className="font-extrabold text-rose-400 uppercase tracking-wide">
            Alert Panel: Thread Spike Warn
          </span>
          <p style={{ color: 'var(--text-secondary)' }}>
            VPC Edge cluster load spiked to 92.4% capacity. Action advised.
          </p>
        </div>
      </div>

    </div>
  );
}
