import Question from '../Question.jsx';
import TextInput from '../TextInput.jsx';

export default function Section7({ values, onChange, errors }) {
  return (
    <div className="space-y-12">
      <Question number="Q22" label="Magic wand. It is 18 months from now and OAE is the company everyone in the energy sector is talking about. What happened? Tell it as a short story, two or three sentences." error={errors?.q22_magic_wand}>
        <TextInput value={values.q22_magic_wand} onChange={(v) => onChange('q22_magic_wand', v)} />
      </Question>
      <Question number="Q23" label="Anything you want to say that no question asked? Last word is yours." required={false}>
        <TextInput value={values.q23_anything_else} onChange={(v) => onChange('q23_anything_else', v)} />
      </Question>
    </div>
  );
}