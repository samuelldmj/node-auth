const jwt = require('jsonwebtoken');
const { userModel } = require("../model/users.model");
const { handleErrors } = require('../helper/handleError');

// const checkUserMiddleware = (req, res, next) => {

//     const token = req.cookies.jwt

//     if (token) {
//         jwt.verify(token, 'bozo rodo', async (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 res.locals.user = null
//                 next();
//             }
//             console.log(decodedToken);
//             let user = await userModel.findById(decodedToken.id)
//             res.locals.user = user;
//             next();
//         })

//     } else {
//         res.locals.user = null
//         next();
//     }

// }





/*
REFACTORED CODE
*/

const checkUserMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        console.log('No JWT token found in cookies');
        res.locals.user = null;
        return next();
    }

    jwt.verify(token, 'bozo rodo', async (err, decodedToken) => {
        if (err) {
            console.log('Token verification failed:', err.message);
            res.locals.user = null;
            return next();
        }

        try {
            const user = await userModel.findById(decodedToken.id);
            if (!user) {
                console.log(`User not found for ID: ${decodedToken.id}`);
                res.locals.user = null;
            } else {
                res.locals.user = user;
            }
            next();
        } catch (err) {
            console.log('Error fetching user from database:', err.message);
            res.locals.user = null;
            next();
        }
    });
};

module.exports = {
    checkUserMiddleware
};


