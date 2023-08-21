import ProductCategoryModel, { ProductCategory } from "@/models/category_model";
import connectToDatabase from "@/util/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const token = await getToken({ req })
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if(req.method!=='GET')
    {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try{
        await connectToDatabase()
        const categories:ProductCategory[] = await ProductCategoryModel.find()
        res.status(200).json(categories)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({ error: 'Unexpected error ocurred while processing the request' });
    }
}