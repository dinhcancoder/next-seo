import connectDB from '~/lib/db'
import Content from '~/models/Content'

class ContentService {
  async findAll({ type, parentId }) {
    await connectDB()

    const filter = {}

    if (type) filter.type = type
    if (parentId) filter.parentId = parentId

    return Content.find(filter)
      .sort({ sortOrder: 1 })
      .populate('children')
      .lean()
  }

  async findOne({ type, parentId }) {
    await connectDB()

    const filter = {}

    if (type) filter.type = type
    if (parentId) filter.parentId = parentId

    return Content.findOne(filter).populate('children').lean()
  }
}

export const contentService = new ContentService()
