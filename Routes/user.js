import { Router } from "express";
import UserCtl from "../Controller/UserCtl.js";

const {GetUserById, GetUsers, CreateUser, DelUser, UpdateUser} = new UserCtl();

const userRouter = Router()

userRouter.get("/", GetUsers)

userRouter.post("/", CreateUser)

userRouter.route("/:id")
    .get(GetUserById)
    .delete(DelUser)
    .put(UpdateUser)


export default userRouter
