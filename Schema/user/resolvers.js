import User from '../../Models/User.js'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import {userAuth, adminVerify} from '../../utils/middleware/auth.js'
import { GraphQLError } from 'graphql'
import UserRole from '../../Models/UserRole.js'

const userResolver = {
  Mutation: {
   async register(parent, {userForm}, context) {
      const {email, password, passwordConfirm, userName} = userForm

      const existingUser = await User.findOne({email: email}) 

      if(existingUser) 
        throw new GraphQLError('email already exist', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          }
        });

      if(!email && !userName && !password && !passwordConfirm) 
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          }
        });

      if(password !== passwordConfirm) 
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          }
        });

      const encryptPassword =  CryptoJS.AES.encrypt(password, "mykey").toString()
      
      await new User({email, password: encryptPassword, userName}).save()

      return {
        code: 200,
        success: true,
        message: "Register successfully"
      }
    },

    async login(parent, {userForm}, context) {

        const {email, password} = userForm

        const user = await User.findOne({email: email})

        const decryptPassword = CryptoJS.AES.decrypt(user.password, "mykey").toString(CryptoJS.enc.Utf8)
        

        if(!(decryptPassword === password)) {
          throw new GraphQLError('User is not authenticated', {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 },
            } 
          });
        }

        console.log(user.roleId)

        const token = jwt.sign({email, password, userName: user.userName, roleId: user.roleId}, "mykey", {expiresIn: '48h'})

        return { 
            token: token,
            userName: user.userName,
            userImage: user.avatar
        } 
    },

    async createUser(_, {input}, { req}) {
        const isAdmin = await adminVerify({req})  

        if(isAdmin.message && isAdmin.extensions) 
          throw new GraphQLError(isAdmin.message, isAdmin?.extensions);
        
        const {email, password, passwordConfirm, userName, roleId} = input
        
        const existingUser = await User.findOne({email: email}) 

        if(existingUser) 
          throw new GraphQLError('email already exist', {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 },
            }
          });

        if(password !== passwordConfirm) 
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          }
        });

        const encryptPassword =  CryptoJS.AES.encrypt(password, "mykey").toString()
        const newUser = new User({email, password: encryptPassword, userName, roleId})
         newUser.save()
        return newUser
    },

    async createRoleUser(_, {input}, context) {

      const isAdmin = await adminVerify(context)  

      if(isAdmin.message && isAdmin.extensions) 
          throw new GraphQLError(isAdmin.message, isAdmin?.extensions);

      if(isAdmin) {
        const newUserRole = new UserRole({...input})
        await newUserRole.save()
        return newUserRole
      }
    },

    // async deletedUser(parent, {id}, context) {

    //   const isAdmin = await adminVerify(context)  

    //   if(isAdmin.message && isAdmin.extensions) 
    //       throw new GraphQLError(isAdmin.message, isAdmin?.extensions);

    //   const productDel = await Product.findOneAndUpdate({_id:id}, {active: false})
    //   return productDel
    // }


  },

  Query: {

  }
   
}

export default userResolver