import User from "../Models/User.js";
import commentModel from "../Models/Comment.js";
import mongoose from "mongoose";

class CommentCtl {
  async GetComments(req, res) {
    try {
      const Comments = await commentModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
            
          },
        },
        {$unwind: "$user"},
        {$project: {
            user: {
                email: 0,
                password: 0,
                roleId: 0,
                contract: 0,
                registerCode: 0,
                emailVerifyAt: 0,
                active: 0,
                verified: 0,
                _id: 0
            },
            productId: 0,
            __v: 0
        }}
      ]);
      return res
        .status(200)
        .json({
          success: true,
          message: "get Comments successful",
          data: Comments,
        });
    } catch (error) {
      return res
        .status(404)
        .json({ success: false, message: "get Comments failed", data: null });
    }
  }

  async GetCommentById(req, res) {
    try {
      const id = req.params.id;
      const Comment = await commentModel.findOne({ "comments._id": id });
      return res
        .status(200)
        .json({
          success: true,
          message: "get Comment successful",
          data: Comment,
        });
    } catch (error) {
      return res
        .status(404)
        .json({ success: false, message: "get Comment failed", data: null });
    }
  }

  async CreateComment(req, res) {
    const productId = req.params.id;
    const { id } = req?.user;
    try {
      const newComment = new commentModel({
        ...req.body,
        userId: id,
        productId: productId,
      });
      await newComment.save();
      return res
        .status(200)
        .json({
          success: true,
          message: "create Comment successful",
          data: newComment,
        });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ success: true, message: "create Comment failed", data: null });
    }
  }

  async DelComment(req, res) {
    try {
      const { id } = req.user;

      const { productId, commentId } = req.body;
      await commentModel.deleteMany({
        $or: [
          {
            $and: [
              { productId: productId },
              { userId: id },
              { $or: [{ _id: commentId }, { parentId: commentId }] },
            ],
          },
        ],
      });
      return res
        .status(200)
        .json({
          success: true,
          message: "delete Comment successful",
          data: null,
        });
    } catch (error) {
      console.log(error);
      return res
        .status(404)
        .json({ success: false, message: "delete Comment failed", data: null });
    }
  }

  async UpdateComment(req, res) {
    try {
      const { id } = req.user;
      const { productId, commentId, id: bucketId, content } = req.body;

      const comment = await commentModel.findOneAndUpdate(
        {
          productId: productId,
          _id: bucketId,
          userId: id,
          "comments._id": commentId,
        },
        { $set: { "comments.$.content": content } },
        { new: true }
      );

      return res
        .status(200)
        .json({
          success: true,
          message: "upadete Comment successful",
          data: comment,
        });
    } catch (error) {
      return res
        .status(404)
        .json({
          success: false,
          message: "upadete Comment failed",
          data: null,
        });
    }
  }
}

export default CommentCtl;
