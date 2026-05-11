// Triggered by entity automation when a QuizSubmission is created.
// Builds and schedules all emails for the correct nurture sequence.

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const DISCOVERY_URL = "https://calendly.com/hello-alignedwomanco/30min?month=2026-05";
const BLUEPRINT_URL = "https://alignedwomanco.com/blueprint";
const SERVICES_URL = "https://laurajanethomas.biz/services";
const CONSULTING_URL = "https://laurajanethomas.biz/consulting";
const SPRINT_URL = "https://laurajanethomas.biz/claritysprint";

// ─── HTML helpers ─────────────────────────────────────────────────────────────

function btn(label, href, bg = "#5C1F2E", color = "#F5EDE0") {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 8px;">
    <tr><td>
      <a href="${href}" target="_blank"
         style="display:inline-block;background:${bg};color:${color};text-decoration:none;
                padding:14px 28px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;
                font-family:'Inter',Arial,sans-serif;font-weight:600;">
        ${label} &rarr;
      </a>
    </td></tr>
  </table>`;
}

function secondaryBtn(label, href) {
  return btn(label, href, "#C2858B", "#F5EDE0");
}

function p(text) {
  return `<p style="font-family:'Inter',Arial,sans-serif;font-size:15px;line-height:1.7;color:rgba(26,10,14,0.75);margin:0 0 16px;">${text}</p>`;
}

function signOff(name = "Laura") {
  return `<p style="font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:18px;color:#5C1F2E;margin:32px 0 0;">${name}</p>`;
}

function wrap(bodyHtml) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#F5EDE0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EDE0;">
    <tr><td align="center" style="padding:48px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#F5EDE0;">
        <tr><td style="padding:0 0 32px;">
          <p style="font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#5C1F2E;margin:0;">
            laura<em>jane</em>thomas
          </p>
        </td></tr>
        <tr><td style="padding:0 0 48px;">${bodyHtml}</td></tr>
        <tr><td style="padding:24px 0 0;border-top:1px solid rgba(92,31,46,0.15);">
          <p style="font-family:'Inter',Arial,sans-serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(26,10,14,0.35);margin:0;">
            &copy; ${new Date().getFullYear()} Laura Jane Thomas &nbsp;|&nbsp; <a href="https://laurajanethomas.biz" style="color:rgba(26,10,14,0.35);">laurajanethomas.biz</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ─── Secondary result block ───────────────────────────────────────────────────

const SECONDARY_BLOCKS = {
  "The Clarity Sprint": {
    "The Senior Advisory": { body: "After the Clarity Sprint, many women move into the Senior Advisory for sustained partnership through their next chapter. Your Sprint investment is credited toward any Senior Advisory engagement booked within 60 days.", label: "SEE THE SENIOR ADVISORY", href: SERVICES_URL },
    "The Aligned Woman Blueprint": { body: "The Sprint includes one year of Blueprint access, but if you want to start the self-paced methodology immediately, the Blueprint is available now.", label: "JOIN THE BLUEPRINT", href: BLUEPRINT_URL },
    "The Alignment Audit": { body: "If you want a senior diagnostic before committing to the four-week Sprint, the Alignment Audit gives you that look first.", label: "SEE THE ALIGNMENT AUDIT", href: SERVICES_URL },
    "The Recalibration Intensive": { body: "If you want concentrated work in one day instead of structured coaching over four weeks, the Recalibration Intensive is the alternative format.", label: "SEE THE RECALIBRATION INTENSIVE", href: SERVICES_URL },
    "Business Consulting": { body: "If the business side of your situation needs senior strategic work alongside the personal coaching, business consulting is the second path.", label: "EXPLORE BUSINESS CONSULTING", href: CONSULTING_URL },
  },
  "The Aligned Woman Blueprint": {
    "The Clarity Sprint": { body: "Some women combine the Blueprint with the Clarity Sprint. The Sprint includes one year of Blueprint access and gives you live coaching alongside the methodology.", label: "SEE THE CLARITY SPRINT", href: SPRINT_URL },
    "The Alignment Audit": { body: "The Blueprint gives you the methodology. The Alignment Audit gives you a senior diagnostic before you decide what to focus on inside it.", label: "SEE THE ALIGNMENT AUDIT", href: SERVICES_URL },
    "The Recalibration Intensive": { body: "The Blueprint runs alongside any 1:1 engagement. If you want one focused day of senior attention while you also do the self-paced work, the Recalibration Intensive is the right pairing.", label: "SEE THE RECALIBRATION INTENSIVE", href: SERVICES_URL },
    "The Senior Advisory": { body: "The Blueprint gives you the methodology in your own time. The Senior Advisory gives you sustained senior partnership through a real chapter transition. Some women run both.", label: "SEE THE SENIOR ADVISORY", href: SERVICES_URL },
    "Business Consulting": { body: "If you are also running a business alongside this personal work, business consulting is the second path.", label: "EXPLORE BUSINESS CONSULTING", href: CONSULTING_URL },
  },
  "The Alignment Audit": {
    "The Clarity Sprint": { body: "If your situation calls for structured coaching over four weeks rather than a single diagnostic, the Clarity Sprint may be the better fit.", label: "SEE THE CLARITY SPRINT", href: SPRINT_URL },
    "The Aligned Woman Blueprint": { body: "If you want the methodology to start working with in your own time while you wait for the Audit session, the Blueprint is the self-paced path.", label: "JOIN THE BLUEPRINT", href: BLUEPRINT_URL },
    "The Recalibration Intensive": { body: "Some women follow the Audit with a Recalibration Intensive for concentrated work on what the Audit reveals.", label: "SEE THE RECALIBRATION INTENSIVE", href: SERVICES_URL },
    "The Senior Advisory": { body: "Many women begin with the Audit and then continue into the Senior Advisory. Your Audit fee is credited toward the Advisory if you upgrade within 60 days, so this becomes the diagnostic phase of a longer journey.", label: "SEE THE SENIOR ADVISORY", href: SERVICES_URL },
    "Business Consulting": { body: "If your situation involves both personal and business questions, the Audit can give you a senior diagnostic and business consulting can address the strategic side.", label: "EXPLORE BUSINESS CONSULTING", href: CONSULTING_URL },
  },
  "The Recalibration Intensive": {
    "The Clarity Sprint": { body: "If you want structured work spread over four weeks instead of one concentrated day, the Clarity Sprint is the alternative.", label: "SEE THE CLARITY SPRINT", href: SPRINT_URL },
    "The Aligned Woman Blueprint": { body: "The Intensive gives you one focused day. The Blueprint gives you the methodology to continue the work in your own time after the day ends.", label: "JOIN THE BLUEPRINT", href: BLUEPRINT_URL },
    "The Alignment Audit": { body: "If you want a diagnostic before committing to the full Intensive, the Alignment Audit gives you that look first.", label: "SEE THE ALIGNMENT AUDIT", href: SERVICES_URL },
    "The Senior Advisory": { body: "Some women begin with the Intensive and move into the Senior Advisory afterwards to sustain the work over 90 days. The Intensive can stand alone or become the launch point for a longer engagement.", label: "SEE THE SENIOR ADVISORY", href: SERVICES_URL },
    "Business Consulting": { body: "If your situation has a business dimension as well as a personal one, business consulting is the second path.", label: "EXPLORE BUSINESS CONSULTING", href: CONSULTING_URL },
  },
  "The Senior Advisory": {
    "The Clarity Sprint": { body: "If 90 days feels like too long a commitment for where you are, the Clarity Sprint is a four-week alternative that often precedes the Advisory.", label: "SEE THE CLARITY SPRINT", href: SPRINT_URL },
    "The Aligned Woman Blueprint": { body: "The Senior Advisory includes three Blueprint seats. If you want to start the self-paced methodology immediately while you decide on the Advisory, the Blueprint is the entry point.", label: "JOIN THE BLUEPRINT", href: BLUEPRINT_URL },
    "The Alignment Audit": { body: "If you want to test the working relationship before committing to 90 days, the Alignment Audit is the senior diagnostic that often precedes the Senior Advisory. Your Audit fee is credited toward the Advisory if you upgrade within 60 days.", label: "START WITH THE ALIGNMENT AUDIT", href: SERVICES_URL },
    "The Recalibration Intensive": { body: "The Intensive can be a one-day launch point into the longer engagement. Some clients book it first and continue into the Advisory afterwards.", label: "SEE THE RECALIBRATION INTENSIVE", href: SERVICES_URL },
    "Business Consulting": { body: "If you are running a business alongside this personal chapter, the Senior Advisory can run in parallel with business consulting.", label: "EXPLORE BUSINESS CONSULTING", href: CONSULTING_URL },
  },
  "Business Consulting": {
    "The Senior Advisory": { body: "Some women founders run both the personal work and the business work in parallel. If you want strategic partnership for both the company and the woman building it, the Senior Advisory can run alongside business consulting.", label: "SEE THE SENIOR ADVISORY", href: SERVICES_URL },
    "The Clarity Sprint": { body: "If the personal side of your situation needs structured coaching in four weeks alongside the business work, the Clarity Sprint is the second path.", label: "SEE THE CLARITY SPRINT", href: SPRINT_URL },
    "The Aligned Woman Blueprint": { body: "If you want the methodology to integrate into your life while the business work happens, the Blueprint is the self-paced path.", label: "JOIN THE BLUEPRINT", href: BLUEPRINT_URL },
    "The Alignment Audit": { body: "If you are not sure whether the work is the business or you, the Alignment Audit is the senior diagnostic that helps clarify.", label: "SEE THE ALIGNMENT AUDIT", href: SERVICES_URL },
    "The Recalibration Intensive": { body: "If you want one focused day of senior attention on the personal side while the business consulting addresses the strategic side, the Recalibration Intensive is the second path.", label: "SEE THE RECALIBRATION INTENSIVE", href: SERVICES_URL },
  },
};

function buildSecondaryBlock(primaryResult, secondaryResult) {
  if (!secondaryResult) return "";
  const block = SECONDARY_BLOCKS[primaryResult]?.[secondaryResult];
  if (!block) return "";
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
      <tr><td style="border-top:2px solid #C2858B;padding-top:28px;">
        <p style="font-family:'Inter',Arial,sans-serif;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#5C1F2E;font-weight:600;margin:0 0 14px;">Recommended Next Step</p>
        ${p(block.body)}
        ${secondaryBtn(block.label, block.href)}
      </td></tr>
    </table>`;
}

function discoverySection() {
  return `
    ${p('Not quite sure? If you want to talk through the right path first, book a free discovery call.')}
    ${btn("BOOK A FREE DISCOVERY CALL", DISCOVERY_URL, "#C2858B", "#F5EDE0")}`;
}

// ─── Email body builders ──────────────────────────────────────────────────────

function buildClaritySprint(emailNum, firstName, primaryResult, secondaryResult) {
  switch (emailNum) {
    case 1: return {
      subject: "Your aligned path is the Clarity Sprint",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("Based on your answers, your aligned path is the Clarity Sprint. You told me you are stuck and ready for a structured plan, not a long engagement. You are starting something, building something, or repositioning what's next, and you need someone to help you think clearly enough to make your next move.")}
        ${p("The Clarity Sprint is built for exactly this. Four weeks. Four strategic coaching calls. One clear plan forward. You leave with a written diagnostic of where you actually are, a 30-day action plan calibrated to your capacity, a vision document, and one full year of access to The Aligned Woman Blueprint to keep the work alive long after we finish.")}
        ${p("It is limited to three women at a time. Currently open.")}
        ${btn("LEARN MORE ABOUT THE CLARITY SPRINT", SPRINT_URL)}
        ${buildSecondaryBlock(primaryResult, secondaryResult)}
        ${discoverySection()}
        ${signOff("Warmly, Laura")}
      `)
    };
    case 2: return {
      subject: "Why I built the Clarity Sprint",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("Most coaching promises transformation and delivers conversation. Weeks of open-ended sessions with no structure, no written outputs, and no plan you can hold in your hands at the end.")}
        ${p("I built the Clarity Sprint differently because I knew that what high-functioning women actually need is not more conversation. It is a structured plan built by someone who can see what they cannot see.")}
        ${p("The Sprint is time-boxed at four weeks because clarity does not require a six-month engagement. It requires the right questions in the right sequence, with someone senior enough to know which questions matter.")}
        ${p("It produces written outputs because a plan that lives only in your head is not really a plan. You leave with a written diagnostic of where you actually are, a 30-day action plan calibrated to your capacity, and a vision document that names who you are becoming, not just what you are doing.")}
        ${p("It bridges into the methodology because the work does not stop when our four weeks end. One full year of access to The Aligned Woman Blueprint means you have the framework to carry forward long after the Sprint closes.")}
        ${p("If that sounds like you, you can read the full details here.")}
        ${btn("SEE THE FULL SPRINT DETAILS", SPRINT_URL)}
        ${signOff("I will be in touch again in a few days with a client story. Laura")}
      `)
    };
    case 3: return {
      subject: "What four weeks actually looks like",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("She had been in financial services for fourteen years. Senior enough that leaving felt like losing an identity. Tired enough that staying felt like slow erosion.")}
        ${p("She had read every book. Spoken to her therapist. Had conversations with three coaches, two mentors, her closest friends. She had built three exit plans, none of which moved her closer to leaving.")}
        ${p("When she came to the Sprint, she came with the polished version of her situation. Week 1 mapped where she actually was. Not the polished version. The honest one. The professional identity she had outgrown. The financial fear running her decisions in the background. The relationships built around an older version of herself.")}
        ${p("Week 2 identified what was costing her. Not abstractly. Specifically, structurally, operationally. What the drift was taking from her every month.")}
        ${p("Week 3 built the vision with architecture instead of aspiration. What the next chapter actually looked like, sequenced, resourced, real.")}
        ${p("Week 4 built the 30-day action plan. Not a list of intentions. A plan with owners, dates, and decisions already made.")}
        ${p("She left her job three months later. Not impulsively. Not in fear. Methodically, with a plan she had built herself and a coach who had helped her see what she could not see alone.")}
        ${btn("BOOK YOUR CLARITY SPRINT", SPRINT_URL)}
        ${signOff("Laura")}
      `)
    };
    case 4: return {
      subject: "A note on timing",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("This is the last email I will send you about the Sprint specifically.")}
        ${p("I do not believe in pressure-based marketing. No countdown timers. No fake scarcity. No emails designed to create urgency that does not exist.")}
        ${p("The reason you took the quiz, opened these emails, and read this far is that some part of you already knows the answer. I trust that.")}
        ${p("You have three options from here.")}
        ${p("If the Sprint feels right, book it. The details are at the link below. Limited to three women at a time.")}
        ${p("If you are sitting between the Sprint and 1:1 coaching and not sure which is right, book a discovery call. It is 20 minutes, a conversation not a pitch, and it will tell you what you actually need.")}
        ${p("If you are not ready yet, that is fine. You will hear from me through The Aligned Letter. One core idea per email. No marketing conventions.")}
        ${btn("BOOK YOUR SPRINT", SPRINT_URL)}
        ${btn("BOOK A FREE DISCOVERY CALL", DISCOVERY_URL, "#C2858B", "#F5EDE0")}
        ${signOff("Laura")}
      `)
    };
    default: return null;
  }
}

function buildBlueprint(emailNum, firstName, primaryResult, secondaryResult) {
  switch (emailNum) {
    case 1: return {
      subject: "Your aligned path is The Aligned Woman Blueprint",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("Based on your answers, your aligned path is The Aligned Woman Blueprint. You told me you are ready to do this work but you are not yet ready for live coaching, or you want to integrate it into your life on your own terms.")}
        ${p("The Aligned Woman Blueprint is built for exactly this. It is the complete A.L.I.V.E. Method, the same methodology I run in my 1:1 work, structured as a self-paced course inside The Aligned Woman Co. Mind, body, and spirit work integrated with strategic clarity. Modules you move through at your own pace, with the option to do the work alongside the women you love.")}
        ${p("The founding member offer is open now.")}
        ${btn("JOIN THE BLUEPRINT", BLUEPRINT_URL)}
        ${buildSecondaryBlock(primaryResult, secondaryResult)}
        ${p("Not quite sure? If you want to talk through whether the self-paced path is right for you, book a free discovery call.")}
        ${btn("BOOK A FREE DISCOVERY CALL", DISCOVERY_URL, "#C2858B", "#F5EDE0")}
        ${signOff("Warmly, Laura")}
      `)
    };
    case 2: return {
      subject: "Why I built the Blueprint as a course",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("I built the Blueprint as a self-paced course instead of a live group programme because the women who need this work are already carrying full lives.")}
        ${p("Most group programmes assume women can pause their lives to show up at a fixed time every week. This kind of reflection is deeply personal and happens more truthfully in private.")}
        ${p("Inside the Blueprint: 12 world-class experts across psychology, women's health, nervous system regulation, trauma, leadership, financial literacy, behavioural rewiring, relationships, purpose, visibility, and personal growth. Normally accessing this expertise individually would cost over R116,000. The founding member rate is R3,997.")}
        ${p("Five modules built around the A.L.I.V.E. Method stages. Expert-led lessons, practical frameworks, guided exercises, somatic tools, nervous-system regulation practices, integration work. Move through at your own time. Revisit whenever you need to.")}
        ${btn("JOIN THE BLUEPRINT", BLUEPRINT_URL)}
        ${signOff("I will be in touch again in a few days. Laura")}
      `)
    };
    case 3: return {
      subject: "Your own time, your own terms",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("This is the last email I will send you about the Blueprint specifically.")}
        ${p("The reason the self-paced path matters is that the woman doing this work has to be the one driving it. The Blueprint is built for the woman ready to be driven by herself.")}
        ${p("Take the modules at your pace. Sit with the questions as long as you need to. Skip nothing, rush nothing. When you are finished, you will have integrated the A.L.I.V.E. Method into your operating system as a methodology you carry forward.")}
        ${p("If that is the work you are ready for, join the founding member offer.")}
        ${p("If you would prefer live coaching alongside the methodology, look at the Clarity Sprint or book a discovery call. Either path is real. Choose the one that fits where you actually are.")}
        ${p("You will hear from me through The Aligned Letter from here.")}
        ${btn("JOIN THE BLUEPRINT", BLUEPRINT_URL)}
        ${btn("BOOK A FREE DISCOVERY CALL", DISCOVERY_URL, "#C2858B", "#F5EDE0")}
        ${signOff("Laura")}
      `)
    };
    default: return null;
  }
}

function buildAlignmentAudit(emailNum, firstName, primaryResult, secondaryResult) {
  switch (emailNum) {
    case 1: return {
      subject: "Your aligned path is the Alignment Audit",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("Based on your answers, your aligned path is the Alignment Audit. You told me you are not sure exactly what is happening underneath your current situation, and you want a senior look before you commit to deeper work.")}
        ${p("The Alignment Audit is built for exactly this. It is a 60-minute structured diagnostic session where I look at where you actually are, identify the specific misalignments costing you, and give you a clear written diagnostic and a recommended path forward, delivered within 72 hours.")}
        ${p("This is the senior advisory equivalent of a strategic consultation. You leave knowing exactly what you are working with and what to do next, with no obligation to continue.")}
        ${btn("BOOK THE ALIGNMENT AUDIT", SERVICES_URL)}
        ${buildSecondaryBlock(primaryResult, secondaryResult)}
        ${p("Not quite sure?")}
        ${btn("BOOK A FREE DISCOVERY CALL", DISCOVERY_URL, "#C2858B", "#F5EDE0")}
        ${signOff("Warmly, Laura")}
      `)
    };
    case 2: return {
      subject: "Why a diagnostic first",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("Most coaching starts with a discovery call that is really a sales conversation. You come in with a real problem, you leave with a proposal.")}
        ${p("The Alignment Audit is different. It is a paid structured diagnostic, not a sales call. In 60 minutes, I look at where you actually are. Then I deliver a written Alignment Diagnostic within 72 hours, naming the misalignments specifically, structurally, and operationally.")}
        ${p("If the Senior Advisory is the right path after the Audit, your Audit fee is credited toward the Advisory if booked within 60 days. If a different path is right, I will tell you. If no further engagement is needed at all, I will tell you that too.")}
        ${btn("BOOK THE AUDIT", SERVICES_URL)}
        ${signOff("Laura")}
      `)
    };
    case 3: return {
      subject: "What gets revealed in 60 minutes",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("She ran a wellness business doing about R2 million in revenue. Successful externally. Exhausted underneath. She did not know whether to pivot, scale, sell, or step back.")}
        ${p("The Audit revealed three things she had not been able to see from inside her situation.")}
        ${p("The business was no longer aligned with the woman she had become. The brand had been built for the five-year-ago version of herself, and the market was responding to that version, not the current one.")}
        ${p("The cost of staying was not financial but structural. She was paying it in opportunity cost, not revenue. What she could not build while running the business as it was was the real number.")}
        ${p("She did not need to sell or pivot. She needed to restructure. The same business, different positioning, different client tier, different operating model.")}
        ${p("The written diagnostic gave her the language to act. She booked the Senior Advisory. Restructured over 90 days.")}
        ${btn("BOOK THE AUDIT", SERVICES_URL)}
        ${signOff("Laura")}
      `)
    };
    case 4: return {
      subject: "A diagnosis before a decision",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("This is the last email I will send you about the Audit specifically.")}
        ${p("Most women avoid a senior diagnostic because they are afraid of what it might reveal. But the cost of not knowing is almost always higher than the cost of knowing.")}
        ${p("Months of slow drift. Expensive workarounds for a problem you have not named. Quiet erosion of what you are building. That is the cost of not looking.")}
        ${p("The cost of looking is 60 minutes and a written document.")}
        ${p("If you have been sitting on questions for months, book the Audit. If you would prefer a no-pressure conversation first, book a discovery call. Either way, the work starts with looking.")}
        ${btn("BOOK THE AUDIT", SERVICES_URL)}
        ${btn("BOOK A FREE DISCOVERY CALL", DISCOVERY_URL, "#C2858B", "#F5EDE0")}
        ${signOff("Laura")}
      `)
    };
    default: return null;
  }
}

function buildRecalibrationIntensive(emailNum, firstName, primaryResult, secondaryResult) {
  switch (emailNum) {
    case 1: return {
      subject: "Your aligned path is the Recalibration Intensive",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("Based on your answers, your aligned path is the Recalibration Intensive. You told me you know what is not working, and you want to do focused work on it without committing to a long engagement.")}
        ${p("The Recalibration Intensive is built for exactly this. It is a one-day deep dive where we move through The A.L.I.V.E. Method together in concentrated form. Pre-intensive intake to make the day sharp, the full intensive itself, and follow-up integration support to embed what we work through.")}
        ${p("This is the right fit for the woman who knows the issue, is ready to move on it, and wants depth without a 90-day timeline.")}
        ${btn("BOOK THE RECALIBRATION INTENSIVE", SERVICES_URL)}
        ${buildSecondaryBlock(primaryResult, secondaryResult)}
        ${p("Not quite sure?")}
        ${btn("BOOK A FREE DISCOVERY CALL", DISCOVERY_URL, "#C2858B", "#F5EDE0")}
        ${signOff("Warmly, Laura")}
      `)
    };
    case 2: return {
      subject: "Why one day works",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("Depth is a function of concentration, not duration. The Intensive works because of what happens before, during, and after the day itself.")}
        ${p("The pre-intensive intake means you do not arrive cold. By the time we start, I already know where you are and what the work needs to be. We do not spend the first two hours getting oriented.")}
        ${p("The day is structured around the A.L.I.V.E. Method compressed into focused sessions. Not a workshop. Not a training. A senior working session with one agenda: what is actually happening, what needs to shift, and what moves you make in the next 30 days.")}
        ${p("The follow-up integration support prevents the workshop-high-then-nothing-sticks problem. The work is embedded, not just experienced.")}
        ${p("This is the right format for the time-poor, decision-ready woman who is willing to invest concentrated attention in one focused day.")}
        ${btn("SEE THE INTENSIVE DETAILS", SERVICES_URL)}
        ${signOff("Laura")}
      `)
    };
    case 3: return {
      subject: "What happens in one day",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("She was three months past a major personal loss. Strong career, stable life, completely unmoored. She did not need long-term therapy. She had already done that. She needed someone to help her reorient.")}
        ${p("The pre-intake the week before meant the day itself was sharp. No warm-up time lost to background. The morning worked through awareness and liberation. We named what she was carrying, the nervous system patterns running underneath her decisions, the identity she was performing in public while something else was happening underneath.")}
        ${p("The afternoon built intentional action, vision, and embodiment. What she actually wanted, not what she should want. The architecture for the next chapter, not the aspiration of it.")}
        ${p("She left with a clear sense of direction and three specific moves to make in the next 30 days. The follow-up integration made sure she did the moves.")}
        ${btn("BOOK THE INTENSIVE", SERVICES_URL)}
        ${signOff("Laura")}
      `)
    };
    case 4: return {
      subject: "Depth, not duration",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("This is the last email I will send you about the Intensive specifically.")}
        ${p("You already know the work you are ready to do. I am not looking to convince you. I am looking to help you find the right format.")}
        ${p("The Intensive is right if you are ready to give one day of concentrated attention to one major question. If you have been circling it for months and you want to stop circling.")}
        ${p("If you are not sure whether your issue needs an Intensive or a longer engagement, the discovery call is for that. You do not need to figure it out alone.")}
        ${btn("BOOK THE INTENSIVE", SERVICES_URL)}
        ${btn("BOOK A FREE DISCOVERY CALL", DISCOVERY_URL, "#C2858B", "#F5EDE0")}
        ${signOff("Laura")}
      `)
    };
    default: return null;
  }
}

function buildSeniorAdvisory(emailNum, firstName, primaryResult, secondaryResult) {
  switch (emailNum) {
    case 1: return {
      subject: "Your aligned path is the Senior Advisory",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("Based on your answers, your aligned path is the Senior Advisory. You told me you are at a meaningful chapter transition, with resources and experience already behind you, and you need sustained senior partnership through what comes next.")}
        ${p("The Senior Advisory is built for exactly this. It is a 90-day private engagement designed for the ambitious woman building what's next. Whether that is leaving corporate, evolving a business already built, repositioning into a new chapter, or building the life that finally matches your resources.")}
        ${p("You get a senior diagnostic, two strategic sessions per month, the 90-day priority structure, the renegotiated standards document, the system renegotiation session, strategic async support, the forward roadmap session, and three seats inside The Aligned Woman Blueprint.")}
        ${btn("APPLY FOR THE SENIOR ADVISORY", SERVICES_URL)}
        ${buildSecondaryBlock(primaryResult, secondaryResult)}
        ${p("Not quite sure?")}
        ${btn("BOOK A FREE DISCOVERY CALL", DISCOVERY_URL, "#C2858B", "#F5EDE0")}
        ${signOff("Warmly, Laura")}
      `)
    };
    case 2: return {
      subject: "Why I built the Advisory at 90 days",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("A chapter transition does not need a year of weekly conversation. It needs 90 days of structured senior partnership.")}
        ${p("The first 30 days are diagnosis and design. Senior Diagnostic Intake. Written Misalignment Diagnostic. 90-Day Priority Structure. We build the foundation for everything that follows.")}
        ${p("The middle 30 days are renegotiation and rebuilding. Renegotiated Standards Document. System Renegotiation Session. Two strategic sessions monthly plus async. The work that actually shifts the structure of how you operate.")}
        ${p("The final 30 days are consolidation. Forward Roadmap Session for the next 12 months. Three Blueprint seats for the women alongside you. You leave with a structured year ahead, not just a good month behind you.")}
        ${p("By the end of 90 days, you are having different conversations, making different decisions, and standing on different ground.")}
        ${btn("SEE THE FULL ADVISORY DETAILS", SERVICES_URL)}
        ${signOff("Laura")}
      `)
    };
    case 3: return {
      subject: "A client who took this path",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("Senior executive. Late forties. Exiting a long career in finance with substantial runway and no clear sense of what was next.")}
        ${p("She had spent the previous year reading, journaling, exploring. She had three half-formed plans and no commitment to any of them.")}
        ${p("The first month of the Advisory revealed why. She had been thinking about her next chapter in the language of her old chapter. The frame was the problem, not the options. She was measuring what was next against what she had already built, which made everything feel like a step down.")}
        ${p("The middle month was renegotiation. We restructured how she thought about success. Renegotiated the commitments she had been holding from habit rather than choice. Repositioned the relationships that had been built around the old version of her.")}
        ${p("The final month built the 12-month architecture. She launched the first phase of her new chapter in week 11.")}
        ${p("What changed was not the plan. What changed was the woman building the plan.")}
        ${btn("APPLY FOR THE SENIOR ADVISORY", SERVICES_URL)}
        ${signOff("Laura")}
      `)
    };
    case 4: return {
      subject: "A senior chapter deserves senior partnership",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("This is the last email I will send you about the Senior Advisory specifically.")}
        ${p("This offer exists for the woman who has built something significant, knows she is at a threshold, and has not yet found partnership that matches her altitude. She has tried therapy, coaching, personal development. None of it has held up against the specific structural challenge she is facing.")}
        ${p("The Senior Advisory is not for the woman starting out or needing a quick intervention. It is for the woman whose next chapter is significant enough to deserve sustained senior partnership.")}
        ${p("The application is open. The discovery call is 20 minutes, no pressure.")}
        ${btn("APPLY FOR THE SENIOR ADVISORY", SERVICES_URL)}
        ${btn("BOOK A FREE DISCOVERY CALL", DISCOVERY_URL, "#C2858B", "#F5EDE0")}
        ${signOff("Laura")}
      `)
    };
    default: return null;
  }
}

function buildBusinessConsulting(emailNum, firstName, primaryResult, secondaryResult) {
  switch (emailNum) {
    case 1: return {
      subject: "Your aligned path is Business Consulting",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("Based on your answers, your aligned path is Business Consulting. You told me you are building or scaling a business and you need senior strategic and creative direction in one partner.")}
        ${p("Business consulting is built for exactly this. The strongest brands are built on the right foundations, not the loudest launch. Whether you are launching something new or scaling something already built, the question is the same. Is the foundation underneath strong enough to hold what comes next.")}
        ${p("The work covers brand foundation and build, brand and business review, marketing strategy, brand development and creative direction, content and communication frameworks, team alignment and leadership support, and a custom growth playbook calibrated to your business.")}
        ${btn("INQUIRE ABOUT CONSULTING", CONSULTING_URL)}
        ${buildSecondaryBlock(primaryResult, secondaryResult)}
        ${p("Not quite sure?")}
        ${btn("BOOK A FREE DISCOVERY CALL", DISCOVERY_URL, "#C2858B", "#F5EDE0")}
        ${signOff("Warmly, Laura")}
      `)
    };
    case 2: return {
      subject: "Brand and strategy in one brain",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("Most businesses pay for fragmented work. A brand agency for identity. A marketing strategist for the plan. A creative director for the look. A copywriter for the words. Then they spend half their time coordinating between them.")}
        ${p("Consulting merges senior brand strategy, marketing strategy, and creative direction into one engagement. One brain holding all of it.")}
        ${p("If the brand is not selling you, we look at positioning, visual direction, copy, and architecture. If the brand is fine but marketing is leaking, we look at the funnel, customer journey, content engine, and channels. If the team is busy but the business is not compounding, we look at the operating model, priority structure, team alignment, and decision cadence.")}
        ${p("Most businesses need work in more than one area. Consulting does it as one coherent piece.")}
        ${btn("INQUIRE ABOUT CONSULTING", CONSULTING_URL)}
        ${signOff("Laura")}
      `)
    };
    case 3: return {
      subject: "What changes when the foundation is right",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("She ran a six-figure consultancy, two years in, growing through word of mouth. Her clients loved her. Revenue was healthy. She was burning out faster than the business was growing.")}
        ${p("The diagnosis revealed the problem. Her brand positioning was selling her as a generalist when her delivery had become highly specialised. She was attracting clients who needed less senior work, which meant she was draining her time on engagements that did not match her actual capability.")}
        ${p("The work was repositioning, not pivoting. The same business, new positioning at the senior level, new pricing, a new customer journey that filtered wrong-fit inquiries before they became wrong-fit clients.")}
        ${p("Six months later: revenue per engagement had tripled, hours had dropped, the business had stopped costing her health.")}
        ${btn("INQUIRE ABOUT CONSULTING", CONSULTING_URL)}
        ${signOff("Laura")}
      `)
    };
    case 4: return {
      subject: "Strictly business",
      html: wrap(`
        ${p(`Hi ${firstName},`)}
        ${p("This is the last email I will send you about business consulting specifically.")}
        ${p("Consulting and coaching are separate because they require different stances. Coaching is about the woman. Consulting is about the business.")}
        ${p("Some women are running businesses that have outgrown their current structure, but the woman herself is steady. That is the consulting path. Some women are running businesses that look fine on paper, but the woman is at a personal threshold. That is the coaching path. Some women are both. Consulting and the Senior Advisory run in parallel for that.")}
        ${p("If the work is clearly the business, the inquiry starts on the consulting page. If you are not sure whether the work is the business or you, the discovery call is for that.")}
        ${btn("INQUIRE ABOUT CONSULTING", CONSULTING_URL)}
        ${btn("BOOK A FREE DISCOVERY CALL", DISCOVERY_URL, "#C2858B", "#F5EDE0")}
        ${signOff("Laura")}
      `)
    };
    default: return null;
  }
}

function buildEmail(sequence, emailNum, firstName, primaryResult, secondaryResult) {
  switch (sequence) {
    case "clarity_sprint": return buildClaritySprint(emailNum, firstName, primaryResult, secondaryResult);
    case "blueprint": return buildBlueprint(emailNum, firstName, primaryResult, secondaryResult);
    case "alignment_audit": return buildAlignmentAudit(emailNum, firstName, primaryResult, secondaryResult);
    case "recalibration_intensive": return buildRecalibrationIntensive(emailNum, firstName, primaryResult, secondaryResult);
    case "senior_advisory": return buildSeniorAdvisory(emailNum, firstName, primaryResult, secondaryResult);
    case "business_consulting": return buildBusinessConsulting(emailNum, firstName, primaryResult, secondaryResult);
    default: return null;
  }
}

const RESULT_TO_SEQUENCE = {
  "The Clarity Sprint": { key: "clarity_sprint", count: 4 },
  "The Aligned Woman Blueprint": { key: "blueprint", count: 3 },
  "The Alignment Audit": { key: "alignment_audit", count: 4 },
  "The Recalibration Intensive": { key: "recalibration_intensive", count: 4 },
  "The Senior Advisory": { key: "senior_advisory", count: 4 },
  "Business Consulting": { key: "business_consulting", count: 4 },
};

// Days offset for each email number (0 = immediate)
const EMAIL_DELAYS_DAYS = [0, 2, 4, 7];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const submissionId = body?.event?.entity_id || body?.submissionId;
    if (!submissionId) {
      return Response.json({ error: "No submissionId provided" }, { status: 400 });
    }

    const submission = await base44.asServiceRole.entities.QuizSubmission.get(submissionId);
    if (!submission) {
      return Response.json({ error: "Submission not found" }, { status: 404 });
    }

    const { firstName, email, primaryResult, secondaryResult, created_date } = submission;
    const seqConfig = RESULT_TO_SEQUENCE[primaryResult];
    if (!seqConfig) {
      return Response.json({ error: `Unknown primaryResult: ${primaryResult}` }, { status: 400 });
    }

    const baseTime = new Date(created_date);

    const scheduled = [];
    for (let i = 0; i < seqConfig.count; i++) {
      const emailNum = i + 1;
      const delayDays = EMAIL_DELAYS_DAYS[i] || 0;
      const sendAt = new Date(baseTime.getTime() + delayDays * 24 * 60 * 60 * 1000);

      const built = buildEmail(seqConfig.key, emailNum, firstName, primaryResult, secondaryResult || null);
      if (!built) continue;

      await base44.asServiceRole.entities.ScheduledEmail.create({
        submissionId,
        toEmail: email,
        firstName,
        sequence: seqConfig.key,
        emailNumber: emailNum,
        subject: built.subject,
        htmlBody: built.html,
        scheduledAt: sendAt.toISOString(),
        status: "scheduled",
        primaryResult,
        secondaryResult: secondaryResult || null,
      });

      scheduled.push({ emailNum, sendAt: sendAt.toISOString() });
    }

    return Response.json({ success: true, scheduled });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});