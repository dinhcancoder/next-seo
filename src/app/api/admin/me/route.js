import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { verifyToken } from '~/lib/auth'

export async function GET() {
  const token = (await cookies()).get('sessionToken')?.value
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  try {
    const payload = await verifyToken(token)
    const user = {
      id: payload.userId,
      username: 'Admin',
      email: 'admin@gmail.com',
      role: 'admin',
    }

    return NextResponse.json({ success: true, data: user })
  } catch {
    return NextResponse.json({ user: null }, { status: 401 })
  }
}
