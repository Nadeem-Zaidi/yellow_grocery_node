import { Response, Request } from 'express'
import prisma from '../../../prisma/script'
import { Prisma } from '@prisma/client'



async function allProducts(req: Request, res: Response) {
    try {
        const allProducts = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                brand: true,
                category: true,
                weight: true,

            },

        })




        res.status(200).json(allProducts)

    } catch (e) {
        console.log(e)

        return res.status(500).json({ error: "Error in fetching all categories please try again later" })
    }
}

interface ProductResponseBody {
    name: string,
    description: string,
    category: Array<string>,
    images: Array<string>,
    brand: string
    tags: Array<string>
    weight?: number
    dimension?: string

}

async function createProduct(req: Request, res: Response) {

    const { name, description, category, images, brand, tags, weight, dimension } = req.body as ProductResponseBody


    if (!name || !description || !category || !images || !brand || !tags) {
        res.status(400).json({ error: " name, description, category, images, brand, tags canot be null" })
    }

    try {
        const createProduct = await prisma.product.create({
            data: {
                name: name,
                description: description,
                category: category,
                images: images,
                brand: brand,
                tags: tags,
                weight: Number(weight),
                dimensions: dimension

            }
        })
        res.status(200).json({ message: `product created with id ${createProduct.id}` })

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "can not create product" })


    }
}

async function deleteProduct(req: Request, res: Response) {
    console.log(req.url)
    try {
        const productId = req.params.productId.toString().trim()

        if (!productId) {
            return res.status(400).send('Invalid Product Id')

        }
        const deleteProduct = await prisma.product.delete({
            where: {
                id: productId,
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

export default { createProduct, allProducts, deleteProduct }