/**
 * Created by tome on 4/24/2015.
 */

function getSolutionMatrix(values, weights, capacity) {
    // create initial matrix of (values + 1) * (capacity + 1)
    var matrix = new Array(values.length + 1);
    for (var i = 0; i < matrix.length; i += 1) {
        matrix[i] = [];
        for (var j = 0; j <= capacity; j += 1) {
            matrix[i][j] = 0;
        }
    }
    for (var m = 1; m <= values.length; m += 1) {
        for (var k = 0; k <= capacity; k += 1) {
            if (k - Number(weights[m - 1]) >= 0) {
                matrix[m][k] = Math.max(matrix[m - 1][k], Number(values[m - 1]) + matrix[m - 1][k - weights[m - 1]]);
            }
            else {
                matrix[m][k] = matrix[m - 1][k]
            }
        }
    }
    return matrix;
}

function getOptimalSubset(solutionMatrix, weights) {
    var subset = [];
    var numItems = 0;
    var i = solutionMatrix.length - 1;
    for (var j = solutionMatrix[0].length - 1; j >= 0 && i > 0; i -= 1) {
        if (solutionMatrix[i][j] != solutionMatrix[i-1][j]) {
            subset[numItems] = i - 1;
            j -= Number(weights[i - 1]);
            numItems += 1;
        }
    }

    return subset;
}

var v = [7, 2, 1, 6, 12];
var w = [3, 1, 2, 4, 6];
var c = 10;
var solution = getSolutionMatrix(v, w, c);
var set = getOptimalSubset(solution, w);
console.log(solution, set);