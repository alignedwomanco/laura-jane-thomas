import Question from '../Question.jsx';
import TextInput from '../TextInput.jsx';
import ChoiceInput from '../ChoiceInput.jsx';
import { OAE_Q6_OPTIONS } from '@/lib/oaeQuestionData';

export default function Section2({ values, onChange, errors }) {
  return (
    <div className="space-y-12">
      <Question number="Q3" label="In one sentence, in your own words: what does Open Access Energy do? Write it the way you would say it to a smart friend at a braai, not the way the website says it." error={errors.q3_what_we_do}>
        <TextInput value={values.q3_what_we_do} onChange={(v) => onChange('q3_what_we_do', v)} />
      </Question>

      <Question number="Q4" label="A prospect leaves their first meeting with us. In the lift, a colleague asks them: &quot;So what do they actually do?&quot; Write down, word for word, what you think the prospect says." error={errors.q4_prospect_lift}>
        <TextInput value={values.q4_prospect_lift} onChange={(v) => onChange('q4_prospect_lift', v)} />
      </Question>

      <Question number="Q5" label="Two quick sentences." helper="It is completely fine if they differ, that is the point of asking.">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">What would Gerjo say OAE is, in one sentence?</p>
            <TextInput value={values.q5_gerjo_sentence} onChange={(v) => onChange('q5_gerjo_sentence', v)} minRows={2} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">And what would you say?</p>
            <TextInput value={values.q5_you_sentence} onChange={(v) => onChange('q5_you_sentence', v)} minRows={2} />
          </div>
        </div>
      </Question>

      <Question number="Q6" label="Which of these feels most true of what OAE is today? Pick one." error={errors.q6_today_type}>
        <ChoiceInput
          type="single"
          value={values.q6_today_type}
          onChange={(v) => onChange('q6_today_type', v)}
          options={OAE_Q6_OPTIONS}
          allowOther
          otherValue={values.q6_today_other}
          onOtherChange={(v) => onChange('q6_today_other', v)}
        />
      </Question>

      <Question number="Q6a" label="Which one should we be in three years?" error={errors.q6a_future_type}>
        <div className="space-y-4">
          <ChoiceInput
            type="single"
            value={values.q6a_future_type}
            onChange={(v) => onChange('q6a_future_type', v)}
            options={OAE_Q6_OPTIONS}
            allowOther
            otherValue={values.q6a_future_other}
            onOtherChange={(v) => onChange('q6a_future_other', v)}
          />
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">What has to change to get there? If your answer is the same as today, say why.</p>
            <TextInput value={values.q6a_change_required} onChange={(v) => onChange('q6a_change_required', v)} />
          </div>
        </div>
      </Question>

      <Question number="Q7" label="Describe OAE in exactly three words. Not a slogan, just the three honest words." error={errors.q7_three_words}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <TextInput
              key={i}
              multiline={false}
              value={values.q7_three_words?.[i] || ''}
              onChange={(v) => {
                const words = [...(values.q7_three_words || ['', '', ''])];
                words[i] = v;
                onChange('q7_three_words', words);
              }}
              placeholder={`Word ${i + 1}`}
            />
          ))}
        </div>
      </Question>
    </div>
  );
}