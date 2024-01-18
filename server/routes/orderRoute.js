const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// const isAdmin = require('../middleware/isAdmin')
const restrict = require('../middleware/isAdmin')
const {order, getOrders, getAllOrdersByUser} = require('../controller/orderController')


// create
router.post('/order',auth, order )

router.get('/orders',auth, restrict('admin'), getOrders);

router.get('/orders/:userId',auth,getAllOrdersByUser)
module.exports = router;