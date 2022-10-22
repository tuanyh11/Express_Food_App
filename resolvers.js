import {mergeResolvers  } from "@graphql-tools/merge";
import productResolver from "./Schema/product/resolvers.js";
import userResolver from "./Schema/user/resolvers.js";


const resolvers = [productResolver, userResolver]

export default mergeResolvers(resolvers);