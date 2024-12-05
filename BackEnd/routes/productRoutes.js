import express from "express";
import Product from "../Models/product.js";

const router = express.Router();

// POST route to create a new product
router.post("/", async (req, res) => {
  const product = req.body; // Renamed to "product"
  console.log(product);
  
  // Create a new product instance
  const newProduct = new Product(product);

  try {
    await newProduct.save(); // Save the product to the database
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// DELETE: Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// READ: Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// UPDATE: Update a product by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, price, imgUrl } = req.body;

    // Check if fields are empty or missing
    if (!title || !price || !imgUrl) {
      return res.status(400).json({
        success: false,
        message: "Complete all fields bro", // Customize as needed
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, price, imgUrl },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

export default router;
