const express = require('express');
const { signUpController, signUpPostController, loginController, loginPostController } = require('../controllers/authController');


const router = express.Router();


router.get('/signup', signUpController);
router.post('/signup', signUpPostController);
router.get('/login', loginController);
router.post('/login', loginPostController);


module.exports = {
    router,
}