export const OAE_ACCENT = '#6B1F2A';

export const OAE_Q6_OPTIONS = [
  'A software company',
  'A marketplace',
  'An energy trading business',
  'A professional services business',
  'Infrastructure for a new market',
  'Something else',
];

export const OAE_Q15_SENTENCES = {
  A: 'We match Sellers who make electricity with Buyers who use it.',
  B: "South Africa's first multilateral wheeling platform.",
  C: 'Your business can now buy cheaper, cleaner power, and we make that deal safe enough for your board.',
  D: 'We help large energy users cut their electricity costs, with a contract their bank and their board can trust.',
};

export const OAE_Q17_ITEMS = [
  'Another platform or trader',
  "The customer's own solar or generation plans",
  'A consultant or advisor they trust more',
  'Eskom inertia, the devil they know',
  'Simply doing nothing',
  'Other',
];

export const OAE_Q18_OPTIONS = [
  'Wheeling',
  'Virtual wheeling',
  'Off-taker',
  'PPA',
  'Multilateral',
  'Tariff stack',
  'Reconciliation and settlement',
  'Bankable',
  'None of these, I would explain everything in plain language first',
];

export const OAE_SLIDERS = [
  { id: 's1_website_clarity', label: 'A stranger lands on our website for 30 seconds. How confident are you they could then say what OAE does?', anchorLow: '0 = no chance', anchorHigh: '10 = certain' },
  { id: 's2_buyer_picture', label: 'How clearly can you picture our single most important buyer?', anchorLow: '0 = fuzzy idea', anchorHigh: '10 = I could describe their Tuesday' },
  { id: 's3_team_alignment', label: 'How confident are you that everyone at OAE would describe the company the same way?', anchorLow: '0 = we would all say something different', anchorHigh: '10 = word for word the same' },
  { id: 's4_proof_strength', label: 'How strong is our proof, today, that OAE saves buyers money?', anchorLow: '0 = we assert it', anchorHigh: '10 = undeniable evidence' },
  { id: 's5_cfo_safety', label: 'A CFO asks us: "Is this safe?" How confident are you in the answer we can give today?', anchorLow: '0 = we would talk around it', anchorHigh: '10 = we close the question in one move' },
];

export const OAE_SECTIONS = [
  { number: 1, title: 'You and OAE' },
  { number: 2, title: 'What we are' },
  { number: 3, title: 'Quick calibration', intro: 'Slide each from 0 to 10. Go with your gut, do not calculate.' },
  { number: 4, title: 'The buyer' },
  { number: 5, title: 'Value and proof' },
  { number: 6, title: 'The market' },
  { number: 7, title: 'Last word' },
  { number: 8, title: 'About you' },
];

export const OAE_QUESTIONS = [
  { id: 'q1_join_reason', section: 1, number: 'Q1', label: 'Why did you join OAE? What made you say yes? Tell it as a short story, not a job description.', type: 'longtext' },
  { id: 'q2_customer_frequency', section: 1, number: 'Q2', label: 'How often do you speak directly with customers or prospective customers?', type: 'single', chartType: 'count', options: ['Most days', 'Weekly', 'Monthly, or at big moments (demos, negotiations, escalations)', 'Rarely or never'] },
  { id: 'q3_what_we_do', section: 2, number: 'Q3', label: 'In one sentence, in your own words: what does Open Access Energy do? Write it the way you would say it to a smart friend at a braai, not the way the website says it.', type: 'longtext' },
  { id: 'q4_prospect_lift', section: 2, number: 'Q4', label: 'A prospect leaves their first meeting with us. In the lift, a colleague asks them: "So what do they actually do?" Write down, word for word, what you think the prospect says.', type: 'longtext' },
  { id: 'q5_gerjo_sentence', section: 2, number: 'Q5', label: 'What would Gerjo say OAE is, in one sentence?', type: 'longtext', subField: true },
  { id: 'q5_you_sentence', section: 2, number: 'Q5', label: 'And what would you say?', type: 'longtext', subField: true, helper: 'It is completely fine if they differ, that is the point of asking.' },
  { id: 'q6_today_type', section: 2, number: 'Q6', label: 'Which of these feels most true of what OAE is today? Pick one.', type: 'single', chartType: 'count', options: OAE_Q6_OPTIONS, allowOther: true },
  { id: 'q6_today_other', section: 2, number: 'Q6', label: 'Other (today)', type: 'longtext', requiredIf: (v) => v.q6_today_type === 'Something else' },
  { id: 'q6a_future_type', section: 2, number: 'Q6a', label: 'Which one should we be in three years?', type: 'single', chartType: 'count', options: OAE_Q6_OPTIONS, allowOther: true },
  { id: 'q6a_future_other', section: 2, number: 'Q6a', label: 'Other (future)', type: 'longtext', requiredIf: (v) => v.q6a_future_type === 'Something else' },
  { id: 'q6a_change_required', section: 2, number: 'Q6a', label: 'What has to change to get there? If your answer is the same as today, say why.', type: 'longtext' },
  { id: 'q7_three_words', section: 2, number: 'Q7', label: 'Describe OAE in exactly three words. Not a slogan, just the three honest words.', type: 'array', minItems: 3 },
  { id: 's1_website_clarity', section: 3, number: 'S1', label: OAE_SLIDERS[0].label, type: 'slider', chartType: 'slider' },
  { id: 's2_buyer_picture', section: 3, number: 'S2', label: OAE_SLIDERS[1].label, type: 'slider', chartType: 'slider' },
  { id: 's3_team_alignment', section: 3, number: 'S3', label: OAE_SLIDERS[2].label, type: 'slider', chartType: 'slider' },
  { id: 's4_proof_strength', section: 3, number: 'S4', label: OAE_SLIDERS[3].label, type: 'slider', chartType: 'slider' },
  { id: 's5_cfo_safety', section: 3, number: 'S5', label: OAE_SLIDERS[4].label, type: 'slider', chartType: 'slider' },
  { id: 'q8_buyer_description', section: 4, number: 'Q8', label: 'Picture our single most important customer, the one the company\'s future depends on winning. Describe the person, not the company: their role, the operation they run, what a normal Tuesday looks like for them.', type: 'longtext' },
  { id: 'q9_main_obstacle', section: 4, number: 'Q9', label: 'What is the main thing stopping that person from signing with us?', type: 'longtext' },
  { id: 'q10_biggest_fear', section: 4, number: 'Q10', label: 'And what is their biggest fear? Not the biggest cost, the biggest fear.', type: 'longtext' },
  { id: 'q11_lost_deal_story', section: 4, number: 'Q11', label: 'Now a memory, not an opinion. Think of the last specific deal we lost, or the prospect who went quiet. What actually happened, step by step? Who were they, what meetings happened, what was said, when did it stall?', type: 'longtext' },
  { id: 'q11a_why_died', section: 4, number: 'Q11a', label: 'And in your view, why did that one die?', type: 'longtext' },
  { id: 'q12_customer_quote', section: 4, number: 'Q12', label: 'What is the last thing you heard an actual customer or prospect say, in a meeting, on a call, in an email, that stuck with you? Quote it as closely as you can remember, and say why it stuck.', type: 'longtext' },
  { id: 'q13_why_choose', section: 5, number: 'Q13', label: 'Complete this sentence in your own words: "Businesses should choose OAE because ______."', type: 'longtext' },
  { id: 'q14_strongest_proof', section: 5, number: 'Q14', label: 'What is the single strongest piece of proof we have that OAE works? One thing only: a number, a client, a transaction, a result. The thing you would show a sceptic.', type: 'longtext' },
  { id: 'q15a_most_true', section: 5, number: 'Q15a', label: 'Which is the most true of OAE today? Pick one.', type: 'single', chartType: 'count', options: ['A', 'B', 'C', 'D'], optionLabels: OAE_Q15_SENTENCES },
  { id: 'q15b_cfo_meeting', section: 5, number: 'Q15b', label: 'Which would make a CFO who has never heard of us most likely to ask for a meeting? Pick one.', type: 'single', chartType: 'count', options: ['A', 'B', 'C', 'D'], optionLabels: OAE_Q15_SENTENCES },
  { id: 'q15c_better_sentence', section: 5, number: 'Q15c', label: 'If your two picks differ, say why in a line. And if you can write a sentence that beats all four, write it here. If your picks were the same, just write "same" and move on.', type: 'longtext' },
  { id: 'q16_overclaimed', section: 5, number: 'Q16', label: 'What do we currently say about ourselves, anywhere: website, decks, sales calls, that you privately suspect is not quite true yet, or is overclaimed? And if you could change one thing about how we describe ourselves publicly, what would it be? This answer is the reason the questionnaire is confidential to Laura. Be honest.', type: 'longtext' },
  { id: 'q17_lose_to_ranking', section: 6, number: 'Q17', label: 'When we lose, who or what do we actually lose to? Rank whatever applies, add anything missing.', type: 'rank' },
  { id: 'q17_other', section: 6, number: 'Q17', label: 'Other (lose to)', type: 'longtext' },
  { id: 'q18_jargon_comfort', section: 6, number: 'Q18', label: 'Which of these would you happily use, unexplained, in a first conversation with a brand-new buyer? Tick all that apply.', type: 'multi', chartType: 'count', options: OAE_Q18_OPTIONS, exclusiveOption: 'None of these, I would explain everything in plain language first' },
  { id: 'q19_if_disappeared', section: 6, number: 'Q19', label: 'If OAE disappeared tomorrow, what would our current customers genuinely do? Say it plainly.', type: 'longtext' },
  { id: 'q20_stress_test', section: 6, number: 'Q20', label: 'Stress test. Fifty qualified buyers arrive tomorrow, all wanting to transact. What breaks first?', type: 'longtext' },
  { id: 'q21_turn_away', section: 6, number: 'Q21', label: 'Describe a customer we should politely turn away. Who is wrong for us right now, even if they are waving money?', type: 'longtext' },
  { id: 'q22_magic_wand', section: 7, number: 'Q22', label: 'Magic wand. It is 18 months from now and OAE is the company everyone in the energy sector is talking about. What happened? Tell it as a short story, two or three sentences.', type: 'longtext' },
  { id: 'q23_anything_else', section: 7, number: 'Q23', label: 'Anything you want to say that no question asked? Last word is yours.', type: 'longtext', required: false },
  { id: 'respondent_name', section: 8, number: 'Q24', label: 'Your name.', type: 'shorttext' },
  { id: 'respondent_role', section: 8, number: 'Q25', label: 'Your role, in your own words. Not the job title, what you actually do all day.', type: 'longtext' },
];

export function validateSection(sectionNum, values) {
  const sectionQuestions = OAE_QUESTIONS.filter(q => q.section === sectionNum && q.id !== 'q6_today_other' && q.id !== 'q6a_future_other' && q.id !== 'q17_other');
  const missing = [];

  for (const q of sectionQuestions) {
    const isRequired = q.required !== false;
    const conditionallyRequired = q.requiredIf ? q.requiredIf(values) : false;
    if (!isRequired && !conditionallyRequired) continue;

    const val = values[q.id];
    let isEmpty = false;

    if (q.type === 'longtext' || q.type === 'shorttext') {
      isEmpty = !val || !val.trim();
    } else if (q.type === 'single') {
      isEmpty = !val;
    } else if (q.type === 'multi' || q.type === 'rank') {
      isEmpty = !val || val.length === 0;
    } else if (q.type === 'array') {
      const min = q.minItems || 1;
      isEmpty = !val || val.length < min || val.some(v => !v || !v.trim());
    } else if (q.type === 'slider') {
      isEmpty = val === null || val === undefined;
    }

    if (isEmpty) missing.push(q.id);
  }

  if (values.q6_today_type === 'Something else' && (!values.q6_today_other || !values.q6_today_other.trim())) {
    missing.push('q6_today_other');
  }
  if (values.q6a_future_type === 'Something else' && (!values.q6a_future_other || !values.q6a_future_other.trim())) {
    missing.push('q6a_future_other');
  }

  return missing;
}