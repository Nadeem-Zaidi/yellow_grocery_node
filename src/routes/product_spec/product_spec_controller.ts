import { Response, Request, NextFunction } from 'express'
import prisma from '../../../prisma/script'
import { Prisma } from '@prisma/client'



const createProductSpec = async (req: Request, res: Response, next: NextFunction) => {
    const { attributename, categoryid, variationid, numvalue, alnvalue }: { attributename: string, categoryid: string, variationid: string, numvalue?: string, alnvalue?: string } = req.body

    if (attributename && categoryid && variationid && numvalue && alnvalue) {
        const productSpec = await prisma.productSpecs.create({
            data: {
                attributename: attributename,
                categoryId: categoryid,
                productVariationId: variationid,
                numvalue: parseFloat(numvalue) ?? null,
                alnvalue: alnvalue ?? null
            },
            select: {
                attributename: true,
                categoryId: true,
                productVariationId: true,
                numvalue: true,
                alnvalue: true,
            }

        })
        return res.status(200).json(productSpec)

    } else {
        throw new Error("attributename, categoryid, variationid, numvalue, alnvalue are required for product spec creation")
    }
}

const fetchProductSpecs = async (req: Request, res: Response, next: NextFunction) => {

    const productSpecs = await prisma.productSpecs.findMany({
        select: {
            attributename: true,
            categoryId: true,
            productVariationId: true,
            numvalue: true,
            alnvalue: true,

        }
    })
    return res.status(200).json(productSpecs)
}

const updateProductSpecs = async (req: Request, res: Response, next: NextFunction) => {
    const { id, alnvalue, numvalue }: { id: string, alnvalue?: string, numvalue?: string } = req.body;
    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }
    const data: { alnvalue?: string, numvalue?: string } = {};
    if (alnvalue !== undefined) data.alnvalue = alnvalue;
    if (numvalue !== undefined) data.numvalue = numvalue;
    const updateSpecs = await prisma.productSpecs.update({
        where: { id },
        data,
    });
    return res.status(200).json(updateSpecs);
};


export default { createProductSpec, fetchProductSpecs }