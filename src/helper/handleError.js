
 //the err object has errors and message properties in it
 //in the errors object we have the properties object
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email : '', password : '' };


    //duplicate error code
    if(err.code ===  11000 ) {
        errors.email = 'Email already exist'
        return errors;
    }

    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
        //  console.log(properties);
            errors[properties.path] = properties.message;

        });
    }

    return errors;
}


module.exports = {
    handleErrors,
}