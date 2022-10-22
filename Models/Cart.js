import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema(
  {
   userId: String,
   products: [
    {
        productId: String,
        quantity: Number
    }
   ],
   combo: [
    {
      comboId: String,
      quantity: Number
    }
   ]
  },
  {
    timeseries: true,
  }
);

export default mongoose.model("Cart", CartSchema);
