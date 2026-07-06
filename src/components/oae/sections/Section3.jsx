import SliderInput from '../SliderInput.jsx';
import { OAE_SLIDERS } from '@/lib/oaeQuestionData';

export default function Section3({ values, onChange, errors }) {
  return (
    <div className="space-y-10">
      <p className="text-base text-gray-500 italic">Slide each from 0 to 10. Go with your gut, do not calculate.</p>
      {OAE_SLIDERS.map((slider) => (
        <div key={slider.id}>
          <p className="font-serif text-lg text-gray-800 mb-3">{slider.label}</p>
          <SliderInput
            value={values[slider.id]}
            onChange={(v) => onChange(slider.id, v)}
            anchorLow={slider.anchorLow}
            anchorHigh={slider.anchorHigh}
          />
          {errors[slider.id] && <p className="text-sm text-red-600 mt-2">Please set a value.</p>}
        </div>
      ))}
    </div>
  );
}