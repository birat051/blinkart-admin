import UserDataModel, { UserModel } from "@/models/admin_user_model";
import Seller, { SellerDataModel } from "@/models/seller_model";
import HashPassword from "@/util/HashPassword";
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
            address,
            contactNumber,
            email,
            password
        }=req.body
        const sellerExisting=await UserDataModel.findOne({email:email})
        if(sellerExisting)
        return res.status(400).json({error: 'Seller with this email id already exists'})
        const newSeller:SellerDataModel=await Seller.create({
            name,
            address,
            contactNumber
        })
        if(!newSeller)
        return res.status(500).json({error: 'Failed to create seller account'})
        const hashPassword=await HashPassword.hashPassword(password)
        const role='seller'
        const seller=newSeller._id
        const sellerUser:UserModel=await UserDataModel.create({
            name,
            email,
            password:hashPassword,
            role,
            seller
        })
        if(!sellerUser)
        return res.status(500).json({error: 'Failed to create seller account'})
        return res.status(201).json(newSeller)
    }
    catch(error)
    {
        console.log(error)
        res.status(405).json({ error: 'Unexpected error ocurred while processing the request' });
    }
}