import { Menu } from '~/models/Menu'
import connectDB from './db'

export async function getMenuTree() {
  await connectDB()

  const menu = await Menu.find({ parent: null })
    .sort({ order: 1 })
    .populate({
      path: 'children',
      options: { sort: { order: 1 } },
      populate: {
        path: 'children',
        options: { sort: { order: 1 } },
      },
    })
    .lean()

  return menu
}
