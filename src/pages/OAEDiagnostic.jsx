import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { OAE_SECTIONS, validateSection } from '@/lib/oaeQuestionData';
import WelcomeScreen from '@/components/oae/WelcomeScreen';
import ThankYouScreen from '@/components/oae/ThankYouScreen';
import Section1 from '@/components/oae/sections/Section1';
import Section2 from '@/components/oae/sections/Section2';
import Section3 from '@/components/oae/sections/Section3';
import Section4 from '@/components/oae/sections/Section4';
import Section5 from '@/components/oae/sections/Section5';
import Section6 from '@/components/oae/sections/Section6';
import Section7 from '@/components/oae/sections/Section7';
import Section8 from '@/components/oae/sections/Section8';

const STORAGE_KEY = 'oae_diagnostic_draft';
const SECTION_COMPONENTS = { 1: Section1, 2: Section2, 3: Section3, 4: Section4, 5: Section5, 6: Section6, 7: Section7, 8: Section8 };

function loadLocal() {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : {}; } catch { return {}; }
}
function saveLocal(values) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(values)); } catch { /* noop */ }
}
function clearLocal() {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
}

export default function OAEDiagnostic() {
  const [loading, setLoading] = useState(true);
  const [submissionId, setSubmissionId] = useState(null);
  const [screen, setScreen] = useState('welcome');
  const [sectionNum, setSectionNum] = useState(1);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { init(); }, []);

  useEffect(() => {
    if (screen === 'thankyou' || Object.keys(values).length === 0) return;
    const timer = setTimeout(() => saveLocal(values), 500);
    return () => clearTimeout(timer);
  }, [values, screen]);

  async function init() {
    try {
      const authed = await base44.auth.isAuthenticated();
      if (!authed) { base44.auth.redirectToLogin('/oae-diagnostic'); return; }
      const existing = await base44.entities.OAEDiagnosticSubmission.filter({});
      if (existing.length > 0) {
        const sub = existing[0];
        setSubmissionId(sub.id);
        if (sub.status === 'submitted') { setScreen('thankyou'); }
        else { const { id, created_date, updated_date, created_by_id, status, submitted_at, ...rest } = sub; setValues({ ...rest, ...loadLocal() }); }
      } else {
        setValues(loadLocal());
      }
    } catch (err) { console.error('OAE init error:', err); }
    finally { setLoading(false); }
  }

  async function saveToDB() {
    setSaving(true);
    try {
      if (submissionId) {
        await base44.entities.OAEDiagnosticSubmission.update(submissionId, { ...values, status: 'draft' });
      } else {
        const created = await base44.entities.OAEDiagnosticSubmission.create({ ...values, status: 'draft' });
        setSubmissionId(created.id);
      }
    } catch (err) { console.error('OAE save error:', err); }
    finally { setSaving(false); }
  }

  function handleFieldChange(field, value) { setValues(prev => ({ ...prev, [field]: value })); }

  function handleBegin() { setScreen('section'); setSectionNum(1); window.scrollTo(0, 0); }

  function handleNext() {
    const missing = validateSection(sectionNum, values);
    if (missing.length > 0) {
      const map = {}; missing.forEach(id => { map[id] = 'This question is required.'; });
      setErrors(map);
      const firstError = document.querySelector('.text-red-600');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setErrors({});
    if (sectionNum < 8) { saveToDB(); setSectionNum(n => n + 1); window.scrollTo(0, 0); }
    else { setShowConfirm(true); }
  }

  function handleBack() {
    setErrors({});
    if (sectionNum > 1) { saveToDB(); setSectionNum(n => n - 1); window.scrollTo(0, 0); }
    else { setScreen('welcome'); }
  }

  async function handleSubmit() {
    setShowConfirm(false);
    setSaving(true);
    try {
      const payload = { ...values, status: 'submitted', submitted_at: new Date().toISOString() };
      if (submissionId) { await base44.entities.OAEDiagnosticSubmission.update(submissionId, payload); }
      else { const created = await base44.entities.OAEDiagnosticSubmission.create(payload); setSubmissionId(created.id); }
      clearLocal();
      setScreen('thankyou');
    } catch (err) { console.error('OAE submit error:', err); }
    finally { setSaving(false); }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 border-4 border-gray-100 border-t-[#6B1F2A] rounded-full animate-spin" /></div>;
  }

  const progress = (sectionNum / 8) * 100;
  const currentSection = OAE_SECTIONS.find(s => s.number === sectionNum);
  const CurrentSection = SECTION_COMPONENTS[sectionNum];

  return (
    <div className="min-h-screen bg-white">
      {screen === 'section' && (
        <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Section {sectionNum} of 8 · {currentSection.title}</span>
              <span className="text-sm text-gray-400">{Math.round(progress)}%{saving ? ' · saving...' : ''}</span>
            </div>
            <div className="h-1 bg-gray-100 rounded-full"><div className="h-full bg-[#6B1F2A] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} /></div>
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {screen === 'welcome' && <WelcomeScreen onBegin={handleBegin} />}
        {screen === 'section' && (
          <>
            {currentSection.intro && <p className="text-base text-gray-500 italic mb-10">{currentSection.intro}</p>}
            <CurrentSection values={values} onChange={handleFieldChange} errors={errors} />
            <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-100">
              <button onClick={handleBack} className="px-6 py-3 text-sm text-gray-500 hover:text-gray-800 transition-colors">← Back</button>
              <button onClick={handleNext} disabled={saving} className="px-8 py-3 bg-[#6B1F2A] text-white rounded font-medium hover:bg-[#5a1922] transition-colors disabled:opacity-50">
                {sectionNum === 8 ? 'Submit my answers' : 'Next'}
              </button>
            </div>
          </>
        )}
        {screen === 'thankyou' && <ThankYouScreen />}
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <p className="text-lg text-gray-800 mb-6">Once submitted, your answers are final and go directly to Laura. Ready?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowConfirm(false)} className="px-5 py-2.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors">Go back</button>
              <button onClick={handleSubmit} className="px-5 py-2.5 bg-[#6B1F2A] text-white rounded hover:bg-[#5a1922] transition-colors">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}