import mongoose from "mongoose";
import { UserModel } from "./admin_user_model";
import { Product } from "./product_model";
const { Schema,Model } = mongoose;


const product=require('./product_model')

const orderSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
          price: {
            type: Number,
            required: true,
          },
          discount: {
            type: Number,
            required: true,
          }
        },
      ],
      shippingAddress: {
        type: Schema.Types.ObjectId,
        ref: 'addresses',
        required: true,
    },
    deliveryFees: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    creditCardNumber: {
        type: String,
        default: null
    },
    deliveryStatus: {
        type: String,
        enum : ['Ordered','Shipped','Out for Delivery','Canceled','Delivered'],
    }
});

export interface Order extends Document {
    _id: string;
    userId: mongoose.Schema.Types.ObjectId;
    orderDate: Date;
    products: Array<{
      productId: mongoose.Schema.Types.ObjectId | Product;
      quantity: number;
      price: number;
      discount: number;
    }>;
    shippingAddress: mongoose.Schema.Types.ObjectId;
    deliveryFees: number;
    paymentMethod: string;
    creditCardNumber: string | null;
    deliveryStatus: string;
}

export interface ProductOrder{
  productId: string,
  quantity: number,
  price: number,
  discount: number
}

const OrderModel: typeof Model<Order> =
  mongoose.models.order || mongoose.model<Order>("order", orderSchema);

export default OrderModel;

