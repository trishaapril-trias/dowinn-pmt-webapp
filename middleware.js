import { NextResponse } from 'next/server'

// Define authenticated and public paths
const publicPaths = ['/', '/login', '/register']
const authPaths = ['/project'] // add other authenticated routes here

export function middleware(request) {
  const { pathname } = request.nextUrl
  const isPublicPath = publicPaths.includes(pathname)
  const isAuthPath = authPaths.includes(pathname) || (!isPublicPath && pathname !== '/_next')
  
  // Get session from cookies
  const session = request.cookies.get('session')?.value
  const isAuthenticated = !!session

  // Redirect authenticated users away from public pages
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/project', request.url))
  }

  // Redirect unauthenticated users away from protected pages
  if (!isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Specify which routes to run middleware on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}