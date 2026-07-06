import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { OAE_QUESTIONS, OAE_SLIDERS } from '@/lib/oaeQuestionData';
import { formatAnswer } from '@/lib/oaeCSVExport';

function CountChart({ question, submissions }) {
  const options = question.options;
  const data = options.map(opt => {
    const count = question.type === 'multi'
      ? submissions.filter(s => s[question.id]?.includes(opt)).length
      : submissions.filter(s => s[question.id] === opt).length;
    return { name: opt.length > 40 ? opt.substring(0, 37) + '...' : opt, count };
  });

  if (data.every(d => d.count === 0)) return <p className="text-sm text-gray-400 italic mb-6">No data yet.</p>;

  return (
    <div className="mb-8">
      <ResponsiveContainer width="100%" height={Math.max(data.length * 45 + 40, 200)}>
        <BarChart layout="vertical" data={data} margin={{ left: 20, right: 30, top: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="name" width={280} tick={{ fontSize: 11 }} />
          <Tooltip cursor={{ fill: 'rgba(107,31,42,0.05)' }} />
          <Bar dataKey="count" fill="#6B1F2A" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function SliderStats({ question, submissions }) {
  const vals = submissions.map(s => s[question.id]).filter(v => v !== null && v !== undefined);
  if (vals.length === 0) return <p className="text-sm text-gray-400 italic mb-6">No data yet.</p>;
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const min = Math.min(...vals);
  const max = Math.max(...vals);

  return (
    <div className="flex gap-10 mb-8 p-4 bg-white rounded border border-gray-200">
      <div><p className="text-xs text-gray-400 uppercase tracking-wide">Mean</p><p className="font-serif text-3xl text-[#6B1F2A]">{mean.toFixed(1)}</p></div>
      <div><p className="text-xs text-gray-400 uppercase tracking-wide">Min</p><p className="font-serif text-3xl text-gray-600">{min}</p></div>
      <div><p className="text-xs text-gray-400 uppercase tracking-wide">Max</p><p className="font-serif text-3xl text-gray-600">{max}</p></div>
    </div>
  );
}

export default function AdminPerQuestion({ submissions, onBack }) {
  const [selectedId, setSelectedId] = useState(OAE_QUESTIONS[0].id);
  const question = OAE_QUESTIONS.find(q => q.id === selectedId);

  const answers = submissions
    .filter(s => s.status === 'submitted')
    .map(s => ({ name: s.respondent_name || 'Anonymous', value: s[selectedId] }))
    .filter(a => a.value !== null && a.value !== undefined && a.value !== '' && !(Array.isArray(a.value) && a.value.length === 0));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button onClick={onBack} className="mb-8 text-sm text-gray-500 hover:text-gray-800 transition-colors">← Back to dashboard</button>
        <h1 className="font-serif text-2xl text-gray-800 mb-6">Per-question view</h1>

        <select value={selectedId} onChange={e => setSelectedId(e.target.value)} className="w-full mb-8 p-3 border border-gray-300 rounded bg-white text-sm text-gray-700">
          {OAE_QUESTIONS.map(q => (
            <option key={q.id} value={q.id}>{q.number} — {q.label.substring(0, 80)}{q.label.length > 80 ? '...' : ''}</option>
          ))}
        </select>

        <div className="mb-8">
          <p className="text-sm font-medium text-gray-700 mb-2">{question.number}. {question.label}</p>
          {question.chartType === 'count' && <CountChart question={question} submissions={submissions} />}
          {question.chartType === 'slider' && <SliderStats question={question} submissions={submissions} />}
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{answers.length} answers</p>
          {answers.map((a, i) => (
            <div key={i} className="p-4 bg-white rounded border border-gray-200">
              <p className="text-xs font-medium text-[#6B1F2A] mb-2">{a.name}</p>
              <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{formatAnswer(question, a.value)}</p>
            </div>
          ))}
          {answers.length === 0 && <p className="text-gray-400 italic">No answers for this question yet.</p>}
        </div>
      </div>
    </div>
  );
}