import { NextResponse } from 'next/server'
import connectDB from '~/lib/db'
import Content from '~/models/Content'
import { contentService } from '~/services/contentService'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const parentId = searchParams.get('parentId')

  const result = await contentService.findAll({ type, parentId })

  return NextResponse.json(result)
}

export async function POST(req) {
  await connectDB()

  const body = await req.json()
  const created = await Content.create(body)

  return NextResponse.json(created, { status: 201 })
}
