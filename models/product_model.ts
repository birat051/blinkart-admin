import mongoose from "mongoose";
import { ProductCategory } from "./category_model";
const { Schema,Model } = mongoose;

const productcategory=require('./category_model')
const seller=require('./seller_model')

export interface Product extends Document
{
    _id: string,
    name: string,
    description: string,
    price: number,
    category: mongoose.Schema.Types.ObjectId | ProductCategory,
    brand: string,
    imageUrls: string[],
    seller: mongoose.Schema.Types.ObjectId,
    highlights: string[],
    createdAt: Date,
    updatedAt: Date,
    discount: number,
    quantity: number
}

const ProductDataSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productcategory",
    required: true
    },
    brand: {
      type: String,
      required: true
    },
    imageUrls: {
      type: [String],
      required: true
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'seller',
      required: true
    },
    highlights: {
      type: [String]
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    discount: {
      type: Number,
      default: 0
    },
    quantity: {
      type: Number,
      default: 0
    }
  });

  const ProductDataModel: typeof Model<Product> =
  mongoose.models.product || mongoose.model<Product>("product", ProductDataSchema);

export default ProductDataModel;