import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic' // Cho phép ghi file

export async function POST(req) {
  const formData = await req.formData()
  const type = formData.get('type')?.toString() || 'general'
  const files = formData.getAll('files')

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
  }

  // Tạo thư mục upload theo type (products, posts…)
  const uploadDir = path.join(process.cwd(), 'uploads', type)
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

  const uploadedPaths = []

  for (const file of files) {
    const bytes = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`
    const filepath = path.join(uploadDir, filename)

    fs.writeFileSync(filepath, bytes)

    uploadedPaths.push(`/uploads/${type}/${filename}`)
  }

  return NextResponse.json({
    message: 'Upload success',
    files: uploadedPaths,
  })
}
