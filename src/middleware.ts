import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  const role = request.cookies.get('role')?.value;
  const pathname = request.nextUrl.pathname;

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/', '/login', '/register',
    '/home', '/profile', '/settings',
    '/admin/:path*'
  ],
};
