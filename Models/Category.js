import mongoose, { Schema } from "mongoose";

const CateSchema = new Schema(
  {
   name: {
    required: true,
    type: String
   },
   image: {
    type: String
   }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", CateSchema);
