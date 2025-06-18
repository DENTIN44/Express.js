// routes/routingRouter.js

// routes/routingRouter.js
console.log('🛠️  routingRouter.js loaded');

const express = require('express');
const router = express.Router();

// 1) Valid route → 200 + JSON
router.get('/:name/:id([0-9]{5})', (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      data: { name: req.params.name, id: req.params.id }
    });
});

// 2) Fallback for anything else under /things → 400 + JSON
router.use((req, res) => {
  res
    .status(400)
    .json({
      status: 'error',
      message: 'Sorry, this is an invalid URL under /things'
    });
});

module.exports = router;