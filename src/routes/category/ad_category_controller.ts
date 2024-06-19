import { Request, Response, NextFunction } from "express";
import prisma from "../../../prisma/script";
import { constants } from "buffer";
import { Prisma } from "@prisma/client";

interface Category {
    id: string;
    name: string;
    description?: string | null;
    parent_id?: string | null;
    images?: string[];
    path?: string | null;
}

interface CategoryWithPath extends Category {
    path: string;
}

const fetchCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId: string = req.params.id;
    if (categoryId) {
        const categoryDetail = await prisma.categories.findUnique({
            select: {
                id: true,
                name: true,
                parent_id: true,
                path: true,
                description: true,
                images: true,
                CategorySpec: {
                    select: {
                        id: true,
                        categoryid: true,
                        attributename: true,
                        measureunit: true
                    }

                }
            },
            where: { id: categoryId }
        });
        if (categoryDetail) {
            return res.status(200).json(categoryDetail);
        } else {
            return res.status(404).json({ error: "Category not found" });
        }
    } else {
        return res.status(400).json({ error: "Category ID is required" });
    }
};

const fetchCategories = async (req: Request, res: Response, next: NextFunction) => {
    const {
        page = '1',
        pagesize = '10',
        sortKey = 'createdAt',
        sortOrder = 'asc',
        name,
        description,
        path,


    }: { page?: string, pagesize?: string, sortKey?: string, sortOrder?: string, name?: string, description?: string, path?: string, createdAt?: string } = req.query;

    let pageNumber = parseInt(page, 10);
    let pageSize = parseInt(pagesize, 10);

    // Validate pageNumber and pageSize
    pageNumber = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
    pageSize = isNaN(pageSize) || pageSize < 1 ? 10 : pageSize;

    // Ensure sortOrder is either 'asc' or 'desc'
    const validSortOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'asc';

    const skip = (pageNumber - 1) * pageSize;

    const order: any = {};
    if (sortKey) {
        order[sortKey] = validSortOrder;
    }

    // const whereClause: Prisma.CategoriesWhereInput = {};

    // if (name !== null && name !== undefined && name !== '') {
    //     whereClause.name = { contains: name, mode: 'insensitive' };
    // }
    // if (description !== null && description !== undefined && description !== '') {
    //     whereClause.description = { contains: description, mode: 'insensitive' };
    // }
    // if (path !== null && path !== undefined && path !== '') {
    //     whereClause.path = { contains: path, mode: 'insensitive' };
    // }
    const whereClause: Prisma.CategoriesWhereInput = {
        ...(name && name.trim() !== '' && { name: { contains: name, mode: 'insensitive' } }),
        ...(description && description.trim() !== '' && { description: { contains: description, mode: 'insensitive' } }),
        ...(path && path.trim() !== '' && { path: { contains: path, mode: 'insensitive' } }),
    };

    // const where: any = name ? { name: { contains: name, mode: 'insensitive' } } : {};

    try {
        const categoriesList = await prisma.categories.findMany({
            where: whereClause,
            orderBy: order,
            skip: skip,
            take: pageSize,
        });

        const totalCategories = await prisma.categories.count({ where: whereClause });
        const totalPages = Math.ceil(totalCategories / pageSize);
        const hasMore = pageNumber < totalPages;
        const nextPage = hasMore ? pageNumber + 1 : null;

        res.status(200).json({
            data: categoriesList,
            meta: {
                totalCategories,
                totalPages,
                currentPage: pageNumber,
                hasMore,
                nextPage,
            },
        });
    } catch (error) {
        next(error); // Pass any errors to the next middleware (typically the error handler)
    }
};
const addCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, parent, images } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        let category;

        if (parent === "self") {
            category = await prisma.categories.create({
                data: {
                    name: name.toString(),
                    parent_id: null,
                    images: images ?? [],
                    path: name.toString()
                }
            });
        } else if (parent) {
            const parentCategory = await prisma.categories.findFirst({
                where: { name: parent.toString() },
                select: { id: true, path: true }
            });

            if (parentCategory) {
                category = await prisma.categories.create({
                    data: {
                        name: name.toString(),
                        parent_id: parentCategory.id,
                        images: images ?? [],
                        path: `${parentCategory.path}/${name}`
                    }
                });
            } else {
                return res.status(400).json({ error: "Parent category not found" });
            }
        } else {
            category = await prisma.categories.create({
                data: {
                    name: name.toString(),
                    parent_id: null,
                    images: images ?? [],
                    path: name.toString()
                }
            });
        }

        return res.status(200).json(category);
    } catch (error) {
        console.error("Error adding category:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    console.log(req.body)
    const { name, description, images }: { name?: string; description?: string; images?: string[] } = req.body;

    // Prepare the data object only with provided fields
    const data: { name?: string; description?: string; images?: string[] } = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (images && images.length > 0) data.images = images;

    // Check if the ID is present and if there is at least one field to update
    console.log(images)
    console.log(id)
    if (!id || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Invalid request: ID or update fields are missing' });
    }

    try {
        const updatedCategory = await prisma.categories.update({
            where: { id },
            data
        });
        return res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({ error: 'Failed to update category' });
    }
};

export default { addCategory, fetchCategories, fetchCategory, updateCategory };
