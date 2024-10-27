const express = require('express');
const { googleCallback } = require('../controllers/authController');
const router = express.Router();


router.get('/google/callback', googleCallback);

module.exports = router;
