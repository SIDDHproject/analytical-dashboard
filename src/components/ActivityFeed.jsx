import { useState, useEffect } from 'react';
import { Play, Pause, Terminal, Trash2 } from 'lucide-react';
import { logEventPool } from '../data/mockData';

export default function ActivityFeed() {
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Directly initialize state with logs to avoid warning about setState inside effects
  const [events, setEvents] = useState(() => {
    const initialEvents = [];
    const baseTime = new Date();
    
    for (let i = 0; i < 6; i++) {
      const randomEvent = logEventPool[Math.floor(Math.random() * logEventPool.length)];
      const eventTime = new Date(baseTime);
      eventTime.setSeconds(baseTime.getSeconds() - i * 15);
      
      initialEvents.push({
        id: `LOG-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        timestamp: eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        ...randomEvent
      });
    }
    return initialEvents;
  });

  // Simulates streaming events on a periodic interval
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const randomEvent = logEventPool[Math.floor(Math.random() * logEventPool.length)];
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      setEvents(prev => [
        {
          id: `LOG-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          timestamp,
          ...randomEvent
        },
        ...prev.slice(0, 19) // Cap the max logs in the DOM at 20
      ]);
    }, 3200); // Trigger a log event every 3.2s

    return () => clearInterval(interval);
  }, [isPlaying]);

  const getLogTypeColors = (type) => {
    switch (type) {
      case 'success':
        return { dot: 'bg-emerald-400 shadow-[0_0_8px_#34d399]', label: 'text-emerald-400' };
      case 'error':
        return { dot: 'bg-rose-400 shadow-[0_0_8px_#f87171]', label: 'text-rose-400' };
      case 'warning':
        return { dot: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]', label: 'text-amber-400' };
      default:
        return { dot: 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]', label: 'text-cyan-400' };
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col h-[400px] w-full card-inner-static relative overflow-hidden">
      {/* Background terminal glow */}
      <div className="absolute bottom-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header section with play/pause and clear */}
      <div className="flex justify-between items-center mb-4 z-10">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Terminal size={20} className="stroke-[2.5] text-cyan-400" style={{ color: 'var(--accent-secondary)' }} />
            Telemetry Stream
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Incoming cluster payloads and API transaction logs.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-xl transition-all border border-transparent hover:border-gray-500/20 ${
              isPlaying 
                ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' 
                : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
            }`}
            title={isPlaying ? "Pause Stream" : "Resume Stream"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          
          {/* Clear Logs */}
          <button
            onClick={() => setEvents([])}
            className="p-2 rounded-xl transition-all border border-transparent hover:border-gray-500/20 bg-white/5 hover:bg-white/10"
            title="Clear Logs"
            style={{ color: 'var(--accent-primary)' }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Stream Area */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 z-10 font-mono text-[10px] md:text-xs custom-scrollbar">
        {events.length > 0 ? (
          events.map(event => {
            const styles = getLogTypeColors(event.type);
            return (
              <div 
                key={event.id}
                className="flex items-start gap-3 py-2 px-3 rounded-lg bg-black/10 border border-white/5 hover:bg-black/20 hover:border-white/10 transition-all duration-300"
              >
                {/* Timestamp */}
                <span className="opacity-45 select-none" style={{ color: 'var(--text-secondary)' }}>
                  [{event.timestamp}]
                </span>

                {/* Status Dot */}
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${styles.dot}`} />

                {/* Log Message */}
                <p className="flex-1 leading-relaxed break-all" style={{ color: 'var(--text-primary)' }}>
                  <span className={`font-black mr-1.5 uppercase ${styles.label}`}>
                    {event.type}
                  </span>
                  {event.message}
                </p>
                
                {/* Log ID */}
                <span className="opacity-20 select-none text-[8px] font-bold" style={{ color: 'var(--text-secondary)' }}>
                  {event.id}
                </span>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <Terminal size={32} className="stroke-[1.5] mb-2 animate-pulse" style={{ color: 'var(--accent-primary)' }} />
            <span className="font-bold">Console Clear. Reseting logs telemetry.</span>
          </div>
        )}
      </div>
    </div>
  );
}
