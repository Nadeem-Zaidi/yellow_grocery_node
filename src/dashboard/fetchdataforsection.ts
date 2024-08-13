import prisma from "../../prisma/script"

export const fetchCategories=async()=>{
    try{
        return await prisma.categories.findMany({
            select:{
                id:true,
                name:true,
                description:true,
                parent_id:true,
                path:true,
                createdAt:true,
                children:true

            },
            where:{
                parent_id:null
            },

        })

    }catch(error){
        throw error

    }
}

export const exoticFruits=async()=>{
    try{
        return await prisma.categories.findMany({
            select:{
                id:true,
                name:true,
                description:true,
                parent_id:true,
                path:true,
                createdAt:true,
                children:true

            },
            where:{
                name:"Exotic Fruits & Veggies"
            },

        })

    }catch(error){
        throw error

    }

}

export const kitchenGrocery=async()=>{
    try{
        return await prisma.categories.findMany({
            select:{
                id:true,
                name:true,
                description:true,
                parent_id:true,
                path:true,
                tags:true,
                images:true,
            },
            where:{
                tags:{
                    hasEvery:["kitchen","grocery"]
                }
            },

        })

    }catch(error){
        throw error

    }

}

export const SnacksDrinks=async()=>{
    try{
        return await prisma.categories.findMany({
            select:{
                id:true,
                name:true,
                description:true,
                parent_id:true,
                path:true,
                tags:true,
                images:true,
            },
            where:{
                tags:{
                    hasEvery:["snacks","drinks"]
                }
            },
        })
    }catch(error){
        throw error

    }

}

export const householdEssential=async()=>{
    try{
        return await prisma.categories.findMany({
            select:{
                id:true,
                name:true,
                description:true,
                parent_id:true,
                path:true,
                tags:true,
                images:true,
            },
            where:{
                tags:{
                    hasEvery:["household"]
                }
            },
        })
    }catch(error){
        throw error

    }

}