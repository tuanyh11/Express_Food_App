import { Router } from "express";
import CommentCtl from "../Controller/CommentCtl.js";
import { userAuth } from "../utils/middleware/auth.js";

const {GetCommentById, GetComments, CreateComment, DelComment, UpdateComment} = new CommentCtl();

const commentRouter = Router()

commentRouter.get("/", GetComments)

commentRouter.post("/:id",userAuth, CreateComment)

commentRouter.put("/",userAuth, DelComment)
commentRouter.put("/update",userAuth, UpdateComment)

commentRouter.route("/:id")
    .get(GetCommentById)
    .delete(DelComment)
    .put(userAuth, UpdateComment)


export default commentRouter