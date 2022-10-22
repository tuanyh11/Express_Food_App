import mongoose, { Schema } from "mongoose";

const UserRoleSchema = new Schema(
  {
   name: String,
   displayName: String,
   monthlySalary: Number,
   active: {
    type: Boolean,
    default: true
   }
  },
  {
    timeseries: true,
  }
);

export default mongoose.model("UserRole", UserRoleSchema);
