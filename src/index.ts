import express, { Request, Response } from 'express';
import prisma from '../prisma/script';
import categoryROuter from './routes/category/category'
// import variationRouter from './routes/variations/variation';

import errorHandler from './error_handler/error_handler'
import bodyParser from 'body-parser';
import productRouter from './routes/product/product';
import attributeRouter from './routes/attributes/attribute';
import categorySpecRouter from './routes/category_spec/category_spec';
import productSpecRouter from './routes/product_spec/product_spec';
import measureunitRouter from './measureunit/measureunit';

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //

app.use("/grocery/categories", categoryROuter)
app.use("/grocery/product", productRouter)
app.use("/grocery/attribute", attributeRouter)
app.use("/grocery/categoryspec", categorySpecRouter)
app.use("/grocery/specs", productSpecRouter)
app.use("/grocery/measureunit", measureunitRouter)
// app.use("/grocery", variationRouter)

app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});