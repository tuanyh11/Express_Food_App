import { Router } from "express";
import ProductCtl from "../Controller/ProductCtl.js";
import { userAuth } from "../utils/middleware/auth.js";


const {GetProductById, GetProducts, CreateProduct, DelProduct, UpdateProduct} = new ProductCtl();

const productRouter = Router()

productRouter.get("/", GetProducts)

productRouter.post("/", userAuth, CreateProduct)

productRouter.route("/:id")
    .get(GetProductById)
    .delete(DelProduct)
    .put(UpdateProduct)


export default productRouter