/*
    Imports
*/
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const logger = require('../middleware/logger');
/*
    routes
*/
router.get('/', auth, logger, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, logger, sauceCtrl.getOneSauce);
router.put('/:id', auth, logger, multer, sauceCtrl.modifySauce);
router.post('/:id/like', auth, logger, sauceCtrl.likeSauce);
router.delete('/:id', auth, logger, sauceCtrl.deleteSauce);

/*
    Export
*/
module.exports = router;