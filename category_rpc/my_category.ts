
import * as grpc from '@grpc/grpc-js';
import prisma from '../prisma/script'
import { Category, CategoryByIdRequest, CategoryByParentIdRequest, CategoryEmptyRequest } from './category_pb';
import { parentPort } from 'worker_threads';

export async function allCat(res: grpc.ServerWritableStream<CategoryEmptyRequest, Category>) {
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
        }
    })

    for (var c of categories) {
        const category = new Category()
        category.setId(c.id.toString());
        category.setName(c.name);
        res.write(category);
    }

    res.end();

}

export async function catById(call: grpc.ServerWritableStream<CategoryByIdRequest, Category>) {
    const id = call.request.getCategoryId();

    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            images: true,
        },
        where: {
            parentid: id
        }
    })

    for (var c of categories) {
        const category = new Category()
        category.setId(c.id.toString())
        category.setName(c.name)
        category.setImagesList(c.images)
        call.write(category)

    }
    call.end()
}

export async function catByParentId(call: grpc.ServerWritableStream<CategoryEmptyRequest, Category>) {


    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            images: true,
        },
        where: {
            parentid: null
        }
    })

    for (var c of categories) {
        const category = new Category()
        category.setId(c.id.toString())
        category.setName(c.name)
        category.setImagesList(c.images)
        call.write(category)
    }


    call.end()



}