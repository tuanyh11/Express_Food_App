'use strict'

import User from "../Models/User.js";
import CryptoJS from 'crypto-js'
import UserRole from "../Models/UserRole.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import env from '../utils/CONST/index.js'



class AuthCtl {

    async Login(req, res) {
        try {
            const {email, password} = req.body

            if(!email || !password ) 
                return res.status(401).json({success: false, message: "input field can not be empty", data: null})
            
            const user = await User.findOne({email: email})

            if(!user) 
                return res.status(403).json({success: false, message: "invalid credentials", data: null})

            const decryptPassword = CryptoJS.AES.decrypt(user.password, env.JWT).toString(CryptoJS.enc.Utf8)


            if(!(decryptPassword === password)) 
                return res.status(401).json({success: false, message: "invalid credentials", data: null})  
                
            const {password: newPassword, ...orthers} = user._doc

            if(user.verified || user.registerCode.code) return res.status(402).json({success: false, message: "you have to verify code", data: {_id: orthers._id, email: orthers.email}})


            const token = jwt.sign({email, password, userName: user.userName, roleId: user.roleId}, env.JWT, {expiresIn: '48h'})

            

            return res.status(200).json({success: true, message: "login successful", data: { token: token, ...orthers}});
        } catch (error) {
            console.log(error)
            return res.status(403).json({success: false, message: "login failed", data: null})
        }
    }

    
    
     
    async Regiser(req, res) {
        const {email, password, passwordConfirm, userName} = req.body
        try {
            if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/.test(email)) 
                return res.status(401).json({success: false, message: "email invalid format", data: null})

            const existingUser = await User.findOne({email: email})     

            if(existingUser) 
                return res.status(401).json({success: false, message: "email already exist", data: null})
            if(!email || !userName || !password || !passwordConfirm) 
                return res.status(401).json({success: false, message: "input field can not be empty", data: null})
            if(password !== passwordConfirm) 
                return res.status(401).json({success: false, message: "password and passwordConfirm not match", data: null})  

            const encryptPassword =  CryptoJS.AES.encrypt(password, env.PASSWORD_KEY).toString()

            const roleId = await UserRole.findOne({displayName: 'user'},{_id: 1})

            const {code, expiryDate, createdAt} =  await this.SendCodeToEmail(email)

            const {_id, email} =  await new User({email, password: encryptPassword, userName, roleId: roleId, registerCode: {code, expiryDate, createdAt}}).save() 
            return res.status(200).json({success: true, message: "register successful", data: {email, _id}})

        } catch (error) {
            return res.status(500).json({success: false, message: "register failed", data: null})
        }
    }

    async RegisterCode(req, res) {
        try {
            const {id, email, code} = req.body

            if(!id || !email || !code) return res.status(402).json({success: false, message: "field is required", data: null})
             

            const existingUser = await User.findOne({email: email})

            if(!existingUser) return res.status(402).json({success: false, message: "User dose't exist", data: null})

            const {expiryDate} = existingUser.registerCode

            if(expiryDate < new Date()) return res.status(402).json({success: false, message: "code has expried. Try new code", data: null})

            const encryptCode =  CryptoJS.AES.encrypt(code, env.CODE).toString()

            if(encryptCode !== code) return res.status(402).json({success: false, message: "invalid code", data: null})

            const {_doc} =  await UserModel.findOneAndUpdate({_id: id, email: email},  {verified: true, registerCode: {code: null, expiryDate: null, createdAt: null}}, {new: true, password: 0})

            return res.status(200).json({success: true, message: "register code successful", data: _doc});
        } catch (error) {
            console.log(error)
            return res.status(404).json({success: false, message: "register code failed", data: null})
        }
    }

    async ReSendCode (req, res) {
        try {
            const {id, email} = req.body

            if(!id || !email) return res.status(402).json({success: false, message: "field is required", data: null})
             

            const existingUser = await User.findOne({email: email})

            if(!existingUser) return res.status(402).json({success: false, message: "User dose't exist", data: null})

           
            const {code, createdAt, expiryDate} =  await this.SendCodeToEmail(email)

             await UserModel.findOneAndUpdate({_id: id, email: email},  {registerCode: {code, expiryDate, createdAt}}, {new: true, password: 0})


        } catch (error) {
            console.log(error)
            return res.status(404).json({success: false, message: "register code failed", data: null})
        }

    }


    async SendCodeToEmail(email) {
        try {
            let code = Math.round(Math.random() * 9000)
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                secure: false,
                auth: {
                  user: env.EMAIL, 
                  pass: env.PASS_EMAIL, 
                },
            });

            
            await transporter.sendMail({
                from: 'test', // sender address
                to: email, // list of receivers
                subject: "Your code ✔", // Subject line
                text: `${code}`, // plain text body
                html: `<b>Verify your code ${code}</b>`, // html body
            });

            const hashCode = CryptoJS.AES.encrypt(code, env.CODE).toString()
            const expiryDate = new Date() + 3600000
            const createdAt = new Date()

            return {
                code: hashCode,
                expiryDate,
                createdAt,
            }

            
            
        } catch (error) {
            throw new Error(error)
        }
    }

        

}

export default AuthCtl