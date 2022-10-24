import { Router } from "express";
import AuthCtl from "../Controller/AuthCtl.js";

const {Login, Regiser, RegisterCode, ReSendCode} = new AuthCtl();

const authRouter = Router()

authRouter.post("/register", Regiser.bind(AuthCtl))

authRouter.post("/login", Login.bind(AuthCtl))
authRouter.post("/check_code", RegisterCode.bind(AuthCtl))
authRouter.post("/get_code", ReSendCode)


export default authRouter