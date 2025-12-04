import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req) {
  try {
    const { filePath } = await req.json()

    if (!filePath) {
      return NextResponse.json({ error: 'Missing filePath' }, { status: 400 })
    }

    // Ví dụ frontend gửi: "/uploads/slider/xxx.jpeg"
    const realPath = path.join(process.cwd(), filePath.replace(/^\//, ''))

    if (!fs.existsSync(realPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    fs.unlinkSync(realPath)

    return NextResponse.json({ message: 'File deleted successfully' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error deleting file' }, { status: 500 })
  }
}

// async function deleteImage(url: string) {
//   const res = await fetch("/api/delete-file", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       filePath: url, // chính là đường dẫn: "/uploads/slider/xxx.jpeg"
//     }),
//   });

//   const data = await res.json();
//   console.log(data);
// }

// deleteImage('/uploads/slider/1764737213054-luffy_low_quality.jpeg')
