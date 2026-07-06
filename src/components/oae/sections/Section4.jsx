import Question from '../Question.jsx';
import TextInput from '../TextInput.jsx';

export default function Section4({ values, onChange, errors }) {
  return (
    <div className="space-y-12">
      <Question number="Q8" label="Picture our single most important customer, the one the company's future depends on winning. Describe the person, not the company: their role, the operation they run, what a normal Tuesday looks like for them." error={errors.q8_buyer_description}>
        <TextInput value={values.q8_buyer_description} onChange={(v) => onChange('q8_buyer_description', v)} />
      </Question>
      <Question number="Q9" label="What is the main thing stopping that person from signing with us?" error={errors.q9_main_obstacle}>
        <TextInput value={values.q9_main_obstacle} onChange={(v) => onChange('q9_main_obstacle', v)} />
      </Question>
      <Question number="Q10" label="And what is their biggest fear? Not the biggest cost, the biggest fear." error={errors.q10_biggest_fear}>
        <TextInput value={values.q10_biggest_fear} onChange={(v) => onChange('q10_biggest_fear', v)} />
      </Question>
      <Question number="Q11" label="Now a memory, not an opinion. Think of the last specific deal we lost, or the prospect who went quiet. What actually happened, step by step? Who were they, what meetings happened, what was said, when did it stall?" error={errors.q11_lost_deal_story}>
        <TextInput value={values.q11_lost_deal_story} onChange={(v) => onChange('q11_lost_deal_story', v)} />
      </Question>
      <Question number="Q11a" label="And in your view, why did that one die?" error={errors.q11a_why_died}>
        <TextInput value={values.q11a_why_died} onChange={(v) => onChange('q11a_why_died', v)} />
      </Question>
      <Question number="Q12" label="What is the last thing you heard an actual customer or prospect say, in a meeting, on a call, in an email, that stuck with you? Quote it as closely as you can remember, and say why it stuck." error={errors.q12_customer_quote}>
        <TextInput value={values.q12_customer_quote} onChange={(v) => onChange('q12_customer_quote', v)} />
      </Question>
    </div>
  );
}