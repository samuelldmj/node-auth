const { handleErrors } = require("../helper/handleError");
const { jwtManager, maxAge } = require("../helper/jwtManager");
const { userModel } = require("../model/users.model");



/*
How password hashing occurs
take a password from the user->prepend a salt to it->then
hash it-> then persist to a db.
*/


const signUpController = (req, res) => {

    res.render('signup');

}

const signUpPostController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const createdUser = await userModel.create({
            email,
            password
        });

        const token = jwtManager(createdUser._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });


        res.status(201).json({
            status: "Success",
            message: "User created",
            user: createdUser._id,
        });


        //the err object has errors and message properties in it
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({
            status: "failed",
            error: errors || "Unable to create user"
        })
    }

}


const loginController = (req, res) => {

    res.render('login');

}

const loginPostController = async (req, res) => {

    const { email, password } = req.body;
    // console.log(email, password);
    // res.send('user post login');
    try {

        const user = await userModel.login(email, password);

        const token = jwtManager(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });

        res.status(200).json({ user: user._id });

    } catch (err) {
        const error = handleErrors(err);
        res.status(400).json({ error })
    }

}


const logoutController = async (req, res) => {

    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}


module.exports = {
    signUpController,
    signUpPostController,
    loginController,
    loginPostController,
    logoutController
}