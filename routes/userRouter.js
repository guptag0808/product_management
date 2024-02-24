// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const { User } = require('../model/userModel');
require('dotenv').config()
const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { username,email, password } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      username,
	  email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser.toJSON() });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// login Routes
authRouter.post('/login', async (req, res) => {
	try {
	  const { email, password } = req.body;
  
	  // Find the user in the database
	  const user = await User.findOne({ where: { email } });
  
	  if (!user) {
		return res.status(401).json({ error: 'Invalid credentials' });
	  }
  
	  // Check if the provided password matches the stored hashed password
	  const passwordMatch = await bcrypt.compare(password, user.password);
  
	  if (!passwordMatch) {
		return res.status(401).json({ error: 'Invalid credentials' });
	  }
  
	  // Generate a JWT token
	  const token = jwt.sign({ userId: user.id, username: user.username }, process.env.secret_key, {
		expiresIn: '1h', // Adjust the expiration time as needed
	  });
  
	  // Send the token in the response
	  res.json({ token });
	} catch (error) {
	  console.error('Error logging in user:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  

module.exports = {authRouter};
