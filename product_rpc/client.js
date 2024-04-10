"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var products_grpc_pb_1 = require("../product_rpc/products_grpc_pb");
var grpc = require("@grpc/grpc-js");
var products_pb_1 = require("../product_rpc/products_pb");
var client = new products_grpc_pb_1.ProductsClient('localhost:50051', grpc.credentials.createInsecure());
var request = new products_pb_1.EmptyRequest();
var call = client.allProductStream(request);
call.on('data', function (response) {
    console.log(response.getId());
});
