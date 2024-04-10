import express, { Response, Request } from 'express'

import product_controller from './product_controller'

const productRouter = express.Router()



productRouter.get("/products", product_controller.allProducts)
productRouter.post("/createProduct", product_controller.createProduct)
productRouter.delete("/products/:productId", product_controller.deleteProduct)

export default productRouter