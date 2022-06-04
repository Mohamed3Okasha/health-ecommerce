const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    images: [
        String
    ],
    count: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
}, 
{
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;