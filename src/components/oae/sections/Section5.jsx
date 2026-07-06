import Question from '../Question.jsx';
import TextInput from '../TextInput.jsx';
import ChoiceInput from '../ChoiceInput.jsx';
import { OAE_Q15_SENTENCES } from '@/lib/oaeQuestionData';

export default function Section5({ values, onChange, errors }) {
  return (
    <div className="space-y-12">
      <Question number="Q13" label="Complete this sentence in your own words: &quot;Businesses should choose OAE because ______.&quot;" error={errors.q13_why_choose}>
        <TextInput value={values.q13_why_choose} onChange={(v) => onChange('q13_why_choose', v)} />
      </Question>

      <Question number="Q14" label="What is the single strongest piece of proof we have that OAE works? One thing only: a number, a client, a transaction, a result. The thing you would show a sceptic." error={errors.q14_strongest_proof}>
        <TextInput value={values.q14_strongest_proof} onChange={(v) => onChange('q14_strongest_proof', v)} />
      </Question>

      <div className="border-l-4 border-[#6B1F2A] pl-6 py-2 bg-gray-50 rounded-r">
        <p className="text-sm font-medium text-gray-600 mb-3">Read these four sentences.</p>
        <div className="space-y-3">
          {Object.entries(OAE_Q15_SENTENCES).map(([key, sentence]) => (
            <p key={key} className="text-sm md:text-base text-gray-700">
              <span className="font-bold text-[#6B1F2A]">{key}.</span> &ldquo;{sentence}&rdquo;
            </p>
          ))}
        </div>
      </div>

      <Question number="Q15a" label="Which is the most true of OAE today? Pick one." error={errors.q15a_most_true}>
        <ChoiceInput
          type="single"
          value={values.q15a_most_true}
          onChange={(v) => onChange('q15a_most_true', v)}
          options={['A', 'B', 'C', 'D']}
          optionLabels={OAE_Q15_SENTENCES}
        />
      </Question>

      <Question number="Q15b" label="Which would make a CFO who has never heard of us most likely to ask for a meeting? Pick one." error={errors.q15b_cfo_meeting}>
        <ChoiceInput
          type="single"
          value={values.q15b_cfo_meeting}
          onChange={(v) => onChange('q15b_cfo_meeting', v)}
          options={['A', 'B', 'C', 'D']}
          optionLabels={OAE_Q15_SENTENCES}
        />
      </Question>

      <Question number="Q15c" label="If your two picks differ, say why in a line. And if you can write a sentence that beats all four, write it here. If your picks were the same, just write &quot;same&quot; and move on." error={errors.q15c_better_sentence}>
        <TextInput value={values.q15c_better_sentence} onChange={(v) => onChange('q15c_better_sentence', v)} />
      </Question>

      <Question number="Q16" label="What do we currently say about ourselves, anywhere: website, decks, sales calls, that you privately suspect is not quite true yet, or is overclaimed? And if you could change one thing about how we describe ourselves publicly, what would it be? This answer is the reason the questionnaire is confidential to Laura. Be honest." error={errors.q16_overclaimed}>
        <TextInput value={values.q16_overclaimed} onChange={(v) => onChange('q16_overclaimed', v)} />
      </Question>
    </div>
  );
}