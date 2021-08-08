const express = require('express');
const router = express.Router();

const {
    getAllStorageZones,
    createStorageZone
} = require('../controllers/storage_zones');


router.get('/',getAllStorageZones);
router.post('/createStorage',createStorageZone);
module.exports = router;