var express = require('express')
var router = express.Router()
const productCafeController = require('../controllers/productController')


router.get('/', productCafeController.sanpham)
router.get('/cafe', productCafeController.cafe)
router.post('/:id/additem', productCafeController.additem)
router.get('/cart', productCafeController.cart)







module.exports = router;