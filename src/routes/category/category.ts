import express, { Request, Response } from 'express';
import category from './category_controller';
import tryCatch from '../../error_handler/tryCatch';


const categoryRouter = express.Router();

categoryRouter.post('/categories/create', tryCatch(category.createCategory))
categoryRouter.get('/categories', tryCatch(category.fetchAllCategory))
categoryRouter.delete('/categories/:catId', tryCatch(category.deleteCategory))


export default categoryRouter

