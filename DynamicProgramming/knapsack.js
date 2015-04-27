/**
 * Created by tome on 4/23/2015.
 */
/*
    v = value
    w = weight
    c = capacity
 */
function knapsack(v, w, c) {
    var n = v.length,
        table = [];
    // create two-dimensional array to hold values in memory
    while (table.length <= c) {
        table.push([]);
    }

    return ks(c, 0);
    function ks(c, i) {
        if (i >= n) {
            table[c][i] = 0;
            return table[c][i];
        }
        if (c < w[i]) {
            if (table[c][i+1] === undefined) {
                table[c][i + 1] = ks(c, i + 1);
            }
            return table[c][i + 1];
        }
        else {
            if (table[c][i + 1] === undefined) {
                table[c][i + 1] = ks(c, i + 1);
            }
            if (table[c - w[i]][i + 1] === undefined) {
                table[c - w[i]][i + 1] = ks(c - w[i], i + 1);
            }
            return Math.max(table[c][i + 1], v[i] + table[c - w[i]][i + 1]);
        }
    }
}

var v = [7, 2, 1, 6, 12];
var w = [3, 1, 2, 4, 6];
var c = 10;
var result = knapsack(v, w, c);
console.log(result);


//
//function getSolutionMatrix(itemValues, weights, capacity) {
//    var matrix =  new Array(itemValues.length + 1);
//    for (var i = 0; i < matrix.length; i++){
//        matrix[i] = new Array(capacity);
//        for(var j = 0; j <= capacity; j++) {
//            matrix[i][j] = 0;
//        }
//    }
//    for(var i = 1; i <= itemValues.length; i++) {
//        for (var j = 0; j <= capacity; j++) {
//            if (j - Number(weights[i-1])  >= 0) {
//                matrix[i][j] = Math.max(matrix[i-1][j], Number(itemValues[i-1]) + matrix[i-1][j-Number(weights[i-1])]);
//            } else {
//                matrix[i][j] = matrix[i-1][j];
//            }
//        }
//    }
//    return matrix;
//}
//
//var matrix = getSolutionMatrix(v, w, c);
//function getOptimalSubset(solutionMatrix, weights) {
//    var subset = new Array(1);
//    var numItems = 0;
//    var i = solutionMatrix.length - 1;
//    for (var j = solutionMatrix[0].length - 1; j >= 0 && i > 0; i--) {
//        // If the item is in the optimal subset, add it and subtract its weight
//        // from the column we are checking.
//        if (solutionMatrix[i][j] != solutionMatrix[i-1][j]) {
//            subset[numItems] = i;
//            j -= Number(weights[i-1]);
//            numItems++;
//        }
//    }
//    return subset;
//}
//console.log(getOptimalSubset(matrix, w));