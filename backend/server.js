// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./userSchema");

// Create Express app
const app = express();

app.use(cors())

// Connect to MongoDB database
mongoose
  .connect("mongodb://0.0.0.0:27017/recipe", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


// Define middleware to parse JSON body
app.use(express.json());

// Define registration route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new User document
  const user = User({ name, email, password: hashedPassword });

  try {
    // Save user to database
    await user.save();

    // Generate JWT token for user
    const token = jwt.sign({ userId: user._id }, "mysecretkey");

    // Send token and user data as response
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Define login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  console.log(user,)
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Compare password using bcrypt
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Generate JWT token for user
  const token = jwt.sign({ userId: user._id }, "mysecretkey");

  // Send token and user data as response
  res.json({ user, token });
});



// Start the server
app.listen(8000, () => {
  console.log("Server started on port 3000");
});
