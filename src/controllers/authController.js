const { handleErrors } = require("../errorHandler/handleError");
const { userModel } = require("../model/users.model");


const signUpController = (req, res) => {

    res.render('signup');

}

const signUpPostController = async (req, res) => {
    const {email , password} = req.body;

 try{
    const createdUser=  await userModel.create({
        email,
        password
    })

    res.status(201).json({
        status : "Success",
        message : "User created",
        data : createdUser
    })
    //the err object has errors and message properties in it
 }catch(err){
    const errors = handleErrors(err)
    res.status(400).json({
        status: "failed",
        message : errors || "Unable to create user" 
    })
 }

}
const loginController = (req, res) => {

    res.render('login');

}
const loginPostController = async (req, res) => {

    const {email , password} = req.body;
    console.log(email, password);
    res.send('user post login');

}


module.exports = {
    signUpController,
    signUpPostController,
    loginController,
    loginPostController
}