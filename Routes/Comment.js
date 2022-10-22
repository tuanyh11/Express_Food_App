import { Router } from "express";
import CommentCtl from "../Controller/CommentCtl.js";

const {GetCommentById, GetComments, CreateComment, DelComment, UpdateComment} = new CommentCtl();

const commentRouter = Router()

commentRouter.get("/", GetComments)

commentRouter.post("/", CreateComment)

commentRouter.route("/:id")
    .get(GetCommentById)
    .delete(DelComment)
    .put(UpdateComment)


export default commentRouter