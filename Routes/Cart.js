import { Router } from "express";
import CartCtl from "../Controller/CartCtl.js";
import { userAuth } from "../utils/middleware/auth.js";

const {UpdateCartItem, DelItemCart, GetCartByUserId, AddItemToCart, CheckAllItems} = new CartCtl();

const cartRouter = Router()

cartRouter.get("/",userAuth, GetCartByUserId)
cartRouter.post("/",userAuth, AddItemToCart)
cartRouter.put('/', userAuth, UpdateCartItem)
cartRouter.put('/check_all', userAuth, CheckAllItems)

cartRouter.route("/:id")
    .delete(userAuth, DelItemCart)
    


export default cartRouter