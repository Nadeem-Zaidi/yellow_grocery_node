// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var products_pb = require('./products_pb.js');

function serialize_EmptyRequest(arg) {
  if (!(arg instanceof products_pb.EmptyRequest)) {
    throw new Error('Expected argument of type EmptyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_EmptyRequest(buffer_arg) {
  return products_pb.EmptyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Product(arg) {
  if (!(arg instanceof products_pb.Product)) {
    throw new Error('Expected argument of type Product');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Product(buffer_arg) {
  return products_pb.Product.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ProductByCategoryIdRequest(arg) {
  if (!(arg instanceof products_pb.ProductByCategoryIdRequest)) {
    throw new Error('Expected argument of type ProductByCategoryIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ProductByCategoryIdRequest(buffer_arg) {
  return products_pb.ProductByCategoryIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ProductDetailRequest(arg) {
  if (!(arg instanceof products_pb.ProductDetailRequest)) {
    throw new Error('Expected argument of type ProductDetailRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ProductDetailRequest(buffer_arg) {
  return products_pb.ProductDetailRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProductsService = exports.ProductsService = {
  allProductsByCategory: {
    path: '/Products/AllProductsByCategory',
    requestStream: false,
    responseStream: true,
    requestType: products_pb.ProductByCategoryIdRequest,
    responseType: products_pb.Product,
    requestSerialize: serialize_ProductByCategoryIdRequest,
    requestDeserialize: deserialize_ProductByCategoryIdRequest,
    responseSerialize: serialize_Product,
    responseDeserialize: deserialize_Product,
  },
  allProductStream: {
    path: '/Products/AllProductStream',
    requestStream: false,
    responseStream: true,
    requestType: products_pb.EmptyRequest,
    responseType: products_pb.Product,
    requestSerialize: serialize_EmptyRequest,
    requestDeserialize: deserialize_EmptyRequest,
    responseSerialize: serialize_Product,
    responseDeserialize: deserialize_Product,
  },
  productDetail: {
    path: '/Products/ProductDetail',
    requestStream: false,
    responseStream: true,
    requestType: products_pb.ProductDetailRequest,
    responseType: products_pb.Product,
    requestSerialize: serialize_ProductDetailRequest,
    requestDeserialize: deserialize_ProductDetailRequest,
    responseSerialize: serialize_Product,
    responseDeserialize: deserialize_Product,
  },
};

exports.ProductsClient = grpc.makeGenericClientConstructor(ProductsService);
