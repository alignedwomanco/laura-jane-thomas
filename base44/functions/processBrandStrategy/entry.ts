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
    const formData = body.formData;

    if (!formData || !Array.isArray(formData) || formData.length < 10) {
      return Response.json({ error: "Invalid formData: expected array of 10 sections" }, { status: 400 });
    }

    // ── Step 1: Build and save the record ────────────────────────────
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
      businessFoundation: formData[1] || {},
      operationsBudget: formData[2] || {},
      marketingAssets: formData[3] || {},
      audienceInsight: formData[4] || {},
      positioning: formData[5] || {},
      brandTruth: formData[6] || {},
      brandEssence: formData[7] || {},
      visionGrowth: formData[8] || {},
      legacyValues: formData[9] || {},
      status: "processing",
    };

    const saved = await base44.asServiceRole.entities.BrandStrategySubmission.create(record);
    const savedId = saved.id;
    console.log("[processBrandStrategy] Record created:", savedId);

    // ── Step 2: Build prompt from saved record values ─────────────────
    const prompt = buildPrompt(record);
    console.log("[processBrandStrategy] Prompt length:", prompt.length);

    // ── Step 3: Call LLM ──────────────────────────────────────────────
    let fullReport = "";
    let emailSummary = "";
    try {
      console.log("[processBrandStrategy] Calling LLM...");
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
      console.log("[processBrandStrategy] LLM raw result keys:", JSON.stringify(Object.keys(llmResult || {})));
      console.log("[processBrandStrategy] LLM fullReport type:", typeof llmResult?.fullReport, "length:", String(llmResult?.fullReport || "").length);
      fullReport = llmResult?.fullReport || llmResult?.full_report || "";
      emailSummary = llmResult?.emailSummary || llmResult?.email_summary || "";
      console.log("[processBrandStrategy] LLM returned fullReport length:", fullReport.length, "emailSummary length:", emailSummary.length);
    } catch (llmError) {
      console.error("[processBrandStrategy] LLM error:", llmError.message);
      await base44.asServiceRole.entities.BrandStrategySubmission.update(savedId, { status: "error" });
      return Response.json({ error: "LLM failed: " + llmError.message, id: savedId }, { status: 500 });
    }

    // ── Step 4: Write LLM output back to the record ───────────────────
    await base44.asServiceRole.entities.BrandStrategySubmission.update(savedId, {
      generatedReport: fullReport,
      emailSummary,
      status: "complete",
    });
    console.log("[processBrandStrategy] Record updated with report.");

    // ── Step 5: Send email via Gmail (non-blocking — don't fail on email error) ─
    if (record.email) {
      try {
        const origin = req.headers.get("origin") || "https://laurajanethomas.biz";
        const reportUrl = `${origin}/strategy-report/${savedId}`;
        const emailBody = `Hi ${record.firstName},

Thank you for completing the Brand Strategy Diagnostic. Your honesty and clarity throughout the questionnaire have given us everything we need to create a meaningful strategy for ${record.company}.

Your Brand Strategy Report: A comprehensive analysis of your business, positioning, audience, and the strategic priorities that will move the needle. This is the strategic roadmap.

Your Questionnaire Answers: A complete record of everything you shared. Reference this as you review the strategy, and share it with your team.

Both are yours to keep, review, and act on at your own pace.

What's next?

This report is most valuable when we walk through it together. Book a strategy session to:

Dive deep into the key findings
Clarify any recommendations
Map out your first 90 days of execution

Download both PDFs here:
${reportUrl}

The clarity is already here. Now comes the action.

Look forward to hearing from you,
Laura.

www.laurajanethomas.biz
hello@laurajanethomas.biz
+27 677302030`;

        // Build MIME message for Gmail
        const mimeMessage = `From: hello@laurajanethomas.biz
To: ${record.email}
Subject: Your Brand Strategy Diagnostic is Ready
Content-Type: text/plain; charset="UTF-8"

${emailBody}`;

        const base64Message = btoa(mimeMessage).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        
        const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');
        
        const gmailRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ raw: base64Message }),
        });

        if (!gmailRes.ok) {
          const err = await gmailRes.text();
          throw new Error(`Gmail API error: ${err}`);
        }

        console.log("[processBrandStrategy] Email sent via Gmail to:", record.email);
      } catch (emailError) {
        // Log but do not fail — report is already saved
        console.warn("[processBrandStrategy] Email send failed (non-fatal):", emailError.message);
      }
    }

    // ── Step 6: Return the record ID to the frontend ──────────────────
    return Response.json({ success: true, id: savedId });

  } catch (error) {
    console.error("[processBrandStrategy] Fatal error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});