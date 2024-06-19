


import express from "express"
import tryCatch from "../../error_handler/tryCatch"
import attribute_controller from "./attribute_controller"

const attributeRouter = express.Router()


attributeRouter.get("/", tryCatch(attribute_controller.fetchAttributes))
attributeRouter.post("/createAttribute", tryCatch(attribute_controller.addAttribute))
attributeRouter.put("/updateAttribute", tryCatch(attribute_controller.updateAttribute))
attributeRouter.delete("/delete/:id", tryCatch(attribute_controller.deleteAttribute))


export default attributeRouter