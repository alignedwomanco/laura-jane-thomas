import { OAE_QUESTIONS, OAE_SECTIONS } from '@/lib/oaeQuestionData';

export function formatAnswer(question, value) {
  if (value === null || value === undefined || value === '') return '—';
  if (question.type === 'multi') return value.join(', ');
  if (question.type === 'rank') return value.map((v, i) => `${i + 1}. ${v}`).join('\n');
  if (question.type === 'array') return value.join(', ');
  if (question.type === 'single' && question.optionLabels) return `${value}: ${question.optionLabels[value]}`;
  return String(value);
}

export function exportCSV(submissions) {
  const headers = ['Respondent', 'Role', 'Submitted', 'Status', ...OAE_QUESTIONS.map(q => `${q.number}: ${q.label.substring(0, 100)}`)];
  const rows = submissions.map(sub => [
    sub.respondent_name || '',
    sub.respondent_role || '',
    sub.submitted_at || '',
    sub.status || '',
    ...OAE_QUESTIONS.map(q => {
      const val = sub[q.id];
      if (val === null || val === undefined || val === '') return '';
      if (Array.isArray(val)) return val.join('; ');
      return String(val);
    })
  ]);
  const csv = [headers, ...rows].map(row =>
    row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
  ).join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `oae-diagnostic-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}