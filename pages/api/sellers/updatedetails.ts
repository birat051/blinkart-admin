import Seller, { SellerDataModel } from "@/models/seller_model";
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
    const { sellerId } = req.query;
    if (!sellerId) {
            return res.status(400).json({ error: 'Seller ID is required in the request' });
    }
    try{
        await connectToDatabase()
        const{
            name,
            address,
            contactNumber
        }=req.body
        const seller:SellerDataModel | null=await Seller.findByIdAndUpdate(sellerId,{
            name,
            address,
            contactNumber
        },{new:true})
        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
          }
        res.status(200).json(seller)
    }
    catch(error)
    {
        console.log(error)
        res.status(405).json({ error: 'Unexpected error ocurred while processing the request' });
    }
}