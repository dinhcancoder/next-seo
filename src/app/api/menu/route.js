import { NextResponse } from 'next/server'
import connectDB from '~/lib/db'
import { Menu } from '~/models/Menu'

export async function GET() {
  try {
    await connectDB()

    const menu = await Menu.find().sort({ order: 1 })

    return NextResponse.json(menu, {
      status: 200,
      statusText: 'Fetched Menu Successfully',
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await connectDB()

    const body = await req.json()
    const { label, slug, parent, url, order } = body

    const newMenu = await Menu.create({
      label,
      slug,
      parent: parent || null,
      url: url || null,
      order: order || 0,
    })

    return NextResponse.json(newMenu, {
      status: 201,
      statusText: 'Created Menu Successfully',
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
