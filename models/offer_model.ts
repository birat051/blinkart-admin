import mongoose from "mongoose";
import { ProductCategory } from "./category_model";
const { Schema,Model } = mongoose;

const productcategory=require('./category_model')

const offerSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        default: 0,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productcategory",
        required: true
      },
      parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productcategory",
        default: null
      },
      expiryDate: {
        type: Date,
        required: true,
      },
      isTopOffer: {
        type: Boolean,
        default: false,
      },
      discount: {
        type: Number,
        default: 0,
      },
      categoryImageUrl: {
        type: String,
        required: true
      }
});

export interface Offer extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string | ProductCategory;
  parentCategory: string | null | ProductCategory;
  expiryDate: Date;
  isTopOffer: boolean;
  discount: number;
  categoryImageUrl: string;
}



// export default mongoose.models.banner || mongoose.model('banner', bannerSchema);
const OfferModel: typeof Model<Offer> =
  mongoose.models.offer || mongoose.model<Offer>("offer", offerSchema);

export default OfferModel;