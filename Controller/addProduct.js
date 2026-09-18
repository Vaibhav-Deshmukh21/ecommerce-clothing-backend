import productModel from "../model/productModel.js";
import uploadOnCloudinary from "../Config/cloudinary.js";

const addProduct = async (req, res) => {
  try {

    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    let images = [];

    // upload image1
    if (req.files?.image1) {
      const img1 = await uploadOnCloudinary(req.files.image1[0].path);
      images.push(img1);
    }

    // upload image2
    if (req.files?.image2) {
      const img2 = await uploadOnCloudinary(req.files.image2[0].path);
      images.push(img2);
    }

    // upload image3
    if (req.files?.image3) {
      const img3 = await uploadOnCloudinary(req.files.image3[0].path);
      images.push(img3);
    }

    // upload image4
    if (req.files?.image4) {
      const img4 = await uploadOnCloudinary(req.files.image4[0].path);
      images.push(img4);
    }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
      image: images,
      date: Date.now()
    };

    const product = new productModel(productData);
    console.log(product);
    await product.save();
console.log("SAVED ID:", product._id);

const allProducts = await productModel.find();

console.log("TOTAL PRODUCTS:", allProducts.length);
console.log("LAST PRODUCT:", allProducts[allProducts.length - 1]);
    res.json({
      success: true,
      message: "Product Added Successfully",
      product:product
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getproduct = async (req, res) => {
  try {

    const products = await productModel.find({});

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteProducts = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, price, category, subCategory, sizes, bestseller, stock } = req.body;

    let images = [];

    // Handle new uploaded images
    if (req.files?.image1) {
      const img1 = await uploadOnCloudinary(req.files.image1[0].path);
      images.push(img1);
    }
    if (req.files?.image2) {
      const img2 = await uploadOnCloudinary(req.files.image2[0].path);
      images.push(img2);
    }
    if (req.files?.image3) {
      const img3 = await uploadOnCloudinary(req.files.image3[0].path);
      images.push(img3);
    }
    if (req.files?.image4) {
      const img4 = await uploadOnCloudinary(req.files.image4[0].path);
      images.push(img4);
    }

    // Find the existing product
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price ? Number(price) : product.price;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.sizes = sizes ? JSON.parse(sizes) : product.sizes;
    product.bestseller = bestseller !== undefined ? bestseller === "true" : product.bestseller;
    product.stock = stock !== undefined ? Number(stock) : product.stock;

    // If new images uploaded, replace
    if (images.length > 0) {
      product.image = images;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export default addProduct;