import { FunnelChart as RechartsFunnelChart, Funnel, LabelList, ResponsiveContainer, Cell } from 'recharts';

export default function FunnelChart() {
  const data = [
    { value: 100, name: 'Information Gathering', color: 'var(--accent-primary)' },
    { value: 80, name: 'Analysis', color: 'var(--accent-secondary)' },
    { value: 60, name: 'Review', color: '#10b981' },
    { value: 40, name: 'Final Decision', color: '#f59e0b' },
    { value: 20, name: 'Execution', color: '#ef4444' },
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col h-[280px] w-full card-inner-static relative overflow-hidden">
      <div className="text-left w-full mb-2">
        <h2 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
          Decision Pipeline
        </h2>
        <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
          Stages usages of major decisions
        </span>
      </div>

      {/* Recharts Funnel Container */}
      <div className="flex-1 w-full text-[10px] mt-2 select-none">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsFunnelChart margin={{ top: 10, right: 110, left: 10, bottom: 10 }}>
            <Funnel
              data={data}
              dataKey="value"
              isAnimationActive={true}
            >
              {/* Render custom cells for colors */}
              {data.map((entry, idx) => (
                <Cell key={`funnel-cell-${idx}`} fill={entry.color} opacity={0.8} />
              ))}
              
              {/* Position names to the right of each slice */}
              <LabelList 
                position="right" 
                dataKey="name" 
                fill="var(--text-primary)" 
                fontWeight="bold"
                fontSize={10}
              />
            </Funnel>
          </RechartsFunnelChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
