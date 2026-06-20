import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function GaugeChart({ value }) {
  // Config for the semi-circular speedometer gauge
  const gaugeData = [
    { value: 40, color: 'var(--accent-primary)', name: 'Optimal' },
    { value: 35, color: 'var(--accent-secondary)', name: 'Standard' },
    { value: 25, color: '#ef4444', name: 'Critical' },
  ];

  // Map value to gauge position (0-100 scale mapped to 180deg)
  const needleValue = value || 68;

  // Active ring data mapping
  const activeRingData = [
    { value: needleValue, color: 'var(--accent-primary)' },
    { value: 100 - needleValue, color: 'rgba(255, 255, 255, 0.05)' }
  ];

  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-between h-[180px] w-full card-inner-static relative overflow-hidden">
      <div className="text-left w-full">
        <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
          System Throughput Index
        </span>
      </div>

      {/* Speedometer container */}
      <div className="w-full h-28 relative mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            {/* Background color bands */}
            <Pie
              data={gaugeData}
              cx="50%"
              cy="90%"
              startAngle={180}
              endAngle={0}
              innerRadius={55}
              outerRadius={65}
              dataKey="value"
              stroke="transparent"
              isAnimationActive={false}
            >
              {gaugeData.map((entry, idx) => (
                <Cell key={`bg-cell-${idx}`} fill={entry.color} opacity={0.15} />
              ))}
            </Pie>

            {/* Foreground value indicator */}
            <Pie
              data={activeRingData}
              cx="50%"
              cy="90%"
              startAngle={180}
              endAngle={0}
              innerRadius={55}
              outerRadius={65}
              dataKey="value"
              stroke="transparent"
              isAnimationActive={true}
            >
              <Cell fill="var(--accent-primary)" style={{ filter: 'drop-shadow(0 0 8px var(--accent-primary))' }} />
              <Cell fill="rgba(255, 255, 255, 0.05)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Needle Value Readout positioned in the absolute center bottom of the semi-circle */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%] flex flex-col items-center">
          <span className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {needleValue}%
          </span>
          <span className="text-[8px] uppercase font-bold text-emerald-400 tracking-widest mt-0.5">
            Optimal
          </span>
        </div>
      </div>
    </div>
  );
}
