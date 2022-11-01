import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema(
  {
   userId: String,
   products: Array,
   combo: Array,
  },
  {
    timeseries: true,
  }
);

export default mongoose.model("Cart", CartSchema);
