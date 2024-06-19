import express, { Response, Request } from 'express'
import tryCatch from '../../error_handler/tryCatch'
import category_spec_controller from './category_spec_controller'



const categorySpecRouter = express.Router()

categorySpecRouter.get('/', tryCatch(category_spec_controller.fetchCategorySpec))
categorySpecRouter.get('/specs/:catid', tryCatch(category_spec_controller.categorySpecWithCategoryId))
categorySpecRouter.post('/create', tryCatch(category_spec_controller.createCategorySpec))
categorySpecRouter.post('/update', tryCatch(category_spec_controller.updateCategorySpec))
categorySpecRouter.delete('/delete/:id', tryCatch(category_spec_controller.deleteCategorySpec))


export default categorySpecRouter


