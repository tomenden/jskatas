/**
 * Created by tome on 3/28/2015.
 */

//from problems 1-5
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
// end of problems 1-5

function curry (func, x) {
    return function (y) {
        return func(x, y);
    };
}

// create inc function which increments, using only existing functions
var inc = addf(1);
var inc2 = applyf(add)(1);
var inc3 = curry(add, 1);

function methodize (binary) {
    return function(x) {
        return binary(this, x);
    };
}

Number.prototype.add = methodize(add);

function demethodize (method) {
    return function(x, y) {
        return method.call(x, y);
    //  return method.apply(x, [y]); //
    };
}

// end of 6-9, start of 10-12

function twice (binary) {
    return function (x) {
        return binary(x, x);
    };
}

var double = twice(add);
var square = twice(mul);

function composeu (f, g) {
    return function(x) {
        return g(f(x));
    };
}

function composeb (fbin, gbin) {
    return function (x, y, z) {
        return gbin(fbin(x, y), z);
    };
}


// end of 10-12, start of 13-15

//TODO - find another way to do this, using booleans
function once (func) {
    return function () {
        var f = func;
        func = null;
        return f.apply(
            this,
            arguments
        );
    };
}

var add_once = once(add);

function counterf(n) {
    return {
        inc: function () {
            return n += 1;
        },
        dec: function () {
            return n -= 1;
        }
    };
}

var counter = counterf(10);

function revokable(func) {
    return {
        invoke: func, // Crockford sets the invoke to a function which returns func.apply(this, arguments) TODO check if this is better, why
        revoke: function () {
            this.invoke = {
                throw "Can't call it again"
            };
        }
    };
}

var temp = revokable(identity);
console.log(temp.invoke(5));
temp.revoke();
console.log(temp.invoke(1));