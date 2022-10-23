import { Router } from "express";
import RoleCtl from "../Controller/RoleCtl.js"; 

const { GetRole, GetRoles, CreateRole, DelRole, UpdateRole} = new RoleCtl();

const roleRouter = Router()

roleRouter.get("/", GetRoles)

roleRouter.post("/", CreateRole)

roleRouter.route("/:id")
    .delete(DelRole)
    .put(UpdateRole)
    .get(GetRole)


export default roleRouter