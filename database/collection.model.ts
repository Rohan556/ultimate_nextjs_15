import { model, models, Schema, Types } from "mongoose";

export interface ICollection {
  author: Types.ObjectId;
  question: Types.ObjectId;
}

const collectionSchema = new Schema<ICollection>(
  {
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    question: { type: Schema.Types.ObjectId, required: true, ref: "Question" },
  },
  { timestamps: true }
);

export default models.Collection ??
  model<ICollection>("Collection", collectionSchema);
