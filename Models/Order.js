import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
   userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users'
   },
   cartId: String,
   products: Array,
   combos: Array,
   payment: Object,
   status: {
    type: String,
    default: "pending"
   },
   employeeId: String,
   address: Object,
   amount: Number
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
 