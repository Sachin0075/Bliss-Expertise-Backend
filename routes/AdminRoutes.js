// const express = require('express');
// const bcrypt = require('bcryptjs');
// const Admin = require('../models/Admin');
// const router = express.Router();

// // Admin Signup
// router.post('/signup', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if the admin already exists
//         const existingAdmin = await Admin.findOne({ email });
//         if (existingAdmin) {
//             return res.status(400).json({ message: 'Admin already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new admin
//         const newAdmin = new Admin({ name, email, password: hashedPassword });
//         await newAdmin.save();

//         res.status(201).json({ message: 'Admin registered successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// });

// // Admin Login
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find admin by email
//         const admin = await Admin.findOne({ email });
//         if (!admin) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // Compare password
//         const isPasswordValid = await bcrypt.compare(password, admin.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         res.status(200).json({ message: 'Login successful' });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// });

// // Protected Route Example (for testing)
// router.get('/dashboard', (req, res) => {
//     res.status(200).json({ message: 'Welcome to the Admin Dashboard!' });
// });

// module.exports = router;
