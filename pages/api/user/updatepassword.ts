import UserDataModel, { UserModel } from "@/models/admin_user_model";
import HashPassword from "@/util/HashPassword";
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
    const { sellerId } = req.query;
    if (!sellerId) {
            return res.status(400).json({ error: 'Seller ID is required in the request' });
    }
    try{
        await connectToDatabase()
        const{
            password,
            newPassword
        }=req.body
        const user=await UserDataModel.findOne({seller:sellerId})
        if(!user)
        {
            return res.status(404).json({ error: 'No account found for this seller id' });
        }
        const isPasswordCorrect=await HashPassword.isSamePassword(password,user.password)
        if(!isPasswordCorrect)
        {
            return res.status(400).json({ error: 'Entered incorrect password' });
        }
        const newHash=await HashPassword.hashPassword(newPassword)
        const seller:UserModel | null=await UserDataModel.findByIdAndUpdate(user._id.toString(),{
            password: newHash
        },{new:true})
        if (!seller) {
            return res.status(500).json({ error: 'Couldn\'t update password' });
          }
        res.status(200).json(seller)
    }
    catch(error)
    {
        console.log(error)
        res.status(405).json({ error: 'Unexpected error ocurred while processing the request' });
    }
}