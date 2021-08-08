const express = require('express');
const router = express.Router();

const {
    CreatePullZone
} = require('../controllers/pull_zones');



router.post('/createPullzone',CreatePullZone);
module.exports = router;