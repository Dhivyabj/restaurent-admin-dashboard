const MenuItem = require("../models/MenuItem");

// GET all menu items with filters
exports.getMenuItems = async (req, res) => {
  try {
    const { category, availability, minPrice, maxPrice } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (availability) filter.isAvailable = availability === "true";
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const items = await MenuItem.find(filter);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search menu items
exports.searchMenuItems = async (req, res) => {
  try {
    const q = req.query.q;
    const results = await MenuItem.find({ $text: { $search: q } });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CRUD
exports.getMenuItem = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  res.json(item);
};

exports.createMenuItem = async (req, res) => {
  try {
    const newItem = await MenuItem.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteMenuItem = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Menu item deleted" });
};

// Toggle availability
exports.toggleAvailability = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  item.isAvailable = !item.isAvailable;
  await item.save();
  res.json(item);
};