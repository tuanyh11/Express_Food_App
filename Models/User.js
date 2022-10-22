import mongoose, { Schema } from "mongoose";
import validator from "validator";


const Contract = new Schema({
  dateStart: Date,
  dateEnd: Date,
  content: String,
  status: {
    type: Boolean,
    default: true
  },
  duration: String,
}, {timeseries: true})

const UserSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        unique: true,
        message: "Please enter a valid email"
      },
      trim: true, 
      required: [true, "Email is required"]
    },
    password: { 
      type: String,
      required: [true, "password is required"],
    },
    roleId: {
      default: null,
      type: String
    },
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    avatar: String,
    active: {
      type: Boolean,
      default: true,
    },
    contract:{
      type: Array,
      default: null
    },

    registerCode: {
      code: { 
        type: String, 
        default: null
      },
      createdAd: {
        type: Date,
        default: null
      },
      expiryDate: {
        type: Date,
        default: null
      }
    },
    
    verified: {
      type: Boolean,
      default: true,
    },

    emailVerifyAt: {
      type: Date,
      default: null
    },

    address: 
      {
        name: String,
        phone: String
      }
  },
  {
    timeseries: true,
  }
);

const User = mongoose.model("User", UserSchema)
User.createIndexes("email")

export default mongoose.model("User", UserSchema);
