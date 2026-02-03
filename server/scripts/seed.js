const mongoose = require("mongoose");
const dotenv = require("dotenv");
const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected for seeding...");

    // Clear existing data
    await MenuItem.deleteMany({});
    await Order.deleteMany({});

    // Sample Menu Items
    const menuItems = await MenuItem.insertMany([
      {
        name: "Margherita Pizza",
        description: "Classic cheese pizza",
        category: "Main Course",
        price: 250,
        ingredients: ["Cheese", "Tomato Sauce", "Basil"],
        preparationTime: 20,
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        name: "Caesar Salad",
        description: "Fresh salad with dressing",
        category: "Appetizer",
        price: 150,
        ingredients: ["Lettuce", "Croutons", "Caesar Dressing"],
        preparationTime: 10,
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        name: "Chocolate Cake",
        description: "Rich chocolate dessert",
        category: "Dessert",
        price: 180,
        ingredients: ["Flour", "Cocoa", "Sugar"],
        preparationTime: 30,
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        name: "Lemonade",
        description: "Refreshing drink",
        category: "Beverage",
        price: 80,
        ingredients: ["Lemon", "Sugar", "Water"],
        preparationTime: 5,
        imageUrl: "https://via.placeholder.com/150",
      },
    ]);

    console.log("Menu items seeded!");

    // Sample Orders
    const orders = await Order.insertMany([
      {
        orderNumber: "ORD001",
        items: [
          { menuItem: menuItems[0]._id, quantity: 2, price: 250 },
          { menuItem: menuItems[1]._id, quantity: 1, price: 150 },
        ],
        totalAmount: 650,
        status: "Preparing",
        customerName: "John Doe",
        tableNumber: 5,
      },
      {
        orderNumber: "ORD002",
        items: [
          { menuItem: menuItems[2]._id, quantity: 1, price: 180 },
          { menuItem: menuItems[3]._id, quantity: 2, price: 80 },
        ],
        totalAmount: 340,
        status: "Pending",
        customerName: "Jane Smith",
        tableNumber: 2,
      },
    ]);

    console.log("Orders seeded!");

    mongoose.connection.close();
    console.log("Seeding completed and connection closed.");
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();