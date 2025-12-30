import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ success: true })
  res.cookies.set('sessionToken', '', {
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  })
  return res
}
