import { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

// Typewriter animation component using React key binding for reset states
const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let idx = 0;
    
    if (!text) return;
    
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(idx));
      idx++;
      if (idx >= text.length) {
        clearInterval(interval);
      }
    }, 12);
    
    return () => clearInterval(interval);
  }, [text]);

  return <span className="cursor-blink">{displayedText}</span>;
};

export default function AIAnalyst({ insights }) {
  const getInsightIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />;
      case 'error':
        return <AlertCircle size={16} className="text-rose-400 flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-400 flex-shrink-0" />;
      default:
        return <Info size={16} className="text-cyan-400 flex-shrink-0" />;
    }
  };

  const getInsightBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/20 bg-emerald-500/5';
      case 'error':
        return 'border-rose-500/20 bg-rose-500/5';
      case 'warning':
        return 'border-amber-500/20 bg-amber-500/5';
      default:
        return 'border-cyan-500/20 bg-cyan-500/5';
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col h-[400px] w-full card-inner-static relative overflow-hidden">
      {/* Background neon sparkles glow */}
      <div className="absolute top-0 left-0 w-36 h-36 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex justify-between items-center mb-4 z-10">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Sparkles size={20} className="stroke-[2] text-pink-500 animate-pulse-slow" style={{ color: 'var(--accent-primary)' }} />
            AI Analytics Insights
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Dynamic diagnostics parsed by Vortex AI.
          </p>
        </div>

        <span className="text-[10px] uppercase font-extrabold tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-emerald-400">
          System Synced
        </span>
      </div>

      {/* Insights lists */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 z-10 custom-scrollbar">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border flex gap-3 transition-all duration-300 ${getInsightBorderColor(insight.type)}`}
          >
            {getInsightIcon(insight.type)}
            <div className="flex flex-col gap-1.5 leading-relaxed">
              <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                {insight.title}
              </span>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {/* The key prop ensures the typewriter resets when the text changes */}
                <TypewriterText key={insight.description} text={insight.description} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
