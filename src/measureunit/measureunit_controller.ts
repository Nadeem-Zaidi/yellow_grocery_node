import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/script";
import { MeasuringUnit } from "../types/types";
import { Prisma } from "@prisma/client";

interface MeasureunitQueryInput {
    unit: string
    abbreviation: string,
    description: string,

}




const createMeasuringunit = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const { abbreviation, description, unit }: MeasureunitQueryInput = req.body

    if (!abbreviation || !description || !unit) {
        return res.status(400).json({ error: "Missing required field.Cannot create measureunit record" })
    }

    let data: MeasureunitQueryInput = {
        abbreviation,
        description,
        unit
    }
    const measureunit = await prisma.measureUnit.create({
        data: data,
        select: {
            id: true,
            abbreviation: true,
            description: true,
        }
    })

    if (!measureunit) {
        return res.status(400).json("Something went wrong in measureunit record creation")
    }
    return res.status(200).json(measureunit)

}

const createManyMeasureunit = async (req: Request, res: Response, next: NextFunction) => {
    const measureunits: MeasureunitQueryInput[] = req.body
    console.log(measureunits)

    if (!measureunits) {
        return res.status(400).json({ error: "Please enter the valid data" })
    }

    const result = await prisma.measureUnit.createMany({
        data: measureunits
    })

    if (!result) {
        return res.status(400).json({ error: "Something went wrong in creating measuringunit record" })
    }

    return res.status(200).json(result)
}

const deleteMeasureUnit = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const id: string = req.params.id

    if (!id) {
        return res.status(400).json({ error: "Please provide id for deletion" })
    }

    const deletedItem = await prisma.measureUnit.delete({
        where: {
            id: id
        }
    })

    if (!deletedItem) {
        return res.status(400).json({ error: "Some thing went wrong in deleting measureunit" })
    }

    return res.status(200).json(deletedItem)
}

const UpdateMeasureUnit = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    console.log(req.body)

    if (!id) {
        throw new Error("Measure unit ID is not provided for the update.");
    }

    const { unit, abbreviation, description }: { unit: string, abbreviation: string, description: string } = req.body;

    const updateData: { unit?: string, abbreviation?: string, description?: string } = {};

    if (unit !== undefined) {
        updateData.unit = unit;
    }

    if (abbreviation !== undefined) {
        updateData.abbreviation = abbreviation;
    }

    if (description !== undefined) {
        updateData.description = description;
    }

    console.log(updateData)

    const measureUnit = await prisma.measureUnit.update({
        where: { id },
        data: updateData,
    });

    res.json(measureUnit);
};


const fetchMeasuringunit = async (req: Request, res: Response, next: NextFunction) => {
    let {
        page = 1,
        pagesize = 10,
        sortKey = 'createdAt',
        sortOrder = 'asc',
        unit,
        description,
        abbreviation,
    }: MeasuringUnit = req.query

    page = page ? parseInt(page as string, 10) : 1
    pagesize = pagesize ? parseInt(pagesize as string, 10) : 10

    const validateSortOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'asc'

    if (isNaN(page) || page < 1) {
        page = 1

    }
    if (isNaN(pagesize) || pagesize < 1) {
        pagesize = 10
    }

    const skip = (page - 1) * pagesize;
    const take = pagesize;

    const order: any = {}
    if (sortKey) {
        order[sortKey] = validateSortOrder
    }


    const whereClause: Prisma.MeasureUnitWhereInput = {
        ...(unit && unit.trim() !== '' && { unit: { contains: unit, mode: 'insensitive' } }),
        ...(abbreviation && abbreviation.trim() !== '' && { abbreviation: { contains: abbreviation, mode: 'insensitive' } }),
        ...(description && description.trim() !== '' && { description: { contains: description, mode: 'insensitive' } })

    }



    const attributeList = await prisma.measureUnit.findMany({
        where: whereClause,
        orderBy: order,
        skip: skip,
        take: take
    });

    const totalAttribute = await prisma.measureUnit.count({ where: whereClause })
    const totalPages = Math.ceil(totalAttribute / pagesize)
    const hasMore = page < totalPages
    const nextPage = hasMore ? page + 1 : null

    res.status(200).json({
        data: attributeList,
        meta: {
            totalAttribute,
            totalPages,
            currentPage: page,
            hasMore,
            nextPage,
        }
    });
}

export default { fetchMeasuringunit, UpdateMeasureUnit, createMeasuringunit, deleteMeasureUnit, createManyMeasureunit }