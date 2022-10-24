import { Router } from "express";
import Order from "../Controller/OrderCtl.js";
import { userAuth } from "../utils/middleware/auth.js";

const {CreateOrder, GetOrders} = new Order(); 

const orderRouter = Router()

orderRouter.get("/", GetOrders)

orderRouter.post("/",userAuth, CreateOrder)

// orderRouter.route("/:id")
//     .get(GetComboById)
//     .delete(DelCombo)
//     .put(UpdateCombo)


export default orderRouter