import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    variants: [
        {
            k: String,
            v: [{text: String}]
        }
    ],
    productItems: [
        {
            option: String,
            price: Number,
            image: String,
            quantity: Number,
            unique: String
        }
    ],
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    unit: {
        type: String,
        required: true,
    }, 
    categories: Array,
    comment: [
        {
            content: String,
            parentId: {
                type: Schema.Types.Mixed,
                default: null,
            },
            userId: String
        }
    ],

    active: {
        type: Boolean,
        default: true
    },
    limitComment: Number
  },
  {
    timeseries: true,
  }
);

export default mongoose.model("Product", ProductSchema);
