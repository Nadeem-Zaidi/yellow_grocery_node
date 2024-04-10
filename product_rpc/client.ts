import { ProductsClient } from "../product_rpc/products_grpc_pb";
import * as grpc from '@grpc/grpc-js';
import { AllProductResponse, EmptyRequest, Product } from "../product_rpc/products_pb";


const client = new ProductsClient('localhost:50051', grpc.credentials.createInsecure())
const request = new EmptyRequest()


const call = client.allProductStream(request);
call.on('data', (response: Product) => {
    console.log(response.getId())
})



