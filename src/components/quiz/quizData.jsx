export const QUESTIONS = [
  {
    id: "q0",
    question: "What are you working on right now?",
    options: [
      { letter: "A", text: "My career or my life direction" },
      { letter: "B", text: "A business I am building, scaling, or repositioning" },
      { letter: "C", text: "My identity and who I am becoming" },
      { letter: "D", text: "The relationships and structures around me" },
      { letter: "E", text: "I am between things and not sure what is next" },
    ],
  },
  {
    id: "q1",
    question: "Where are you in your journey?",
    options: [
      { letter: "A", text: "Starting out. Building something new or starting over after a major change" },
      { letter: "B", text: "Building. I have something going and I need to figure out the next stage" },
      { letter: "C", text: "Repositioning. What I have built no longer fits, and I need to figure out what's next" },
      { letter: "D", text: "At a threshold. I have built something significant and I am ready for the next major chapter" },
      { letter: "E", text: "Established. My business is running and I need senior strategic and brand direction" },
      { letter: "F", text: "Returning. I have been through a major life event and I need to find myself again" },
    ],
  },
  {
    id: "q2",
    question: "What do you need most right now?",
    options: [
      { letter: "A", text: "Clarity. I am stuck and cannot see the path forward" },
      { letter: "B", text: "Depth. I know what is broken and I need someone to help me work through it properly" },
      { letter: "C", text: "Senior partnership. I have a real chapter ahead and I need someone to walk it with me" },
      { letter: "D", text: "The methodology. I want to do this work in my own time" },
      { letter: "E", text: "Business strategy and brand direction. The foundation of my business is what needs work" },
      { letter: "F", text: "A diagnosis. I am not sure what is actually wrong, and I want a senior look before I decide anything" },
    ],
  },
  {
    id: "q3",
    question: "How much time can you realistically commit?",
    options: [
      { letter: "A", text: "One focused session, then I want to know what to do next" },
      { letter: "B", text: "One full day of concentrated work" },
      { letter: "C", text: "Four weeks, with structured calls and written outputs" },
      { letter: "D", text: "Three months of sustained engagement" },
      { letter: "E", text: "Six months or more of strategic partnership" },
      { letter: "F", text: "My own time, at my own pace, alongside other commitments" },
    ],
  },
  {
    id: "q4",
    question: "What have you tried before?",
    options: [
      { letter: "A", text: "Books, podcasts, self-reflection, journaling" },
      { letter: "B", text: "Therapy or counselling" },
      { letter: "C", text: "Previous coaching that did not stick" },
      { letter: "D", text: "Multiple modalities. Some helped, none fully landed" },
      { letter: "E", text: "Strategic consultants or business advisors for my company" },
      { letter: "F", text: "Nothing structured yet" },
    ],
  },
  {
    id: "q5",
    question: "What are you ready to invest in right now?",
    options: [
      { letter: "A", text: "Something accessible and structured to start" },
      { letter: "B", text: "A senior engagement that matches the chapter I am stepping into" },
      { letter: "C", text: "Self-paced work I can do in my own time" },
      { letter: "D", text: "Strategic work for my business" },
      { letter: "E", text: "A diagnostic first, then I will decide what's next" },
      { letter: "F", text: "Concentrated time on one specific thing" },
    ],
  },
  {
    id: "q6",
    question: "What is the question you most want answered right now?",
    options: [
      { letter: "A", text: "What am I actually doing with my life and what is next" },
      { letter: "B", text: "How do I build my business in a way that does not break me" },
      { letter: "C", text: "Who am I becoming, and how do I build a life that fits her" },
      { letter: "D", text: "What is actually costing me right now, and what should I do about it" },
      { letter: "E", text: "How do I scale or reposition my business properly" },
      { letter: "F", text: "How do I integrate the work into my life on my own terms" },
    ],
  },
  {
    id: "q7",
    question: "What outcome would make this work feel worth it?",
    options: [
      { letter: "A", text: "A clear plan I can execute, in four weeks" },
      { letter: "B", text: "Diagnosed clarity on what is actually happening, fast" },
      { letter: "C", text: "One concentrated day that breaks me out of where I am stuck" },
      { letter: "D", text: "Sustained senior partnership through a real chapter transition" },
      { letter: "E", text: "A senior brain that helps me build the business properly" },
      { letter: "F", text: "The methodology, integrated into my life, on my own time" },
    ],
  },
];

// Scoring weights
// offers: claritySprint | blueprint | alignmentAudit | recalibrationIntensive | seniorAdvisory | businessConsulting
const SCORING_MAP = [
  // Q1
  {
    A: { claritySprint: 1, seniorAdvisory: 1, alignmentAudit: 1 },
    B: { businessConsulting: 3 },
    C: { seniorAdvisory: 2, blueprint: 1 },
    D: { seniorAdvisory: 1, alignmentAudit: 1 },
    E: { alignmentAudit: 2, claritySprint: 1 },
  },
  // Q2
  {
    A: { claritySprint: 3, blueprint: 1 },
    B: { claritySprint: 2, businessConsulting: 1 },
    C: { claritySprint: 2, seniorAdvisory: 2 },
    D: { seniorAdvisory: 3, recalibrationIntensive: 1 },
    E: { businessConsulting: 3 },
    F: { seniorAdvisory: 2, recalibrationIntensive: 1 },
  },
  // Q3
  {
    A: { claritySprint: 3, alignmentAudit: 1 },
    B: { recalibrationIntensive: 3, seniorAdvisory: 2 },
    C: { seniorAdvisory: 3 },
    D: { blueprint: 3 },
    E: { businessConsulting: 3 },
    F: { alignmentAudit: 3 },
  },
  // Q4
  {
    A: { alignmentAudit: 3 },
    B: { recalibrationIntensive: 3 },
    C: { claritySprint: 3 },
    D: { seniorAdvisory: 3 },
    E: { seniorAdvisory: 3, businessConsulting: 2 },
    F: { blueprint: 3 },
  },
  // Q5
  {
    A: { claritySprint: 1, alignmentAudit: 1 },
    B: { seniorAdvisory: 1, claritySprint: 1 },
    C: { alignmentAudit: 1, recalibrationIntensive: 1 },
    D: { seniorAdvisory: 2, recalibrationIntensive: 1 },
    E: { businessConsulting: 2 },
    F: { alignmentAudit: 2, claritySprint: 1, blueprint: 1 },
  },
  // Q6
  {
    A: { claritySprint: 3, blueprint: 2 },
    B: { seniorAdvisory: 3, businessConsulting: 2 },
    C: { blueprint: 3 },
    D: { businessConsulting: 3 },
    E: { alignmentAudit: 3 },
    F: { recalibrationIntensive: 3 },
  },
  // Q7
  {
    A: { claritySprint: 2, seniorAdvisory: 1 },
    B: { businessConsulting: 2, seniorAdvisory: 1 },
    C: { seniorAdvisory: 3 },
    D: { alignmentAudit: 3 },
    E: { businessConsulting: 3 },
    F: { blueprint: 3 },
  },
  // Q8
  {
    A: { claritySprint: 3 },
    B: { alignmentAudit: 3 },
    C: { recalibrationIntensive: 3 },
    D: { seniorAdvisory: 3 },
    E: { businessConsulting: 3 },
    F: { blueprint: 3 },
  },
];

const OFFER_NAMES = {
  claritySprint: "The Clarity Sprint",
  blueprint: "The Aligned Woman Blueprint",
  alignmentAudit: "The Alignment Audit",
  recalibrationIntensive: "The Recalibration Intensive",
  seniorAdvisory: "The Senior Advisory",
  businessConsulting: "Business Consulting",
};

// Tiebreaker priority (lower index = higher priority)
const TIEBREAKER = [
  "seniorAdvisory",
  "businessConsulting",
  "claritySprint",
  "recalibrationIntensive",
  "alignmentAudit",
  "blueprint",
];

export function calculateScores(answers) {
  const scores = {
    claritySprint: 0,
    blueprint: 0,
    alignmentAudit: 0,
    recalibrationIntensive: 0,
    seniorAdvisory: 0,
    businessConsulting: 0,
  };

  Object.entries(answers).forEach(([key, selected]) => {
    const qIdx = parseInt(key.replace("q", ""), 10);
    const map = SCORING_MAP[qIdx];
    if (!map) return;
    selected.forEach((letter) => {
      const weights = map[letter] || {};
      Object.entries(weights).forEach(([offer, pts]) => {
        scores[offer] = (scores[offer] || 0) + pts;
      });
    });
  });

  // Sort by score descending, using tiebreaker for ties
  const sorted = Object.entries(scores).sort(([keyA, valA], [keyB, valB]) => {
    if (valB !== valA) return valB - valA;
    return TIEBREAKER.indexOf(keyA) - TIEBREAKER.indexOf(keyB);
  });

  const primaryKey = sorted[0][0];
  const primaryScore = sorted[0][1];
  const secondaryKey = sorted[1][0];
  const secondaryScore = sorted[1][1];

  const secondaryResult =
    primaryScore > 0 && secondaryScore >= primaryScore * 0.5
      ? OFFER_NAMES[secondaryKey]
      : null;

  return {
    scores,
    primaryResult: OFFER_NAMES[primaryKey],
    secondaryResult,
  };
}

export const BLUEPRINT_URL = "https://alignedwomanco.com/blueprint";
export { OFFER_NAMES };