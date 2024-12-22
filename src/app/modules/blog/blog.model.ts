import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const BlogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'RegisterUser',
      required: true,
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

BlogSchema.post('save', function (doc, next) {
  doc.populate('author').then(() => next());
});

export const BlogModel = model<TBlog>('Blog', BlogSchema);
