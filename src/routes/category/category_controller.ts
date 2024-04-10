import { NextFunction, Request, Response } from 'express'
import prisma from '../../../prisma/script'
import { off } from 'process'
import { Prisma } from '@prisma/client'




interface CategoryResponseBody {
    name: string
    parentId?: string
    images: Array<string>
}
async function createCategory(req: Request, res: Response, next: NextFunction) {

    const { name, parentId, images } = req.body as CategoryResponseBody

    console.log({ "name": name, "parent": parentId, "images": images })

    if (!name) {
        return res.status(400).json({ "message": "can not create the category having name=null" })
    }
    const createCategory = await prisma.category.create({
        data: {
            name: name,
            parentid: parentId,
            images: images
        }
    })
    return res.status(200).json(createCategory.id)
}

async function fetchAllCategory(req: Request, res: Response, next: NextFunction) {

    const result = await prisma.cart.create({
        data: {
            userId: "567"

        }
    })

    const allCategory = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            parentid: true
        },

    })

    return res.status(200).json(allCategory)
}

async function deleteCategory(req: Request, res: Response) {
    const catId = req.params.catId.toString().trim()

    if (!catId) {
        throw new Error("CatId is required for deleting a record")
    }
    const deleteProduct = await prisma.category.delete({
        where: {
            id: catId,
        }
    })

    return res.json(deleteProduct)

}


export default { createCategory, fetchAllCategory, deleteCategory }