import UserModel from "../Models/User.js";
import UserRole from "../Models/UserRole.js";
import CryptoJS from 'crypto-js'
import env from "../utils/CONST/index.js";
import mongoose from "mongoose";


class UserCtl {

    async GetUsers(req, res) {
        try {
            const users = await UserModel.find()
            return res.status(200).json({success: true, message: "get users successful", data: users});
        } catch (error) {
            return res.status(404).json({success: false, message: "get users failed", data: null})
        }
    }

    
    async GetUserById(req, res) {
        try {
            const id = req.params.id
            const user = await UserModel.findById(id, {password: 0})
            return res.status(200).json({success: true, message: "get user successful", data: user});
        } catch (error) {
            return res.status(404).json({success: false, message: "get user failed", data: null})
        }
    }
    
    async CreateUser(req, res) {
        let {email, password, passwordConfirm, ...others} = req.body
        try {
            const existingUser = await UserModel.findOne({email: email}) 

            if(existingUser) 
                return res.status(403).json({success: false, message: "email already exist", data: null})
    
            if(password !== passwordConfirm) 
                return res.status(403).json({success: false, message: "password and passwordConfirm not match", data: null})
    
            const encryptPassword =  CryptoJS.AES.encrypt(password, env.PASSWORD_KEY).toString()
    
            const newUser = new UserModel({email, password: encryptPassword, ...others})
    
            await newUser.save({timestamps: true})
    
            return res.status(200).json({success: true, message: "create user successful", data: newUser});
        } catch (error) {
            return res.status(403).json({success: false, message: "create user failed", data: null})
        }
    }

    async DelUser(req, res) { 
        try {
            const id = req.params.id
            const user = await UserModel.findByIdAndDelete({_id: id})
            return res.status(200).json({success: true, message: "delete user successful", data: user});
        } catch (error) {
            return res.status(404).json({success: false, message: "delete user failed", data: null})
        }
    }

    async UpdateUser(req, res) {
        try {
            const id = req.params.id
            const {email, password, passwordConfirm, address, ...others} = req.body
            const existingUser = await UserModel.findOne({email: email})

            if(existingUser.id !== id) 
                return res.status(403).json({success: false, message: "email already exist", data: null})

            if(password !== passwordConfirm) 
                return res.status(403).json({success: false, message: "password and passwordConfirm not match", data: null})
            let encryptPassword ;
            if(password ) encryptPassword = CryptoJS.AES.encrypt(password, process.env.PASSWORD_KEY).toString()

            const user = await UserModel.findOneAndUpdate({_id: id},  {password: encryptPassword, email, address: {...address}, ...others }, {new: true})
            return res.status(200).json({success: true, message: "upadete user successful", data: user});
        } catch (error) {
            console.log(error)
            return res.status(403).json({success: false, message: "upadete user failed", data: null})
        }
    }

    async GetUserByPosition(req, res) {
        const nameRole = req.query.name || "nhanvien"
        try {
            const role = await UserRole.findOne({name: nameRole})
            if(role) {
                const users = await UserModel.aggregate([
                    {
                        $lookup: {
                            from: "userroles",
                            as: "userRole",
                            let: {role_id: "$roleId"},
                            pipeline: [
                                {$match: {$expr: {$eq: ["$_id", "$$role_id"]}}}
                            ]
                        }
                    },
                    {
                        $unwind: {
                            path: "$userRole",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $project: {
                            roleId: 0,
                        }
                    }
                ])

                console.log(users)
                return res.status(200).json({success: true, message: "get users successful", data: users});
            }
            const users = await UserModel.find({roleId: null, active: true})
            return res.status(200).json({success: true, message: "get users successful", data: users});
        } catch (error) {
            console.log(error)
            return res.status(404).json({success: false, message: "get users failed", data: null})
        }
    }

    async getUserStats(req, res) {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        
        try {
            const data = await UserModel.aggregate([
                {$match: {createdAt: {$gte: lastYear}}},
                {$project: {
                    month: {
                        $month: "$createdAt"
                    }
                }},
                {$group: {
                    _id: "$month",
                    total: {$sum: 1}
                }}
            ])

            console.log(data)

            return res.status(200).json({success: true, message: "get users stats successful", data: data});
        } catch (error) {
            return res.status(404).json({success: false, message: "get users stats failed", data: null})
        }
    }


}

export default UserCtl