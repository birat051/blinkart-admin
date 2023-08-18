import mongoose from "mongoose";
const { Schema,Model } = mongoose;


export interface SellerDataModel extends Document
{
    name: string,
    address: string,
    contactNumber: string,
    createdAt: Date,
    _id: string
}


const SellerSchema = new Schema<SellerDataModel>({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    contactNumber: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

const Seller: typeof Model<SellerDataModel> =
mongoose.models.seller || mongoose.model<SellerDataModel>("seller", SellerSchema);

export default Seller;