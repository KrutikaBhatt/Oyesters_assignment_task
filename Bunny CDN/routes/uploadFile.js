const express = require('express');
const router = express.Router();

const {
    uploadFileToBunnyCdn
} = require('../controllers/addFiletoBunnyCdn');



router.post('/',uploadFileToBunnyCdn);
module.exports = router;