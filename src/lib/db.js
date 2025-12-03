import mongoose from 'mongoose'

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://kanisdev:dinhcan2002@cluster0.fkkqke0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const dbName = process.env.MONGODB_DB || 'db-next'

// Cache connection trong môi trường dev để tránh reconnect liên tục
let cached = global.mongoose || { conn: null, promise: null }

export default async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { dbName }) // ❗ Không thêm option cũ nữa
      .then((mongoose) => {
        console.log('✅ Connected to MongoDB:', dbName)
        return mongoose
      })
      .catch((err) => {
        console.error('❌ MongoDB connection failed:', err)
        throw err
      })
  }

  cached.conn = await cached.promise
  global.mongoose = cached

  return cached.conn
}
