// package: 
// file: products.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as products_pb from "./products_pb";

interface IProductsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    allProductsByCategory: IProductsService_IAllProductsByCategory;
    allProductStream: IProductsService_IAllProductStream;
    productDetail: IProductsService_IProductDetail;
}

interface IProductsService_IAllProductsByCategory extends grpc.MethodDefinition<products_pb.ProductByCategoryIdRequest, products_pb.Product> {
    path: "/Products/AllProductsByCategory";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<products_pb.ProductByCategoryIdRequest>;
    requestDeserialize: grpc.deserialize<products_pb.ProductByCategoryIdRequest>;
    responseSerialize: grpc.serialize<products_pb.Product>;
    responseDeserialize: grpc.deserialize<products_pb.Product>;
}
interface IProductsService_IAllProductStream extends grpc.MethodDefinition<products_pb.EmptyRequest, products_pb.Product> {
    path: "/Products/AllProductStream";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<products_pb.EmptyRequest>;
    requestDeserialize: grpc.deserialize<products_pb.EmptyRequest>;
    responseSerialize: grpc.serialize<products_pb.Product>;
    responseDeserialize: grpc.deserialize<products_pb.Product>;
}
interface IProductsService_IProductDetail extends grpc.MethodDefinition<products_pb.ProductDetailRequest, products_pb.Product> {
    path: "/Products/ProductDetail";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<products_pb.ProductDetailRequest>;
    requestDeserialize: grpc.deserialize<products_pb.ProductDetailRequest>;
    responseSerialize: grpc.serialize<products_pb.Product>;
    responseDeserialize: grpc.deserialize<products_pb.Product>;
}

export const ProductsService: IProductsService;

export interface IProductsServer extends grpc.UntypedServiceImplementation {
    allProductsByCategory: grpc.handleServerStreamingCall<products_pb.ProductByCategoryIdRequest, products_pb.Product>;
    allProductStream: grpc.handleServerStreamingCall<products_pb.EmptyRequest, products_pb.Product>;
    productDetail: grpc.handleServerStreamingCall<products_pb.ProductDetailRequest, products_pb.Product>;
}

export interface IProductsClient {
    allProductsByCategory(request: products_pb.ProductByCategoryIdRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<products_pb.Product>;
    allProductsByCategory(request: products_pb.ProductByCategoryIdRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<products_pb.Product>;
    allProductStream(request: products_pb.EmptyRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<products_pb.Product>;
    allProductStream(request: products_pb.EmptyRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<products_pb.Product>;
    productDetail(request: products_pb.ProductDetailRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<products_pb.Product>;
    productDetail(request: products_pb.ProductDetailRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<products_pb.Product>;
}

export class ProductsClient extends grpc.Client implements IProductsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public allProductsByCategory(request: products_pb.ProductByCategoryIdRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<products_pb.Product>;
    public allProductsByCategory(request: products_pb.ProductByCategoryIdRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<products_pb.Product>;
    public allProductStream(request: products_pb.EmptyRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<products_pb.Product>;
    public allProductStream(request: products_pb.EmptyRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<products_pb.Product>;
    public productDetail(request: products_pb.ProductDetailRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<products_pb.Product>;
    public productDetail(request: products_pb.ProductDetailRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<products_pb.Product>;
}
