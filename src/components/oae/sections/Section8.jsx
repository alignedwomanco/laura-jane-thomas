import Question from '../Question.jsx';
import TextInput from '../TextInput.jsx';

export default function Section8({ values, onChange, errors }) {
  return (
    <div className="space-y-12">
      <Question number="Q24" label="Your name." error={errors.respondent_name}>
        <TextInput multiline={false} value={values.respondent_name} onChange={(v) => onChange('respondent_name', v)} />
      </Question>
      <Question number="Q25" label="Your role, in your own words. Not the job title, what you actually do all day." error={errors.respondent_role}>
        <TextInput value={values.respondent_role} onChange={(v) => onChange('respondent_role', v)} />
      </Question>
    </div>
  );
}