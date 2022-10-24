import { GraphQLError } from "graphql";
import jwt from 'jsonwebtoken'
import UserRole from '../../Models/UserRole.js'

export const userAuth = (req, res, next) => {
    const token = req.headers.authorization
    if(!token)  
      return res.status(401).json({success: false, message: "you are not logged in", data: null})
    try {
        const user =  jwt.verify(token, process.env.JWT)
        req.user = user
        next() 
    } catch (error) { 
       res.status(401).json({success: false, message: "you are not authenticated", data: null})
    }
}

export const adminVerify = async (req, res, next) => {
    const isAdmin = await UserRole.findOne({_id: req?.user?.roleId})
    if(isAdmin?.name === 'admin') {
      next()
    }  
    return res.status(403).json({success: false, message: "you dont have permission", data: null})
}