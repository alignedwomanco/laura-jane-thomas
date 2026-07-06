import Question from '../Question.jsx';
import TextInput from '../TextInput.jsx';
import ChoiceInput from '../ChoiceInput.jsx';
import RankList from '../RankList.jsx';
import { OAE_Q17_ITEMS, OAE_Q18_OPTIONS } from '@/lib/oaeQuestionData';

export default function Section6({ values, onChange, errors }) {
  return (
    <div className="space-y-12">
      <Question number="Q17" label="When we lose, who or what do we actually lose to? Rank whatever applies, add anything missing." error={errors.q17_lose_to_ranking}>
        <RankList
          value={values.q17_lose_to_ranking}
          onChange={(v) => onChange('q17_lose_to_ranking', v)}
          items={OAE_Q17_ITEMS}
          otherValue={values.q17_other}
          onOtherChange={(v) => onChange('q17_other', v)}
        />
      </Question>

      <Question number="Q18" label="Which of these would you happily use, unexplained, in a first conversation with a brand-new buyer? Tick all that apply." error={errors.q18_jargon_comfort}>
        <ChoiceInput
          type="multi"
          value={values.q18_jargon_comfort}
          onChange={(v) => onChange('q18_jargon_comfort', v)}
          options={OAE_Q18_OPTIONS}
          exclusiveOption="None of these, I would explain everything in plain language first"
        />
      </Question>

      <Question number="Q19" label="If OAE disappeared tomorrow, what would our current customers genuinely do? Say it plainly." error={errors.q19_if_disappeared}>
        <TextInput value={values.q19_if_disappeared} onChange={(v) => onChange('q19_if_disappeared', v)} />
      </Question>

      <Question number="Q20" label="Stress test. Fifty qualified buyers arrive tomorrow, all wanting to transact. What breaks first?" error={errors.q20_stress_test}>
        <TextInput value={values.q20_stress_test} onChange={(v) => onChange('q20_stress_test', v)} />
      </Question>

      <Question number="Q21" label="Describe a customer we should politely turn away. Who is wrong for us right now, even if they are waving money?" error={errors.q21_turn_away}>
        <TextInput value={values.q21_turn_away} onChange={(v) => onChange('q21_turn_away', v)} />
      </Question>
    </div>
  );
}