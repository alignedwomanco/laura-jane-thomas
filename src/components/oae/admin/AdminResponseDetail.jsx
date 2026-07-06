import { OAE_QUESTIONS, OAE_SECTIONS } from '@/lib/oaeQuestionData';
import { formatAnswer } from '@/lib/oaeCSVExport';

export default function AdminResponseDetail({ submission, onBack }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button onClick={onBack} className="mb-8 text-sm text-gray-500 hover:text-gray-800 transition-colors">← Back to all responses</button>

        <h1 className="font-serif text-3xl text-gray-800 mb-1">{submission.respondent_name || 'Anonymous'}</h1>
        <p className="text-sm text-gray-500 mb-2">{submission.respondent_role || '—'}</p>
        <p className="text-xs text-gray-400 mb-10">
          {submission.status === 'submitted' ? `Submitted ${new Date(submission.submitted_at).toLocaleString('en-ZA')}` : 'In progress (draft)'}
        </p>

        {OAE_SECTIONS.map(section => (
          <div key={section.number} className="mb-12">
            <h2 className="font-serif text-lg text-[#6B1F2A] mb-4 pb-2 border-b border-[#6B1F2A]/20">
              Section {section.number} · {section.title}
            </h2>
            <div className="space-y-6">
              {OAE_QUESTIONS.filter(q => q.section === section.number).map(q => (
                <div key={q.id}>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{q.number}</p>
                  <p className="text-sm font-medium text-gray-700 mb-2">{q.label}</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed pl-4 border-l-2 border-gray-100">
                    {formatAnswer(q, submission[q.id])}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}