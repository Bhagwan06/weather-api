// Entry point for your server
const express = require("express");
const cors = require("cors"); // Import the cors package

const dotenv = require("dotenv");
const weatherRoutes = require("./routes/weather"); // Import the weather router

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Define the port (default to 5000)
const port = process.env.PORT || 5000;

// Use the cors middleware
app.use(cors());

// Middleware (optional): You can add middleware for parsing JSON bodies
app.use(express.json());

// Use the weather API routes
app.use("/weather", weatherRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
