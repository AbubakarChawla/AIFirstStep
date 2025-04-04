const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());  // To parse JSON in request bodies
app.use(cors());          // Enable CORS
app.use('/uploads', express.static('uploads'));

// Set up multer for file uploads (storing files in the 'uploads' directory)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for a unique file name
    }
});

const upload = multer({ storage: storage });

// In-memory data (phones)
let phones = [];

// Routes
app.get('/', (req, res) => {
    res.send('Mobile Phone Listing API');
});

// Get all phones
app.get('/api/phones', (req, res) => {
    res.json(phones);
});

// Add a new phone (with image upload)
app.post('/api/phones', upload.single('image'), (req, res) => {
    const { name, brand, price, specs } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Save image path
    const newPhone = { name, brand, price, specs, image };
    
    newPhone.id = phones.length + 1; // Simple ID generation
    phones.push(newPhone);
    res.status(201).json(newPhone);
});

// Update a phone
app.put('/api/phones/:id', (req, res) => {
    const { id } = req.params;
    const updatedPhone = req.body;
    phones = phones.map(phone => phone.id === Number(id) ? { ...phone, ...updatedPhone } : phone);
    res.json(updatedPhone);
});

// Delete a phone
app.delete('/api/phones/:id', (req, res) => {
    const { id } = req.params;
    phones = phones.filter(phone => phone.id !== Number(id));
    res.json({ message: 'Phone deleted successfully' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
