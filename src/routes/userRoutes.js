const express = require('express');
const { signUpController, signUpPostController, loginController, loginPostController, logoutController } = require('../controllers/authController');


const userRoutes = express.Router();


userRoutes.get('/signup', signUpController);
userRoutes.post('/signup', signUpPostController);
userRoutes.get('/login', loginController);
userRoutes.post('/login', loginPostController);
userRoutes.get('/logout', logoutController);


module.exports = {
    userRoutes,
}