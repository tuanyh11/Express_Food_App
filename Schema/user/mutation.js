import { gql } from "apollo-server";

const userMutaion = gql`
    type Mutation {
        register(userForm: UserRigister): Response 
        login(userForm: UserLogin): User
        createRoleUser(input: InputUserRole): UserRes
        createUser(input: InputCreateUser): UserCreateByAdmin
    }

    input UserRigister  {
         email: String
         userName: String
         password: String
         passwordConfirm: String
    }

    input UserLogin  {
         email: String
         password: String
    }
    
    input InputUserRole {
        value: String
    }

    input InputCreateUser {
        email: String!
        password: String!
        roleId: String
        userName: String!
        passwordConfirm: String!
    }

    type Response {
        code: Int,
        success: Boolean,
        message: String
    }

    type User {
        userName: String,
        avatar: String,
        token: String
    }

    type UserCreateByAdmin {
        email: String
        password: String
        roleId: String
        userName: String
    }

    type UserRes {
        id: String
        value: String
    }

`
export default userMutaion;