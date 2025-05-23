const express = require('express');
const { registerController, loginController, refreshTokenController  } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh-token', refreshTokenController);


module.exports = router;
