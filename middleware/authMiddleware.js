// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//     const token = req.headers['authorization'];

//     if (!token) {
//         return res.status(403).json({ message: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.adminId = decoded.id; // Attach admin ID to request
//         next();
//     } catch (err) {
//         res.status(403).json({ message: 'Invalid token' });
//     }
// };

// module.exports = authMiddleware;
