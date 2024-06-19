import { Response, Request, NextFunction } from 'express'
import prisma from '../../../prisma/script'
import { AttributeDataType } from '@prisma/client'



async function addAttribute(req: Request, res: Response, next: NextFunction) {
    const { attributename, description, datatype } = req.body
    if (!attributename || !datatype) {
        throw new Error("attribute or datatype can not be empty")

    }
    console.log(req.body)
    const newAttribute = await prisma.attribute.create({
        data: {
            attributename: attributename,
            description: description ?? null,
            datatype: datatype
        }

    })
    return res.status(200).json(newAttribute)
}

async function updateAttribute(req: Request, res: Response, next: NextFunction) {
    const { id, attributename, description, datatype }: { id: string, attributename?: string, description?: string, datatype?: AttributeDataType } = req.body

    // Validate the datatype
    if (datatype && !Object.values(AttributeDataType).includes(datatype)) {
        throw new Error("Invalid value in datatype")
    }

    const data: { attributename?: string, description?: string, datatype?: AttributeDataType } = {}

    if (attributename != null) data.attributename = attributename
    if (description != null) data.description = description
    if (datatype != null) data.datatype = datatype

    if (id) {
        const updateAttribute = await prisma.attribute.update({
            where: {
                id: id
            },
            data
        })

        if (!updateAttribute) {
            throw new Error("something went wrong in updating")
        }

        return res.status(200).json(updateAttribute)

    }

}

async function fetchAttributes(req: Request, res: Response) {
    const allAttributes = await prisma.attribute.findMany({
        select: {
            id: true,
            attributename: true,
            description: true,
            datatype: true
        }
    })

    if (allAttributes) {
        return res.status(200).json(allAttributes)

    }
}

async function deleteAttribute(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id
    if (id) {
        const deletedAttribute = await prisma.attribute.delete({
            where: {
                id: id

            }
        })

        return res.status(200).json(deleteAttribute)
    }

}



export default { addAttribute, fetchAttributes, updateAttribute, deleteAttribute }