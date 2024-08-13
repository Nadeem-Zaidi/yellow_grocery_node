import { Request,Response,NextFunction } from "express";
import { exoticFruits, fetchCategories, householdEssential, kitchenGrocery, SnacksDrinks } from "./fetchdataforsection";

const dashBoard= async(req:Request,res:Response,next:NextFunction)=>{
    const {
        page = '1',
        pagesize = '10',
    }: { page?: string, pagesize?: string} = req.query;
    const pageNumber=parseInt(page,10)
    const pageSize=parseInt(pagesize,10)

    let pageContent=[]
    const allSections=["kitchen&Grocery","SnacksAndDrinks","householdessential","exoticfruits4","exoticfruits5"]

    const start=(pageNumber-1)*pageSize
    const end=pageNumber*pageSize
    console.log(start)
    console.log(end)

    const sectionsToFetch=allSections.slice(start,end)
    console.log(sectionsToFetch)

    for(const section of sectionsToFetch){
        let data;
        switch(section){
            case 'kitchen&Grocery':
                data=await kitchenGrocery()
                if(data) pageContent.push({type:'kitchen & Grocery',data})
                break
            case 'SnacksAndDrinks':
                data=await SnacksDrinks()
                if(data) pageContent.push({type:'Snacks & Drinks',data})
                break
            case 'householdessential':
                data=await householdEssential()
                if(data) pageContent.push({type:'Household Essential',data})
                break
          

        }
    }

    const totalpages=Math.ceil(allSections.length/pageSize)
    console.log(pageContent)

    return res.json({
        data:pageContent,
        currentPage:pageNumber,
        totalpages
    })

}

export default {dashBoard}





