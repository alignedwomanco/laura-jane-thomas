import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const { id } = body;

    if (!id) {
      return Response.json({ error: "Missing report ID" }, { status: 400 });
    }

    const record = await base44.asServiceRole.entities.BrandStrategySubmission.get(id);

    if (!record) {
      return Response.json({ error: "Record not found" }, { status: 404 });
    }

    // Authorization: only the record owner or an admin may retrieve it.
    if (user.role !== 'admin' && record.email !== user.email) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    return Response.json({ success: true, record });
  } catch (error) {
    console.error("[getBrandStrategyReport] Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});