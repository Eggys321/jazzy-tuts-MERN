const express = require('express');
const { insertMany, createproduct, deleteMany, singleProduct, allProducts } = require('../controller/productController');
const router = express.Router();

// create many products route
router.post('/many',insertMany);

// create a product
router.post('/product',createproduct);
// delete all products
router.delete('/many',deleteMany);
// single product
router.get('/:productId',singleProduct)
// all products
router.get('/',allProducts)

module.exports = router;