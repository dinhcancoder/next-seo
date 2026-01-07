import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { verifyToken } from '~/lib/auth'
import { buildAdminUser } from '~/lib/admin-user'

export async function GET() {
  const token = (await cookies()).get('sessionToken')?.value
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  try {
    const payload = await verifyToken(token)
    const user = buildAdminUser(payload)
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 })
    }
    return NextResponse.json({ success: true, data: user })
  } catch {
    return NextResponse.json({ user: null }, { status: 401 })
  }
}
