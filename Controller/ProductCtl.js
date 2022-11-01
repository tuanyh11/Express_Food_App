import User from "../Models/User.js";
import ProductModel from "../Models/Product.js";
import CategoryModel from "../Models/Category.js";
import CommentModel from "../Models/Comment.js";
import fs from 'fs'
import path from 'path'
import mongoose from "mongoose";


class ProductCtl {

    async GetProducts(req, res) {
        try {
            const products = await ProductModel.find({active: true})
            return res.status(200).json({success: true, message: "get Products successful", data: products});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Products failed", data: null})
        }
    }
    
     
    async GetProductById(req, res) {
        try {
            const id = req.params.id
            let {page, limit } = req.query
            limit = limit || 10
            page = page || 1

            let product = await ProductModel.aggregate([
                {$match: {_id: mongoose.Types.ObjectId(id)}},
                {$lookup: {
                    from: "categories",
                    localField: "categories",
                    foreignField: "_id",
                    as: "categories"
                }}
            ])

            product = product?.[0]


            if(product) {

                const commentLength = await CommentModel.find({productId: product._id}).count()
                const comments = await CommentModel.aggregate([
                    {$match: {productId: product._id}},
                    {$lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user"
                    }},
                    {$unwind: "$user"},
                    {$project: {
                        user: {
                            email: 0,
                            password: 0,
                            roleId: 0,
                            contract: 0,
                            registerCode: 0,
                            emailVerifyAt: 0,
                            active: 0,
                            verified: 0,
                            _id: 0
                        },
                        productId: 0,
                        __v: 0
                    }}
                ]).sort({createdAt: -1}).skip((page - 1) * limit).limit(limit)

                const finalProduct = {...product, comments, commentLength}

                return res.status(200).json({success: false, message: "get Product successful", data: finalProduct})
            }

            return res.status(404).json({success: false, message: "not found product", data: null})
        } catch (error) {
            console.log(error)
            return res.status(404).json({success: false, message: "get Product failed", data: null})
        }
    }
    
    async CreateProduct(req, res) {
        const {id} = req.user
        const {imageFake, ...rest} = req.body
       try {
        const newProduct = new ProductModel({...rest, userId: id})

        await newProduct.save({timestamps: true})  

        return res.status(200).json({success: true, message: "create product successful", data: newProduct});
       } catch (error) {
        console.log(error)
        return res.status(401).json({success: false, message: "create product failed", data: null});
       }
    }

    async DelProduct(req, res) { 
        
        try {
            const id = req.params.id
            const product = await ProductModel.findOne({_id: id})
            let listImage 

            if(product.productItems.length > 0) {
                listImage = product.productItems.map(item => {
                    if(item.image) {
                        return new Promise((resolve, reject) => {
                            const fileId = `${path.resolve()}/uploads/${item.image}`
                            fs.unlinkSync(fileId)
                            resolve()
                        })
                    }
                })
            }

            listImage && await Promise.all(listImage)

            const fileId = `${path.resolve()}/uploads/${product.image}`
            fs.unlink(fileId, (error) => {
                if(error) return res.status(404).json({success: false, message: "delete product failed", data: null})
            })
            await ProductModel.findByIdAndDelete(id)
            return res.status(200).json({success: true, message: "delete product successful", data: product});
        } catch (error) {
            console.log(error) 
            return res.status(404).json({success: false, message: "delete product failed", data: null})
        }
    }

    async UpdateProduct(req, res) {
        try {
            const id = req.params.id
            const newProduct = await ProductModel.findOneAndUpdate({_id: id},  {...req.body}, {new: true})
            return res.status(200).json({success: true, message: "upadete newProduct successful", data: newProduct});
        } catch (error) {
            console.log(error)
            return res.status(404).json({success: false, message: "upadete newProduct failed", data: null})
        }
    }


}

export default ProductCtl