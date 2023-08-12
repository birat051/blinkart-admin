import mongoose, { Document, Model } from "mongoose";

export interface ProductCategory extends Document {
  name: string;
  description: string;
  parentCategory: mongoose.Schema.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string | null;
}

const productCategorySchema = new mongoose.Schema<ProductCategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productcategory",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    default: null,
  },
});

const ProductCategoryModel: typeof Model<ProductCategory> =
  mongoose.models.productcategory || mongoose.model<ProductCategory>("productcategory", productCategorySchema);

export default ProductCategoryModel;
