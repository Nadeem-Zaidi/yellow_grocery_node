import express, { Request, Response } from 'express';
import tryCatch from '../error_handler/tryCatch';
import brand_controller from './brand_controller';

const brandRouter=express.Router()

brandRouter.get('/',tryCatch(brand_controller.fetchBrand))
brandRouter.post('/addbrand',tryCatch(brand_controller.addBrand))
brandRouter.post('/addmanybrand',tryCatch(brand_controller.addManyBrands))

export default brandRouter


