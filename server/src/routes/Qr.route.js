const QrController = require('../controllers/Qrscan.controller');
const Authentication = require('../middlewares/Authentication');
const router = require('express').Router();

router.get('/getProByQr/:id',  QrController.qrScan);

module.exports = router;