
import {mergeTypeDefs } from "@graphql-tools/merge";
import productTypeDefs from "./Schema/product/typeDefs.js";
import reviewTypeDefs from "./Schema/review/type.js";
import userTypeDefs from "./Schema/user/typeDefs.js";


const type = [reviewTypeDefs, ...productTypeDefs, ...userTypeDefs ]

export default mergeTypeDefs(type);
 