import { Router } from "express";
import Order from "../Controller/OrderCtl.js";
import { userAuth } from "../utils/middleware/auth.js";

const {CreateOrder, GetOrders, getORderStats} = new Order(); 

const orderRouter = Router()

orderRouter.get("/", GetOrders)
orderRouter.get("/stats", getORderStats)

orderRouter.post("/",userAuth, CreateOrder)

// orderRouter.route("/:id")
//     .get(GetComboById)
//     .delete(DelCombo)
//     .put(UpdateCombo)


export default orderRouter