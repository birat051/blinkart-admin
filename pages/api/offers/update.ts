import OfferModel, { Offer } from "@/models/offer_model";
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
    const {offerId}=req.query
    if(!offerId)
    {
        return res.status(400).json({ error: 'Offer ID is required in the request' });
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
        const offer:Offer | null=await OfferModel.findByIdAndUpdate(offerId,{
            title,
            description,
            price,
            category,
            parentCategory,
            expiryDate,
            isTopOffer,
            discount,
            categoryImageUrl,
        },{new:true})
        if(!offer)
        return res.status(404).json('Couldn\'t find a offer with the given id')
        const newOffer=await OfferModel.findById(offerId).populate('parentCategory').populate('category')
        res.status(200).json(newOffer)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({ error: 'Unexpected error ocurred while processing the request' });
    }
}