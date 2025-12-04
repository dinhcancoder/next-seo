import { NextResponse } from 'next/server'
import connectDB from '~/lib/db'
import { Content } from '~/models/Content'

export async function GET(req, { params }) {
  await connectDB()
  const { id } = await params

  const item = await Content.findById(id).populate('children')

  if (!item) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  return NextResponse.json(item)
}

export async function PUT(req, { params }) {
  await connectDB()
  const { id } = await params

  console.log(id)
  const body = await req.json()

  const updated = await Content.findByIdAndUpdate(id, body, { new: true })

  if (!updated) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  return NextResponse.json(updated)
}

export async function DELETE(req, { params }) {
  await connectDB()
  const { id } = await params

  await Content.findByIdAndDelete(id)

  return NextResponse.json({ message: 'Deleted' })
}
