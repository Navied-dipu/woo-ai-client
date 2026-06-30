import { NextResponse } from 'next/server';

// ─── Protected route prefixes ─────────────────────────────────────────────────
// Any path that starts with these segments requires a logged-in session.
const PROTECTED_PREFIXES = ['/dashboard'];

// ─── better-auth session cookie name ─────────────────────────────────────────
// better-auth stores the session token under "better-auth.session_token"
// (dots are replaced with dashes in some environments, so we check both).
const SESSION_COOKIES = ['better-auth.session_token', 'better-auth-session_token'];

/**
 * Returns true if the incoming request targets a protected route.
 */
function isProtectedRoute(pathname) {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/**
 * Returns true when a valid-looking session cookie is present on the request.
 * We only check for the cookie's existence here — full verification happens
 * inside the Server Component / Route Handler via getUserSession().
 */
function hasSessionCookie(request) {
  return SESSION_COOKIES.some((name) => {
    const cookie = request.cookies.get(name);
    return cookie && cookie.value.length > 0;
  });
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Only run auth checks on protected routes
  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  // Allow the request through if the user has a session cookie
  if (hasSessionCookie(request)) {
    return NextResponse.next();
  }

  // No session → redirect to sign-in, preserving the intended destination
  const signInUrl = new URL('/auth/signin', request.url);
  signInUrl.searchParams.set('callbackUrl', pathname);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    /*
     * Run proxy on every path EXCEPT:
     *  - _next/static  (static assets)
     *  - _next/image   (image optimisation)
     *  - favicon.ico / public assets
     *  - Next.js internal routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
