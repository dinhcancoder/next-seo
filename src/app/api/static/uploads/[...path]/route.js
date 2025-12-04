import path from 'path'
import fs from 'fs'

export async function GET(_, context) {
  const params = await context.params

  const filePath = path.join(process.cwd(), 'uploads', ...params.path)

  if (!fs.existsSync(filePath)) {
    return new Response('Not found', { status: 404 })
  }

  const fileBuffer = fs.readFileSync(filePath)

  return new Response(fileBuffer, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'no-store',
    },
  })
}
