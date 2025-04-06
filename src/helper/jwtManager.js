
const jsonwebtoken = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const jwtManager = (id) => {
    return jsonwebtoken.sign({ id }, 'bozo rodo', {
        expiresIn: maxAge
    });
}


module.exports = {
    jwtManager,
    maxAge
}