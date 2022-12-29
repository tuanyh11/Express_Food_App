import mongoose, { Schema } from "mongoose";
import User from "./User.js";

const UserRoleSchema = new Schema(
  {
   name: String,
   displayName: String
  },
  {
    timeseries: true,
  }
);


UserRoleSchema.pre("findOneAndRemove", { document: false, query: true }, async function () {
  const doc = await this.model.findOne(this.getFilter());
  await User.updateMany({roleId: doc._id}, {roleId: null})
})


export default mongoose.model("UserRole", UserRoleSchema);
