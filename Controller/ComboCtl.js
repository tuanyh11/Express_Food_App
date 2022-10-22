import User from "../Models/User.js";
import ComboModel from "../Models/Combo.js";


class ComboCtl {

    async GetCombos(req, res) {
        try {
            const Combos = await ComboModel.find()
            return res.status(200).json({success: true, message: "get Combos successful", data: Combos});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Combos failed", data: null})
        }
    }
    
     
    async GetComboById(req, res) {
        try {
            const id = req.params.id
            const Combo = await ComboModel.findById(id)
            return res.status(200).json({success: true, message: "get Combo successful", data: Combo});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Combo failed", data: null})
        }
    }
    
    async CreateCombo(req, res) {
        const {name, image, products, price, saleInfo, description} = req.body

       try {
        if(!name || !image || products?.length === 0 || !price) 
            return res.status(403).json({success: false, message: "input is required", data: null})

        const existingCombo = await ComboModel.findOne({name})

        if(existingCombo )
            return res.status(403).json({success: false, message: "Combo already exist", data: null})

        const newCombo = new ComboModel({name, image, products, price, saleInfo, description})

        await newCombo.save({timestamps: true})

        return res.status(200).json({success: true, message: "create Combo successful", data: newCombo});
       } catch (error) {
        return res.status(200).json({success: true, message: "create Combo failed", data: newCombo});
       }
    }
 
    async DelCombo(req, res) { 
        try {
            const id = req.params.id
            const Combo = await ComboModel.findByIdAndRemove(id)
            return res.status(200).json({success: true, message: "delete Combo successful", data: Combo});
        } catch (error) {
            return res.status(404).json({success: false, message: "delete Combo failed", data: null})
        }
    }

    async UpdateCombo(req, res) {
        try {
            const id = req.params.id

            const {name, image, products, price, saleInfo, description} = req.body

            const existingCombo = await ComboModel.findOne({name})

            console.log(existingCombo.id)

            if(existingCombo && existingCombo.id !== id )
                return res.status(403).json({success: false, message: "Combo already exist", data: null})    
            
            const newCombo = await ComboModel.findOneAndUpdate({_id: id},  {name, image, products, price, saleInfo, description}, {new: true})

            return res.status(200).json({success: true, message: "upadete Combo successful", data: newCombo});

        } catch (error) {
            return res.status(404).json({success: false, message: "upadete Combo failed", data: null})
        }
    }

}

export default ComboCtl