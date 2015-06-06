/**
 * Created by tome on 5/2/2015.
 */

/*
add a method to array which returns the maximum int
 */

// Helper method function to Function
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};



//Array.method('reduce', function (f, value) {
//    var i;
//    for (i = 0; i < this.length; i += 1) {
//        value = f(this[i], value);
//    }
//    return value;
//});

function findMax(a, b) {
    return Math.max(a, b);
}
Array.method('maxInt', function (value) {
    return this.reduce(findMax);
});

/*
    Dimensions
 */
// create simple array with initial value
Array.dim = function (dimensions, initial) {
    var a = [], i;
    for (i = 0; i < dimensions; i += 1) {
        a[i] = initial;
    }
    return a;
};

// Make an array containing 10 zeros
//var myArray = Array.dim(10, 0);
//console.log(myArray);

// create matrix of m * n
Array.matrix = function(m, n, initial) {
    var a, i, j, mat = []; // mat will hold the final matrix
    for (i = 0; i < m; i += 1) {
        a = [];
        for (j = 0; j < n; j += 1) {
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
};

//var myMatrix = Array.matrix(2, 20, 0);
//console.log(myMatrix);

// Method to mak an identity matrix - http://en.wikipedia.org/wiki/Identity_matrix
Array.identity = function (n) {
    var i, mat = Array.matrix(n, n, 0);//creates n x n matrix of zeros
    for (i = 0; i < n; i += 1) {// iterates across the matrix
        mat[i][i] = 1;// assigns the ones
    }
    return mat;
};
myMatrix = Array.identity(4);
console.log(myMatrix);