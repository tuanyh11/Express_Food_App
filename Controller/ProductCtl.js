import User from "../Models/User.js";
import ProductModel from "../Models/Product.js";


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
            const product = await ProductModel.findById(id)
            return res.status(200).json({success: true, message: "get Product successful", data: product});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Product failed", data: null})
        }
    }
    
    async CreateProduct(req, res) {
        const {product, variants, productItems} = req.body
       try {
        const newProduct = new ProductModel({...product, variants: variants ? variants: [], productItems: productItems ? productItems: []})

        await newProduct.save({timestamps: true})  

        return res.status(200).json({success: true, message: "create product successful", data: newProduct});
       } catch (error) {
        console.log(error)
        return res.status(200).json({success: false, message: "create product failed", data: null});
       }
    }

    async DelProduct(req, res) { 
        try {
            const id = req.params.id
            const product = await ProductModel.findByIdAndDelete(id)
            return res.status(200).json({success: true, message: "delete product successful", data: product});
        } catch (error) {
            return res.status(404).json({success: false, message: "delete product failed", data: null})
        }
    }

    async UpdateProduct(req, res) {
        try {
            const id = req.params.id
            const {product, variants, productItems} = req.body
            const newProduct = await ProductModel.findOneAndUpdate({_id: id},  {...product, variants, productItems}, {new: true})
            return res.status(200).json({success: true, message: "upadete newProduct successful", data: newProduct});
        } catch (error) {
            return res.status(404).json({success: false, message: "upadete newProduct failed", data: null})
        }
    }

}

export default ProductCtl