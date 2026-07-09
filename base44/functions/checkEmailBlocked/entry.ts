import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email } = await req.json();
    if (!email) {
      return Response.json({ blocked: false });
    }
    const normalized = email.trim().toLowerCase();
    const matches = await base44.asServiceRole.entities.BlockedEmail.filter({
      email: normalized
    });
    return Response.json({ blocked: matches.length > 0 });
  } catch (error) {
    console.error('[checkEmailBlocked] Error:', error.message);
    return Response.json({ blocked: false });
  }
});