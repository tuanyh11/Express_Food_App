import {gql} from 'apollo-server'

const userQuery = gql`
    type Query  {
       users: User
    }


`


export default userQuery
