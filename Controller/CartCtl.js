import User from "../Models/User.js";
import CartModel from "../Models/Cart.js";



class CartCtl {

    async AddItemToCart(req, res) {
        const {id} = req?.user
        const product = req.body
        try {
            const carts = await CartModel.findOne({userId: id})

            const index =  carts.products.findIndex(p => p._id === product._id)

            if(index !== -1) { 
                carts.products[index] = {...carts.products[index], checkout:  product.checkout ,quantity: Number(carts.products[index].quantity) + Number(product.quantity)}
            } else {
                carts.products.push(product)
            }

            const newCart = await carts.save()

            return res.status(200).json({success: true, message: "add to Carts successful", data: newCart});
        } catch (error) {
            return res.status(404).json({success: false, message: "add to Carts failed", data: null})
        }
    }
    
     
    async GetCartByUserId(req, res) {
        try {
            const {id} = req?.user
            const Cart = await CartModel.findOne({userId: id})
            return res.status(200).json({success: true, message: "get Cart successful", data: Cart});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Cart failed", data: null})
        }
    }
    

    async DelItemCart(req, res) { 
        try {
            const {id} = req?.user
            const {id: productId} = req.params
            const Cart = await CartModel.findOneAndUpdate({userId: id}, {$pull: {products: {_id: productId}}})
            return res.status(200).json({success: true, message: "delete Cart successful", data: Cart});
        } catch (error) {
            console.log(error)
            return res.status(404).json({success: false, message: "delete Cart failed", data: null})
        }
    }

    async CheckAllItems(req, res) {
        try {
            const {id} = req?.user
            const {checkout} = req.body
            const Cart = await CartModel.updateMany({userId: id}, {$set: {"products.$[].checkout": checkout}})
            return res.status(200).json({success: true, message: "update Cart successful", data: Cart});
        } catch (error) {
            console.log(error)
            return res.status(404).json({success: false, message: "update Cart failed", data: null})
        }
    }

    async UpdateCartItem (req, res) {
        try {
            const {id} = req?.user
            console.log(req.body)
            const Cart = await CartModel.findOneAndUpdate({userId: id, "products._id": req.body?._id}, {$set: {"products.$": req.body}}, {new: true})
            return res.status(200).json({success: true, message: "update Cart successful", data: Cart});
        } catch (error) {
            return res.status(404).json({success: false, message: "update Cart failed", data: null})
        }
    }


}

export default CartCtl