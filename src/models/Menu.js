import mongoose from 'mongoose'

const menuSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu',
      default: null,
    },
    url: { type: String, default: null },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// ⭐ MUST HAVE ⭐
menuSchema.virtual('children', {
  ref: 'Menu',
  localField: '_id',
  foreignField: 'parent',
})

export const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema)
