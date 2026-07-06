import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminTable from '@/components/oae/admin/AdminTable';
import AdminResponseDetail from '@/components/oae/admin/AdminResponseDetail';
import AdminPerQuestion from '@/components/oae/admin/AdminPerQuestion';
import { exportCSV } from '@/lib/oaeCSVExport';

export default function OAEDiagnosticAdmin() {
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [view, setView] = useState('table');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => { init(); }, []);

  async function init() {
    try {
      const authed = await base44.auth.isAuthenticated();
      if (!authed) { base44.auth.redirectToLogin('/oae-diagnostic-admin'); return; }
      const me = await base44.auth.me();
      if (!me || me.role !== 'admin') { setAccessDenied(true); setLoading(false); return; }
      const all = await base44.entities.OAEDiagnosticSubmission.list('-updated_date', 100);
      setSubmissions(all);
    } catch (err) { console.error('OAE admin init error:', err); }
    finally { setLoading(false); }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-8 h-8 border-4 border-gray-100 border-t-[#6B1F2A] rounded-full animate-spin" /></div>;
  }

  if (accessDenied) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><p className="text-gray-500">Access denied. Admin only.</p></div>;
  }

  if (view === 'detail' && selectedId) {
    const sub = submissions.find(s => s.id === selectedId);
    if (sub) return <AdminResponseDetail submission={sub} onBack={() => setView('table')} />;
  }

  if (view === 'perQuestion') {
    return <AdminPerQuestion submissions={submissions} onBack={() => setView('table')} />;
  }

  return (
    <AdminTable
      submissions={submissions}
      onViewDetail={(id) => { setSelectedId(id); setView('detail'); }}
      onPerQuestion={() => setView('perQuestion')}
      onExport={() => exportCSV(submissions)}
    />
  );
}