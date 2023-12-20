const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please include the product name"],
    },
    description: {
      type: String,
      required: [true, "Please include the product description"],
    },
    image: {
      type: String,
      required: [true, "Please include the product url"],
    },
    category: {
      type: String,
      required: [true, "Please include the product category"],
    },
    price: {
      type: Number,
      required: [true, "Please include the product price"],
    },
   
  },
  { timestamps: true }
);

// export the model
const PRODUCT = mongoose.model("Product", productSchema);
module.exports = PRODUCT;
