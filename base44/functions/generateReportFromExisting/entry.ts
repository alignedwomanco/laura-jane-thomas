import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

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
    if (answer && String(answer).trim()) {
      block += `Q: ${q}\nA: ${String(answer).trim()}\n\n`;
    }
  });
  return block;
}

// Normalize record: support both old field names (sectionXxx) and new (xxx)
function normalizeRecord(r) {
  return {
    ...r,
    businessFoundation: r.businessFoundation || r.sectionBusinessFoundation || {},
    operationsBudget:   r.operationsBudget   || r.sectionOperations         || {},
    marketingAssets:    r.marketingAssets    || r.sectionMarketingAssets    || {},
    audienceInsight:    r.audienceInsight    || r.sectionAudienceInsight    || {},
    positioning:        r.positioning        || r.sectionPositioning        || {},
    brandTruth:         r.brandTruth         || r.sectionBrandTruth         || {},
    brandEssence:       r.brandEssence       || r.sectionBrandEssence       || {},
    visionGrowth:       r.visionGrowth       || r.sectionVisionGrowth       || {},
    legacyValues:       r.legacyValues       || r.sectionLegacyValues       || {},
  };
}

// Find the best record: one with actual questionnaire data, preferring most recent
function findBestRecord(records) {
  const hasData = (r) => {
    const norm = normalizeRecord(r);
    return Object.keys(norm.businessFoundation || {}).length > 0 ||
           Object.keys(norm.audienceInsight || {}).length > 0 ||
           Object.keys(norm.positioning || {}).length > 0;
  };
  // Sort newest first, pick first one that has data
  const sorted = [...records].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
  return sorted.find(hasData) || sorted[0];
}

function buildPrompt(record) {
  const name = record.firstName || record.fullName || "the client";
  const company = record.company || "their business";

  let context = `You are a senior brand strategist conducting a strategic review for ${name} at ${company}.\n\n`;
  context += `Analyze their questionnaire responses and produce a structured Brand Strategy Report. Be commercially grounded, direct, and specific to their answers. Do not repeat questions verbatim — interpret, synthesize, and provide strategic insight. Avoid generic motivational language.\n\n`;
  context += `=== QUESTIONNAIRE RESPONSES ===\n`;

  context += buildQABlock("Business Foundation", BUSINESS_QUESTIONS, record.businessFoundation);
  context += buildQABlock("Audience Insight", AUDIENCE_QUESTIONS, record.audienceInsight);
  context += buildQABlock("Positioning & Differentiation", POSITIONING_QUESTIONS, record.positioning);
  context += buildQABlock("Brand Truth", BRAND_TRUTH_QUESTIONS, record.brandTruth);
  context += buildQABlock("Brand Essence", BRAND_ESSENCE_QUESTIONS, record.brandEssence);
  context += buildQABlock("Vision & Growth", VISION_QUESTIONS, record.visionGrowth);
  context += buildQABlock("Legacy & Values", LEGACY_QUESTIONS, record.legacyValues);

  const ops = record.operationsBudget || {};
  if (ops.budget || ops.support || ops.workingModel) {
    context += `\n## Operations & Budget\n`;
    if (ops.budget) context += `Budget: ${ops.budget}\n`;
    if (ops.support) context += `Support needed: ${Array.isArray(ops.support) ? ops.support.join(", ") : ops.support}\n`;
    if (ops.workingModel) context += `Working model preference: ${ops.workingModel}\n`;
    if (ops.agencyExp) context += `Past agency experience: ${ops.agencyExp}\n`;
    if (ops.different) context += `What needs to be different: ${ops.different}\n`;
  }

  const legacy = record.legacyValues || {};
  if (legacy.values && legacy.values.length > 0) {
    context += `\nCore Values selected: ${legacy.values.join(", ")}\n`;
  }

  context += `\n=== END OF RESPONSES ===\n\n`;
  context += `Produce two outputs:\n\n`;
  context += `OUTPUT 1 — FULL STRATEGY REPORT\nStructure with these sections:\n1. Executive Summary\n2. Brand Positioning Analysis\n3. Audience & Market Opportunity\n4. Core Brand Identity & Differentiation\n5. Strategic Gaps & Risks\n6. Growth & Vision Alignment\n7. Recommended Strategic Priorities (top 3–5 actionable priorities)\n\n`;
  context += `OUTPUT 2 — EMAIL SUMMARY\n4–6 bullet points summarizing the most important strategic insights. Each bullet is one sharp direct sentence starting with "•"\n\n`;
  context += `Return ONLY valid JSON with no extra text:\n{"fullReport": "...", "emailSummary": "..."}`;

  return context;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { recordId } = body;

    // ── Step 1: Fetch record(s) ───────────────────────────────────────
    const all = await base44.asServiceRole.entities.BrandStrategySubmission.list();
    let record;

    if (recordId) {
      const raw = all.find(r => r.id === recordId);
      if (!raw) return Response.json({ error: `Record not found: ${recordId}` }, { status: 404 });
      record = normalizeRecord(raw);
    } else {
      const best = findBestRecord(all);
      if (!best) return Response.json({ error: "No submissions found" }, { status: 404 });
      record = normalizeRecord(best);
    }

    const hasData = Object.keys(record.businessFoundation || {}).length > 0 ||
                    Object.keys(record.audienceInsight || {}).length > 0;

    console.log("[generateReportFromExisting] Using record:", record.id);
    console.log("[generateReportFromExisting] hasData:", hasData);
    console.log("[generateReportFromExisting] generatedReport exists:", !!record.generatedReport);
    console.log("[generateReportFromExisting] businessFoundation keys:", JSON.stringify(Object.keys(record.businessFoundation || {})));
    console.log("[generateReportFromExisting] raw sectionBusinessFoundation:", JSON.stringify(record.sectionBusinessFoundation));

    // ── Step 2: If report already exists, return it ───────────────────
    if (record.generatedReport) {
      console.log("[generateReportFromExisting] Report already exists, returning existing.");
      return Response.json({
        id: record.id,
        alreadyGenerated: true,
        debug: {
          recordId: record.id,
          hasBusinessFoundation: Object.keys(record.businessFoundation || {}).length > 0,
          hasGeneratedReport: true,
          hasEmailSummary: !!record.emailSummary,
          reportLength: record.generatedReport.length,
          summaryLength: record.emailSummary?.length || 0,
        }
      });
    }

    // ── Step 3: Build prompt from the existing record's saved answers ─
    const prompt = buildPrompt(record);
    console.log("[generateReportFromExisting] Prompt length:", prompt.length);

    // ── Step 4: Call LLM ──────────────────────────────────────────────
    console.log("[generateReportFromExisting] Calling LLM...");
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
    });

    console.log("[generateReportFromExisting] LLM raw keys:", JSON.stringify(Object.keys(llmResult || {})));
    const fullReport = llmResult?.fullReport || llmResult?.full_report || "";
    const emailSummary = llmResult?.emailSummary || llmResult?.email_summary || "";
    console.log("[generateReportFromExisting] LLM done. Report length:", fullReport.length, "Summary length:", emailSummary.length);

    // ── Step 5: Save back into the SAME record ────────────────────────
    await base44.asServiceRole.entities.BrandStrategySubmission.update(record.id, {
      generatedReport: fullReport,
      emailSummary,
      status: "complete",
    });
    console.log("[generateReportFromExisting] Saved report to record:", record.id);

    return Response.json({
      id: record.id,
      alreadyGenerated: false,
      debug: {
        recordId: record.id,
        hasBusinessFoundation: Object.keys(record.businessFoundation || {}).length > 0,
        hasGeneratedReport: true,
        hasEmailSummary: true,
        reportLength: fullReport.length,
        summaryLength: emailSummary.length,
      }
    });

  } catch (error) {
    console.error("[generateReportFromExisting] Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});