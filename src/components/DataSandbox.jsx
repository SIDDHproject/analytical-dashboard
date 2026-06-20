import { Sliders, RefreshCw, Users, Percent, DollarSign, Cpu } from 'lucide-react';

export default function DataSandbox({ sandboxValues, setSandboxValues, onReset }) {
  const handleChange = (key, value) => {
    setSandboxValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px] w-full card-inner-static relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex justify-between items-center z-10 mb-4">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Sliders size={20} className="stroke-[2.5] text-cyan-400" style={{ color: 'var(--accent-secondary)' }} />
            Telemetry Sandbox
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Tweak metrics to recalculate charts & KPIs.
          </p>
        </div>

        <button
          onClick={onReset}
          className="p-2 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-500/20 bg-white/5 hover:bg-white/10 hover:rotate-180"
          title="Reset Telemetry"
          style={{ color: 'var(--accent-primary)' }}
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Sliders Area */}
      <div className="flex flex-col gap-4 flex-1 justify-center z-10">
        
        {/* Slider 1: Traffic / Active Users */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>
              <Users size={14} className="opacity-80" />
              Active Visitors
            </span>
            <span className="font-extrabold" style={{ color: 'var(--text-primary)' }}>
              {sandboxValues.traffic.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="6000"
            max="25000"
            step="100"
            value={sandboxValues.traffic}
            onChange={(e) => handleChange('traffic', parseInt(e.target.value))}
            className="w-full accent-pink-500 cursor-pointer h-1.5 rounded-lg bg-gray-700/20 border border-gray-700/10 focus:outline-none"
            style={{ accentColor: 'var(--accent-primary)' }}
          />
        </div>

        {/* Slider 2: Conversion Rate */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>
              <Percent size={14} className="opacity-80" />
              Conversion Rate
            </span>
            <span className="font-extrabold" style={{ color: 'var(--text-primary)' }}>
              {sandboxValues.conversionRate}%
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="6.0"
            step="0.1"
            value={sandboxValues.conversionRate}
            onChange={(e) => handleChange('conversionRate', parseFloat(e.target.value))}
            className="w-full accent-pink-500 cursor-pointer h-1.5 rounded-lg bg-gray-700/20 border border-gray-700/10 focus:outline-none"
            style={{ accentColor: 'var(--accent-primary)' }}
          />
        </div>

        {/* Slider 3: Ad Spend / Daily Marketing Budget */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>
              <DollarSign size={14} className="opacity-80" />
              Daily Marketing Budget
            </span>
            <span className="font-extrabold" style={{ color: 'var(--text-primary)' }}>
              ${sandboxValues.budget.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="200"
            max="2500"
            step="50"
            value={sandboxValues.budget}
            onChange={(e) => handleChange('budget', parseInt(e.target.value))}
            className="w-full accent-pink-500 cursor-pointer h-1.5 rounded-lg bg-gray-700/20 border border-gray-700/10 focus:outline-none"
            style={{ accentColor: 'var(--accent-primary)' }}
          />
        </div>

        {/* Slider 4: Server Latency */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>
              <Cpu size={14} className="opacity-80" />
              Infrastructure Latency
            </span>
            <span className="font-extrabold" style={{ color: 'var(--text-primary)' }}>
              {sandboxValues.serverLoad}ms
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="120"
            step="1"
            value={sandboxValues.serverLoad}
            onChange={(e) => handleChange('serverLoad', parseInt(e.target.value))}
            className="w-full accent-pink-500 cursor-pointer h-1.5 rounded-lg bg-gray-700/20 border border-gray-700/10 focus:outline-none"
            style={{ accentColor: 'var(--accent-primary)' }}
          />
        </div>

      </div>
    </div>
  );
}
