import { Response, Request, NextFunction } from 'express'
import prisma from '../../../prisma/script'
import { Prisma } from '@prisma/client'
import { ProductVariationDBInput, ProductVariationInput } from '../../types/types'



interface Product {
    name: string,
    description: string,
    category: string
    categoryid: string
    categorydescription: string
    brand: string
    weight?: string | null | undefined
    dimension?: string
    tags: string[]
}

async function newProduct(req: Request, res: Response, next: NextFunction) {
    const { name, description, category, categoryid, brand, tags } = req.body as Product

    if (!name || !description || !category || !categoryid) {
        throw new Error("name,description,category,categoryid can not be empty")
    }

    const createProduct = await prisma.product.create({
        data: {
            name: name,
            description: description,
            category: category,
            brand: brand,
            tags: tags,
            categoryId: categoryid
        }
    })

    return res.status(200).json({ product: createProduct })
}

const fetchProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId: string = req.params.id;
    if (productId) {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
            select: {
                id: true,
                name: true,
                description: true,
                category: true,
                brand: true,
                measuringunit: true,
                tags: true,
                categoryId: true,
                Category: {
                    select: {
                        id: true,
                        name: true,
                        path: true
                    }
                },
                ProductVariation: {
                    select: {
                        id: true,
                        productId: true,
                        name: true,
                        description: true,
                        categoryid: true,
                        product: {
                            select: {
                                category: true
                            }
                        }
                    }
                }
            },
        })
        return res.status(200).json(product)

    }
}

const productList = async (req: Request, res: Response, next: NextFunction) => {

    const {
        page = '1',
        pagesize = '10',
        sortKey = 'createdAt',
        sortOrder = 'asc',
        name,
        description,
        category,
        brand,
    }: { page?: string, pagesize?: string, sortKey?: string, sortOrder?: string, name?: string, description?: string, category?: string, brand?: string } = req.query;


    let pageNumber = parseInt(page)
    let pageSize = parseInt(pagesize)

    pageNumber = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber
    pageSize = isNaN(pageSize) || pageSize < 1 ? 10 : pageSize

    const validSortOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'asc'
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const order: any = {}

    if (sortKey) {
        order[sortKey] = validSortOrder
    }

    const whereClause: Prisma.ProductWhereInput = {
        ...(name && name.trim() !== '' && { name: { contains: name, mode: 'insensitive' } }),
        ...(description && description.trim() !== '' && { description: { contains: description, mode: 'insensitive' } }),
        ...(category && category.trim() !== '' && { category: { contains: category, mode: 'insensitive' } }),
        ...(brand && brand.trim() !== '' && { brand: { contains: brand, mode: 'insensitive' } })
    }

    const productsList = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            category: true,
            brand: true,
            measuringunit: true,
            tags: true,
            Category: true,
            ProductVariation: {
                select: {
                    name: true,
                    ProductSpecs: true
                }
            },
        },
        where: whereClause,
        orderBy: order,
        skip: skip,
        take: take,

    })
    const totalProducts: number = await prisma.product.count({ where: whereClause })
    const totalpages: number = Math.ceil(pageNumber - 1) * pageSize
    const hasMore: boolean = pageNumber < totalpages
    const nextPage = hasMore ? pageNumber + 1 : null

    return res.status(200).json({
        data: productsList,
        meta: {
            totalProducts,
            totalpages,
            hasMore,
            nextPage
        }

    })
}

async function productVariation(req: Request, res: Response, next: NextFunction) {

    const {
        page = '1',
        pagesize = '10',
        sortKey = 'createdAt',
        sortOrder = 'asc',

    }: {
        page?: string,
        pagesize?: string, sortKey?: string, sortOrder?: string
    } = req.query

    let pageNumber = parseInt(page)
    let pageSize = parseInt(pagesize)

    pageNumber = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber

    pageSize = isNaN(pageSize) || pageSize < 1 ? 10 : pageSize

    const validSortOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'asc'

    const skip = (pageNumber - 1) * pageSize
    const take = pageSize

    const order: any = {}

    if (sortKey) {
        order[sortKey] = validSortOrder
    }

    const productVariation = await prisma.product.findMany({

        orderBy: order
    })

    const productId = req.params.productid

    if (productId) {
        const productVariationList = await prisma.productVariation.findMany({
            select: {
                id: true,
                productId: true,
                name: true,
                description: true,
                categoryid: true,
                product: {
                    select: {
                        category: true
                    }

                }
            },
            where: {
                productId: productId
            }
        })
        if (productVariationList) {
            return res.status(200).json(productVariationList)

        }
    }
}

const variationById = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id
    if (id) {
        const variation = await prisma.productVariation.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                productId: true,
                name: true,
                description: true,
                product: {
                    select: {
                        category: true
                    }
                },
                ProductSpecs: {
                    select: {
                        attributename: true,
                        alnvalue: true,
                        numvalue: true,
                        attribute: {
                            select: {
                                datatype: true
                            }
                        }
                    }
                }
            }
        })
        return res.status(200).json(variation)

    } else {
        throw new Error("variation id required")
    }
}

const createProductVariation = async (req: Request, res: Response, next: NextFunction) => {
    const { productid, name, description, categoryid, images, tags, sku, sellingprice, mrp, discount, quantity }: ProductVariationInput = req.body

    if (!productid ||
        !name ||
        !description ||
        !categoryid ||
        !tags ||
        !sku ||
        !sellingprice ||
        !mrp ||
        !quantity ||
        discount === undefined) {
        return res.status(400).json({ error: "Missing required fields. Cannot create Product Variation." });

    }
    let sellingPrice: number = parseFloat(String(sellingprice))
    let MRP: number = parseFloat(String(mrp))
    let Discount: number = parseFloat(String(discount))
    let Quantity: number = parseInt(String(quantity))

    console.log(sellingPrice, MRP, Discount, Quantity)

    if (isNaN(sellingPrice)) return res.status(400).json({ error: "Valid sellingprice input required" })
    if (isNaN(MRP)) return res.status(400).json({ error: "valid MRP input required" })
    if (isNaN(Discount)) return res.status(400).json({ error: "valid discount input is required" })
    if (isNaN(Quantity)) return res.status(400).json({ error: "valid quantity input  is required" })

    const data: ProductVariationDBInput = {
        productid,
        name,
        description,
        categoryid,
        tags: tags,
        sku,
        sellingprice: sellingPrice,
        mrp: MRP,
        discount: Discount,
        quantity: Quantity,
        images: images.length > 0 ? images : [],
    };


    const variation = await prisma.productVariation.create({
        data: {
            productId: data.productid,
            name: data.name,
            description: data.description,
            categoryid: data.categoryid,
            tags: data.tags.split(","),
            sku: data.sku,
            sellingprice: data.sellingprice,
            mrp: data.mrp,
            discount: data.discount,
            inventory: {
                create: {
                    quantity: data.quantity
                }

            }
        },
        select: {
            productId: true,
            name: true,
            description: true,
            category: {
                select: {
                    path: true
                }
            },
            tags: true,
            sku: true,
            sellingprice: true,
            mrp: true,
            discount: true,
            inventory: {
                select: {
                    quantity: true
                }
            }
        }
    })
    console.log(variation)
    if (!variation) {
        return res.status(400).json({ error: "Failed creating variations" })
    }

    return res.status(200).json(variation)
}




export default { newProduct, fetchProduct, productList, productVariation, variationById, createProductVariation }