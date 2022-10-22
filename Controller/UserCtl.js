import UserModel from "../Models/User.js";
import UserRole from "../Models/UserRole.js";
import CryptoJS from 'crypto-js'
import env from "../utils/CONST/index.js";


class UserCtl {

    async GetUsers(req, res) {
        try {
            const users = await UserModel.find({active: true})
            
            return res.status(200).json({success: true, message: "get users successful", data: users});
        } catch (error) {
            console.log(error);
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
        let {email, password, passwordConfirm, roleId, ...others} = req.body

        console.log(roleId)

        try {
            const existingUser = await UserModel.findOne({email: email}) 

            if(existingUser) 
                return res.status(403).json({success: false, message: "email already exist", data: null})
    
            if(password !== passwordConfirm) 
                return res.status(403).json({success: false, message: "password and passwordConfirm not match", data: null})
    
            const encryptPassword =  CryptoJS.AES.encrypt(password, env.PASSWORD_KEY).toString()
    
            roleId = roleId || await UserRole.findOne({displayName: 'user'},{_id: 1})
    
            const newUser = new UserModel({email, password: encryptPassword, ...others, roleId})
    
            await newUser.save({timestamps: true})
    
            return res.status(200).json({success: true, message: "create user successful", data: newUser});
        } catch (error) {
            console.log(error)
            return res.status(403).json({success: false, message: "create user failed", data: null})
        }
    }

    async DelUser(req, res) { 
        try {
            const id = req.params.id
            const user = await UserModel.findOneAndUpdate({_id: id},  {active: false}, {new: true})
            return res.status(200).json({success: true, message: "delete user successful", data: user});
        } catch (error) {
            return res.status(404).json({success: false, message: "delete user failed", data: null})
        }
    }

    async UpdateUser(req, res) {
        try {
            const id = req.params.id
            const {email, password, passwordConfirm, ...others} = req.body
            console.log(others)
            const existingUser = await UserModel.findOne({email: email}) 
            if(existingUser.id !== id) 
                return res.status(403).json({success: false, message: "email already exist", data: null})

            if(password !== passwordConfirm) 
                return res.status(403).json({success: false, message: "password and passwordConfirm not match", data: null})
            
            const encryptPassword =  CryptoJS.AES.encrypt(password, "mykey").toString()

            const user = await UserModel.findOneAndUpdate({_id: id},  {password: encryptPassword, email, ...others}, {new: true})
            return res.status(200).json({success: true, message: "upadete user successful", data: user});
        } catch (error) {
            console.log(error)
            return res.status(403).json({success: false, message: "upadete user failed", data: null})
        }
    }

}

export default UserCtl