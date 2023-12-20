const productModel = require("../model/productModel");

// inserting many products
const insertMany = async (req, res) => {
  try {
    const products = await productModel.insertMany(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "successfully created all products",
        products,
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error });
  }
};

// create a product
const createproduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "successfully created a product",
        product,
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error });
  }
};

// delete many
const deleteMany = async (req, res) => {
  try {
    const product = await productModel.deleteMany({});
    res
      .status(200)
      .json({
        success: true,
        message: "successfully deleted all products",
        product,
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error });
  }
};

// single product
const singleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.productId);
    res.status(200).json({ success: true, message: "single product", product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error });
  }
};

// get products
const allProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if (products && products.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "no product(s) found / created yet" });  
      return;
    }

    res.status(200).json({ status: true, message: "all products", products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error });
  }
};
module.exports = {
  insertMany,
  createproduct,
  deleteMany,
  singleProduct,
  allProducts

};
