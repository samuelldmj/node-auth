const express = require('express');
const { signUpController, signUpPostController, loginController, loginPostController } = require('../controllers/authController');


const userRoutes = express.Router();


userRoutes.get('/signup', signUpController);
userRoutes.post('/signup', signUpPostController);
userRoutes.get('/login', loginController);
userRoutes.post('/login', loginPostController);


module.exports = {
    userRoutes,
}