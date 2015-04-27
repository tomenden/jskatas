/**
 * Created by tome on 12/21/2014.
 */
//http://www.codewars.com/kata/regex-password-validation/javascript
//TODO Finish this
function validate(password) {
    return /^(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[\d].*)\w{6,}$/.test(password);
}