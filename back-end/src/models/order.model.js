const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        items: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "User"
                },
                name: {
                    type: String,
                    required: true,
                    trim: true
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ],
        status: {
            type: String,
            enum: [
                "pending",
                "in review",
                "in progress",
                "canceled",
                "on the way",
                "delivered",
            ],
            default: "pending",
        },
        payment_method: {
            type: String,
            enum: [
                "credit card",
                "cash on delivery",
            ],
            required: true,
        },
        address_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Address"
        },
        subtotal: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;