import { NextResponse } from 'next/server'
import { signToken } from '~/lib/auth'

export async function POST(request) {
  let body = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = String(body.email || '')
    .trim()
    .toLowerCase()
  const password = String(body.password || '')

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Missing email or password' },
      { status: 400 },
    )
  }

  const isValid = email === 'admin@gmail.com' && password === '123456'

  if (!isValid) {
    return NextResponse.json(
      { error: 'Tài khoản hoặc mật khẩu không chính xác!' },
      { status: 401 },
    )
  }

  const token = await signToken({ userId: 'admin-1' }, '6h')

  const res = NextResponse.json({
    success: true,
  })

  res.cookies.set('sessionToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 6,
  })

  return res
}
