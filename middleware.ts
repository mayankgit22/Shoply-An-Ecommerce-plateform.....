// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
  runtime: 'nodejs',
};

export function middleware(req: NextRequest) {
  return NextResponse.next();
}
