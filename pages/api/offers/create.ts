import OfferModel, { Offer } from "@/models/offer_model";
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
            title,
            description,
            price,
            category,
            parentCategory,
            expiryDate,
            isTopOffer,
            discount,
            categoryImageUrl,
        }=req.body
        const offer:Offer=await OfferModel.create({
            title,
            description,
            price,
            category,
            parentCategory,
            expiryDate,
            isTopOffer,
            discount,
            categoryImageUrl,
        })
        res.status(201).json(offer)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({ error: 'Unexpected error ocurred while processing the request' });
    }
}