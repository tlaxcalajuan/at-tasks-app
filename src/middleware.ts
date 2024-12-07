import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token');
  const loginPath = '/login';

  // Si no hay token, redirige a /login
  if (!token && !req.nextUrl.pathname.startsWith(loginPath)) {
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  // Si hay token y accede a /login, redirige al home
  if (token && req.nextUrl.pathname.startsWith(loginPath)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard',],
};
