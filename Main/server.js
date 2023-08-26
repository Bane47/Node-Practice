const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();



// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');

});



// Custom middleware for validation
const validateRegistration = [
    // Validate and sanitize the 'username' field
    body('username')
        .trim()
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .isAlphanumeric().withMessage('Username must only contain letters and numbers'),

    // Validate the 'email' field
    body('email')
        .isEmail().withMessage('Invalid email address'),

    // Validate and sanitize the 'password' field
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    // Custom middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];



// Define a route that uses the validateRegistration middleware
app.post('/register', validateRegistration, (req, res) => {
    const { username, email, password } = req.body;
    // ... Do something with the data, e.g., save to a database
    
    res.status(200).json({status:200, message: 'Registration successful' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
