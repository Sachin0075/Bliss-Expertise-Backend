const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));


// mongoose.connect('mongodb://127.0.0.1:27017/Bliss_Expertise')
mongoose.connect('mongodb+srv://sachina0075:Sachin%235@staff.cqkgn.mongodb.net/myAppDB')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const salesProductSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true }
});

const SalesProduct = mongoose.model('SalesProduct', salesProductSchema);

const userDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    message: { type: String, required: true }
});

const UserData = mongoose.model('UserData', userDataSchema);

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true }
});
// Define the Order schema to store order details
const orderSchema = new mongoose.Schema({
    userData: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },
    cartItems: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            img: { type: String, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

app.post('/api/orders', async (req, res) => {
    const { userData, cartItems, totalAmount } = req.body;

    // Create a new Order instance with the cart and user data
    const newOrder = new Order({
        userData,
        cartItems,
        totalAmount
    });

    try {
        // Save the new order to the database
        await newOrder.save();
        res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder
        });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const User = mongoose.model('User', userSchema);



// Route to get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await SalesProduct.find(); // Get all products from the database
        res.json(products); // Send the products as a response
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to handle the contact form submission (POST request)
app.post('/api/contact', async (req, res) => {
    const { name, email, number, address, message } = req.body;

    // Create a new UserData instance with the form data
    const newUserData = new UserData({
        name,
        email,
        number,
        address,
        message
    });

    try {
        // Save the contact form data to MongoDB
        await newUserData.save();
        res.status(200).json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error('Error saving contact data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to register a user (POST request)
app.post('/api/users/register', async (req, res) => {
    console.log('Received Data:', req.body);  // Debugging line
    const { name, email, phone, address, password } = req.body;

    if (!name || !email || !phone || !address || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, phone, address, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server Error', error: error.message || error });
    }
});

// Middleware to parse cookies
app.use(cookieParser());

app.get('/api/users/verify', async (req, res) => {
    const { email, password } = req.query;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Set the user data in a cookie (optional: JWT token)
        const token = jwt.sign({ email: user.email, name: user.name }, 'your_secret_key', { expiresIn: '1h' });

        // Send the user name and set it in a cookie
        res.cookie('userToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(200).json({ message: 'User verified successfully', name: user.name, email: user.email });
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});
//to get all the users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all user documents from the collection
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

// Route to add a new product (POST request)
app.post('/api/products', async (req, res) => {
    const { id, name, price, img, description } = req.body;

    try {
        // Create a new product instance
        const newProduct = new SalesProduct({
            id,
            name,
            price,
            img,
            description
        });

        // Save the new product to the database
        await newProduct.save();

        res.status(201).json({
            message: 'Product added successfully',
            product: newProduct
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get all users (GET request)
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database

        // Optionally, mask the passwords or ensure they are not exposed
        const usersWithoutPassword = users.map(user => {
            return {
                email: user.email,
                // Do not return the password field
            };
        });

        res.json(usersWithoutPassword); // Return the user data without passwords
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Route to delete a user by ID
app.delete('/api/users/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOneAndDelete({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/api/userdata', async (req, res) => {
    try {
        // Fetch all contact form submissions from the UserData collection
        const userData = await UserData.find();

        // Send the data as a response
        res.json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});
// Route to get user details by email (GET request)
app.get('/api/users/details', async (req, res) => {
    const { email } = req.query;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the password field before sending the response
        const userWithoutPassword = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address
        };

        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const Admin = mongoose.model('Admin', adminSchema);

// Route to register an admin (POST request)
app.post('/api/admin/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already registered.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin instance
        const newAdmin = new Admin({ email, password: hashedPassword });

        // Save the admin to MongoDB
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Error during admin registration:', error);
        res.status(500).json({ message: 'Server Error', error: error.message || error });
    }
});

// Route to login an admin (POST request)
app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body; // Use req.body instead of req.query
    // : { $regex: new RegExp(`^ ${email}$`, 'i')
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Admin logged in successfully' });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get all orders (GET request)
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find(); // Fetch all orders from the database
        res.json(orders); // Return the order data
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});