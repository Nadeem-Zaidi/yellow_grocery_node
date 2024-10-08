import { Request, Response, NextFunction } from "express";
import prisma from "../../../prisma/script";
import { AttributeDataType, Prisma } from "@prisma/client";
import { CategorySpec, CategorySpecInput } from "../../types/types";

const createCategorySpec = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)

    const { categoryid, attributename, measureunit }: CategorySpecInput = req.body

    if (!categoryid || !attributename || !measureunit) {
        return res.status(400).json({ error: "Missing required fields" })
    }
    const data: CategorySpecInput = {
        categoryid,
        attributename,
        measureunit
    }
    const categorySpec = await prisma.categorySpec.create({
        data: data,
        select: {
            categoryid: true,
            attributename: true,
            measureunit: true

        }
    })
    if (!categorySpec) {
        return res.status(400).json({ error: "Something wen wrong while creating categoryspec record" })
    }

    return res.status(200).json(categorySpec)
}

const createManyCategorySpec=async(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.body)
    const categorySpecList:CategorySpecInput[]=req.body
    if(!categorySpecList){
        return res.status(400).json({error:"Missing required fields"})
    }

    const categorySpecs=await prisma.categorySpec.createMany({
        data:categorySpecList
    })
    if(!categorySpecs){
        return res.status(400).json({error:"Something went wrong while creating category specs record"})
    }
}

const updateCategorySpec = async (req: Request, res: Response, next: NextFunction) => {

    const id:string=req.params.id
    
    const {attributename, measureunit }: {attributename: string, measureunit: string } = req.body

    const data: { attributename?: string, measureunit?: string } = {}

    if(!id){
        return res.status(400).json({error:"Id is missing"})
    }

    if (attributename != null) data.attributename = attributename
    if (measureunit != null) data.measureunit = measureunit
    const updatedCategorySpec = await prisma.categorySpec.update({
        where: {
            id: id
        },
        data
    })
    if(!updatedCategorySpec){
        return res.status(400).json({error:"Something went wtong while updating categoryspec record"})
    }

    return res.status(200).json(updateCategorySpec)
}

const fetchCategorySpec = async (req: Request, res: Response, next: NextFunction) => {

    
    const { page = 1, pagesize = 10, sortKey = 'createdAt', sortOrder = 'asc', attributename, measureunit }: CategorySpec = req.query
    const categoryid=req.params.id

    let pageNumber = parseInt(page as string)
    let pageSize = parseInt(pagesize as string)

    pageNumber = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber
    pageSize = isNaN(pageSize) || pageSize < 1 ? 10 : pageSize
    const skip = (pageNumber - 1) * pageSize
    const take = pageSize

    const validateSortOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'asc'

    const orderBy: any = {}

    if (sortKey) orderBy[sortKey] = validateSortOrder

    const whereClause: Prisma.CategorySpecWhereInput = {
        ...(attributename && attributename.trim() !== '' && { attributename: { contains: attributename, mode: 'insensitive' } }),
        ...(measureunit && measureunit.trim() !== '' && { neasureunit: { contains: measureunit, mode: 'insensitive' } }),
        ...(categoryid && categoryid.trim() !== '' && { categoryid: categoryid }) 
    }


    const categorySpec = await prisma.categorySpec.findMany({

        where: whereClause,
        orderBy: orderBy,
        skip: skip,
        take: take,
        select: {
            id: true,
            categoryid: true,
            attributename: true,
            measureunit: true,

        }
    })

    const totalSpecs: number = await prisma.categorySpec.count({ where: whereClause })
    const totalpages: number = Math.ceil(pageNumber - 1) * pageSize
    const hasMore: boolean = pageNumber < totalpages
    const nextPage = hasMore ? pageNumber + 1 : null

    return res.status(200).json({
        data: categorySpec,
        meta: {
            totalSpecs,
            totalpages,
            hasMore,
            nextPage
        }

    })


}

const categorySpecWithId = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id

    if (id) {
        const categorySpec = await prisma.categorySpec.findUnique({
            where: { id: id }
        })

        return res.status(200).json(categorySpec)

    } else {
        throw new Error("Id is empty or not valid")
    }
}

const categorySpecWithCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    const catId: string = req.params.catid
    if (catId) {
        const categorySpecWithCategoryId = await prisma.categorySpec.findMany({
            where: {
                categoryid: catId
            },
            select: {
                id: true,
                categoryid: true,
                attributename: true,
                measureunit: true
            }
        })
        return res.status(200).json(categorySpecWithCategoryId)

    } else {
        throw new Error("Cannot fetch the categoryspec")
    }
}

const deleteCategorySpec = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id

    if (id) {
        const deletedItem = await prisma.categorySpec.delete({
            where: {
                id: id
            }
        })
        return res.status(200).json(deletedItem)
    } else {
        throw new Error("Error in deleting the item")
    }

}
export default { createCategorySpec, fetchCategorySpec, updateCategorySpec, categorySpecWithCategoryId, deleteCategorySpec,createManyCategorySpec }