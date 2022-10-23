import { Router } from "express";
import UserCtl from "../Controller/UserCtl.js";

const {GetUserById, GetUsers, CreateUser, DelUser, UpdateUser, GetUserByPosition} = new UserCtl();

const userRouter = Router()

userRouter.get("/", GetUsers)

userRouter.post("/", CreateUser)

userRouter.get("/by_position", GetUserByPosition)

userRouter.route("/:id")
    .get(GetUserById)
    .delete(DelUser)
    .put(UpdateUser)


export default userRouter
