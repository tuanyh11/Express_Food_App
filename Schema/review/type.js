import {gql} from 'apollo-server'
const reviewTypeDefs = gql`
    type Query  {
        reviews: [Review]
    }
    
    type Review {
        id: String
        content: String
        rating: Int
        parentId: String
    }
`

export default reviewTypeDefs
