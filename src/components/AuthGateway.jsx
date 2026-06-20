import { useState } from 'react';
import { Mail, Lock, User, ShieldCheck, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AuthGateway({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (isSignUp && !name)) {
      setError('Please fill in all required telemetry credentials.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Load registered users from localStorage
      const usersStr = localStorage.getItem('vortex_registered_users');
      let registeredUsers;
      try {
        registeredUsers = usersStr ? JSON.parse(usersStr) : [];
      } catch {
        registeredUsers = [];
      }

      // Add default admin user if not exists
      const defaultAdminEmail = 'admin@vortex.com';
      if (!registeredUsers.some(u => u.email === defaultAdminEmail)) {
        registeredUsers.push({
          name: 'Administrator',
          email: defaultAdminEmail,
          password: 'admin123'
        });
        localStorage.setItem('vortex_registered_users', JSON.stringify(registeredUsers));
      }

      if (isSignUp) {
        // Sign Up Flow
        const normalizedEmail = email.trim().toLowerCase();
        const userExists = registeredUsers.some(u => u.email.toLowerCase() === normalizedEmail);

        if (userExists) {
          setError('An account with this email already exists.');
          setIsLoading(false);
          return;
        }

        const newUser = {
          name: name.trim(),
          email: normalizedEmail,
          password: password
        };

        registeredUsers.push(newUser);
        localStorage.setItem('vortex_registered_users', JSON.stringify(registeredUsers));
        setIsLoading(false);

        // Auto log in after sign up
        onLogin({
          name: newUser.name,
          email: newUser.email,
          contactNumber: '',
          dob: '',
          profileImage: ''
        });
      } else {
        // Log In Flow
        const normalizedEmail = email.trim().toLowerCase();
        const matchedUser = registeredUsers.find(
          u => u.email.toLowerCase() === normalizedEmail && u.password === password
        );

        if (!matchedUser) {
          setError('Incorrect email or password. Please try again.');
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
        onLogin({
          name: matchedUser.name,
          email: matchedUser.email,
          contactNumber: matchedUser.contactNumber || '',
          dob: matchedUser.dob || '',
          profileImage: matchedUser.profileImage || ''
        });
      }
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const usersStr = localStorage.getItem('vortex_registered_users');
      let registeredUsers;
      try {
        registeredUsers = usersStr ? JSON.parse(usersStr) : [];
      } catch {
        registeredUsers = [];
      }

      const googleUserEmail = 'dev@google.com';
      let googleUser = registeredUsers.find(u => u.email.toLowerCase() === googleUserEmail);

      if (!googleUser) {
        googleUser = {
          name: 'Google Developer',
          email: googleUserEmail,
          password: 'google_oauth_bypass',
          contactNumber: '+1 (555) 800-4664',
          dob: '1998-09-04',
          profileImage: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
        };
        registeredUsers.push(googleUser);
        localStorage.setItem('vortex_registered_users', JSON.stringify(registeredUsers));
      }

      setIsLoading(false);
      onLogin({
        name: googleUser.name,
        email: googleUser.email,
        contactNumber: googleUser.contactNumber,
        dob: googleUser.dob,
        profileImage: googleUser.profileImage
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-stretch justify-center bg-black overflow-hidden font-sans select-none">
      
      {/* LEFT SIDE: Horizon UI Premium Graphics Banner (Hidden on Mobile) */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center items-center justify-center p-12 overflow-hidden border-r border-white/5"
        style={{
          background: 'radial-gradient(circle at top right, var(--bg-tertiary) 0%, var(--bg-primary) 100%)'
        }}
      >
        {/* Futuristic glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-float" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

        <div className="relative z-10 max-w-lg flex flex-col justify-between h-full text-left">
          {/* Top Branding */}
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none">🌀</span>
            <span className="text-xl font-black tracking-wider text-slate-100 uppercase">
              VORTEX <span className="font-light opacity-50">// ANALYTICS</span>
            </span>
          </div>

          {/* Middle Pitch */}
          <div className="my-auto flex flex-col gap-6">
            <h1 className="text-4xl font-extrabold leading-tight text-white tracking-tight">
              Enterprise Telemetry &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400" style={{ backgroundImage: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}>
                Operational Command
              </span>
            </h1>
            <p className="text-sm leading-relaxed text-gray-400 font-medium">
              Monitor, tweak, and audit database transaction clusters, marketing pipelines, and regional edge node metrics on a unified, high-performance console.
            </p>
            
            {/* Quick stats indicators */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="glass-panel p-4 rounded-xl border-white/5 bg-white/5">
                <span className="text-2xl font-black text-white">99.999%</span>
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mt-1">Uptime SLA</p>
              </div>
              <div className="glass-panel p-4 rounded-xl border-white/5 bg-white/5">
                <span className="text-2xl font-black text-white">&lt; 40ms</span>
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mt-1">Global Latency</p>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            256-bit encrypted telemetry tunnel active.
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Authentication Form */}
      <div 
        className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 transition-colors duration-500"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="w-full max-w-md flex flex-col gap-8">
          
          {/* Header branding (Mobile view visible) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 lg:hidden mb-2">
              <span className="text-xl select-none">🌀</span>
              <span className="text-lg font-black tracking-wider text-white">VORTEX ANALYTICS</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {isSignUp ? 'Create Telemetry Profile' : 'Sign In Portal'}
            </h2>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {isSignUp 
                ? 'Enter configuration credentials to register a console session.' 
                : 'Enter auth details to bridge to the Vortex operations cluster.'}
            </p>
          </div>

          {/* Tabs switch */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5" style={{ borderColor: 'var(--border-color)' }}>
            <button
              onClick={() => { setIsSignUp(false); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                !isSignUp 
                  ? 'bg-pink-500 text-white shadow-md' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={{ backgroundColor: !isSignUp ? 'var(--accent-primary)' : '' }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                isSignUp 
                  ? 'bg-pink-500 text-white shadow-md' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={{ backgroundColor: isSignUp ? 'var(--accent-primary)' : '' }}
            >
              Sign Up
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Google Sign In/Up Button */}
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-slate-50 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer border border-slate-200"
            >
              {/* Google G SVG logo */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.7 0 3.2.6 4.4 1.8l3.3-3.3C17.7 1.5 15 1 12 1 7.3 1 3.4 3.7 1.6 7.7l3.9 3c.9-2.7 3.4-4.66 6.5-4.66z" />
                <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.45h6.48c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-2 3.7-4.94 3.7-8.55z" />
                <path fill="#FBBC05" d="M5.5 14.3c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.6 6.7C.6 8.7 0 10.3 0 12s.6 3.3 1.6 5.3l3.9-3z" />
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 8-2.9l-3.7-2.88c-1.1.74-2.5 1.18-4.3 1.18-3.1 0-5.6-1.96-6.5-4.66l-3.9 3C3.4 20.3 7.3 23 12 23z" />
              </svg>
              <span>{isSignUp ? 'Sign up with Google' : 'Sign in with Google'}</span>
            </button>

            {/* Separator Divider */}
            <div className="flex items-center w-full gap-3 py-1">
              <div className="h-[1px] flex-1 bg-white/10" style={{ backgroundColor: 'var(--border-color)', opacity: 0.3 }} />
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">or</span>
              <div className="h-[1px] flex-1 bg-white/10" style={{ backgroundColor: 'var(--border-color)', opacity: 0.3 }} />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Field 1: Name (Sign Up only) */}
            {isSignUp && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Console User Name
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-60" style={{ color: 'var(--text-secondary)' }} />
                  <input
                    type="text"
                    required
                    placeholder="Marcus Aurelius"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-pink-500/50 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none transition-all"
                    style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                  />
                </div>
              </div>
            )}

            {/* Field 2: Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Corporate Email Link
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-60" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-pink-500/50 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none transition-all"
                  style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                />
              </div>
            </div>

            {/* Field 3: Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Console Access Key
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => alert("A password reset verification code has been dispatched to your corporate email link.")}
                    className="text-[10px] font-bold text-pink-500 hover:underline bg-transparent border-none p-0 cursor-pointer"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-60" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-pink-500/50 rounded-xl pl-9 pr-10 py-2.5 text-xs focus:outline-none transition-all"
                  style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Remember session checkbox */}
            {!isSignUp && (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded bg-white/5 border-white/10 text-pink-500 focus:ring-0 focus:ring-offset-0 cursor-pointer w-3.5 h-3.5"
                  style={{ accentColor: 'var(--accent-primary)' }}
                />
                <label htmlFor="remember" className="text-[10px] font-semibold cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                  Persist telemetry session token (30 days)
                </label>
              </div>
            )}

            {/* Submission Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-pink-500/10"
              style={{ 
                backgroundColor: 'var(--accent-primary)',
                boxShadow: `0 8px 24px -6px rgba(var(--glow-color), 0.3)`
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Bridging Cluster...
                </>
              ) : (
                isSignUp ? 'Provision Telemetry Console' : 'Establish VPC Tunnel'
              )}
            </button>

            {/* Footer Navigation Link */}
            <div className="text-center mt-4">
              <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setIsSignUp(false); setError(''); }}
                      className="font-bold text-pink-500 hover:underline bg-transparent border-none p-0 cursor-pointer"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      Let's Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setIsSignUp(true); setError(''); }}
                      className="font-bold text-pink-500 hover:underline bg-transparent border-none p-0 cursor-pointer"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      Let's Sign up
                    </button>
                  </>
                )}
              </span>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
}
