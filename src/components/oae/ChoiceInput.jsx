export default function ChoiceInput({ type, value, onChange, options, allowOther = false, otherValue, onOtherChange, exclusiveOption, optionLabels }) {
  const isMulti = type === 'multi';

  const handleSingle = (val) => {
    onChange(val === value ? null : val);
  };

  const handleMulti = (val) => {
    const current = value || [];
    if (exclusiveOption && val === exclusiveOption) {
      onChange(current.includes(val) ? [] : [exclusiveOption]);
      return;
    }
    if (current.includes(val)) {
      onChange(current.filter(v => v !== val));
    } else {
      onChange([...current.filter(v => v !== exclusiveOption), val]);
    }
  };

  const exclusiveActive = isMulti && exclusiveOption && value?.includes(exclusiveOption);

  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value;
        const label = optionLabels ? optionLabels[val] : (typeof opt === 'string' ? opt : opt.label);
        const checked = isMulti ? value?.includes(val) : value === val;
        const disabled = isMulti && exclusiveActive && val !== exclusiveOption;

        return (
          <label
            key={val}
            className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-colors ${
              checked ? 'border-[#6B1F2A] bg-[#6B1F2A]/5' : 'border-gray-200 hover:border-gray-300'
            } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <input
              type={isMulti ? 'checkbox' : 'radio'}
              name={isMulti ? undefined : 'choice'}
              checked={checked}
              disabled={disabled}
              onChange={() => isMulti ? handleMulti(val) : handleSingle(val)}
              className="mt-1 accent-[#6B1F2A]"
            />
            <span className="text-sm md:text-base text-gray-700 leading-relaxed">{label}</span>
          </label>
        );
      })}

      {allowOther && !isMulti && value === 'Something else' && (
        <input
          type="text"
          value={otherValue || ''}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="Please specify..."
          className="w-full ml-7 border border-gray-300 rounded px-4 py-2 text-gray-800 focus:border-[#6B1F2A] focus:outline-none focus:ring-1 focus:ring-[#6B1F2A]"
        />
      )}
    </div>
  );
}