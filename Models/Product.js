import mongoose, { Schema } from "mongoose";

const Comments = new Schema({
    content: String,
    parentId: {
        type: Schema.Types.Mixed,
        default: null,
    },
    userId: {
        default: null,
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, {timestamps: true})

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
    priceMin: Number,
    priceMax: Number,
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
            image: Schema.Types.Mixed,
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
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'categories',
        }
    ],

    userId: {
        default: null,
        type: String
    },

    active: {
        type: Boolean,
        default: true
    },
    comments: [Comments]
  },
  {
    collection: "products",
    timestamps: true,
  }
);


export default mongoose.model("Product", ProductSchema);
