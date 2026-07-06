import Question from '../Question.jsx';
import TextInput from '../TextInput.jsx';
import ChoiceInput from '../ChoiceInput.jsx';

export default function Section1({ values, onChange, errors }) {
  return (
    <div className="space-y-12">
      <Question number="Q1" label="Why did you join OAE? What made you say yes? Tell it as a short story, not a job description." error={errors.q1_join_reason}>
        <TextInput value={values.q1_join_reason} onChange={(v) => onChange('q1_join_reason', v)} />
      </Question>
      <Question number="Q2" label="How often do you speak directly with customers or prospective customers?" error={errors.q2_customer_frequency}>
        <ChoiceInput
          type="single"
          value={values.q2_customer_frequency}
          onChange={(v) => onChange('q2_customer_frequency', v)}
          options={['Most days', 'Weekly', 'Monthly, or at big moments (demos, negotiations, escalations)', 'Rarely or never']}
        />
      </Question>
    </div>
  );
}