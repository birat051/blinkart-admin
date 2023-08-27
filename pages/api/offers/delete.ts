import OfferModel from "@/models/offer_model";
import connectToDatabase from "@/util/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    const token = await getToken({ req })
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if(req.method!=='DELETE')
    {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const {offerId}= req.query
    if(!offerId)
    {
        return res.status(400).json({ error: 'Offer id is required in request' });
    }
    try{
        await connectToDatabase()
        const offer=await OfferModel.findByIdAndDelete(offerId)
        if (!offer) {
            return res.status(404).json({ error: 'Offer not found' });
        }
        return res.status(200).json({ message: 'Offer deleted successfully' });
    }
    catch(e)
    {
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
}