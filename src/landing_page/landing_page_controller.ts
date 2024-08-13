import {Request,Response,NextFunction } from "express";
import prisma from "../../prisma/script";



const landingPageController=async (req:Request,res:Response,next:NextFunction)=>{

    const {
        page = '1',
        pagesize = '10',
    }: { page?: string, pagesize?: string} = req.query;

    let pageNumber=parseInt(page,10)
    let pageSize=parseInt(pagesize,10)

    pageNumber=isNaN(pageNumber)|| pageNumber < 1 ? 1 : pageNumber
    pageSize=isNaN(pageSize) || pageSize <1 ? 1 : pageSize

    const skip = (pageNumber - 1) * pageSize;

    const categoryList=await prisma.landingPage.findMany({
        select:{
            categories:{
                select:{
                    id:true,
                    name:true,
                    children:true
                }
            }
        }
      
    })
    console.log(categoryList)

    const totalCategories=await prisma.categories.count()
    const totalPages=Math.ceil(totalCategories/pageSize)
    const hasMore=pageNumber <totalPages
    const nextPage=hasMore?pageNumber+1:null

    if(categoryList){
        return res.json(categoryList)
    }



}


export default {landingPageController}