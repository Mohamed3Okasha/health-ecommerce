const express = require("express");
const Product = require("../models/product.model");
const auth = require("../middleware/auth");
const app = require("../app");
const router = new express.Router();

router.get('/products', async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const products = await Product.find(searchQuery? 
            {name: new RegExp(searchQuery, "i")} 
            : {});
        res.send(products);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

router.get('/products/:id', async (req , res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.send(product);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

router.post("/products", auth, async (req, res) => {
    const product = new Product(req.body)
    try {
        await product.save()
        res.send(product)
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

router.put('/products/:id', auth, async (req , res) => {
    try {
        const product = await Product.findOneAndUpdate(req.params.id, req.body, {returnDocument: "after"});
        res.send(product)
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

router.delete('/products/:id', auth, async (req , res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id)
            if(!result) {
                res.status(404).send("Product not found")
            }
        res.send(result)
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

module.exports = router;