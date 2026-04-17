import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SECTION_LABELS = [
  "Contact Details",
  "Business Foundation",
  "Operations, Budget & Delivery",
  "Current Marketing Assets",
  "Audience Insight",
  "Positioning & Differentiation",
  "Brand Truth",
  "Brand Essence",
  "Vision & Growth",
  "Legacy & Values",
];

const BUSINESS_QUESTIONS = [
  "What are you actually selling — not the category, but the outcome?",
  "If someone paid you tomorrow, what exactly would they receive?",
  "What would someone Google to find you, honestly?",
  "What problem are you solving that people are already paying to fix?",
  "Where does your business make money first, and where does it scale later?",
  "If this business worked perfectly, how would it generate revenue?",
  "If you could not sell your current offer, what would you sell instead?",
];

const AUDIENCE_QUESTIONS = [
  "Who frustrates you the most in your audience and why?",
  "Who do you want more of?",
  "What do your best clients have in common?",
  "What does your audience say they want vs. what they actually need?",
  "What are they tired of hearing in your industry?",
  "If your audience was in a room, what would they be too embarrassed to admit?",
];

const POSITIONING_QUESTIONS = [
  "What do you do that others technically do, but not like you?",
  "What do you believe your industry gets wrong?",
  "Where are you playing small to stay palatable?",
  "If you removed 80% of your offer, what would remain?",
  "What are you over-explaining that should be obvious?",
  "If a competitor copied you, what could they never replicate?",
];

const BRAND_TRUTH_QUESTIONS = [
  "What part of your brand is performative?",
  "Where are you trying to sound like someone else?",
  "What are you afraid to say publicly?",
  "What would your brand say if it had nothing to lose?",
  "What do people misunderstand about your brand?",
  "If your business became wildly successful overnight, what would you lose?",
];

const BRAND_ESSENCE_QUESTIONS = [
  "If your brand were a character or guide, who would it be?",
  "What deeper truth does your brand stand for?",
  "What do you want people to feel when they interact with your brand?",
];

const VISION_QUESTIONS = [
  "What future are you building through this brand?",
  "What needs to change to get there?",
  "What opportunities are you not pursuing but should be?",
];

const LEGACY_QUESTIONS = [
  "What would people say about your brand if you were not in the room?",
  "What do you want to be known for in 10 years?",
  "What would make your brand irreplaceable?",
  "What would matter most if you had to teach this business to someone else?",
  "What does your brand protect?",
];

function buildQABlock(label, questions, data) {
  if (!data || Object.keys(data).length === 0) return "";
  let block = `\n## ${label}\n`;
  questions.forEach((q, i) => {
    const answer = data[`q${i}`];
    if (answer && answer.trim()) {
      block += `Q: ${q}\nA: ${answer.trim()}\n\n`;
    }
  });
  return block;
}

function buildPrompt(submission) {
  const name = submission.firstName || submission.fullName || "the client";
  const company = submission.company || "their business";

  let context = `You are a senior brand strategist conducting a strategic review for ${name} at ${company}.\n\n`;
  context += `Your task is to analyze their questionnaire responses and produce a structured Brand Strategy Report. Be commercially grounded, direct, and specific to their answers. Do not repeat questions or answers verbatim — interpret, synthesize, and provide strategic insight.\n\n`;
  context += `Avoid generic motivational language. Identify genuine strengths, real weaknesses, and commercially viable opportunities.\n\n`;
  context += `=== QUESTIONNAIRE RESPONSES ===\n`;

  context += buildQABlock("Business Foundation", BUSINESS_QUESTIONS, submission.sectionBusinessFoundation);
  context += buildQABlock("Audience Insight", AUDIENCE_QUESTIONS, submission.sectionAudienceInsight);
  context += buildQABlock("Positioning & Differentiation", POSITIONING_QUESTIONS, submission.sectionPositioning);
  context += buildQABlock("Brand Truth", BRAND_TRUTH_QUESTIONS, submission.sectionBrandTruth);
  context += buildQABlock("Brand Essence", BRAND_ESSENCE_QUESTIONS, submission.sectionBrandEssence);
  context += buildQABlock("Vision & Growth", VISION_QUESTIONS, submission.sectionVisionGrowth);
  context += buildQABlock("Legacy & Values", LEGACY_QUESTIONS, submission.sectionLegacyValues);

  // Operations
  const ops = submission.sectionOperations || {};
  if (ops.budget || ops.support || ops.workingModel) {
    context += `\n## Operations & Budget\n`;
    if (ops.budget) context += `Budget: ${ops.budget}\n`;
    if (ops.support) context += `Support needed: ${Array.isArray(ops.support) ? ops.support.join(", ") : ops.support}\n`;
    if (ops.workingModel) context += `Working model preference: ${ops.workingModel}\n`;
    if (ops.agencyExp) context += `Past agency experience: ${ops.agencyExp}\n`;
    if (ops.different) context += `What needs to be different: ${ops.different}\n`;
  }

  // Core values
  const legacy = submission.sectionLegacyValues || {};
  if (legacy.values && legacy.values.length > 0) {
    context += `\nCore Values selected: ${legacy.values.join(", ")}\n`;
  }

  context += `\n=== END OF RESPONSES ===\n\n`;
  context += `Now produce the following two outputs:\n\n`;
  context += `OUTPUT 1 — FULL STRATEGY REPORT\nStructure it with these clear sections:\n1. Executive Summary\n2. Brand Positioning Analysis\n3. Audience & Market Opportunity\n4. Core Brand Identity & Differentiation\n5. Strategic Gaps & Risks\n6. Growth & Vision Alignment\n7. Recommended Strategic Priorities (top 3–5 actionable priorities)\n\nBe specific, direct, and reference their actual answers where relevant.\n\n`;
  context += `OUTPUT 2 — EMAIL SUMMARY\nWrite 4–6 bullet points that summarize the most important strategic insights. Each bullet should be one sharp, direct sentence. Start each with "•"\n\nFormat your entire response as JSON matching this schema exactly, with no extra text outside the JSON:\n{\n  "fullReport": "...",\n  "emailSummary": "..."\n}`;

  return context;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { submissionId, formData } = await req.json();

    // Save all sections to the record
    const contact = formData[0] || {};
    const firstName = (contact.fullName || "").split(" ")[0] || "";

    const record = {
      firstName,
      fullName: contact.fullName || "",
      email: contact.email || "",
      position: contact.position || "",
      company: contact.company || "",
      phone: contact.phone || "",
      submittedAt: new Date().toISOString(),
      sectionContactDetails: formData[0] || {},
      sectionBusinessFoundation: formData[1] || {},
      sectionOperations: formData[2] || {},
      sectionMarketingAssets: formData[3] || {},
      sectionAudienceInsight: formData[4] || {},
      sectionPositioning: formData[5] || {},
      sectionBrandTruth: formData[6] || {},
      sectionBrandEssence: formData[7] || {},
      sectionVisionGrowth: formData[8] || {},
      sectionLegacyValues: formData[9] || {},
      status: "processing",
    };

    // Create the record
    const saved = await base44.asServiceRole.entities.BrandStrategySubmission.create(record);

    // Generate the report
    const prompt = buildPrompt({ ...record });
    const llmResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: "object",
        properties: {
          fullReport: { type: "string" },
          emailSummary: { type: "string" },
        },
        required: ["fullReport", "emailSummary"],
      },
      model: "claude_sonnet_4_6",
    });

    const fullReport = llmResult.fullReport || "";
    const emailSummary = llmResult.emailSummary || "";

    // Update record with generated content
    await base44.asServiceRole.entities.BrandStrategySubmission.update(saved.id, {
      generatedReport: fullReport,
      emailSummary,
      status: "complete",
    });

    // Send email to user
    if (record.email) {
      const reportUrl = `${req.headers.get("origin") || ""}/strategy-report/${saved.id}`;
      const emailBody = `Hi ${record.firstName || record.fullName || "there"},\n\nThank you for completing the Brand Strategy Diagnostic. Your personalized report is ready.\n\nHere are your key strategic insights:\n\n${emailSummary}\n\nView your full report here:\n${reportUrl}\n\nIf you're ready to go deeper, I'd love to book a strategy session to walk through these findings together and map out your next move.\n\nBook your session: https://laurajanethomas.biz/contact\n\nWith clarity,\nLaura Jane Thomas\nAward-Winning Brand Strategist`;

      await base44.asServiceRole.integrations.Core.SendEmail({
        to: record.email,
        subject: "Your Brand Strategy Report",
        body: emailBody,
        from_name: "Laura Jane Thomas",
      });
    }

    return Response.json({ success: true, id: saved.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});