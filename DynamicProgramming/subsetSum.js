/**
 * Created by tome on 4/24/2015.
 */

// boolean function - true if subset which sums to s exists, false if not
function q(items, target) {
    var negativeItemsSum = 0,
        positiveItemsSum = 0,
        matrix;
    // find boundaries - negative and positive sum
    for (var i = 0; i < items.length; i += 1) {
        if (items[i] > 0) positiveItemsSum += items[i];
        if (items[i] < 0) negativeItemsSum += items[i];
    }
    // if target is out of bounds return false
    if (target < negativeItemsSum || target > positiveItemsSum) {
        return false;
    }
    // create two dimensional array (matrix) - index * entire range (most negative to most positive)
    matrix = new Array(items.length + 1);
    for (var j = 0; j < matrix.length; j += 1) {
        matrix[j] = new Array(positiveItemsSum - negativeItemsSum + 1);
    }
    //// push all possible values in range to the top of the table, for reference
    var possibility = negativeItemsSum;
    for (var f = 0; f < matrix[0].length; f += 1) {
        matrix[0][f] = possibility;
        possibility += 1;
    }

    // check the first value item === matrix[0][0]
    for (var n = 1; n < matrix.length; n += 1) {
        matrix[n][0] = items[n - 1] === matrix[0][0];
    }
    // make further calls
    for (var l = 1; l < matrix.length; l += 1) {
        for (var o = 1; o < matrix[l].length; o += 1) {
            matrix[l][o] = (matrix[l - 1][o] === true) || (items[l - 1] === matrix[0][o]) || (matrix[l - 1][o - items[l - 1]] === true);
        }
    }
    //var indexOfZero = matrix[0].indexOf(0);
    //var lastOfMatrix = matrix.length - 1;
    //return matrix[lastOfMatrix][indexOfZero];
    return matrix;

}

//TODO: make this work
function findSS(solvedMatrix, target, originalSet) {
    var set = [];
    var indexOfTarget = solvedMatrix[0].indexOf(target);

    //var j = indexOfTarget;
    //for (var i = solvedMatrix.length - 1; i > 0; i -= 1) {
    //    if (solvedMatrix[i][j] && solvedMatrix[i-1][j] === false) {
    //        set.push(originalSet[i - 1]);
    //        j -= originalSet[i];
    //    }
    //    if (!solvedMatrix[i][j]) {
    //        j -= 1;
    //    }
    //}

    for (var i = solvedMatrix.length - 1; i > 0; i -= 1) {
        for (var j = indexOfTarget; j >= 0; j -= 1) {
            if (solvedMatrix[i][j] && (solvedMatrix[i - 1][j] === false || solvedMatrix[i-1] === undefined)) {
                set.push(originalSet[i - 1]);
                j -= originalSet[i - 1];
                break;
            }
        }
    }
    return set;
}

var set = [29, -41, -26, -3];
var myMatrix = q(set, 0);

console.log(findSS(myMatrix, 0, set));