import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("code");
  redirectTo.searchParams.delete("next");

  if (code) {
    const supabaseResponse = NextResponse.redirect(redirectTo);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // If redirecting to login (e.g. after email change), sign out so the
      // user arrives at the login page logged out.
      if (next === "/admin/login") {
        await supabase.auth.signOut();
        const logoutRedirect = request.nextUrl.clone();
        logoutRedirect.pathname = "/admin/login";
        logoutRedirect.searchParams.delete("code");
        logoutRedirect.searchParams.delete("next");
        const logoutResponse = NextResponse.redirect(logoutRedirect);
        // Clear auth cookies
        for (const cookie of request.cookies.getAll()) {
          if (cookie.name.startsWith("sb-")) {
            logoutResponse.cookies.set(cookie.name, "", { maxAge: 0 });
          }
        }
        return logoutResponse;
      }
      return supabaseResponse;
    }
  }

  // If no code or exchange failed, redirect to login
  redirectTo.pathname = "/admin/login";
  return NextResponse.redirect(redirectTo);
}
