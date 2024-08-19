import { Response, Request, NextFunction } from 'express'
import prisma from '../../../prisma/script'
import { Prisma } from '@prisma/client'
import { ProductVariationDBInput, ProductVariationInput, ProductVariationQuery } from '../../types/types'



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
    console.log(req.body)
    const { name, description, category, categoryid, brand, tags }:Product = req.body

    const requiredFields={name,description,category,categoryid,brand,tags}

    let missingFields=Object.entries(requiredFields).filter(([_,value])=>!value).map(([key])=>key)
    if(missingFields.length>0){
        return res.status(400).json({error:`${missingFields.join(',')} required in the product creation`})
    }

    const createProduct = await prisma.product.create({
        data:{
            name:name.trim(),
            description:description.trim(),
            category:category.trim(),
            categoryId:categoryid.trim(),
            brand:brand.trim(),
            tags:tags.length>1?tags:[]
        }
    })

    if(!createProduct){
        return res.status(400).json({error:"Error in creating a product"})
    }
    res.send(200).json(createProduct)

  
    
}

const fetchProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId: string = req.params.id;

    if(!productId){
        throw new Error("productis is invalid")
    }
  
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
            productvariation: {
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

    if(!product){
        throw new Error("Error in creating a product")
    }else{
        return res.status(200).json(product)
    }




}

const productList = async (req: Request, res: Response, next: NextFunction) => {
    const {
        page = '1',
        pagesize = '10',
        sortKey = 'createdAt',
        sortOrder = 'asc',
        id,
        name,
        description,
        category,
        brand,
    }: {
        page?: string,
        pagesize?: string,
        sortKey?: string,
        sortOrder?: string,
        id?: string,
        name?: string,
        description?: string,
        category?: string,
        brand?: string
    } = req.query;

    let pageNumber = parseInt(page);
    let pageSize = parseInt(pagesize);

    pageNumber = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
    pageSize = isNaN(pageSize) || pageSize < 1 ? 10 : pageSize;

    const validSortOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'asc';
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const order:any = {};

    if (sortKey) {
        order[sortKey] = validSortOrder;
    }

    const whereClause: Prisma.ProductWhereInput = {
        ...(id && id.trim() !== '' && { id: { equals: id, mode: 'insensitive' } }),
        ...(name && name.trim() !== '' && { name: { contains: name, mode: 'insensitive' } }),
        ...(description && description.trim() !== '' && { description: { contains: description, mode: 'insensitive' } }),
        ...(category && category.trim() !== '' && { category: { contains: category, mode: 'insensitive' } }),
        ...(brand && brand.trim() !== '' && { brand: { contains: brand, mode: 'insensitive' } }),
    };

    try {
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
                productvariation: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        productId: true,
                        categoryid: true,
                        ProductSpecs: {
                            select: {
                                id: true,
                                attributename: true,
                                alnvalue: true,
                                numvalue: true,
                            }
                        }
                    }
                },
            },
            where: whereClause,
            orderBy: order,
            skip: skip,
            take: take,
        });

        const totalProducts: number = await prisma.product.count({ where: whereClause });
        const totalpages: number = Math.ceil(totalProducts / pageSize);
        const hasMore: boolean = pageNumber < totalpages;
        const nextPage = hasMore ? pageNumber + 1 : null;

        return res.status(200).json({
            data: productsList,
            meta: {
                totalProducts,
                totalpages,
                hasMore,
                nextPage
            }
        });
    } catch (error) {
        next(error);
    }
};


async function productVariations(req: Request, res: Response, next: NextFunction) {

    const {
        id,
        productid,
        name,
        description,
        category,
        page = '1',
        pagesize = '10',
        sortKey = 'createdAt',
        sortOrder = 'asc',
    }: ProductVariationQuery = req.query;

    // Parse pagination parameters
    let pageNumber = parseInt(page);
    let pageSize = parseInt(pagesize);
    pageNumber = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
    pageSize = isNaN(pageSize) || pageSize < 1 ? 10 : pageSize;

    const validSortOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'asc';

    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const order: any = {};

    if (sortKey) {
        order[sortKey] = validSortOrder;
    }

    const whereClause: Prisma.productvariationWhereInput = {
        ...(id && id.trim() !== '' && { id: { equals: id, mode: 'insensitive' } }),
        ...(productid && productid.trim() !== '' && { productId: { equals: productid, mode: 'insensitive' } }), // Fix here
        ...(name && name.trim() !== '' && { name: { contains: name, mode: 'insensitive' } }),
        ...(description && description.trim() !== '' && { description: { contains: description, mode: 'insensitive' } }),
        ...(category && category.trim() !== '' && { category: { path: { contains: category, mode: 'insensitive' } } }),
    };
    

    const productVariationList = await prisma.productvariation.findMany({
        select: {
            id: true,
            productId:true,
            name: true,
            description: true,
            tags: true,
            sku: true,
            isFeatured: true,
            category: {
                select: {
                    id: true,
                    path: true,
                },
            },
            inventory: {
                select: {
                    quantity: true,
                },
            },
        },
        where: whereClause,
        skip: skip,
        take: take,
        orderBy: order,
    });

    // Calculate total number of variations
    const totalVariation: number = await prisma.productvariation.count({ where: whereClause });

    // Correct total pages calculation
    const totalpages: number = Math.ceil(totalVariation / pageSize);
    const hasMore: boolean = pageNumber < totalpages;
    const nextPage = hasMore ? pageNumber + 1 : null;

    if (!productVariationList) {
        return res.status(400).json({ error: "Error in fetching variations" });
    }

    return res.status(200).json({
        data: productVariationList,
        meta: {
            totalVariation,
            totalpages,
            hasMore,
            nextPage,
            currentPage: pageNumber,
        },
    });
}


const productVariation=async(req:Request,res:Response,next:NextFunction)=>{
    const productId = req.params.productid
    if(!productId){
        return res.status(400).json({error:"Product Id is required"})
    }

    const variation=await prisma.productvariation.findFirst({
        select: {
            id:true,
            name:true,
            description:true,
            tags:true,
            sku:true,
            isFeatured:true,
            category:{
                select:{
                    id:true,
                    path:true,
                }
            },
            inventory:{
                select:{
                    quantity:true
                }
            }
 
        },   
        where:{
            productId:productId
        }
    })

    if(!variation){   
        return res.status(400).json({error:"Error in fetching variation"})
    }
    return res.status(200).json(variation)

}

const variationById = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id
    if (id) {
        const variation = await prisma.productvariation.findUnique({
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
    const { productid, name, description, categoryid, images, tags, sku, sellingprice, mrp, discount, quantity,measureUnitId,stocksize}: ProductVariationInput = req.body

    const requiredFields={productid, name, description, categoryid, images, tags, sku, sellingprice, mrp, discount, quantity,measureUnitId,stocksize}
    const missingFields = Object.entries(requiredFields)
    .filter(([key, value]) => {
        // Check if the value is falsy or, in the case of arrays, if they are empty
        if (Array.isArray(value)) {
            return value.length === 0;
        }
        return !value;
    })
    .map(([key]) => key);
    if(missingFields.length>0){
        return res.status(400).json({error:`${missingFields.join(',')} required in the record creation`})
    }
    
    let sellingPrice: number = parseFloat(String(sellingprice))
    let MRP: number = parseFloat(String(mrp))
    let Discount: number = parseFloat(String(discount))
    let Quantity: number = parseInt(String(quantity))
    let Stocksize:number=parseInt(String(stocksize))

    if (isNaN(sellingPrice)) return res.status(400).json({ error: "Valid sellingprice input required" })
    if (isNaN(MRP)) return res.status(400).json({ error: "valid MRP input required" })
    if (isNaN(Discount)) return res.status(400).json({ error: "valid discount input is required" })
    if (isNaN(Quantity)) return res.status(400).json({ error: "valid quantity input  is required" })
    if (isNaN(Stocksize)) return res.status(400).json({ error: "valid stocksize input  is required" })


    const data: ProductVariationDBInput = {
        productid,
        name,
        description,
        categoryid,
        tags: tags.length >0?tags:[],
        sku,
        sellingprice: sellingPrice,
        mrp: MRP,
        discount: Discount,
        quantity: Quantity,
        images: images.length > 0 ? images : [],
        measureUnitId:measureUnitId,
        stocksize:stocksize

    };


    const variation = await prisma.productvariation.create({
        data: {
            productId: data.productid,
            name: data.name,
            description: data.description,
            categoryid: data.categoryid,
            tags: tags,
            sku: data.sku,  
            images:data.images,
            inventory:{
                create:{
                    measureUnitId:data.measureUnitId,
                    quantity:Number(quantity),
                    stocksize:Number(data.stocksize)

                }
            },
            pricing:{
                create:{
                    mrp:data.mrp,
                    discount:data.discount,
                    sellingprice:data.sellingprice
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
            
          
            inventory: {
                select: {
                    quantity: true,
                    measureUnitId:true,
                    stocksize:true
                }
            },
            pricing:{
                select:{
                    mrp:true,
                    discount:true,
                    sellingprice:true
                }

            }

        }
    })
    if (!variation) {
        return res.status(400).json({ error: "Failed creating variations" })
    }

    return res.status(200).json(variation)
}

const calculateSellingPrice=(req:Request,res:Response,next:NextFunction)=>{
    const {mrp,discount}:{mrp:string,discount:string}=req.body
    const requiredFields={mrp,discount}
    const missingFields=Object.entries(requiredFields).filter(([_,value])=>!value).map(([key])=>key)
    if(missingFields.length > 0){
        return res.status(400).json({error:`${missingFields.join(',')} required for the calculation`})
    }
    let MRP: number = parseFloat(String(mrp))
    let Discount: number = parseFloat(String(discount))
    if (isNaN(MRP)) return res.status(400).json({ error: "valid MRP input required" })
    if (isNaN(Discount)) return res.status(400).json({ error: "valid discount input is required" })

    let sellingPrice:number=MRP-(MRP*Discount/100)

    if(sellingPrice){
        res.status(400).json({sellingPrice:sellingPrice})
    }
}




export default { newProduct, fetchProduct, productList, productVariations,productVariation, variationById, createProductVariation }