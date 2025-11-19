import { NextResponse } from 'next/server'
import { userService } from '~/services/userService'

export async function GET() {
  const users = await userService.findAll()
  return NextResponse.json(users)
}

export async function POST(req) {
  try {
    await connectDB()
    const body = await req.json()
    const { username, email, password } = body
    const newUser = await User.create({ username, email, password })

    return NextResponse.json(newUser, {
      status: '201',
      statusText: 'Created User Successfully.',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
