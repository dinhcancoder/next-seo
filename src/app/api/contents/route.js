import { NextResponse } from 'next/server'
import connectDB from '~/lib/db'
import { Content } from '~/models/Content'

export async function GET(req) {
  await connectDB()

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const parentId = searchParams.get('parentId')

  const filter = {}
  if (type) filter.type = type
  if (parentId) filter.parentId = parentId

  const data = await Content.find(filter)
    .sort({ sortOrder: 1 })
    .populate('children')

  return NextResponse.json(data)
}

export async function POST(req) {
  await connectDB()

  const body = await req.json()
  const created = await Content.create(body)

  return NextResponse.json(created, { status: 201 })
}
