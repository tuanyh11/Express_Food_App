import { Router } from "express";
import { GetRole, GetRoles, CreateRole, DelRole, UpdateRole} from "../Controller/RoleCtl.js"; 


const roleRouter = Router()

roleRouter.get("/", GetRoles)

roleRouter.post("/", CreateRole)

roleRouter.route("/:id")
    .delete(DelRole)
    .put(UpdateRole)
    .get(GetRole)


export default roleRouter 