import express, { Request, Response } from 'express';

import tryCatch from '../../error_handler/tryCatch';
import ad_category_controller from './ad_category_controller';


const categoryRouter = express.Router();

categoryRouter.get('/mobile',tryCatch(ad_category_controller.categoryMobile))
categoryRouter.get('/', tryCatch(ad_category_controller.fetchCategories))
categoryRouter.get('/:id', tryCatch(ad_category_controller.fetchCategory))
categoryRouter.post('/add_category', tryCatch(ad_category_controller.addCategory))

categoryRouter.patch('/update/:id', tryCatch(ad_category_controller.updateCategory))

export default categoryRouter

