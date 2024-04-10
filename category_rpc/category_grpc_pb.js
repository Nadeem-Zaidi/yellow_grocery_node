// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var category_pb = require('./category_pb.js');

function serialize_Category(arg) {
  if (!(arg instanceof category_pb.Category)) {
    throw new Error('Expected argument of type Category');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Category(buffer_arg) {
  return category_pb.Category.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CategoryByIdRequest(arg) {
  if (!(arg instanceof category_pb.CategoryByIdRequest)) {
    throw new Error('Expected argument of type CategoryByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CategoryByIdRequest(buffer_arg) {
  return category_pb.CategoryByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CategoryEmptyRequest(arg) {
  if (!(arg instanceof category_pb.CategoryEmptyRequest)) {
    throw new Error('Expected argument of type CategoryEmptyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CategoryEmptyRequest(buffer_arg) {
  return category_pb.CategoryEmptyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// Define the service
var CategoriesService = exports.CategoriesService = {
  allCategory: {
    path: '/Categories/AllCategory',
    requestStream: false,
    responseStream: true,
    requestType: category_pb.CategoryEmptyRequest,
    responseType: category_pb.Category,
    requestSerialize: serialize_CategoryEmptyRequest,
    requestDeserialize: deserialize_CategoryEmptyRequest,
    responseSerialize: serialize_Category,
    responseDeserialize: deserialize_Category,
  },
  categoryById: {
    path: '/Categories/CategoryById',
    requestStream: false,
    responseStream: true,
    requestType: category_pb.CategoryByIdRequest,
    responseType: category_pb.Category,
    requestSerialize: serialize_CategoryByIdRequest,
    requestDeserialize: deserialize_CategoryByIdRequest,
    responseSerialize: serialize_Category,
    responseDeserialize: deserialize_Category,
  },
  categoryByParent: {
    path: '/Categories/CategoryByParent',
    requestStream: false,
    responseStream: true,
    requestType: category_pb.CategoryEmptyRequest,
    responseType: category_pb.Category,
    requestSerialize: serialize_CategoryEmptyRequest,
    requestDeserialize: deserialize_CategoryEmptyRequest,
    responseSerialize: serialize_Category,
    responseDeserialize: deserialize_Category,
  },
};

exports.CategoriesClient = grpc.makeGenericClientConstructor(CategoriesService);
