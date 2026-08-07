"use client";

import { useState } from "react";
import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left — image */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/admin-login.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Right — form */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-sm p-8">
          <h1 className="mb-6 text-center font-heading text-2xl font-bold">
            Admin Login
          </h1>

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

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-muted"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full rounded-md border border-border bg-background px-3 py-2 pr-10 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {state?.error && (
              <p className="text-sm text-red-400">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-md bg-accent py-2 font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
            >
              {pending ? "Signing in..." : "Sign in"}
            </button>

            <Link
              href="/admin/forgot-password"
              className="block text-center text-sm text-muted hover:text-foreground"
            >
              Forgot password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
