const express = require('express');
const router = express.Router();

let products = [];  // In-memory array for products (you can replace this with a database later)

// GET all products
router.get('/', (req, res) => {
    res.json(products);
});

// GET a specific product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
});

// POST a new product
router.post('/', (req, res) => {
    const { name, description, price, category, inStock } = req.body;

    // Basic validation (you can add more validation as needed)
    if (!name || !price || !category) {
        return res.status(400).json({ message: "Name, price, and category are required" });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        description,
        price,
        category,
        inStock
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT to update a product
router.put('/:id', (req, res) => {
    const { name, description, price, category, inStock } = req.body;

    let product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.inStock = inStock || product.inStock;

    res.json(product);
});

// DELETE a product
router.delete('/:id', (req, res) => {
    let productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products.splice(productIndex, 1);  // Remove the product from the array
    res.status(204).send();  // No content response
});

module.exports = router;
