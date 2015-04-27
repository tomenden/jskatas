/**
 * Created by tome on 3/28/2015.
 */

function identity (x) {
    return x;
}

function add(x, y) {
    return x + y;
}

function mul(x, y) {
    return x * y;
}

function idf(x) {
    return function() {
        return x;
    };
}

function addf(x) {
    return function(y) {
        return x + y;
    };
}


function applyf(binary) {
    return function (x) {
        return function (y) {
            return binary(x, y);
        };
    };
}
