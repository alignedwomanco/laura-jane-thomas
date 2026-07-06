export default function AdminTable({ submissions, onViewDetail, onPerQuestion, onExport }) {
  const submittedCount = submissions.filter(s => s.status === 'submitted').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-serif text-3xl text-gray-800 mb-1">OAE Brand Diagnostic</h1>
        <p className="text-sm text-gray-500 mb-8">{submittedCount} of 11 submitted · {submissions.length} total responses</p>

        <div className="flex gap-3 mb-8">
          <button onClick={onPerQuestion} className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-white transition-colors">Per-question view</button>
          <button onClick={onExport} className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-white transition-colors">Export CSV</button>
        </div>

        {submissions.length === 0 ? (
          <p className="text-gray-400 italic">No responses yet.</p>
        ) : (
          <table className="w-full bg-white rounded border border-gray-200">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Respondent</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(sub => (
                <tr key={sub.id} onClick={() => onViewDetail(sub.id)} className="border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-800">{sub.respondent_name || '—'}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{sub.submitted_at ? new Date(sub.submitted_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${sub.status === 'submitted' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      {sub.status === 'submitted' ? 'Submitted' : 'In progress'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}