"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { changePassword, changeEmail } from "./actions";

export default function SettingsPage() {
  const [passwordState, passwordAction, passwordPending] = useActionState(
    changePassword,
    null,
  );
  const [emailState, emailAction, emailPending] = useActionState(
    changeEmail,
    null,
  );

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentEmail(session?.user?.email ?? null);
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 w-full max-w-lg text-center">
        <h1 className="font-heading text-3xl font-bold">Account Settings</h1>
        <p className="mt-1 text-muted">Manage your email and password.</p>
      </div>

      <div className="w-full max-w-lg space-y-8">
        {/* Change Email */}
        <div className="rounded-lg border border-border bg-surface p-8">
          <h2 className="mb-5 flex items-center gap-2 font-heading text-xl font-semibold">
            <Mail className="h-5 w-5 text-accent" />
            Change Email
          </h2>

          <div className="mb-5">
            <span className="mb-1.5 block text-sm font-medium text-muted">
              Current Email
            </span>
            <span className="inline-block rounded-md bg-background px-3 py-1.5 text-sm text-foreground">
              {currentEmail ?? "Loading..."}
            </span>
          </div>

          <form action={emailAction} className="space-y-4">
            <div>
              <label
                htmlFor="newEmail"
                className="mb-1 block text-sm font-medium text-muted"
              >
                New Email
              </label>
              <input
                id="newEmail"
                name="newEmail"
                type="email"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="new@example.com"
              />
            </div>

            {emailState && "error" in emailState && (
              <p className="text-sm text-red-400">{emailState.error}</p>
            )}
            {emailState && "success" in emailState && (
              <p className="text-sm text-green-400">{emailState.success}</p>
            )}

            <button
              type="submit"
              disabled={emailPending}
              className="w-full rounded-md bg-accent py-2 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
            >
              {emailPending ? "Sending..." : "Update Email"}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="rounded-lg border border-border bg-surface p-8">
          <h2 className="mb-5 flex items-center gap-2 font-heading text-xl font-semibold">
            <Lock className="h-5 w-5 text-accent" />
            Change Password
          </h2>

          <form action={passwordAction} className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="mb-1 block text-sm font-medium text-muted"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  aria-label={
                    showCurrent ? "Hide password" : "Show password"
                  }
                >
                  {showCurrent ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="mb-1 block text-sm font-medium text-muted"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showNew ? "text" : "password"}
                  required
                  minLength={6}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  aria-label={showNew ? "Hide password" : "Show password"}
                >
                  {showNew ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm font-medium text-muted"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  minLength={6}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  aria-label={
                    showConfirm ? "Hide password" : "Show password"
                  }
                >
                  {showConfirm ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {passwordState && "error" in passwordState && (
              <p className="text-sm text-red-400">{passwordState.error}</p>
            )}
            {passwordState && "success" in passwordState && (
              <p className="text-sm text-green-400">
                {passwordState.success}
              </p>
            )}

            <button
              type="submit"
              disabled={passwordPending}
              className="w-full rounded-md bg-accent py-2 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
            >
              {passwordPending ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
