const { default: mongoose } = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 character']
    }


});

//fire this function after doc is saved to the db
//it is must important we have the next callback to move to
//  the next operation to be done.
// userSchema.post('save', function(doc, next){
//     console.log("New user was created & saved", doc);
//     next();
// });

//fire function before doc is saved to the db
userSchema.pre('save', async function (next) {
    // console.log("New user about to be created & saved", this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//static method to login user
userSchema.statics.login = async function (email, password) {

    const user = await this.findOne({ email });

    if (user) {
        bcrypt.compare(password, user.password);
        const comparedPassword = await bcrypt.compare(password, user.password);

        if (comparedPassword) {
            return user;
        } throw Error("incorrect password");
    }
    throw Error("incorrect email");
}

//mongoose will pluralize this in our db users table
const userModel = mongoose.model('user', userSchema);

module.exports = {
    userModel
}