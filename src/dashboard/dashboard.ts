import express, { Request, Response } from 'express';
import tryCatch from '../error_handler/tryCatch';
import dashboard_controller from './dashboard_controller';





const dashBoardRouter = express.Router();

dashBoardRouter.get('/',tryCatch(dashboard_controller.dashBoard))



export default dashBoardRouter