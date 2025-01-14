// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // Ensure the path is correct

dotenv.config(); // Load environment variables

const products = [
    {
      "_id": "66f3bb641bf4cd30b7349038",
      "name": "Smartphone",
      "category": "Electronics",
      "price": 299.99,
      "description": "A high-end smartphone with a large display.",
      "quantity": 30,
      "imageUrl": "https://images.unsplash.com/photo-1603184017968-953f59cd2e37?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
      "__v": 0
    },
    {
      "_id": "66f3bbd81bf4cd30b7349040",
      "name": "Laptop",
      "category": "Electronics",
      "price": 899.99,
      "description": "A powerful laptop for gaming and work.",
      "quantity": 20,
      "imageUrl": "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
      "__v": 0
    },
    {
      "_id": "66f3bc181bf4cd30b7349044",
      "name": "Washing Machine",
      "category": "Home Appliances",
      "price": 499.99,
      "description": "A front-load washing machine with multiple settings.",
      "quantity": 15,
      "imageUrl": "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2FzaGluZyUyMG1hY2hpbmV8ZW58MHx8MHx8fDA%3D",
      "__v": 0
    },
    {
      "_id": "66f3bc8c1bf4cd30b734904c",
      "name": "Refrigerator",
      "category": "Home Appliances",
      "price": 799.99,
      "description": "A spacious refrigerator with energy-saving features.",
      "quantity": 10,
      "imageUrl": "https://media.istockphoto.com/id/928066156/photo/open-refrigerator-in-kitchen.jpg?s=612x612&w=0&k=20&c=6WScE9r62MWgjHhdKBHBH0wHTrtwAK8klSMQ4CujAq4=",
      "__v": 0
    },
    {
      "_id": "66f3bcb81bf4cd30b7349050",
      "name": "Blender",
      "category": "Kitchen Appliances",
      "price": 89.99,
      "description": "A high-speed blender for smoothies and soups.",
      "quantity": 25,
      "imageUrl": "https://media.istockphoto.com/id/1011180974/photo/blender-on-the-table.jpg?s=612x612&w=0&k=20&c=vWKJC7e9DjvAt3_N7U_KyR94PhqG5oOQTdljtAIaadc=",
      "__v": 0
    },
    {
      "_id": "66f3bd171bf4cd30b7349058",
      "name": "Coffee Maker",
      "category": "Kitchen Appliances",
      "price": 59.99,
      "description": "A programmable coffee maker with a built-in grinder.",
      "quantity": 40,
      "imageUrl": "https://media.istockphoto.com/id/1302271960/photo/modern-espresso-coffee-machine-with-a-cup-in-interior-of-kitchen-closeup.jpg?s=612x612&w=0&k=20&c=zdzfEADbkpSnsn0-EWK_mYQBqwlAMXBYwPXTVOTrl8k=",
      "__v": 0
    },
    {
      "_id": "66f3bd591bf4cd30b734905c",
      "name": "Office Chair",
      "category": "Furniture",
      "price": 129.99,
      "description": "An ergonomic office chair with adjustable height.",
      "quantity": 12,
      "imageUrl": "https://media.istockphoto.com/id/2162184239/photo/3d-rendering-of-modern-sofa-on-blue-background.jpg?s=612x612&w=0&k=20&c=GJFAO337PemSfaGu_Ubv4unfs7TYfqavc33gFRvOqVc=",
      "__v": 0
    },
    {
      "_id": "66f3bd9c1bf4cd30b7349060",
      "name": "Dining Table",
      "category": "Furniture",
      "price": 349.99,
      "description": "A wooden dining table that seats six.",
      "quantity": 8,
      "imageUrl": "https://media.istockphoto.com/id/1309042044/photo/interior-design-of-stylish-dining-room-interior-with-family-wooden-table-modern-chairs-plate.jpg?s=612x612&w=0&k=20&c=_r5TNzVXvZwgbHEKiEvguyq-kmAzR9U667It3mDpWQo=",
      "__v": 0
    },
    {
      "_id": "66f3be4f1bf4cd30b7349068",
      "name": "Virtual Reality Headset",
      "category": "Wearables",
      "price": 399.99,
      "description": "An immersive virtual reality headset with high-resolution displays and motion tracking.",
      "quantity": 25,
      "imageUrl": "https://media.istockphoto.com/id/1127905341/photo/dancing-in-virtual-reality-glasses.jpg?s=612x612&w=0&k=20&c=EBWgxDE65sdghdvBhwr050Kbts2ZD4tUaO6Gu1dEvCM=",
      "__v": 0
    },
    {
      "_id": "66f3be9c1bf4cd30b734906c",
      "name": "Smartwatch",
      "category": "Wearables",
      "price": 199.99,
      "description": "A stylish smartwatch with health tracking features.",
      "quantity": 50,
      "imageUrl": "https://media.istockphoto.com/id/1448678415/photo/detailed-smart-watch-fitness-tracker-with-crown-3d-illustration.jpg?s=612x612&w=0&k=20&c=DY4YiuklLss3dXZZghINh0g-bmbzPv-ZYMubp_GejV0=",
      "__v": 0
    },
    {
      "_id": "66f3bf0f1bf4cd30b7349070",
      "name": "Remote Control Car",
      "category": "Toys",
      "price": 79.99,
      "description": "A high-speed remote control car with a durable design and multiple control functions for hours of fun.",
      "quantity": 35,
      "imageUrl": "https://media.istockphoto.com/id/153271122/photo/radio-controlled-buggy-on-gravel-track.jpg?s=612x612&w=0&k=20&c=6MZoGQdt45Tg_nrnjTQaKWS4lpnK_CYwVjwLJz2wL6Y=",
      "__v": 0
    }
  ]
  

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert new products
    await Product.insertMany(products);
    console.log("Seeded product data");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
