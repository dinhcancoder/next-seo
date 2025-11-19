import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Tránh lỗi OverwriteModelError khi hot reload
export const User = mongoose.models.User || mongoose.model('User', userSchema)
