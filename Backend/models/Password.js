
/*
    Imports
*/
const passwordValidator = require('password-validator');


const passwordSchema = new passwordValidator();


passwordSchema              // Schema for the password
    .has().not().spaces()
    .is().min(8)
    .is().max(15)
    .has().digits()
    /*
    Must have :
        - no space 
        - between 8 and 15 letters AND numbers
    */



/*
    Exports
*/
module.exports = passwordSchema;