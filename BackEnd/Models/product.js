import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    price: {
      type: Number
    },
    imgUrl: {
      type: String
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Prodect', productSchema);

export default Product;