// package: 
// file: products.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class EmptyRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmptyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: EmptyRequest): EmptyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmptyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmptyRequest;
    static deserializeBinaryFromReader(message: EmptyRequest, reader: jspb.BinaryReader): EmptyRequest;
}

export namespace EmptyRequest {
    export type AsObject = {
    }
}

export class ProductVariationRequest extends jspb.Message { 
    getProductId(): string;
    setProductId(value: string): ProductVariationRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProductVariationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ProductVariationRequest): ProductVariationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProductVariationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProductVariationRequest;
    static deserializeBinaryFromReader(message: ProductVariationRequest, reader: jspb.BinaryReader): ProductVariationRequest;
}

export namespace ProductVariationRequest {
    export type AsObject = {
        productId: string,
    }
}

export class ProductDetailRequest extends jspb.Message { 
    getProductId(): string;
    setProductId(value: string): ProductDetailRequest;
    getVariationId(): string;
    setVariationId(value: string): ProductDetailRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProductDetailRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ProductDetailRequest): ProductDetailRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProductDetailRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProductDetailRequest;
    static deserializeBinaryFromReader(message: ProductDetailRequest, reader: jspb.BinaryReader): ProductDetailRequest;
}

export namespace ProductDetailRequest {
    export type AsObject = {
        productId: string,
        variationId: string,
    }
}

export class ProductByCategoryIdRequest extends jspb.Message { 
    getCategoryId(): string;
    setCategoryId(value: string): ProductByCategoryIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProductByCategoryIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ProductByCategoryIdRequest): ProductByCategoryIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProductByCategoryIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProductByCategoryIdRequest;
    static deserializeBinaryFromReader(message: ProductByCategoryIdRequest, reader: jspb.BinaryReader): ProductByCategoryIdRequest;
}

export namespace ProductByCategoryIdRequest {
    export type AsObject = {
        categoryId: string,
    }
}

export class AllProductResponse extends jspb.Message { 
    clearProductList(): void;
    getProductList(): Array<Product>;
    setProductList(value: Array<Product>): AllProductResponse;
    addProduct(value?: Product, index?: number): Product;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AllProductResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AllProductResponse): AllProductResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AllProductResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AllProductResponse;
    static deserializeBinaryFromReader(message: AllProductResponse, reader: jspb.BinaryReader): AllProductResponse;
}

export namespace AllProductResponse {
    export type AsObject = {
        productList: Array<Product.AsObject>,
    }
}

export class Variation extends jspb.Message { 
    getId(): string;
    setId(value: string): Variation;
    getQuantity(): number;
    setQuantity(value: number): Variation;
    getPrice(): number;
    setPrice(value: number): Variation;
    getDiscount(): number;
    setDiscount(value: number): Variation;
    getNewprice(): number;
    setNewprice(value: number): Variation;
    getUnit(): string;
    setUnit(value: string): Variation;
    getSize(): string;
    setSize(value: string): Variation;
    getDescription(): string;
    setDescription(value: string): Variation;
    clearImagesList(): void;
    getImagesList(): Array<string>;
    setImagesList(value: Array<string>): Variation;
    addImages(value: string, index?: number): string;
    getPackSize(): string;
    setPackSize(value: string): Variation;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Variation.AsObject;
    static toObject(includeInstance: boolean, msg: Variation): Variation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Variation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Variation;
    static deserializeBinaryFromReader(message: Variation, reader: jspb.BinaryReader): Variation;
}

export namespace Variation {
    export type AsObject = {
        id: string,
        quantity: number,
        price: number,
        discount: number,
        newprice: number,
        unit: string,
        size: string,
        description: string,
        imagesList: Array<string>,
        packSize: string,
    }
}

export class Product extends jspb.Message { 
    getId(): string;
    setId(value: string): Product;
    getName(): string;
    setName(value: string): Product;
    getPrice(): string;
    setPrice(value: string): Product;
    getNewprice(): string;
    setNewprice(value: string): Product;
    getDiscount(): string;
    setDiscount(value: string): Product;
    getDescription(): string;
    setDescription(value: string): Product;
    getBrand(): string;
    setBrand(value: string): Product;
    clearCategoryList(): void;
    getCategoryList(): Array<string>;
    setCategoryList(value: Array<string>): Product;
    addCategory(value: string, index?: number): string;
    getUnit(): string;
    setUnit(value: string): Product;
    clearImagesList(): void;
    getImagesList(): Array<string>;
    setImagesList(value: Array<string>): Product;
    addImages(value: string, index?: number): string;
    getVid(): string;
    setVid(value: string): Product;
    clearVariationList(): void;
    getVariationList(): Array<Variation>;
    setVariationList(value: Array<Variation>): Product;
    addVariation(value?: Variation, index?: number): Variation;
    getPackSize(): string;
    setPackSize(value: string): Product;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Product.AsObject;
    static toObject(includeInstance: boolean, msg: Product): Product.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Product, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Product;
    static deserializeBinaryFromReader(message: Product, reader: jspb.BinaryReader): Product;
}

export namespace Product {
    export type AsObject = {
        id: string,
        name: string,
        price: string,
        newprice: string,
        discount: string,
        description: string,
        brand: string,
        categoryList: Array<string>,
        unit: string,
        imagesList: Array<string>,
        vid: string,
        variationList: Array<Variation.AsObject>,
        packSize: string,
    }
}
