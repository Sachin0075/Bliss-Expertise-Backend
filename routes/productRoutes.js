// const express = require('express');
// const Product = require('../models/product');
// const router = express.Router();

// // GET all products
// router.get('/', async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // POST a new product
// router.post('/', async (req, res) => {
//     const { name, price, img, description } = req.body;
//     const product = new Product({ name, price, img, description });

//     try {
//         await product.save();
//         res.status(201).json(product);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // PUT to update a product
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedProduct);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // DELETE a product
// router.delete('/:id', async (req, res) => {
//     try {
//         await Product.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Product deleted' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// module.exports = router;
