import { Response, Request } from 'express'
import prisma from '../../../prisma/script'
import { Prisma } from '@prisma/client'



async function getAllVariation(req: Request, res: Response) {
    try {
        const allVariation = await prisma.packSizeVariation.findMany({
            select: {
                id: true,
                product_id: true,
                description: true,
                quantity: true,
                sku: true,
                price: true,
                discount: true,
                newprice: true,
                unit: true,
                color: true,
                package_size: true,
                description_list: true,
                images: true,
                tags: true,

            },

        })
        res.status(200).json(allVariation)

    } catch (e) {
        console.log(e)

        return res.status(500).json({ error: "Error in fetching variation" })
    }

}

interface ProductVariationBody {
    product_id: string
    description?: string
    quantity: number
    sku: string
    price: number
    discount?: number
    unit?: string
    color?: string
    package_size: number
    description_list?: Array<string>,
    images: Array<string>,
    tags: Array<string>

}
async function createVariation(req: Request, res: Response) {


    const { product_id, description, quantity, sku, price, discount, unit, color, package_size, description_list, images, tags } = req.body

    console.log(product_id, description, quantity, sku, price, discount, unit, color, package_size, description_list, images, tags)

    try {
        const createProductVariation = await prisma.packSizeVariation.create({
            data: {
                product_id: product_id,
                description: description,
                quantity: Number(quantity),
                sku: sku,
                price: Number(price),
                discount: Number(discount),
                unit: unit,
                color: color,
                package_size: Number(package_size),
                description_list: description_list,
                images: images,
                tags: tags
            }
        })

        res.status(200).json({ "message": `product variation created with id ${createProductVariation.id}` })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: `can not create product variation ${e}` })
    }
}

async function deleteVariation(req: Request, res: Response) {
    console.log(req.url)
    try {
        const variationId = req.params.variationId.toString().trim()

        if (!variationId) {
            return res.status(400).send('Invalid Product Id')

        }
        const deleteProduct = await prisma.packSizeVariation.delete({
            where: {
                id: variationId,
            }
        })

        res.json(deleteProduct)

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                // Handle not found error
                return res.status(404).send('Product not found');
            }
        }
    }

}
export default { getAllVariation, createVariation, deleteVariation }