import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// Global styling variables for the radar tooltip
const colors = {
  A: 'var(--accent-primary)',
  B: 'var(--accent-secondary)',
};

// Custom tooltips for radar hover events declared outside render
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3.5 rounded-xl shadow-xl text-xs flex flex-col gap-1.5"
           style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <p className="font-extrabold border-b pb-1 mb-1 border-opacity-20" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
          {payload[0].payload.subject}
        </p>
        <div className="flex flex-col gap-1">
          <span className="font-semibold" style={{ color: colors.A }}>
            Current Phase: <strong className="font-extrabold" style={{ color: 'var(--text-primary)' }}>{payload[0].value} pts</strong>
          </span>
          <span className="font-semibold" style={{ color: colors.B }}>
            Prior Phase: <strong className="font-extrabold" style={{ color: 'var(--text-primary)' }}>{payload[1].value} pts</strong>
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function PerformanceRadar({ data }) {
  const radarColors = {
    A: 'var(--accent-primary)',
    B: 'var(--accent-secondary)',
    grid: 'var(--chart-grid)',
    text: 'var(--text-secondary)'
  };

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col h-[360px] w-full card-inner-static relative overflow-hidden">
      {/* Background neon accent */}
      <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div>
        <h2 className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Departmental Indices
        </h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          Operations, Product, and support bandwidth alignment.
        </p>
      </div>

      <div className="flex-1 w-full mt-2 z-10 text-[10px] sm:text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke={radarColors.grid} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: radarColors.text, fontSize: 10, fontWeight: 'bold' }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 150]} 
              tick={{ fill: radarColors.text, fontSize: 8 }}
              axisLine={false}
              tickLine={false}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Radar
              name="Prior Phase"
              dataKey="B"
              stroke={radarColors.B}
              fill={radarColors.B}
              fillOpacity={0.15}
              isAnimationActive={true}
            />
            <Radar
              name="Current Phase"
              dataKey="A"
              stroke={radarColors.A}
              fill={radarColors.A}
              fillOpacity={0.25}
              isAnimationActive={true}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend footer */}
      <div className="flex justify-center items-center gap-6 mt-2 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: radarColors.A }} />
          <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
            Current Phase
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: radarColors.B }} />
          <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
            Prior Phase
          </span>
        </div>
      </div>
    </div>
  );
}
