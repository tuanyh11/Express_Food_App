import {gql} from 'apollo-server'

const productQuery = gql`
    type Query  {
        products: [Product]
    }

    type Product {
        id: String
        name: String
        description: String
        image:String
        price: Int
        variants: [Variant]
        productItems: [ProductItems]
        reviews: [Review]
        limitReview: Int
        active: Boolean
    }

    type Variant {
        k: String
        v: String
    }

    type ProductItems {
        option: String
        price: Int
        image: String
        unique: String
    }

`


export default productQuery
