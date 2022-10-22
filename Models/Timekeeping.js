import mongoose, { Schema } from "mongoose";

const TimekeepingSchema = new Schema(
  {
   userId: String,
   dateStart: Date,
   dateEnd: Date
  },
  {
    timeseries: true,
  }
);

export default mongoose.model("TimekeepingSchema", OrderSchema);
