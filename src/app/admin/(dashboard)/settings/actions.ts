"use server";

import { createClient } from "@/lib/supabase/server";

type ActionState = { error: string } | { success: string } | null;

export async function changePassword(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (newPassword.length < 6) {
    return { error: "New password must be at least 6 characters." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match." };
  }

  const supabase = await createClient();

  // Get current user email to verify current password
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user?.email) {
    return { error: "Unable to verify current user." };
  }

  // Verify current password by attempting sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    return { error: "Current password is incorrect." };
  }

  // Update to new password
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return { error: updateError.message };
  }

  return { success: "Password updated successfully." };
}

export async function changeEmail(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const newEmail = (formData.get("newEmail") as string)?.trim();

  if (!newEmail) {
    return { error: "Email is required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
    return { error: "Please enter a valid email address." };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user?.email) {
    return { error: "Unable to verify current user." };
  }

  if (newEmail.toLowerCase() === user.email.toLowerCase()) {
    return { error: "New email is the same as your current email." };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { error: updateError } = await supabase.auth.updateUser(
    { email: newEmail },
    { emailRedirectTo: `${siteUrl}/admin/auth/callback?next=/admin/login` },
  );

  if (updateError) {
    return { error: updateError.message };
  }

  return { success: "Confirmation email sent to your new address." };
}
