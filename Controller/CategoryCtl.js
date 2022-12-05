import User from "../Models/User.js";
import CategoryModel from "../Models/Category.js";


class CategoryCtl {

    async GetCategorys(req, res) {
        try {
            const query = req.query
            const Categorys = await CategoryModel.find().limit(query?.limit || 0)
            return res.status(200).json({success: true, message: "get Categorys successful", data: Categorys});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Categorys failed", data: null})
        }
    }
    
     
    async GetCategoryById(req, res) {
        try {
            const id = req.params.id
            const Category = await CategoryModel.findById(id)
            return res.status(200).json({success: true, message: "get Category successful", data: Category});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Category failed", data: null})
        }
    }
    
    async CreateCategory(req, res) {
        const {name, image} = req.body

       try {
        const existingCategory = await CategoryModel.findOne({name})

        if(existingCategory )
            return res.status(403).json({success: false, message: "category already exist", data: null})

        const newCategory = new CategoryModel({name, image})

        await newCategory.save({timestamps: true})

        return res.status(200).json({success: true, message: "create Category successful", data: newCategory});
       } catch (error) {
        console.log(error)
        return res.status(402).json({success: false, message: "create Category failed", data: null});
       }
    }

    async DelCategory(req, res) { 
        try {
            const id = req.params.id
            const Category = await CategoryModel.findByIdAndRemove(id)
            return res.status(200).json({success: true, message: "delete Category successful", data: Category});
        } catch (error) {
            return res.status(404).json({success: false, message: "delete Category failed", data: null})
        }
    }

    async UpdateCategory(req, res) {
        try {
            const id = req.params.id

            const {name, image} = req.body

            const existingCategory = await CategoryModel.findOne({name})

            if(existingCategory && existingCategory.id !== id )
                return res.status(403).json({success: false, message: "category already exist", data: null})    
            
            const newCategory = await CategoryModel.findOneAndUpdate({_id: id},  {name, image}, {new: true})

            return res.status(200).json({success: true, message: "upadete Category successful", data: newCategory});

        } catch (error) {
            return res.status(404).json({success: false, message: "upadete Category failed", data: null})
        }
    }

}

export default CategoryCtl