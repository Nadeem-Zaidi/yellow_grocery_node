
import * as grpc from '@grpc/grpc-js';
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js/build/src/server-call';
import { AllProductResponse, EmptyRequest, Product, ProductDetailRequest, ProductVariationRequest, Variation } from '../product_rpc/products_pb';
import prisma from '../prisma/script';
import { ProductsService } from '../product_rpc/products_grpc_pb';
import { CategoriesService } from '../category_rpc/category_grpc_pb';
import { allCat, catById, catByParentId } from '../category_rpc/my_category';
import { ProductByCategoryIdRequest } from './products_pb';


async function allProducts(call: grpc.ServerWritableStream<EmptyRequest, Product>) {

    const prismaResult = await prisma.product.findMany({
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
    })

    prismaResult.forEach(p => {
        const product = new Product();
        product.setId(p.id);
        product.setName(p.name);
        product.setDescription(p.description);
        product.setCategoryList([p.brand]);
        if (p.PackSizeVariation && p.PackSizeVariation.length > 0) {
            const priceString = p.PackSizeVariation[0].price.toString();

            product.setPrice(priceString);
        } // Set price as string
        if (p.images && Array.isArray(p.images)) {
            product.setImagesList(p.images);

        }
        product.setUnit(p.PackSizeVariation[0].unit!) // Adjust this based on your actual schema
        // Set other fields of the Product type as necessary


        call.write(product);


        // Correctly send a Product object
    })

    console.log(prismaResult)

    call.end()

}


async function productByCategory(call: grpc.ServerWritableStream<ProductByCategoryIdRequest, Product>) {
    const categoryId = call.request.getCategoryId()
    const products = await prisma.product.findMany({
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
    })

    for (let p of products) {

        const product = new Product()
        product.setId(p.id);
        product.setName(p.name);
        product.setDescription(p.description);
        product.setCategoryList(p.category);
        product.setBrand(p.brand)
        product.setVid(p.PackSizeVariation[0].id)
        product.setNewprice(p.PackSizeVariation[0].newprice.toString())
        product.setDiscount(p.PackSizeVariation[0].discount!.toString())
        if (p.PackSizeVariation && p.PackSizeVariation.length > 0) {
            const priceString = p.PackSizeVariation[0].price.toString();

            product.setPrice(priceString);
        } // Set price as string
        if (p.PackSizeVariation && p.PackSizeVariation.length > 0) {
            const imageList = p.PackSizeVariation[0].images;


            product.setImagesList(imageList);
        } // Set price as string
        product.setUnit(p.PackSizeVariation[0].unit!)
        product.setPackSize(p.PackSizeVariation[0].package_size.toString())

        // Adjust this based on your actual schema
        // Set other fields of the Product type as necessary
        call.write(product);
    }
}

async function productDetail(call: grpc.ServerWritableStream<ProductDetailRequest, Product>) {
    const productId = call.request.getProductId()
    const variationId = call.request.getVariationId()
    const product = await prisma.product.findUnique({
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
    })

    if (product) {
        const p = new Product()
        p.setId(product.id);
        p.setName(product.name);
        p.setDescription(product.description);
        p.setCategoryList(product.category);
        p.setBrand(product.brand)
        p.setVid(product.PackSizeVariation[0].id)
        if (product.PackSizeVariation && product.PackSizeVariation.length > 0) {
            const priceString = product.PackSizeVariation[0].price.toString();

            p.setPrice(priceString);
        }

        if (product.PackSizeVariation && product.PackSizeVariation.length > 0) {
            const imageList = product.PackSizeVariation[0].images;


            p.setImagesList(imageList);
        } // Set price as string// Set price as string

        p.setUnit(product.PackSizeVariation[0].unit!)

        const variationList = product.PackSizeVariation.map(v => {
            const variation = new Variation();
            variation.setId(v.id)
            variation.setPrice(v.price)
            variation.setDescription(v.description!.toString())
            variation.setQuantity(v.quantity)
            variation.setUnit(v.unit!)
            variation.setNewprice(v.newprice)
            variation.setDiscount(v.discount ?? 0)
            variation.setImagesList(v.images)
            variation.setSize(v.package_size.toString())


            return variation

        })

        p.setVariationList(variationList)

        call.write(p)

    }
}






const server = new grpc.Server();


server.addService(ProductsService, { allProductStream: allProducts, allProductsByCategory: productByCategory, productDetail: productDetail })

server.addService(CategoriesService, { allCategory: allCat, categoryById: catById, categoryByParent: catByParentId })



const PORT = 50051;
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error(`Server error: ${error.message}`);
    } else {
        console.log(`Server running at http://0.0.0.0:${port}`);
        server.start();
    }
})


