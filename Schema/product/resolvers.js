import Product from '../../Models/Product.js'
const productResolver = {
   Query: {
    async products () {
        const products = await Product.find()
        return products
    }
   },
   Mutation: {
    async createdProduct(parent, {product, variants, productItems}, context) {
        const newProduct = new Product({...product, variants, productItems})
        await newProduct.save()
        return newProduct
    },

    async updatedProduct(parent, {product, variants, productItems}, context) {
        const productUpdated = await Product.findOneAndUpdate({_id: product.id}, {...product, variants, productItems}, {new: true})
        return productUpdated
    },
    
    async deletedProduct(parent, {id}, context) {
        const productDel = await Product.findOneAndUpdate({_id:id}, {active: false})
        return productDel
    }
   }
   
}

export default productResolver