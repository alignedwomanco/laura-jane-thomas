export default function Question({ number, label, helper, required = true, error, children }) {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        {number && <span className="text-xs font-semibold tracking-wider text-[#6B1F2A] flex-shrink-0">{number}</span>}
        <label className="font-serif text-lg md:text-xl leading-snug text-gray-800">{label}</label>
        {required && <span className="text-[#6B1F2A] font-bold flex-shrink-0">*</span>}
      </div>
      {helper && <p className="text-sm text-gray-500 mt-2 ml-8 italic">{helper}</p>}
      <div className="mt-4 ml-8">{children}</div>
      {error && <p className="text-sm text-red-600 mt-2 ml-8">{error}</p>}
    </div>
  );
}