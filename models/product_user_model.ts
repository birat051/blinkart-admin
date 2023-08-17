import mongoose from "mongoose";
const { Schema,Model } = mongoose;

export interface ProductUserModel extends Document {
    email: string;
    password: string;
    name: string;
    _id: string;
    mobileNumber: string | null;
}

const userSchema= new Schema({
    email: {type: String,unique: true},
    password: {type: String},
    name: {type: String},
    mobileNumber: {type:String,default: null}
})

const ProductUserDataModel: typeof Model<ProductUserModel> =
mongoose.models.users || mongoose.model<ProductUserModel>("users", userSchema);

export default ProductUserDataModel
