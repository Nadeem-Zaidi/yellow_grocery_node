"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var grpc = require("@grpc/grpc-js");
var products_pb_1 = require("../product_rpc/products_pb");
var script_1 = require("../prisma/script");
var products_grpc_pb_1 = require("../product_rpc/products_grpc_pb");
var category_grpc_pb_1 = require("../category_rpc/category_grpc_pb");
var my_category_1 = require("../category_rpc/my_category");
function allProducts(call) {
    return __awaiter(this, void 0, void 0, function () {
        var prismaResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, script_1.default.product.findMany({
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            brand: true,
                            images: true,
                            PackSizeVariation: {
                                take: 1,
                                select: {
                                    product_id: true,
                                    quantity: true,
                                    price: true,
                                    unit: true,
                                }
                            }
                        },
                    })];
                case 1:
                    prismaResult = _a.sent();
                    prismaResult.forEach(function (p) {
                        var product = new products_pb_1.Product();
                        product.setId(p.id);
                        product.setName(p.name);
                        product.setDescription(p.description);
                        product.setCategoryList([p.brand]);
                        if (p.PackSizeVariation && p.PackSizeVariation.length > 0) {
                            var priceString = p.PackSizeVariation[0].price.toString();
                            product.setPrice(priceString);
                        } // Set price as string
                        if (p.images && Array.isArray(p.images)) {
                            product.setImagesList(p.images);
                        }
                        product.setUnit(p.PackSizeVariation[0].unit); // Adjust this based on your actual schema
                        // Set other fields of the Product type as necessary
                        call.write(product);
                        // Correctly send a Product object
                    });
                    console.log(prismaResult);
                    call.end();
                    return [2 /*return*/];
            }
        });
    });
}
function productByCategory(call) {
    return __awaiter(this, void 0, void 0, function () {
        var categoryId, products, _i, products_1, p, product, priceString, imageList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryId = call.request.getCategoryId();
                    return [4 /*yield*/, script_1.default.product.findMany({
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                brand: true,
                                category: true,
                                PackSizeVariation: {
                                    take: 1,
                                    select: {
                                        id: true,
                                        product_id: true,
                                        quantity: true,
                                        price: true,
                                        newprice: true,
                                        discount: true,
                                        unit: true,
                                        images: true,
                                        package_size: true,
                                    }
                                }
                            },
                            where: {
                                category: {
                                    has: categoryId
                                }
                            },
                        })];
                case 1:
                    products = _a.sent();
                    for (_i = 0, products_1 = products; _i < products_1.length; _i++) {
                        p = products_1[_i];
                        product = new products_pb_1.Product();
                        product.setId(p.id);
                        product.setName(p.name);
                        product.setDescription(p.description);
                        product.setCategoryList(p.category);
                        product.setBrand(p.brand);
                        product.setVid(p.PackSizeVariation[0].id);
                        product.setNewprice(p.PackSizeVariation[0].newprice.toString());
                        product.setDiscount(p.PackSizeVariation[0].discount.toString());
                        if (p.PackSizeVariation && p.PackSizeVariation.length > 0) {
                            priceString = p.PackSizeVariation[0].price.toString();
                            product.setPrice(priceString);
                        } // Set price as string
                        if (p.PackSizeVariation && p.PackSizeVariation.length > 0) {
                            imageList = p.PackSizeVariation[0].images;
                            product.setImagesList(imageList);
                        } // Set price as string
                        product.setUnit(p.PackSizeVariation[0].unit);
                        product.setPackSize(p.PackSizeVariation[0].package_size.toString());
                        // Adjust this based on your actual schema
                        // Set other fields of the Product type as necessary
                        call.write(product);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function productDetail(call) {
    return __awaiter(this, void 0, void 0, function () {
        var productId, variationId, product, p, priceString, imageList, variationList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productId = call.request.getProductId();
                    variationId = call.request.getVariationId();
                    return [4 /*yield*/, script_1.default.product.findUnique({
                            where: {
                                id: productId,
                            },
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                brand: true,
                                category: true,
                                images: true,
                                PackSizeVariation: {
                                    select: {
                                        id: true,
                                        price: true,
                                        quantity: true,
                                        unit: true,
                                        description: true,
                                        discount: true,
                                        newprice: true,
                                        package_size: true,
                                        images: true
                                    },
                                    // where: {
                                    //     id: variationId
                                    // }
                                },
                            },
                        })];
                case 1:
                    product = _a.sent();
                    if (product) {
                        p = new products_pb_1.Product();
                        p.setId(product.id);
                        p.setName(product.name);
                        p.setDescription(product.description);
                        p.setCategoryList(product.category);
                        p.setBrand(product.brand);
                        p.setVid(product.PackSizeVariation[0].id);
                        if (product.PackSizeVariation && product.PackSizeVariation.length > 0) {
                            priceString = product.PackSizeVariation[0].price.toString();
                            p.setPrice(priceString);
                        }
                        if (product.PackSizeVariation && product.PackSizeVariation.length > 0) {
                            imageList = product.PackSizeVariation[0].images;
                            p.setImagesList(imageList);
                        } // Set price as string// Set price as string
                        p.setUnit(product.PackSizeVariation[0].unit);
                        variationList = product.PackSizeVariation.map(function (v) {
                            var _a;
                            var variation = new products_pb_1.Variation();
                            variation.setId(v.id);
                            variation.setPrice(v.price);
                            variation.setDescription(v.description.toString());
                            variation.setQuantity(v.quantity);
                            variation.setUnit(v.unit);
                            variation.setNewprice(v.newprice);
                            variation.setDiscount((_a = v.discount) !== null && _a !== void 0 ? _a : 0);
                            variation.setImagesList(v.images);
                            variation.setSize(v.package_size.toString());
                            return variation;
                        });
                        p.setVariationList(variationList);
                        call.write(p);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var server = new grpc.Server();
server.addService(products_grpc_pb_1.ProductsService, { allProductStream: allProducts, allProductsByCategory: productByCategory, productDetail: productDetail });
server.addService(category_grpc_pb_1.CategoriesService, { allCategory: my_category_1.allCat, categoryById: my_category_1.catById, categoryByParent: my_category_1.catByParentId });
var PORT = 50051;
server.bindAsync("0.0.0.0:".concat(PORT), grpc.ServerCredentials.createInsecure(), function (error, port) {
    if (error) {
        console.error("Server error: ".concat(error.message));
    }
    else {
        console.log("Server running at http://0.0.0.0:".concat(port));
        server.start();
    }
});
