import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        orderItems: [
            {
                name: {
                    type: String,
                    required: true,
                },
                qty: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
            },
        ],
        shippingAddress: {
            address: {
                type: String,
                requires: true,
            },
            city: {
                type: String,
                requires: true,
            },
            postalCode: {
                type: String,
                requires: true,
            },
            country: {
                type: String,
                requires: true,
            },
        },
        //! - the below objects are also used by paypal
        // - also making it scalable to add payment methods
        paymentMethod: {
            type: String,
            required: true,
        },
        // - payment result will come from paypal
        // - when the payment is succesful we will get data back from paypal
        // - this is where we will store that data
        paymentResult: {
            id: {
                type: String,
            },
            status: {
                type: String,
            },
            update_time: {
                type: String,
            },
            email_address: {
                type: String,
            },
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("orders", OrderSchema);

export default Order;
