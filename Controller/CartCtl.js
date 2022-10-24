import User from "../Models/User.js";
import CartModel from "../Models/Cart.js";


class CartCtl {

    async GetCarts(req, res) {
        try {
            const Carts = await CartModel.find({})
            return res.status(200).json({success: true, message: "get Carts successful", data: Carts});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Carts failed", data: null})
        }
    }
    
     
    async GetCartByUserId(req, res) {
        try {
            const id = req.params.id
            const Cart = await CartModel.find({userId: req.params.id})
            return res.status(200).json({success: true, message: "get Cart successful", data: Cart});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Cart failed", data: null})
        }
    }
    

    async DelCart(req, res) { 
        try {
            const id = req.params.id
            const Cart = await CartModel.findByIdAndDelete(id)
            return res.status(200).json({success: true, message: "delete Cart successful", data: Cart});
        } catch (error) {
            return res.status(404).json({success: false, message: "delete Cart failed", data: null})
        }
    }

    async DelItemCart(req, res) {
        try {
            const userId = req.params.userId
            const {products} = req.body
            const newCart = await CartModel.findOneAndUpdate({userId: userId}, {$pull: {products: []}})
            return res.status(200).json({success: true, message: "upadete newCart successful", data: newCart});
        } catch (error) {
            return res.status(404).json({success: false, message: "upadete newCart failed", data: null})
        }
    }

}

export default CartCtl