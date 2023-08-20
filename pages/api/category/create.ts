import { CustomUser } from "@/components/MenuSection";
import ProductCategoryModel, { ProductCategory } from "@/models/category_model";
import ProductDataModel, { Product } from "@/models/product_model";
import connectToDatabase from "@/util/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const token = await getToken({ req })
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if(req.method!=='POST')
    {
        return res.status(405).json({ error: 'Method not allowed' });
        
    }
    try{
        await connectToDatabase()
        const{
            name,
            description,
            parentCategory,
            imageUrl
        }=req.body
        const category:ProductCategory=await ProductCategoryModel.create({
            name,
            description,
            parentCategory,
            imageUrl
        })
        res.status(201).json(category)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({ error: 'Unexpected error ocurred while processing the request' });
    }
}