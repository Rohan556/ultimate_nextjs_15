import { model, models, Schema, Types } from "mongoose";

export interface ICollection {
  user: Types.ObjectId;
  action: string;
  actionId: Types.ObjectId;
  actionType: "question" | "answer";
}

const collectionSchema = new Schema<ICollection>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    action: { type: String, required: true },
    actionId: { type: Schema.Types.ObjectId, required: true },
    actionType: { type: String, required: true, enum: ["question", "answer"] },
  },
  { timestamps: true }
);

export default models.Collection ??
  model<ICollection>("Collection", collectionSchema);
