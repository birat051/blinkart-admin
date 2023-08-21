import ProductCategoryModel, { ProductCategory } from "@/models/category_model";
import connectToDatabase from "@/util/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const token = await getToken({ req })
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if(req.method!=='PUT')
    {
        return res.status(405).json({ error: 'Method not allowed' });
        
    }
    const {categoryId}=req.query
    if(!categoryId)
    {
        return res.status(400).json({ error: 'Category ID is required in the request' });
    }
    try{
        await connectToDatabase()
        const{
            name,
            description,
            parentCategory,
            imageUrl
        }=req.body
        const category:ProductCategory | null=await ProductCategoryModel.findByIdAndUpdate(categoryId,{
            name,
            description,
            parentCategory,
            imageUrl
        },{new:true})
        if(!category)
        return res.status(404).json('Couldn\'t find a category with the given id')
        res.status(200).json(category)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({ error: 'Unexpected error ocurred while processing the request' });
    }
}