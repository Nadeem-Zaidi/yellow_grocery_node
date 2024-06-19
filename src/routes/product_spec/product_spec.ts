import express, { Response, Request } from 'express'
import tryCatch from '../../error_handler/tryCatch'
import product_spec_controller from './product_spec_controller'

const productSpecRouter = express.Router()

productSpecRouter.get('/', tryCatch(product_spec_controller.fetchProductSpecs))
productSpecRouter.post('/createspecs', tryCatch(product_spec_controller.createProductSpec))

export default productSpecRouter