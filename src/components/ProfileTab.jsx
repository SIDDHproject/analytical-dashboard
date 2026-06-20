import { useState } from 'react';
import { Key, Settings, Copy, Check, Bell, Shield, Database, Cpu, User, Mail, Phone, Calendar, Upload } from 'lucide-react';

export default function ProfileTab({ user, onUpdateProfile }) {
  const [copied, setCopied] = useState(false);
  const [apiKey] = useState('vt_live_9482_f08d2ae39fca7bc358b');
  const [alertSettings, setAlertSettings] = useState({
    latencySpikes: true,
    failedTxns: true,
    dbBackups: false,
    smsAlerts: false
  });

  // Edit Profile States
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editContact, setEditContact] = useState(user?.contactNumber || '');
  const [editDob, setEditDob] = useState(user?.dob || '');
  const [editImg, setEditImg] = useState(user?.profileImage || '');
  const [customImgUrl, setCustomImgUrl] = useState(
    user?.profileImage && !user.profileImage.startsWith('linear-gradient') && !user.profileImage.startsWith('data:') ? user.profileImage : ''
  );
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');

  const presetGradients = [
    'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
  ];

  // State initialization handled via React component key-driven remounts

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAlert = (key) => {
    setAlertSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2000000) { // 2MB limit
        setUpdateError("Image file must be under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setEditImg(reader.result); // Base64 representation
        setCustomImgUrl(''); // Clear custom URL
      };
      reader.onerror = () => {
        setUpdateError("Failed to read image file.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setUpdateSuccess(false);
    setUpdateError('');

    if (!editName.trim() || !editEmail.trim()) {
      setUpdateError('Username and Email are required.');
      return;
    }

    // Email unique check
    const usersStr = localStorage.getItem('vortex_registered_users');
    if (usersStr) {
      try {
        const registeredUsers = JSON.parse(usersStr);
        const normalizedNewEmail = editEmail.trim().toLowerCase();
        const normalizedCurrentEmail = user?.email?.toLowerCase();
        if (normalizedNewEmail !== normalizedCurrentEmail) {
          const emailExists = registeredUsers.some(u => u.email.toLowerCase() === normalizedNewEmail);
          if (emailExists) {
            setUpdateError('An account with this email already exists.');
            return;
          }
        }
      } catch (err) {
        console.error(err);
      }
    }

    const updatedUser = {
      ...user,
      name: editName.trim(),
      email: editEmail.trim().toLowerCase(),
      contactNumber: editContact.trim(),
      dob: editDob,
      profileImage: editImg
    };

    if (onUpdateProfile) {
      onUpdateProfile(updatedUser, user.email);
    }

    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      
      {/* Overview Top Header Title */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Operational Administrator Profile
        </h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          Manage your console configurations, API tunnel authorization keys, and alert options.
        </p>
      </div>

      {/* Profile Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Column 1: Profile Summary Card */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="glass-panel rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden card-inner-static">
            
            {/* Avatar container */}
            <div 
              className="w-24 h-24 rounded-full mt-8 flex items-center justify-center border-4 shadow-xl z-10 overflow-hidden"
              style={{ 
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--bg-secondary)',
                background: editImg?.startsWith('linear-gradient') ? editImg : undefined
              }}
            >
              {editImg && !editImg.startsWith('linear-gradient') ? (
                <img src={editImg} alt={editName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-black uppercase text-white" style={{ color: editImg?.startsWith('linear-gradient') ? '#ffffff' : 'var(--accent-primary)' }}>
                  {editName ? editName.slice(0, 2) : 'AD'}
                </span>
              )}
            </div>

            {/* Profile Info */}
            <div className="mt-4 z-10 flex flex-col leading-tight w-full px-2">
              <h3 className="text-lg font-black truncate max-w-full" style={{ color: 'var(--text-primary)' }}>
                {editName || 'Administrator'}
              </h3>
              <span className="text-xs font-semibold mt-1 truncate max-w-full" style={{ color: 'var(--text-secondary)' }}>
                {editEmail || 'admin@vortex-sys.net'}
              </span>
              
              {/* Optional attributes */}
              {editContact && (
                <span className="text-[10px] font-semibold mt-2.5 flex items-center justify-center gap-1.5 opacity-80" style={{ color: 'var(--text-secondary)' }}>
                  <Phone size={10} className="text-cyan-400" />
                  {editContact}
                </span>
              )}
              {editDob && (
                <span className="text-[10px] font-semibold mt-1 flex items-center justify-center gap-1.5 opacity-80" style={{ color: 'var(--text-secondary)' }}>
                  <Calendar size={10} className="text-pink-400" />
                  {new Date(editDob).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              )}

              <span className="text-[10px] mt-3.5 bg-pink-500/10 text-pink-400 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider self-center border border-pink-500/20"
                    style={{ color: 'var(--accent-primary)', borderColor: 'var(--border-color)' }}>
                Lead Telemetry Officer
              </span>
            </div>

            {/* Profile Statistics */}
            <div className="grid grid-cols-3 gap-2 w-full mt-6 border-t border-opacity-10 pt-6" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex flex-col">
                <span className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>12.4K</span>
                <span className="text-[9px] uppercase font-bold text-gray-500 mt-0.5">Audits</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>32</span>
                <span className="text-[9px] uppercase font-bold text-gray-500 mt-0.5">VPC Nodes</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>99.8%</span>
                <span className="text-[9px] uppercase font-bold text-gray-500 mt-0.5">SLA SLA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Edit Form, API Keys, and Alerts Settings */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Section: Edit Profile Settings */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4 card-inner-static text-left">
            <h4 className="text-sm font-extrabold uppercase tracking-wider flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <User size={16} className="text-pink-500" style={{ color: 'var(--accent-primary)' }} />
              Edit Profile Settings
            </h4>

            {/* Banner status feedback */}
            {updateSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                Profile updated successfully.
              </div>
            )}
            {updateError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                {updateError}
              </div>
            )}

            <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Username */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Display Username
                  </label>
                  <div className="relative">
                    <User size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-60" style={{ color: 'var(--text-secondary)' }} />
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all"
                      style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Corporate Email
                  </label>
                  <div className="relative">
                    <Mail size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-60" style={{ color: 'var(--text-secondary)' }} />
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all"
                      style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                    />
                  </div>
                </div>

                {/* Contact Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Contact Number
                  </label>
                  <div className="relative">
                    <Phone size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-60" style={{ color: 'var(--text-secondary)' }} />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={editContact}
                      onChange={(e) => setEditContact(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all"
                      style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-60" style={{ color: 'var(--text-secondary)' }} />
                    <input
                      type="date"
                      value={editDob}
                      onChange={(e) => setEditDob(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all"
                      style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)', colorScheme: 'dark' }}
                    />
                  </div>
                </div>

              </div>

              {/* Profile Image Selectors */}
              <div className="flex flex-col gap-2.5 mt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Change Profile Image
                </span>
                
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  
                  {/* Preset Gradients Grid */}
                  <div className="flex flex-col gap-1.5 w-full md:w-auto">
                    <span className="text-[9px] text-gray-500 font-semibold uppercase">Presets</span>
                    <div className="flex gap-2">
                      {presetGradients.map((grad, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setEditImg(grad);
                            setCustomImgUrl('');
                          }}
                          className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                            editImg === grad ? 'border-pink-500 scale-110 shadow-lg' : 'border-white/10 hover:border-white/30'
                          }`}
                          style={{ background: grad }}
                          title={`Preset Gradient ${i + 1}`}
                        />
                      ))}
                      
                      {/* Remove Image Option */}
                      {editImg && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditImg('');
                            setCustomImgUrl('');
                          }}
                          className="w-10 h-10 rounded-full border-2 border-dashed border-rose-500/30 hover:border-rose-500/60 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 text-[10px] font-black transition-all flex items-center justify-center cursor-pointer shrink-0"
                          title="Remove Profile Image"
                        >
                          ❌
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="h-[1px] md:h-12 w-full md:w-[1px] bg-white/5" />

                  {/* Upload Image File / Custom URL */}
                  <div className="flex-1 flex flex-col gap-2 w-full">
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 flex flex-col gap-1">
                        <span className="text-[9px] text-gray-500 font-semibold uppercase">Custom Image Web URL</span>
                        <input
                          type="url"
                          placeholder="https://example.com/avatar.jpg"
                          value={customImgUrl}
                          onChange={(e) => {
                            setCustomImgUrl(e.target.value);
                            setEditImg(e.target.value);
                          }}
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-1.5 text-[11px] focus:outline-none focus:border-pink-500/50 transition-all"
                          style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1 shrink-0">
                        <span className="text-[9px] text-gray-500 font-semibold uppercase">Or Upload File</span>
                        <label className="bg-white/5 border border-white/10 hover:bg-white/10 px-3.5 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer text-center transition-all flex items-center gap-1"
                               style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                          <Upload size={12} />
                          Browse...
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="self-end px-6 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 mt-2 cursor-pointer"
                style={{ 
                  backgroundColor: 'var(--accent-primary)',
                  boxShadow: `0 4px 14px -4px rgba(var(--glow-color), 0.3)`
                }}
              >
                Save Settings
              </button>
            </form>
          </div>

          {/* Section A: API Configuration Panel */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4 card-inner-static">
            <h4 className="text-sm font-extrabold uppercase tracking-wider flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Key size={16} className="text-pink-500" style={{ color: 'var(--accent-primary)' }} />
              API Uplink Credentials
            </h4>
            
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Active Live Endpoint API Key
              </span>
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  readOnly
                  value={apiKey}
                  className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono"
                  style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                />
                <button
                  onClick={handleCopy}
                  className="px-4 rounded-xl flex items-center justify-center border bg-white/5 border-white/10 hover:bg-white/10 text-xs font-bold transition-all"
                  style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                >
                  {copied ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>

            {/* API Endpoints Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-black/10 border border-white/5 flex flex-col gap-1">
                <span className="font-extrabold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                  <Cpu size={12} className="text-cyan-400" />
                  Telemetry Socket URL
                </span>
                <span className="font-mono text-[10px] opacity-70" style={{ color: 'var(--text-secondary)' }}>
                  wss://socket.vortex-sys.net/v1
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/10 border border-white/5 flex flex-col gap-1">
                <span className="font-extrabold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                  <Database size={12} className="text-pink-400" />
                  Audit Webhook URL
                </span>
                <span className="font-mono text-[10px] opacity-70" style={{ color: 'var(--text-secondary)' }}>
                  https://api.vortex-sys.net/hooks/txn
                </span>
              </div>
            </div>
          </div>

          {/* Section B: Platform Preferences / System Settings */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4 card-inner-static">
            <h4 className="text-sm font-extrabold uppercase tracking-wider flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Settings size={16} className="text-cyan-400" style={{ color: 'var(--accent-secondary)' }} />
              Console Notification Preferences
            </h4>

            {/* Preference Option 1 */}
            <div className="flex justify-between items-center py-2.5 border-b border-white/5">
              <div className="flex items-start gap-3">
                <Bell size={16} className="mt-0.5 opacity-80" style={{ color: 'var(--text-secondary)' }} />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Alert on Latency Spikes</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Dispatch Slack email hooks when API latency crests 100ms.</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={alertSettings.latencySpikes}
                onChange={() => toggleAlert('latencySpikes')}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-pink-500 focus:ring-0 cursor-pointer"
                style={{ accentColor: 'var(--accent-primary)' }}
              />
            </div>

            {/* Preference Option 2 */}
            <div className="flex justify-between items-center py-2.5 border-b border-white/5">
              <div className="flex items-start gap-3">
                <Shield size={16} className="mt-0.5 opacity-80" style={{ color: 'var(--text-secondary)' }} />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Failed Transactions Review</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Automatically flag high-risk transactions for manual audits.</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={alertSettings.failedTxns}
                onChange={() => toggleAlert('failedTxns')}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-pink-500 focus:ring-0 cursor-pointer"
                style={{ accentColor: 'var(--accent-primary)' }}
              />
            </div>

            {/* Preference Option 3 */}
            <div className="flex justify-between items-center py-2.5 border-b border-white/5">
              <div className="flex items-start gap-3">
                <Database size={16} className="mt-0.5 opacity-80" style={{ color: 'var(--text-secondary)' }} />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Scheduled Database Backups</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Sync transaction tables to S3 buckets every 6 hours.</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={alertSettings.dbBackups}
                onChange={() => toggleAlert('dbBackups')}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-pink-500 focus:ring-0 cursor-pointer"
                style={{ accentColor: 'var(--accent-primary)' }}
              />
            </div>

            {/* Preference Option 4 */}
            <div className="flex justify-between items-center py-2.5">
              <div className="flex items-start gap-3">
                <Cpu size={16} className="mt-0.5 opacity-80" style={{ color: 'var(--text-secondary)' }} />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>SMS Telemetry Reports</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Deliver daily text analytics directly to administrator devices.</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={alertSettings.smsAlerts}
                onChange={() => toggleAlert('smsAlerts')}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-pink-500 focus:ring-0 cursor-pointer"
                style={{ accentColor: 'var(--accent-primary)' }}
              />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
