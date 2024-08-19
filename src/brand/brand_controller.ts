import { Prisma } from "@prisma/client";
import { Request,Response,NextFunction } from "express";
import prisma from "../../prisma/script";
import { error } from "console";
import { Brands } from "../types/types";


const fetchBrand=async (req:Request,res:Response,next:NextFunction)=>{
    const {
        page='1',
        pagesize='10',
        sortKey='abbreviation',
        sortOrder='asc',
        name,
        description,
        abbreviation,
    }:{page?:string,pagesize?:string,sortKey?:string,sortOrder?:string,name?:string,description?:string,abbreviation?:string}=req.query

    let pageNumber=parseInt(page,10)
    let pageSize=parseInt(pagesize,10)

    pageNumber=isNaN(pageNumber) || pageNumber <1 ? 1:pageNumber
    pageSize=isNaN(pageSize) || pageSize < 1 ? 10 :pageSize

    const validSortOrder=sortOrder==='asc' || sortOrder==='desc' ? sortOrder : 'asc'
    const skip=(pageNumber-1)*pageSize

    const order:any={}
    if(sortKey){
        order[sortKey]=validSortOrder
    }

    const whereClause:Prisma.brandWhereInput={
        ...(name && name.trim()!=='' && {name:{contains:name,mode:'insensitive'}}),
        ...(description && description.trim()!=='' && {description:{contains:description,mode:'insensitive'}}),
        ...(abbreviation && abbreviation.trim()!=='' && {abbreviation:{contains:abbreviation,mode:'insensitive'}})

    }

    const brands=await prisma.brand.findMany({
        select:{
            id:true,
            name:true,
            description:true,
            abbreviation:true
        },
        where:whereClause,
        orderBy:order,
        skip:skip,
        take:pageSize
    })

    const totalCategories = await prisma.brand.count({ where: whereClause });
    const totalPages = Math.ceil(totalCategories / pageSize);
    const hasMore = pageNumber < totalPages;
    const nextPage = hasMore ? pageNumber + 1 : null;

    if(brands){
        return res.status(200).json({
            data: brands,
            meta: {
                totalCategories,
                totalPages,
                currentPage: pageNumber,
                hasMore,
                nextPage,
            },
        });
    }else{
        return res.status(400).json({error:"Error in creating brand"})
    }
}

const addBrand=async (req:Request,res:Response,next:NextFunction)=>{
    const {name,description,abbreviation}:{name?:string,description?:string,abbreviation?:string}=req.body

    const requiredFields={name,description,abbreviation}
    const missingField=Object.entries(requiredFields).filter(([_,value])=>!value || value.trim()==="").map(([key])=>key)

    if (missingField.length > 0){
        return res.status(200).json({error:"name,description abd abbreviation fields are required"})
    }

    const data:{name?:string,description?:string,abbreviation?:string}={
        ...(name && name.trim()!=='' && {name:name.trim().toLowerCase()}),
        ...(description && description.trim()!=='' && {description:description.trim().toLowerCase()}),
        ...(abbreviation && abbreviation.trim()!=='' && {abbreviation:abbreviation.trim().toLowerCase()})   
    }

    const createdBrand=await prisma.brand.create({
        data:data as Prisma.brandCreateInput
    })

    if(!createdBrand){
        return res.status(400).json({error:"Error in creating brand record"})

    }
    return res.status(200).json(createdBrand)
}

const addManyBrands=async (req:Request,res:Response,next:NextFunction)=>{
    const data:Brands[]=req.body
     // Check if data is provided
     if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ error: "Please provide valid data" });
    }
    for(let i of data){
        const missingFields=Object.entries(i).filter(([_,value])=>!value).map(([key])=>key)
        if(missingFields.length >0){
            return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });

        }
    }
    const createManyBrand=await prisma.brand.createMany({
        data:data
    })

    if(!createManyBrand){
        return res.status(400).json({error:"Error in creating records"})
    }
    return res.status(200).json({message:"Records created successfully"})   

}

export default {fetchBrand,addBrand,addManyBrands}