import { Router } from "express";
import AuthCtl from "../Controller/AuthCtl.js";

const {Login, Regiser, RegisterCode} = new AuthCtl();

const authRouter = Router()

authRouter.post("/register", Regiser)

authRouter.post("/login", Login)
authRouter.post("/check-code", RegisterCode)


export default authRouter