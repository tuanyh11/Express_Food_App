import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
   userId: String,
   cartId: String,
   shipping: Object,
   products: Array,
   combos: Array,
   payment: Object,
   status: String,
   employeeId: String,
  },
  {
    timeseries: true,
  }
);

export default mongoose.model("Order", OrderSchema);
