import { Router } from "express";
import CategoryCtl from "../Controller/CategoryCtl.js";

const {GetCategoryById, GetCategorys, CreateCategory, DelCategory, UpdateCategory} = new CategoryCtl();

const categoryRouter = Router()

categoryRouter.get("/", GetCategorys)

categoryRouter.post("/", CreateCategory)

categoryRouter.route("/:id")
    .get(GetCategoryById)
    .delete(DelCategory)
    .put(UpdateCategory)


export default categoryRouter