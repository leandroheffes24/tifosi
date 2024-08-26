const productsServices = require("../services/productsServices")
const categoriesServices = require("../services/categoriesServices")
require("dotenv").config()
const s3 = require("../configs/awsConfig")

module.exports = {
    index: async (req, res) => {
        const products = await productsServices.getAllProducts()

        for await (const product of products) {
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: product.images[0].image,
                Expires: 3600
            };

            product.imageUrl = s3.getSignedUrl('getObject', params);
        }

        const categories = await categoriesServices.getAllCategories()
        return res.render("index", {products, categories})
    },

    crear: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("crear", {categories})
    }
}