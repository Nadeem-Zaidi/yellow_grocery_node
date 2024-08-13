import express, { Request, Response } from 'express';
import landing_page_controller from './landing_page_controller';


const landingPageRouter=express.Router()


landingPageRouter.get("/",landing_page_controller.landingPageController)


export default landingPageRouter