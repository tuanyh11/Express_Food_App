import User from "../Models/User.js";
import UserRole from "../Models/UserRole.js";


class UserCtl {

    async GetUserRoles(req, res) {
        try {
            const userRoles = await UserRole.find({active: true})
            return res.status(200).json({success: true, message: "get userRoles successful", data: userRoles});
        } catch (error) {
            return res.status(404).json({success: false, message: "get userRoles failed", data: null})
        }
    }

    async GetUserRole(req, res) {
        const id = req.params.id
        try {
            console.log(id)
            const userRole = await UserRole.findOne({_id: id, active: true})
            console.log(userRole);

            return res.status(200).json({success: true, message: "get userRole successful", data: userRole});
        } catch (error) {
            console.log(error);
            return res.status(403).json({success: false, message: "get userRole failed", data: null})
        }
    }

    
    async CreateUserRole(req, res) {
        const {name, displayName} = req.body
         
       try {
        if(!name || !displayName) 
            return res.status(403).json({success: false, message: "name and displayname is required", data: null})

        const existingUserRole = await UserRole.findOne({$or: [{name: name}, {displayName: displayName}], $and: [{active: true}]}) 

        if(existingUserRole) 
            return res.status(403).json({success: false, message: "user role or displayname  already exist", data: null})

        const newUserRole = new UserRole({name, displayName})

        newUserRole.save()

        return res.status(200).json({success: true, message: "create user role successful", data: newUserRole});
       } catch (error) {
        return res.status(404).json({success: false, message: "create user role failed", data: null})
       }
    }

    async DelUserRole(req, res) { 
        try {
            const id = req.params.id
            const userRole = await UserRole.findOneAndUpdate({_id: id},  {active: false}, {new: true})
            return res.status(200).json({success: true, message: "delete user role successful", data: userRole});
        } catch (error) {
            return res.status(404).json({success: false, message: "delete user role failed", data: null})
        }
    }

    async UpdateUserRole(req, res) {
        try {
            const id = req.params.id
            const {name} = req.body

            const existingUserRole = await UserRole.findOne({name}) 

            if(existingUserRole) 
                return res.status(403).json({success: false, message: "name already exist", data: null})

            const userRole = await UserRole.findOneAndUpdate({_id: id},  {name: name}, {new: true})
            return res.status(200).json({success: true, message: "upadete user role successful", data: userRole});
        } catch (error) {
            return res.status(404).json({success: false, message: "upadete user role failed", data: null})
        }
    }

}

export default UserCtl