"use client";

import { useActionState } from "react";
import Link from "next/link";
import { resetPassword } from "./actions";

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(resetPassword, null);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-8">
        <h1 className="mb-2 text-center font-heading text-2xl font-bold">
          Reset Password
        </h1>
        <p className="mb-6 text-center text-sm text-muted">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        {state?.success ? (
          <div className="space-y-4">
            <p className="text-center text-sm text-green-400">
              Check your email for a password reset link.
            </p>
            <Link
              href="/admin/login"
              className="block text-center text-sm text-accent hover:text-accent-hover"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-muted"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="admin@example.com"
              />
            </div>

            {state?.error && (
              <p className="text-sm text-red-400">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-md bg-accent py-2 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
            >
              {pending ? "Sending..." : "Send reset link"}
            </button>

            <Link
              href="/admin/login"
              className="block text-center text-sm text-muted hover:text-foreground"
            >
              Back to login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
