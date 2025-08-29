const express = require('express');
const router = express.Router();
const{ detectNews } = require('../controller/detectController');

router.post('/', detectNews);

module.exports = router;
