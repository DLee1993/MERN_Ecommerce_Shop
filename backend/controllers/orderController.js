import Order from "../models/OrderModel.js";

// - Description ( Create a new order )
// - Route ( /orders )
// - Request Type ( POST )
// - Authentication ( Private route - authentication needed )
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("no order items");
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
};

// - Description ( Get an order by id )
// - Route ( /orders/:id )
// - Request Type ( GET )
// - Authentication ( Private route - authentication needed )
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate([
        { path: "User", select: "name email" },
    ]);
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
};

// - Description ( Update order to paid )
// - Route ( /orders/:id/pay )
// - Request Type ( PUT )
// - Authentication ( Private route - authentication needed )
const updateOrderToPaid = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
};

// - Description ( get logged in user orders )
// - Route ( /orders/myorders )
// - Request Type ( PUT )
// - Authentication ( Private route - authentication needed )
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id }); 
    res.json(orders)
};

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
