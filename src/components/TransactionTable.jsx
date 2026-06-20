import { useState, useMemo } from 'react';
import { 
  Search, ArrowUpDown, ChevronLeft, ChevronRight, X, 
  FileSpreadsheet, AlertCircle, ShieldAlert, RefreshCw 
} from 'lucide-react';

export default function TransactionTable({ data }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const itemsPerPage = 5;

  // Sorting Handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // Filter & Search Logic
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'All' || 
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      let multiplier = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof a[sortField] === 'string') {
        return a[sortField].localeCompare(b[sortField]) * multiplier;
      }
      return (a[sortField] - b[sortField]) * multiplier;
    });
  }, [data, search, statusFilter, sortField, sortDirection]);

  // Pagination Logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">Completed</span>;
      case 'Failed':
        return <span className="bg-rose-500/10 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-500/20">Failed</span>;
      default:
        return <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/20">Processing</span>;
    }
  };

  const getRiskColor = (risk) => {
    if (risk === 'High') return 'text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20';
    if (risk === 'Medium') return 'text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20';
    return 'text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20';
  };

  // Mock Export CSV functionality
  const handleExport = () => {
    const headers = ['ID', 'Customer', 'Email', 'Type', 'Amount', 'Status', 'Date', 'Country', 'Method'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(t => [
        t.id,
        `"${t.customer}"`,
        t.email,
        `"${t.type}"`,
        t.amount,
        t.status,
        t.date,
        t.country,
        t.method
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Vortex_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col w-full card-inner-static relative overflow-hidden">
      
      {/* Header section with Action Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6 z-10">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Audit Transactions Ledger
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Real-time ledger audit tools with live sorting, risk parameters, and search fields.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          {/* Search field */}
          <div className="relative flex-1 xl:flex-initial">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-60" style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search ID, customer, email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full xl:w-64 bg-white/5 border border-white/10 hover:border-white/20 focus:border-pink-500/50 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none transition-all"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
            />
          </div>

          {/* Export CSV button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/10"
            style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
          >
            <FileSpreadsheet size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Tabs list for status */}
      <div className="flex border-b border-opacity-10 mb-4 overflow-x-auto gap-2 scrollbar-none" style={{ borderColor: 'var(--border-color)' }}>
        {['All', 'Completed', 'Processing', 'Failed'].map(tab => (
          <button
            key={tab}
            onClick={() => { setStatusFilter(tab); setCurrentPage(1); }}
            className={`px-4 py-2.5 text-xs font-extrabold border-b-2 -mb-[2px] transition-all whitespace-nowrap ${
              statusFilter === tab
                ? 'border-pink-500 text-pink-400 font-black'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
            style={{ 
              borderColor: statusFilter === tab ? 'var(--accent-primary)' : 'transparent',
              color: statusFilter === tab ? 'var(--accent-primary)' : ''
            }}
          >
            {tab}
            <span className="ml-1.5 px-1.5 py-0.5 rounded bg-white/5 text-[10px] opacity-70">
              {tab === 'All' ? data.length : data.filter(d => d.status === tab).length}
            </span>
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto w-full z-10 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-opacity-10 text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}>
              <th className="py-3 px-4 font-black">ID</th>
              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('customer')}>
                <div className="flex items-center gap-1">
                  Customer
                  <ArrowUpDown size={10} className="opacity-60" />
                </div>
              </th>
              <th className="py-3 px-4">Transaction Details</th>
              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-1">
                  Date
                  <ArrowUpDown size={10} className="opacity-60" />
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('amount')}>
                <div className="flex items-center gap-1">
                  Amount
                  <ArrowUpDown size={10} className="opacity-60" />
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('status')}>
                <div className="flex items-center gap-1">
                  Status
                  <ArrowUpDown size={10} className="opacity-60" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-opacity-5" style={{ dividerColor: 'var(--border-color)' }}>
            {filteredData.length > 0 ? (
              paginatedData.map(txn => (
                <tr 
                  key={txn.id} 
                  onClick={() => setSelectedTxn(txn)}
                  className="hover:bg-white/5 cursor-pointer text-xs transition-colors duration-200 border-b border-white/5"
                >
                  <td className="py-3.5 px-4 font-bold text-pink-500 tracking-wider" style={{ color: 'var(--accent-primary)' }}>
                    {txn.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col leading-tight">
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{txn.customer}</span>
                      <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{txn.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4" style={{ color: 'var(--text-secondary)' }}>
                    {txn.type}
                  </td>
                  <td className="py-3.5 px-4 font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {txn.date}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold" style={{ color: 'var(--text-primary)' }}>
                    {txn.amount < 0 ? (
                      <span className="text-rose-400">-${Math.abs(txn.amount).toFixed(2)}</span>
                    ) : (
                      <span>${txn.amount.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(txn.status)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <AlertCircle size={20} className="mx-auto mb-2 opacity-50 text-pink-500" style={{ color: 'var(--accent-primary)' }} />
                  No transactions match your current query parameter thresholds.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-opacity-10 z-10" style={{ borderColor: 'var(--border-color)' }}>
          <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>
            Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-7 h-7 text-[10px] font-bold rounded-lg transition-all ${
                  currentPage === idx + 1
                    ? 'bg-pink-500 text-white font-extrabold'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
                style={{ 
                  backgroundColor: currentPage === idx + 1 ? 'var(--accent-primary)' : '',
                  color: currentPage === idx + 1 ? '#ffffff' : ''
                }}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Slide-over Transaction Drawer */}
      {selectedTxn && (
        <>
          {/* Overlay backdrop */}
          <div 
            onClick={() => setSelectedTxn(null)} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] transition-opacity duration-300"
          />
          {/* Slide panel */}
          <div 
            className="fixed right-0 top-0 bottom-0 w-full max-w-[400px] bg-slate-900 border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[999] p-6 flex flex-col justify-between slide-in-right"
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              borderColor: 'var(--border-color)'
            }}
          >
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-opacity-10 pb-4" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>Transaction Audit</span>
                  <h3 className="text-lg font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{selectedTxn.id}</h3>
                </div>
                <button 
                  onClick={() => setSelectedTxn(null)}
                  className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Transaction details card */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Status</span>
                  {getStatusBadge(selectedTxn.status)}
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Client Name</span>
                  <span className="text-xs font-extrabold" style={{ color: 'var(--text-primary)' }}>{selectedTxn.customer}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Email Address</span>
                  <span className="text-xs font-mono font-medium" style={{ color: 'var(--text-primary)' }}>{selectedTxn.email}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Account Scope</span>
                  <span className="text-xs font-medium text-pink-400" style={{ color: 'var(--accent-primary)' }}>{selectedTxn.type}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Audit Date</span>
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{selectedTxn.date}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Settled Volume</span>
                  <span className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>${Math.abs(selectedTxn.amount).toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Risk Assessment</span>
                  <span className={`text-[10px] ${getRiskColor(selectedTxn.risk)}`}>{selectedTxn.risk}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Settlement Channel</span>
                  <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{selectedTxn.method}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Geographic Origin</span>
                  <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{selectedTxn.country}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 pt-6 border-t border-opacity-10" style={{ borderColor: 'var(--border-color)' }}>
              <button 
                onClick={() => alert(`Reviewing transaction logs for ${selectedTxn.id}...`)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 hover:opacity-90"
                style={{ 
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff'
                }}
              >
                <ShieldAlert size={14} />
                Initiate Fraud Review
              </button>

              <button 
                onClick={() => alert(`Re-issuing receipt to ${selectedTxn.email}...`)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border border-white/10 hover:bg-white/5 transition-colors"
                style={{ 
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <RefreshCw size={14} className="stroke-[2.5]" />
                Re-dispatch Receipt
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
