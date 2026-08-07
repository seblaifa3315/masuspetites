import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Public admin routes that don't require authentication
  const publicAdminPaths = [
    "/admin/login",
    "/admin/forgot-password",
    "/admin/auth/callback",
    "/admin/update-password",
  ];

  const isPublicAdminPath = publicAdminPaths.includes(pathname);

  // Protect /admin routes (except public ones)
  if (pathname.startsWith("/admin") && !isPublicAdminPath) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    // Enforce 2-hour session expiry
    const sessionStart = request.cookies.get("admin_session_start")?.value;
    const TWO_HOURS = 2 * 60 * 60 * 1000;

    if (!sessionStart || Date.now() - Number(sessionStart) > TWO_HOURS) {
      await supabase.auth.signOut();
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      const response = NextResponse.redirect(url);
      response.cookies.delete("admin_session_start");
      return response;
    }
  }

  // Redirect logged-in users away from login page
  if (pathname === "/admin/login" && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
