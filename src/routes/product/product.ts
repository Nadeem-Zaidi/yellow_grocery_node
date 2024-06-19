import express, { Response, Request } from 'express'

import product_controller from './product_controller'
import tryCatch from '../../error_handler/tryCatch'

const productRouter = express.Router()




productRouter.get("/", tryCatch(product_controller.productList))
productRouter.get("/:id", tryCatch(product_controller.fetchProduct))
productRouter.get("/variations/:productid", tryCatch(product_controller.productVariation))
productRouter.get("/variationbyid/:id", tryCatch(product_controller.variationById))
productRouter.post("/createProduct", tryCatch(product_controller.newProduct))
productRouter.post("/createVariation", tryCatch(product_controller.createProductVariation))




export default productRouter