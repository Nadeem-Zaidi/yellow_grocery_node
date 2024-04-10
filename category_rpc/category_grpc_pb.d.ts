// package: 
// file: category.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as category_pb from "./category_pb";

interface ICategoriesService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    allCategory: ICategoriesService_IAllCategory;
    categoryById: ICategoriesService_ICategoryById;
    categoryByParent: ICategoriesService_ICategoryByParent;
}

interface ICategoriesService_IAllCategory extends grpc.MethodDefinition<category_pb.CategoryEmptyRequest, category_pb.Category> {
    path: "/Categories/AllCategory";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<category_pb.CategoryEmptyRequest>;
    requestDeserialize: grpc.deserialize<category_pb.CategoryEmptyRequest>;
    responseSerialize: grpc.serialize<category_pb.Category>;
    responseDeserialize: grpc.deserialize<category_pb.Category>;
}
interface ICategoriesService_ICategoryById extends grpc.MethodDefinition<category_pb.CategoryByIdRequest, category_pb.Category> {
    path: "/Categories/CategoryById";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<category_pb.CategoryByIdRequest>;
    requestDeserialize: grpc.deserialize<category_pb.CategoryByIdRequest>;
    responseSerialize: grpc.serialize<category_pb.Category>;
    responseDeserialize: grpc.deserialize<category_pb.Category>;
}
interface ICategoriesService_ICategoryByParent extends grpc.MethodDefinition<category_pb.CategoryEmptyRequest, category_pb.Category> {
    path: "/Categories/CategoryByParent";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<category_pb.CategoryEmptyRequest>;
    requestDeserialize: grpc.deserialize<category_pb.CategoryEmptyRequest>;
    responseSerialize: grpc.serialize<category_pb.Category>;
    responseDeserialize: grpc.deserialize<category_pb.Category>;
}

export const CategoriesService: ICategoriesService;

export interface ICategoriesServer extends grpc.UntypedServiceImplementation {
    allCategory: grpc.handleServerStreamingCall<category_pb.CategoryEmptyRequest, category_pb.Category>;
    categoryById: grpc.handleServerStreamingCall<category_pb.CategoryByIdRequest, category_pb.Category>;
    categoryByParent: grpc.handleServerStreamingCall<category_pb.CategoryEmptyRequest, category_pb.Category>;
}

export interface ICategoriesClient {
    allCategory(request: category_pb.CategoryEmptyRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<category_pb.Category>;
    allCategory(request: category_pb.CategoryEmptyRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<category_pb.Category>;
    categoryById(request: category_pb.CategoryByIdRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<category_pb.Category>;
    categoryById(request: category_pb.CategoryByIdRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<category_pb.Category>;
    categoryByParent(request: category_pb.CategoryEmptyRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<category_pb.Category>;
    categoryByParent(request: category_pb.CategoryEmptyRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<category_pb.Category>;
}

export class CategoriesClient extends grpc.Client implements ICategoriesClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public allCategory(request: category_pb.CategoryEmptyRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<category_pb.Category>;
    public allCategory(request: category_pb.CategoryEmptyRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<category_pb.Category>;
    public categoryById(request: category_pb.CategoryByIdRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<category_pb.Category>;
    public categoryById(request: category_pb.CategoryByIdRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<category_pb.Category>;
    public categoryByParent(request: category_pb.CategoryEmptyRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<category_pb.Category>;
    public categoryByParent(request: category_pb.CategoryEmptyRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<category_pb.Category>;
}
