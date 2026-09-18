import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

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
    type: String,
    required: true
  },

  subCategory: {
    type: String,
    required: true
  },

  sizes: {
    type: [String],
    required: true
  },

  image: {
    type: [String],
    required: true
  },

  bestseller: {
    type: Boolean,
    default: false
  },

  date: {
    type: Date,
    default: Date.now
  },
  stock: {
  type: Number,
  required:true,
  default: 0
},
rating: {
  type: Number,
  default: 0
},
numReviews: {
  type: Number,
  default: 0
}
},{timestamps:true})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;