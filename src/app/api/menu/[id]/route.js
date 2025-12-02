import { NextResponse } from 'next/server'
import connectDB from '~/lib/db'
import { Menu } from '~/models/Menu'

export async function GET(req, { params }) {
  try {
    await connectDB()

    const item = await Menu.findById(params.id).populate('children')

    if (!item) {
      return NextResponse.json({ error: 'Menu not found' }, { status: 404 })
    }

    return NextResponse.json(item, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB()

    const body = await req.json()

    const updated = await Menu.findByIdAndUpdate(params.id, body, {
      new: true,
    })

    return NextResponse.json(updated, {
      status: 200,
      statusText: 'Updated Menu Successfully',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB()

    const deleted = await Menu.findByIdAndDelete(params.id)

    return NextResponse.json(
      { message: 'Deleted successfully', deleted },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
