import BannerModel from "@/models/banner_model";
import connectToDatabase from "@/util/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    const token = await getToken({ req })
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if(req.method!=='PUT')
    {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const {bannerId}= req.query
    if(!bannerId)
    {
        return res.status(400).json({ error: 'Banner id is required in request' });
    }
    try{
        await connectToDatabase()
        const banner=await BannerModel.findByIdAndUpdate(bannerId,{isActive: true},{new:true})
        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }
        return res.status(200).json(banner);
    }
    catch(e)
    {
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
}