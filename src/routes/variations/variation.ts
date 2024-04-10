import express, { Response, Request } from 'express'

import variation_controller from './variation_controller'

const variationRouter = express.Router()


variationRouter.get("/variations", variation_controller.getAllVariation)
variationRouter.post("/createproductvariation", variation_controller.createVariation)
variationRouter.delete("/variations/:variationId", variation_controller.deleteVariation)


export default variationRouter


