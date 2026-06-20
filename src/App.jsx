import { useState, useMemo, useRef, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { 
  recentTransactions, 
  getAIInsights 
} from './data/mockData';

// Component imports
import AuthGateway from './components/AuthGateway';
import ProfileTab from './components/ProfileTab';
import GaugeChart from './components/GaugeChart';
import TreemapChart from './components/TreemapChart';
import FunnelChart from './components/FunnelChart';
import DecisionLogs from './components/DecisionLogs';
import DataSandbox from './components/DataSandbox';
import ActivityFeed from './components/ActivityFeed';
import TransactionTable from './components/TransactionTable';

// Horizon Scrolled Section imports
import HorizonKPIs from './components/HorizonKPIs';
import HorizonCharts from './components/HorizonCharts';
import HorizonHistory from './components/HorizonHistory';
import HorizonOperations from './components/HorizonOperations';
import HorizonNFTs from './components/HorizonNFTs';

// Recharts imports for inline mini-charts in Column 1 and Column 2
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Icon imports
import { 
  LayoutDashboard, Sliders, FileText, User, LogOut, 
  Bell, Search, ShieldCheck, Heart 
} from 'lucide-react';



function ScrollReveal({ children, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // Hide element when it leaves the viewport to allow re-triggering
        }
      });
    }, { threshold: 0.05 });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'
      }`}
    >
      {children}
    </div>
  );
}

function DashboardContent({ user, onLogout, onUpdateProfile }) {
  const { theme, setTheme } = useTheme();
  const [currentTab, setCurrentTab] = useState('overview');
  const searchInputRef = useRef(null);

  const handleSearchFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(true);
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, message: 'Critical latency spike detected on VPC Node 4', time: '2 mins ago', icon: '⚠️' },
    { id: 2, message: 'Daily database backup completed successfully', time: '1 hr ago', icon: '✅' },
    { id: 3, message: 'New API tunnel authorization key generated', time: '3 hrs ago', icon: '🔑' },
    { id: 4, message: 'Traffic load exceeded 14.5K limit (Auto-scaled)', time: '5 hrs ago', icon: '📈' }
  ]);

  // Primary telemetry values in the sandbox
  const defaultSandbox = {
    traffic: 14892,
    conversionRate: 2.84,
    budget: 1200,
    serverLoad: 42
  };

  const [sandboxValues, setSandboxValues] = useState(defaultSandbox);

  const handleReset = () => {
    setSandboxValues(defaultSandbox);
  };

  // Calculate dynamic AI insights for telemetry tabs
  const aiInsights = useMemo(() => {
    return getAIInsights(
      sandboxValues.traffic,
      sandboxValues.conversionRate,
      sandboxValues.budget,
      sandboxValues.serverLoad
    );
  }, [sandboxValues]);

  // Derived gauge metric (linked to server load)
  const serverLoadValue = sandboxValues.serverLoad;

  // Mock data for Left Column 1: Vertical Bar Chart
  const col1BarData = [
    { label: 'L1', value: 40 },
    { label: 'L2', value: 65 },
    { label: 'L3', value: 50 },
    { label: 'L4', value: 85 },
    { label: 'L5', value: 60 }
  ];

  // Mock data for Left Column 1: Knowledge Utilization Area
  const col1AreaData = [
    { label: 'A', value: 20 },
    { label: 'B', value: 55 },
    { label: 'C', value: 35 },
    { label: 'D', value: 80 },
    { label: 'E', value: 50 },
    { label: 'F', value: 90 }
  ];

  // Mock data for Middle Column 2: Impact Analysis Stacked Bar
  const stackedBarData = useMemo(() => {
    const scale = sandboxValues.traffic / 14892;
    return [
      { name: 'Aug', Date: Math.round(20 * scale), Value: Math.round(35 * scale), LegendItems: Math.round(25 * scale), Legend: Math.round(20 * scale) },
      { name: 'Sep', Date: Math.round(30 * scale), Value: Math.round(45 * scale), LegendItems: Math.round(15 * scale), Legend: Math.round(25 * scale) },
      { name: 'Oct', Date: Math.round(25 * scale), Value: Math.round(30 * scale), LegendItems: Math.round(40 * scale), Legend: Math.round(30 * scale) },
      { name: 'Nov', Date: Math.round(40 * scale), Value: Math.round(55 * scale), LegendItems: Math.round(20 * scale), Legend: Math.round(15 * scale) },
      { name: 'Dec', Date: Math.round(35 * scale), Value: Math.round(40 * scale), LegendItems: Math.round(30 * scale), Legend: Math.round(25 * scale) }
    ];
  }, [sandboxValues.traffic]);

  const activeColorGlow = () => {
    if (theme === 'forest') return 'text-emerald-400 border-emerald-400 bg-emerald-500/10';
    if (theme === 'solar') return 'text-orange-400 border-orange-400 bg-orange-500/10';
    return 'text-pink-500 border-pink-500 bg-pink-500/10';
  };

  return (
    <div className="min-h-screen flex bg-slate-950 font-sans transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)' }}>
      
      {/* 1. NARROW LEFT SIDEBAR NAVIGATION (Wireframe Match) */}
      <aside 
        className="w-20 flex flex-col justify-between items-center py-6 border-r border-opacity-10 fixed left-0 top-0 bottom-0 z-40 bg-slate-900/60 backdrop-blur-xl"
        style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
      >
        {/* Top/Middle Section Icons */}
        <div className="flex flex-col items-center gap-6 w-full">
          
          {/* Logo block */}
          <div className="p-3 rounded-xl border border-dashed border-opacity-25 border-blue-500/30 flex items-center justify-center mb-6 cursor-pointer hover:border-blue-500/60 transition-colors" title="Vortex Analytics Dashboard">
            <span className="text-xl select-none">🌀</span>
          </div>

          {/* Navigation group */}
          <div className="flex flex-col gap-4 w-full px-2">
            
            {/* Overview Icon */}
            <button
              onClick={() => setCurrentTab('overview')}
              className={`p-3 rounded-xl border-l-2 flex justify-center items-center transition-all ${
                currentTab === 'overview' 
                  ? activeColorGlow() 
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
              title="Overview Console"
            >
              <LayoutDashboard size={18} />
            </button>

            {/* Telemetry Icon */}
            <button
              onClick={() => setCurrentTab('telemetry')}
              className={`p-3 rounded-xl border-l-2 flex justify-center items-center transition-all ${
                currentTab === 'telemetry' 
                  ? activeColorGlow() 
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
              title="Telemetry Controls"
            >
              <Sliders size={18} />
            </button>

            {/* Ledger Icon */}
            <button
              onClick={() => setCurrentTab('ledger')}
              className={`p-3 rounded-xl border-l-2 flex justify-center items-center transition-all ${
                currentTab === 'ledger' 
                  ? activeColorGlow() 
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
              title="Audit Ledger"
            >
              <FileText size={18} />
            </button>

            {/* User Profile Tab */}
            <button
              onClick={() => setCurrentTab('profile')}
              className={`p-3 rounded-xl border-l-2 flex justify-center items-center transition-all ${
                currentTab === 'profile' 
                  ? activeColorGlow() 
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
              title="User Profile"
            >
              <User size={18} />
            </button>


          </div>
        </div>

        {/* Bottom Section Icons */}
        <div className="flex flex-col items-center gap-4 w-full px-2">



          {/* Quick Search */}
          <button 
            onClick={handleSearchFocus}
            className="p-3 text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded-xl transition-all" 
            title="Cluster Search"
          >
            <Search size={18} />
          </button>

          {/* Quick theme cycle swapper */}
          <button 
            onClick={() => {
              const themes = ['cyberpunk', 'forest', 'solar'];
              const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
              setTheme(nextTheme);
            }} 
            className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 text-[9px] font-bold text-gray-400 bg-white/5" 
            title="Cycle Palette"
          >
            🎨
          </button>

          {/* Sign Out */}
          <button 
            onClick={onLogout}
            className="p-3 text-gray-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all"
            title="Terminate session"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE VIEWPORT */}
      <main className="flex-1 flex flex-col min-h-screen pl-20 overflow-x-hidden">
        
        {/* TOP HEADER BLOCK (Wireframe Match) */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4 border-b border-opacity-5" style={{ borderColor: 'var(--border-color)' }}>
          {/* Left Title blocks */}
          <div className="flex flex-col leading-none gap-2">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest opacity-90" style={{ color: 'var(--text-secondary)' }}>
              <span className="opacity-40">|</span>
              <span className="text-sm select-none">🌀</span>
              <span>Vortex Analytics Dashboard</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {currentTab === 'overview' && 'Overview Console'}
              {currentTab === 'telemetry' && 'Telemetry Controls'}
              {currentTab === 'ledger' && 'Audit Ledger'}
              {currentTab === 'profile' && 'User Profile'}
            </h1>
          </div>

          {/* Right Filters/Search bar */}
          <div className="flex items-center gap-4 bg-slate-900/60 border border-white/5 p-2 rounded-2xl shadow-xl w-full md:w-auto overflow-hidden"
               style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <div className="relative flex-1 md:flex-initial">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" style={{ color: 'var(--text-secondary)' }} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="actions/filters/search block"
                className="w-full md:w-48 bg-white/5 border border-transparent rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-white/10 focus:ring-1 focus:ring-pink-500/30 transition-all duration-300"
                style={{ color: 'var(--text-primary)' }}
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setUnreadNotifications(false);
                }}
                className="relative cursor-pointer p-1.5 rounded-xl hover:bg-white/5 transition-colors focus:outline-none flex items-center justify-center border-none" 
                style={{ color: 'var(--text-primary)', backgroundColor: 'transparent' }}
                title="Notifications"
              >
                <Bell size={16} />
                {unreadNotifications && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>

              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowNotifications(false)} 
                  />
                  <div 
                    className="absolute right-0 mt-2.5 w-80 glass-panel rounded-2xl p-4 shadow-2xl z-50 flex flex-col gap-3 slide-in-top text-left"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="text-[10px] uppercase font-black tracking-wider" style={{ color: 'var(--text-primary)' }}>
                        Notifications
                      </span>
                      <button 
                        onClick={() => setNotificationsList([])}
                        className="text-[9px] font-black uppercase text-pink-500 hover:underline border-none bg-transparent cursor-pointer"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto custom-scrollbar">
                      {notificationsList.length > 0 ? (
                        notificationsList.map((item) => (
                          <div 
                            key={item.id} 
                            className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] leading-relaxed flex items-start gap-2.5 hover:bg-white/10 transition-colors"
                          >
                            <span className="text-xs mt-0.5 select-none">{item.icon}</span>
                            <div className="flex flex-col">
                              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{item.message}</span>
                              <span className="text-[8px] text-gray-500 font-semibold mt-0.5">{item.time}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-6 text-center text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                          No new notifications
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Name & Profile Avatar Group */}
            <div 
              onClick={() => setCurrentTab('profile')}
              className="flex items-center gap-2 cursor-pointer hover:opacity-90 select-none shrink-0"
              title={`View ${user?.name || 'Profile'}`}
            >
              <span className="hidden sm:inline text-xs font-black text-white max-w-28 truncate">
                {user?.name || 'Administrator'}
              </span>
              
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden border border-white/10 hover:border-white/30 transition-all shrink-0"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  background: user?.profileImage?.startsWith('linear-gradient') ? user.profileImage : undefined
                }}
              >
                {user?.profileImage && !user.profileImage.startsWith('linear-gradient') ? (
                  <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[11px] font-black uppercase text-white" style={{ color: user?.profileImage?.startsWith('linear-gradient') ? '#ffffff' : 'var(--accent-primary)' }}>
                    {user?.name ? user.name.slice(0, 2) : 'AD'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* 3. ACTIVE TAB VIEWPORTS */}
        <section className="flex-grow p-6 sm:p-8 flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-20">
          
          {/* TAB 1: OVERVIEW TAB */}
          {currentTab === 'overview' && (
            <div className="flex flex-col gap-10 w-full animate-fade-in">
              
              {/* SECTION A: Wireframe exact 3-column replica (from wireframe image) */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 items-stretch w-full">
                
                {/* Column 1 (Left, col-span-3) */}
                <div className="xl:col-span-3 flex flex-col gap-6">
                  {/* Gauge Chart */}
                  <GaugeChart value={serverLoadValue} />

                  {/* KPI Column 1 Chart Title: Vertical Bar Chart */}
                  <div className="glass-panel rounded-2xl p-4 flex flex-col h-[180px] w-full card-inner-static relative overflow-hidden">
                    <div className="text-left w-full mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                        Key Performance Indicators (KPIs) / Chart Title
                      </span>
                    </div>
                    <div className="flex-1 w-full text-[8px] mt-1 select-none">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={col1BarData} margin={{ top: 5, right: 0, left: -35, bottom: 0 }}>
                          <XAxis dataKey="label" tick={{ fill: 'var(--text-secondary)', fontSize: 8 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 8 }} axisLine={false} tickLine={false} />
                          <Tooltip />
                          <Bar dataKey="value" fill="var(--accent-secondary)" radius={[2, 2, 0, 0]} barSize={10} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Area Chart: Knowledge Utilization */}
                  <div className="glass-panel rounded-2xl p-4 flex flex-col h-[180px] w-full card-inner-static relative overflow-hidden">
                    <div className="text-left w-full mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                        Knowledge Utilization
                      </span>
                    </div>
                    <div className="flex-1 w-full text-[8px] mt-1 select-none">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={col1AreaData} margin={{ top: 5, right: 0, left: -35, bottom: 0 }}>
                          <XAxis dataKey="label" tick={{ fill: 'var(--text-secondary)', fontSize: 8 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 8 }} axisLine={false} tickLine={false} />
                          <Tooltip />
                          <Area type="monotone" dataKey="value" stroke="var(--accent-primary)" fill="var(--accent-primary)" fillOpacity={0.1} strokeWidth={1.5} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Text Display: Average Time to Insight */}
                  <div className="glass-panel rounded-2xl p-4 flex flex-col justify-center items-start h-[120px] w-full card-inner-static relative overflow-hidden">
                    <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                      Average Time to Insight
                    </span>
                    <span className="text-3xl font-black mt-2 tracking-tight text-white">
                      14.2s
                    </span>
                    <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider mt-1">
                      KPI Label
                    </span>
                  </div>
                </div>

                {/* Column 2 (Middle, col-span-5) */}
                <div className="xl:col-span-5 flex flex-col gap-6">
                  {/* Treemap: Decision-Making Drivers */}
                  <TreemapChart />

                  {/* Stacked Bar Chart: Impact Analysis */}
                  <div className="glass-panel rounded-2xl p-6 flex flex-col h-[386px] w-full card-inner-static relative overflow-hidden">
                    <div className="flex justify-between items-center w-full mb-4">
                      <div>
                        <h2 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                          Impact Analysis
                        </h2>
                        <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Common type of decisions</span>
                      </div>
                      <div className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-black uppercase text-gray-400 tracking-wider">
                        Aug 2026 - Jun 2027
                      </div>
                    </div>

                    <div className="flex-1 w-full text-[9px] select-none">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stackedBarData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
                          <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 9 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 9 }} axisLine={false} tickLine={false} />
                          <Tooltip />
                          <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '8px', paddingTop: '10px' }} />
                          
                          <Bar dataKey="Date" name="Date" stackId="a" fill="var(--accent-primary)" />
                          <Bar dataKey="Value" name="Value" stackId="a" fill="var(--accent-secondary)" />
                          <Bar dataKey="LegendItems" name="Legend Items" stackId="a" fill="#10b981" />
                          <Bar dataKey="Legend" name="Legend" stackId="a" fill="#f59e0b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Column 3 (Right, col-span-4) */}
                <div className="xl:col-span-4 flex flex-col gap-6">
                  {/* Funnel Chart: Decision Pipeline */}
                  <FunnelChart />

                  {/* Logs & Alert Table Card */}
                  <DecisionLogs />
                </div>

              </div>

              {/* SEPARATOR: SCROLL DOWN Telemetry & Marketplace View (from screenshots) */}
              <ScrollReveal>
                <div className="flex items-center gap-4 py-4 w-full">
                  <span className="text-[10px] font-black uppercase tracking-wider text-pink-500 shrink-0" style={{ color: 'var(--accent-primary)' }}>
                    🌀 SCROLL DOWN // Marketplace & Operational Telemetry
                  </span>
                  <div className="h-[1px] flex-1 bg-white/5" style={{ backgroundColor: 'var(--border-color)', opacity: 0.3 }} />
                </div>
              </ScrollReveal>

              {/* SECTION B: SCROLL DOWN CONTENT ROWS */}
              <div className="flex flex-col gap-8 w-full">
                {/* Row 1: Six flat Horizon style KPIs */}
                <ScrollReveal>
                  <HorizonKPIs />
                </ScrollReveal>

                {/* Row 2: Spent Double-Line and Revenue Stacked Bar */}
                <ScrollReveal>
                  <HorizonCharts />
                </ScrollReveal>

                {/* Row 3: History list, calendar, and lesson cards */}
                <ScrollReveal>
                  <HorizonHistory />
                </ScrollReveal>

                {/* Row 4: Biometric control, checklist tasks, daily traffic */}
                <ScrollReveal>
                  <HorizonOperations />
                </ScrollReveal>

                {/* Row 5: Files storage pie chart and Trending NFTs cards */}
                <ScrollReveal>
                  <HorizonNFTs />
                </ScrollReveal>
              </div>

            </div>
          )}

          {/* TAB 2: TELEMETRY SANDBOX TAB */}
          {currentTab === 'telemetry' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch w-full animate-fade-in">
              <DataSandbox 
                sandboxValues={sandboxValues} 
                setSandboxValues={setSandboxValues} 
                onReset={handleReset} 
              />
              <div className="flex flex-col gap-6">
                <ActivityFeed />
                
                {/* Dynamic AI logs list */}
                <div className="glass-panel rounded-2xl p-6 flex flex-col gap-3 h-[280px] overflow-y-auto custom-scrollbar">
                  <h3 className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: 'var(--text-primary)' }}>
                    AI Diagnostics
                  </h3>
                  {aiInsights.map((insight, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 text-[10px] leading-relaxed flex flex-col gap-1">
                      <span className="font-extrabold text-pink-400" style={{ color: 'var(--accent-primary)' }}>{insight.title}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{insight.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TRANSACTION AUDIT LEDGER TAB */}
          {currentTab === 'ledger' && (
            <div className="w-full animate-fade-in">
              <TransactionTable data={recentTransactions} />
            </div>
          )}

          {/* TAB 4: USER PROFILE TAB */}
          {currentTab === 'profile' && (
            <ProfileTab key={user?.email} user={user} onUpdateProfile={onUpdateProfile} />
          )}

        </section>

        {/* BOTTOM GLOBAL FOOTER */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 px-8 border-t border-opacity-5 text-[10px] font-semibold uppercase mt-auto" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            Vortex Console SLA v3.04. SSL Uplink Verified.
          </span>
          <span className="flex items-center gap-1">
            Made with <Heart size={10} className="text-rose-500 animate-pulse" /> for Enterprise Business.
          </span>
        </footer>

      </main>

    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('vortex_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('vortex_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('vortex_user');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('vortex_user');
  };

  const handleUpdateProfile = (updatedUser, originalEmail) => {
    setUser(updatedUser);
    localStorage.setItem('vortex_user', JSON.stringify(updatedUser));

    const usersStr = localStorage.getItem('vortex_registered_users');
    if (usersStr) {
      try {
        let registeredUsers = JSON.parse(usersStr);
        const index = registeredUsers.findIndex(u => u.email.toLowerCase() === originalEmail.toLowerCase());
        if (index !== -1) {
          const password = registeredUsers[index].password;
          registeredUsers[index] = {
            ...registeredUsers[index],
            ...updatedUser,
            password
          };
          localStorage.setItem('vortex_registered_users', JSON.stringify(registeredUsers));
        }
      } catch (err) {
        console.error("Error updating profile database:", err);
      }
    }
  };

  return (
    <ThemeProvider>
      {user ? (
        <DashboardContent 
          user={user} 
          onLogout={handleLogout} 
          onUpdateProfile={handleUpdateProfile} 
        />
      ) : (
        <AuthGateway onLogin={handleLogin} />
      )}
    </ThemeProvider>
  );
}
