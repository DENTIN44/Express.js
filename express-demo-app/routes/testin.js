// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();

// // Middleware to parse JSON request bodies
// app.use(bodyParser.json());

// // Middleware to parse URL-encoded form data
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/submit', (req, res) => {
//   console.log(req.body); // Parsed body will be here
//   res.send('Data received!');
// });

// app.listen(3000, () => console.log('Server running on port 3000'));

// routes/testin.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');  // <-- your Mongoose User model

const router = express.Router();

router.post(
  '/submit',
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required.'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      const user = new User({ name });
      await user.save();

      console.log('Received and saved:', name);
      res.status(200).json({ message: `Hello, ${name}! Your data was saved.` });
    } catch (err) {
      console.error('Error saving user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

module.exports = router;


