import { useState } from 'react';
import { Fingerprint, CheckSquare, Square, MoreHorizontal, BarChart2 } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';

export default function HorizonOperations() {
  // Checklist Interactive State
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Landing Page Design', completed: true },
    { id: 2, label: 'Dashboard Builder', completed: false },
    { id: 3, label: 'Mobile App Design', completed: true },
    { id: 4, label: 'Illustrations', completed: true },
    { id: 5, label: 'Promotional LP', completed: false }
  ]);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Mock data for Column 3: Daily Traffic Chart
  const trafficData = [
    { label: 'T1', value: 20 },
    { label: 'T2', value: 45 },
    { label: 'T3', value: 30 },
    { label: 'T4', value: 75 },
    { label: 'T5', value: 50 },
    { label: 'T6', value: 90 },
    { label: 'T7', value: 40 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
      
      {/* CARD 1: Biometric Security Card */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px] w-full card-inner-static relative overflow-hidden text-left">
        {/* Fingerprint logo */}
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center border border-white/5 bg-white/5 mt-4 self-start text-indigo-400"
          style={{ color: 'var(--accent-primary)' }}
        >
          <Fingerprint size={32} className="stroke-[1.5]" />
        </div>

        <div className="flex flex-col gap-2 my-4">
          <h4 className="text-lg font-black leading-tight text-white tracking-tight">
            Control card security in-app with a tap
          </h4>
          <p className="text-xs text-gray-500 font-medium">
            Discover our cards benefits, with one tap.
          </p>
        </div>

        <button 
          onClick={() => alert('Loading card manager...')}
          className="w-full py-2.5 rounded-xl text-xs font-black text-white hover:opacity-90 transition-all shadow-md mt-auto"
          style={{ 
            backgroundColor: 'var(--accent-primary)',
            boxShadow: `0 4px 14px -4px rgba(var(--glow-color), 0.3)`
          }}
        >
          Cards
        </button>
      </div>

      {/* CARD 2: Interactive Tasks Checklist */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px] w-full card-inner-static relative overflow-hidden">
        <div className="flex justify-between items-center w-full mb-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
            Tasks
          </h3>
          <button className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-gray-300 transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* Tasks rows */}
        <div className="flex-1 flex flex-col gap-3.5">
          {tasks.map(task => (
            <div 
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="flex items-center gap-3 cursor-pointer select-none group text-left"
            >
              {/* Checkbox Icon */}
              <div className="text-pink-500 flex-shrink-0" style={{ color: task.completed ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>
                {task.completed ? (
                  <CheckSquare size={16} className="fill-pink-500/10" style={{ fill: 'rgba(var(--glow-color), 0.1)' }} />
                ) : (
                  <Square size={16} className="opacity-50 group-hover:opacity-85" />
                )}
              </div>
              
              <span className={`text-xs font-bold transition-all ${
                task.completed 
                  ? 'line-through opacity-40 text-gray-500' 
                  : 'text-slate-200 group-hover:text-white'
              }`}>
                {task.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 3: Daily Traffic Chart */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col h-[360px] w-full card-inner-static relative overflow-hidden">
        {/* Header telemetry details */}
        <div className="flex justify-between items-start w-full mb-6">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Daily Traffic
            </span>
            <div className="flex items-baseline gap-1.5 mt-1.5">
              <span className="text-2xl font-black text-white">2.579</span>
              <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Visitors</span>
              <span className="text-[9px] font-black text-emerald-400">
                ▲ +2.45%
              </span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-indigo-400">
            <BarChart2 size={16} />
          </div>
        </div>

        {/* Vertical Column Chart container */}
        <div className="flex-1 w-full text-[9px] select-none mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trafficData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Tooltip />
              <Bar 
                dataKey="value" 
                fill="var(--accent-primary)" 
                radius={[4, 4, 0, 0]} 
                barSize={12} 
                opacity={0.8}
                style={{ fill: 'var(--accent-primary)' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
