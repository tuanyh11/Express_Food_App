import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
   userId: String,
   cartId: String,
   products: Array,
   combos: Array,
   payment: Object,
   status: {
    type: String,
    default: "pending"
   },
   employeeId: String,
   address: Object
  },
  {
    timeseries: true,
  }
);

export default mongoose.model("Order", OrderSchema);
