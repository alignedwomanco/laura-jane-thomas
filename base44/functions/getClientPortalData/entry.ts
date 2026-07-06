import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const { adminEmail } = body;

    // Admin authorization is enforced server-side: only actual admins can
    // look up another client's data. Non-admins always get their own records.
    const isAdmin = user.role === 'admin';
    const lookupEmail = (adminEmail && isAdmin) ? adminEmail : user.email;

    const [subs, engs] = await Promise.all([
      base44.asServiceRole.entities.BrandStrategySubmission.filter({ email: lookupEmail }),
      base44.asServiceRole.entities.EngagementAcceptance.filter({ email: lookupEmail }),
    ]);

    return Response.json({
      submissions: subs,
      engagements: engs,
      isAdminPreview: !!(adminEmail && isAdmin),
    });
  } catch (error) {
    console.error("[getClientPortalData] Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});