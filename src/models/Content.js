// src/models/Content.js

import mongoose from 'mongoose'

const { Schema } = mongoose

const ContentSchema = new Schema(
  {
    type: { type: String, required: true, index: true },
    slug: { type: String, default: null, index: true },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Content',
      default: null,
    },
    title: { type: String, default: null },
    desc: { type: String, default: null },
    data: { type: Schema.Types.Mixed, default: {} },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual children
ContentSchema.virtual('children', {
  ref: 'Content',
  localField: '_id',
  foreignField: 'parentId',
})

// Tránh lỗi mongoose.models undefined (hiếm nhưng phòng luôn)
const models = mongoose.models || {}

const Content = models.Content || mongoose.model('Content', ContentSchema)

export default Content
