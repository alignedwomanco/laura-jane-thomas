import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const { id } = body;

    if (!id) {
      return Response.json({ error: "Missing report ID" }, { status: 400 });
    }

    const record = await base44.asServiceRole.entities.BrandStrategySubmission.get(id);

    if (!record) {
      return Response.json({ error: "Record not found" }, { status: 404 });
    }

    return Response.json({ success: true, record });
  } catch (error) {
    console.error("[getBrandStrategyReport] Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});