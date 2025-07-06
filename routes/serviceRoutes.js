// const express = require('express');
// const Service = require('../models/service');
// const router = express.Router();

// // GET all services
// router.get('/', async (req, res) => {
//     try {
//         const services = await Service.find();
//         res.json(services);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // POST a new service
// router.post('/', async (req, res) => {
//     const { acType, title, description } = req.body;
//     const service = new Service({ acType, title, description });

//     try {
//         await service.save();
//         res.status(201).json(service);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // PUT to update a service
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedService);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // DELETE a service
// router.delete('/:id', async (req, res) => {
//     try {
//         await Service.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Service deleted' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// module.exports = router;
