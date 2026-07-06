export default function SliderInput({ value, onChange, anchorLow, anchorHigh }) {
  const isSet = value !== null && value !== undefined;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={isSet ? value : 0}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className={`flex-1 accent-[#6B1F2A] ${!isSet ? 'opacity-50' : ''}`}
        />
        <span className={`w-10 text-center font-serif text-lg font-bold ${isSet ? 'text-[#6B1F2A]' : 'text-gray-300'}`}>
          {isSet ? value : '—'}
        </span>
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>{anchorLow}</span>
        <span>{anchorHigh}</span>
      </div>
    </div>
  );
}