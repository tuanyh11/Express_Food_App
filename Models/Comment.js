import mongoose, { Schema } from "mongoose";


const CommentSchema = new Schema({
    productId: { 
        type: Schema.Types.ObjectId,
        ref: "products"
    },
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
}, { 
    timestamps: true
})

export default mongoose.model("Comment", CommentSchema);
