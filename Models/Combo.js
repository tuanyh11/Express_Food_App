import mongoose, { Schema } from "mongoose";

const SaleInFo = new Schema({
    isSale: Boolean,
    salePercent: Number,
})

const ComboSchema = new Schema(
  {
   name: {
    required: true,
    type: String,
   },
   image: {
    required: true,
    type: String,
   },
   products: {
    required: true,
    type: Array
   },
   price: {
    required: true,
    type: Number
   },
   saleInfo: {
    type: SaleInFo,
   },
   description: String
  },
  {
    timeseries: true,
  }
);

export default mongoose.model("Combo", ComboSchema);
