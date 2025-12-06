import mongoose, { Schema } from 'mongoose'
// {
//   "type": "product",
//   "slug": "vintage-cat-shirt",
//   "title": "Vintage Cat Shirt",
//   "data": {
//     "price": 19.99,
//     "compareAtPrice": 25.00,
//     "sizes": ["S", "M", "L", "XL"],
//     "images": ["/cat1.jpg", "/cat2.jpg"],
//     "description": "A cool vintage cat tee.",
//     "inventory": 155,
//     "tags": ["cat", "vintage", "tshirt"],
//     "extra": {
//       "color": "Black",
//       "material": "Cotton 100%"
//     }
//   }
// }

// {
//   "type": "post",
//   "slug": "how-to-train-your-cat",
//   "title": "How To Train Your Cat",
//   "data": {
//     "cover": "/cat-train.jpg",
//     "content": "<p>Training cats can be fun...</p>",
//     "author": "Dani",
//     "publishedAt": "2024-12-01",
//     "category": "pets"
//   }
// }

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

ContentSchema.virtual('children', {
  ref: 'Content',
  localField: '_id',
  foreignField: 'parentId',
})

export const Content =
  mongoose.models.Content || mongoose.model('Content', ContentSchema)
