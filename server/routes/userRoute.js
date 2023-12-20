const express = require('express');
const { registration, login, getUserName, isLoggedIn, forgotPassword, resetPassword } = require('../controller/userController');
const auth = require('../middleware/auth')
const router = express.Router();

// register route
router.post('/registration',registration);
// login route
router.post('/login',login);
// getUserName route
router.get('/getusername',auth,  getUserName);
// isLoggedIn route
router.get('/isloggedin',isLoggedIn);
// forgot password route
router.post('/forgotpassword', forgotPassword);
// reset password route
router.put('/resetpassword/:resetToken',resetPassword)

module.exports = router;