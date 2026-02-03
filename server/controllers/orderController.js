const Order = require("../models/Order");

// GET all orders with pagination + filter
exports.getOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let filter = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate("items.menuItem")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single order
exports.getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("items.menuItem");
  res.json(order);
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update status
exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.status = req.body.status;
  await order.save();
  res.json(order);
};