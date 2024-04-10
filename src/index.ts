import express, { Request, Response } from 'express';
import prisma from '../prisma/script';
import categoryROuter from './routes/category/category'
import variationRouter from './routes/variations/variation';
import productRouter from './routes/product/product';
import errorHandler from './error_handler/error_handler'
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //

app.use("/grocery", categoryROuter)
app.use("/grocery", productRouter)
app.use("/grocery", variationRouter)

app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});