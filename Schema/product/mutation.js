import { gql } from "apollo-server";

const productMutaion = gql`
    type Mutation {
        createdProduct(product: ProductInput, variants: [VariantInput], productItems: [ProductItemsInput]): Product
        updatedProduct(product: ProductInput, variants: [VariantInput], productItems: [ProductItemsInput]): Product
        deletedProduct(id: String): Product
    }

    input ProductInput  {
        id: String
        name: String!
        description: String
        image:String!
        price: Int!
        active: Boolean
        limitReview: Int
    }

    input VariantInput {
        k: String
        v: String
    }

    
    input ProductItemsInput {
        option: String
        price: Int
        image: String
        unique: String
    }
`
export default productMutaion;