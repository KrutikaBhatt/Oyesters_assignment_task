const express = require('express');
const router = express.Router();

const payment_functions = require('../controllers/payment_cont.js');
router.post("/",payment_functions.create);
router.post("/redis",payment_functions.create_using_redis);

module.exports = router;