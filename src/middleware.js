import { NextResponse } from 'next/server'
import { verifyToken } from '~/lib/auth'

export async function middleware(req) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('sessionToken')?.value

    if (!token) {
      const loginUrl = new URL('/auth/admin/login', req.url)
      loginUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      await verifyToken(token)
      return NextResponse.next()
    } catch (e) {
      const loginUrl = new URL('/auth/admin/login', req.url)
      loginUrl.searchParams.set('redirectTo', pathname)
      const res = NextResponse.redirect(loginUrl)

      res.cookies.set('sessionToken', '', { path: '/', maxAge: 0 })
      return res
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
