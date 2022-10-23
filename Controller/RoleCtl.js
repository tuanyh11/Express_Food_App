import Role from "../Models/UserRole.js";


class RoleCtl {

    async GetRoles(req, res) {
        try {
            const roles = await Role.find()
            return res.status(200).json({success: true, message: "get Roles successful", data: roles});
        } catch (error) {
            return res.status(404).json({success: false, message: "get Roles failed", data: null})
        }
    }

    async GetRole(req, res) {
        const id = req.params.id
        try {
            const role = await Role.findOne({_id: id, active: true})

            return res.status(200).json({success: true, message: "get Role successful", data: role});
        } catch (error) {
            console.log(error);
            return res.status(403).json({success: false, message: "get Role failed", data: null})
        }
    }

    
    async CreateRole(req, res) {
        const {name, displayName, monthlySalary} = req.body
          
       try {
        if(!name || !displayName) 
            return res.status(403).json({success: false, message: "name and displayname is required", data: null})

        const existingRole = await Role.findOne({$or: [{name: name}, {displayName: displayName}]}) 

        if(existingRole) 
            return res.status(403).json({success: false, message: " role or displayname  already exist", data: null})
 
        const newRole = new Role({name, displayName, monthlySalary})

        newRole.save()

        return res.status(200).json({success: true, message: "create  role successful", data: newRole});
       } catch (error) {
        return res.status(404).json({success: false, message: "create  role failed", data: null})
       }
    } 

    async DelRole(req, res) { 
        try {
            const id = req.params.id
            const role = await Role.findOneAndRemove({_id: id})
            return res.status(200).json({success: true, message: "delete  role successful", data: role});
        } catch (error) {
            console.log(error)
            return res.status(404).json({success: false, message: "delete  role failed", data: null})
        }
    }

    async UpdateRole(req, res) {
        try {
            const id = req.params.id
            const {name} = req.body

            const existingRole = await Role.findOne({name}) 

            if(existingRole) 
                return res.status(403).json({success: false, message: "name already exist", data: null})

            const role = await Role.findOneAndUpdate({_id: id},  {name: name}, {new: true})
            return res.status(200).json({success: true, message: "upadete  role successful", data: role});
        } catch (error) {
            return res.status(404).json({success: false, message: "upadete  role failed", data: null})
        }
    }

}

export default RoleCtl