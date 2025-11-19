import connectDB from '~/lib/db'
import { User } from '~/models/User'

export const userService = {
  async findAll() {
    await connectDB()
    return User.find()
  },
}
