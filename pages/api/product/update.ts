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
    if(req.method!=='PUT')
    {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    const { productId } = req.query;
    if (!productId) {
            return res.status(400).json({ error: 'Product ID is required in the request' });
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
            seller,
            quantity,
        }=req.body
        const product:Product | null=await ProductDataModel.findByIdAndUpdate(productId,{
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
        },{new:true})
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }
        res.status(200).json(product)
    }
    catch(error)
    {
        console.log(error)
        res.status(405).json({ error: 'Unexpected error ocurred while processing the request' });
    }
}