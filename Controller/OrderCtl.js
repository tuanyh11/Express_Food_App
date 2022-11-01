import User from "../Models/User.js";
import OrderModel from "../Models/Order.js";


class OrderCtl {

    async GetOrders(req, res) {
        try {
            const {id} = req?.user
            const orders = await OrderModel.find({userId: id})
            return res.status(200).json({success: true, message: "get Orders successful", data: orders});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Orders failed", data: null})
        }
    }
    
     
    async GetOrderById(req, res) {
        try {
            const id = req.params.id
            const order = await OrderModel.findById(id)
            return res.status(200).json({success: true, message: "get Order successful", data: order});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Order failed", data: null})
        }
    }
    
    async CreateOrder(req, res) {
        const {address,  cartId, products, combos, payment, amount} = req.body
        const {id} = req?.user

       try {
        const newOrder = new OrderModel({address, userId: id, cartId, products, combos, payment, amount})

        await newOrder.save({timestamps: true})  

        return res.status(200).json({success: true, message: "create Order successful", data: newOrder});
       } catch (error) {
        console.log(error)
        return res.status(200).json({success: false, message: "create Order failed", data: null});
       }
    }

    async DelOrder(req, res) { 
        try {
            const id = req.params.id
            const Order = await OrderModel.findByIdAndDelete(id)
            return res.status(200).json({success: true, message: "delete Order successful", data: Order});
        } catch (error) {
            return res.status(404).json({success: false, message: "delete Order failed", data: null})
        }
    }

    async UpdateOrder(req, res) {
        try {
            const id = req.params.id
            const {Order, variants, OrderItems} = req.body
            const newOrder = await OrderModel.findOneAndUpdate({_id: id},  {...Order, variants, OrderItems}, {new: true})
            return res.status(200).json({success: true, message: "upadete newOrder successful", data: newOrder});
        } catch (error) {
            return res.status(404).json({success: false, message: "upadete newOrder failed", data: null})
        }
    }

}

export default OrderCtl