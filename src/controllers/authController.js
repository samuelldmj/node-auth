

const signUpController = (req, res) => {

    res.render('signup');

}

const signUpPostController = (req, res) => {

    const {email , password} = req.body;
    console.log(email, password)
    res.send('signup');

}
const loginController = (req, res) => {

    res.render('login');

}
const loginPostController = (req, res) => {

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