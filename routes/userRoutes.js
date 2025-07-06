// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const router = express.Router();

// // JWT Secret Key (Replace with a secure key in production)
// const JWT_SECRET = process.env.JWT_SECRET;

// // Register User (POST /register)
// router.post('/register', async (req, res) => {
//     const { email, password, confirmPassword } = req.body;

//     // Validation
//     if (!email || !password || !confirmPassword) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }
//     if (password !== confirmPassword) {
//         return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Save the user
//         const user = new User({ email, password: hashedPassword });
//         await user.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// });

// // Login User (GET /login)
// router.get('/login', async (req, res) => {
//     const { email, password } = req.query;

//     // Validation
//     if (!email || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         // Find the user
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Compare the password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Generate a JWT token
//         const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ message: 'Login successful', token });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// });

// module.exports = router;
