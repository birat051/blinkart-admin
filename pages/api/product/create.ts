import { CustomUser } from "@/components/MenuSection";
import ProductDataModel, { Product } from "@/models/product_model";
import connectToDatabase from "@/util/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const token = await getToken({ req })
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    if(req.method!=='POST')
    {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    try{
        await connectToDatabase()
        const{
            name,
            description,
            price,
            category,
            brand,
            imageUrls,
            highlights,
            discount,
            seller
        }=req.body
        const quantity=0
        const product:Product=await ProductDataModel.create({
            name,
            description,
            price,
            category,
            brand,
            imageUrls,
            seller,
            highlights,
            discount,
            quantity
        })
        res.status(201).json(product)
    }
    catch(error)
    {
        console.log(error)
        res.status(405).json({ error: 'Unexpected error ocurred while processing the request' });
    }
}