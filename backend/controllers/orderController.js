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
        { path: 'User', select: 'name email' }
      ]);
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
};

export { addOrderItems, getOrderById };
