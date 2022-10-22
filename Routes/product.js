import { Router } from "express";
import ProductCtl from "../Controller/ProductCtl.js";

const {GetProductById, GetProducts, CreateProduct, DelProduct, UpdateProduct} = new ProductCtl();

const productRouter = Router()

productRouter.get("/", GetProducts)

productRouter.post("/", CreateProduct)

productRouter.route("/:id")
    .get(GetProductById)
    .delete(DelProduct)
    .put(UpdateProduct)


export default productRouter