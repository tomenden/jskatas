/**
 * Created by tome on 12/21/2014.
 */
//http://www.codewars.com/kata/5267faf57526ea542e0007fb/train/javascript
Math.round = function(number) {
    if (number - parseInt(number) >= 0.5) {
        return parseInt(number) + 1;
    }
    return parseInt(number);
};

Math.ceil = function(number) {
    if (number - parseInt(number) > 0) {
        return parseInt(number) + 1;
    }
    return parseInt(number);
};

Math.floor = function(number) {
    return parseInt(number);
};

console.log(Math.floor(0.4));