// package: 
// file: category.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CategoryEmptyRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CategoryEmptyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CategoryEmptyRequest): CategoryEmptyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CategoryEmptyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CategoryEmptyRequest;
    static deserializeBinaryFromReader(message: CategoryEmptyRequest, reader: jspb.BinaryReader): CategoryEmptyRequest;
}

export namespace CategoryEmptyRequest {
    export type AsObject = {
    }
}

export class CategoryByIdRequest extends jspb.Message { 
    getCategoryId(): string;
    setCategoryId(value: string): CategoryByIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CategoryByIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CategoryByIdRequest): CategoryByIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CategoryByIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CategoryByIdRequest;
    static deserializeBinaryFromReader(message: CategoryByIdRequest, reader: jspb.BinaryReader): CategoryByIdRequest;
}

export namespace CategoryByIdRequest {
    export type AsObject = {
        categoryId: string,
    }
}

export class CategoryByParentIdRequest extends jspb.Message { 
    getParentId(): string;
    setParentId(value: string): CategoryByParentIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CategoryByParentIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CategoryByParentIdRequest): CategoryByParentIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CategoryByParentIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CategoryByParentIdRequest;
    static deserializeBinaryFromReader(message: CategoryByParentIdRequest, reader: jspb.BinaryReader): CategoryByParentIdRequest;
}

export namespace CategoryByParentIdRequest {
    export type AsObject = {
        parentId: string,
    }
}

export class Category extends jspb.Message { 
    getId(): string;
    setId(value: string): Category;
    getName(): string;
    setName(value: string): Category;
    clearImagesList(): void;
    getImagesList(): Array<string>;
    setImagesList(value: Array<string>): Category;
    addImages(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Category.AsObject;
    static toObject(includeInstance: boolean, msg: Category): Category.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Category, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Category;
    static deserializeBinaryFromReader(message: Category, reader: jspb.BinaryReader): Category;
}

export namespace Category {
    export type AsObject = {
        id: string,
        name: string,
        imagesList: Array<string>,
    }
}
