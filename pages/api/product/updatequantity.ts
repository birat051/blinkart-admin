import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import ProductDataModel, { Product } from "@/models/product_model";
import connectToDatabase from "@/util/connectDB";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  
  const { productId,quantity } = req.query;
  if (!productId) {
    return res.status(400).json({ error: "Product ID is required in the request" });
  }
  if(!quantity){
    return res.status(400).json({ error: "Product quantity is required in the request" });
  }
  try {
    await connectToDatabase();
    
    const product: Product | null = await ProductDataModel.findByIdAndUpdate(
      productId,
      { quantity },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Unexpected error occurred while processing the request" });
  }
}
