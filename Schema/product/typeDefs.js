import {mergeTypeDefs } from "@graphql-tools/merge";
import productMutaion from "./mutation.js";
import productQuery from "./query.js";

const productTypeDefs = [productQuery, productMutaion]

export default productTypeDefs