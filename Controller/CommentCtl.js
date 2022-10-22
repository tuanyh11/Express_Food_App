import User from "../Models/User.js";
import ProductModel from "../Models/Product.js";


class CommentCtl {

    async GetComments(req, res) {
        try {
            const Comments = await ProductModel.find({}, {comments: 1})
            return res.status(200).json({success: true, message: "get Comments successful", data: Comments});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Comments failed", data: null})
        }
    }
    
     
    async GetCommentById(req, res) {
        try {
            const id = req.params.id
            const Comment = await ProductModel.findOne({"comments._id": id})
            return res.status(200).json({success: true, message: "get Comment successful", data: Comment});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Comment failed", data: null})
        }
    }
    
    async CreateComment(req, res) {
        const {productId , parentId, userId, content} = req.body

       try {
        const newComment = await ProductModel.findOneAndUpdate({_id: productId}, {$push: {comment: {
            content: content,
            userId: userId,
            parentId: parentId ? parentId : null 
        }}}, {new: true, comment: 1})

        return res.status(200).json({success: true, message: "create Comment successful", data: newComment});
       } catch (error) {
        return res.status(200).json({success: true, message: "create Comment failed", data: newComment});
       }
    }

    async DelComment(req, res) { 
        try {
            const {commentId, productId} = req.query
            const Comment = await ProductModel.findOneAndUpdate({_id: productId}, {$pull: {_id: commentId}}, {new: true, comment: 1})
            return res.status(200).json({success: true, message: "delete Comment successful", data: Comment});
        } catch (error) {
            return res.status(404).json({success: false, message: "delete Comment failed", data: null})
        }
    }

    async UpdateComment(req, res) {
        try {
            const commentId = req.params.id
            const { productId, content } = req.body

            const newComment = await ProductModel.findOneAndUpdate({_id: productId},  {$set: {comment: {$cond: {
                            if: {
                               commentId: {
                                    $eq: commentId
                               } 
                            },
                            then: {
                                $set: {
                                    content: content,
                                }
                            }
                        }
                    }
                }
            }, {new: true})

            return res.status(200).json({success: true, message: "upadete Comment successful", data: newComment});

        } catch (error) {
            return res.status(404).json({success: false, message: "upadete Comment failed", data: null})
        }
    }

}

export default CommentCtl