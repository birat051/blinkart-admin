import mongoose from "mongoose";
const { Schema,Model } = mongoose;

const seller=require('./seller_model')

export interface UserModel extends Document {
    email: string;
    password: string;
    name: string;
    _id: string;
    role: string;
    seller: mongoose.Schema.Types.ObjectId | null;
}

const userSchema= new Schema({
    email: {type: String,unique: true},
    password: {type: String},
    name: {type: String},
    role: {type:String},
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'seller',default: null },
})

const UserDataModel: typeof Model<UserModel> =
mongoose.models.adminuser || mongoose.model<UserModel>("adminuser", userSchema);

export default UserDataModel
