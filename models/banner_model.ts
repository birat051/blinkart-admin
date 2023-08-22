import mongoose from "mongoose";
const { Schema,Model } = mongoose;

const bannerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

export interface Banner extends Document {
  title: string;
  imageUrl: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}



// export default mongoose.models.banner || mongoose.model('banner', bannerSchema);
const BannerModel: typeof Model<Banner> =
  mongoose.models.banner || mongoose.model<Banner>("banner", bannerSchema);

export default BannerModel;