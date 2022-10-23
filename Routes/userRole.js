import { Router } from "express";
import RoleCtl from "../Controller/RoleCtl.js"; 

const { GetRole, GetRoles, CreateRole, DelRole, UpdateRole} = new RoleCtl();

const RoleRouter = Router()

RoleRouter.get("/", GetRoles)

RoleRouter.post("/", CreateRole)

RoleRouter.route("/:id")
    .delete(DelRole)
    .put(UpdateRole)
    .get(GetRole)


export default RoleRouter