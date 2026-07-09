import { base44 } from "@/api/base44Client";

export async function isEmailBlocked(email) {
  try {
    const res = await base44.functions.invoke("checkEmailBlocked", { email });
    return res.data?.blocked === true;
  } catch {
    return false;
  }
}