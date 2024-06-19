import express, { Router } from 'express'
import measureunit_controller from './measureunit_controller'
import tryCatch from '../error_handler/tryCatch'



const measureunitRouter: Router = express.Router()

measureunitRouter.get("/", measureunit_controller.fetchMeasuringunit)
measureunitRouter.post("/create", measureunit_controller.createMeasuringunit)
measureunitRouter.post("/createmany", tryCatch(measureunit_controller.createManyMeasureunit))
measureunitRouter.put("/update/:id", measureunit_controller.UpdateMeasureUnit)
measureunitRouter.delete("/delete/:id", tryCatch(measureunit_controller.deleteMeasureUnit))

export default measureunitRouter
