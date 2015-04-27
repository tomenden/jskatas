/**
 * Created by tome on 4/25/2015.
 */
//http://www.codewars.com/kata/529bf0e9bdf7657179000008/train/javascript
function validSolution(board){
    var n = board.length;
    var squareN = Math.sqrt(n);
    var allOptions = [];
    if (n !== 9) return false;
    for (var i = 0; i < n; i += 1) {
        allOptions.push(board[i]);// push row
        var colArr = [];// arr for col
        for (var j = 0; j < n; j += 1) {
            if (i < board[j].length) {// only push to colArr board[i][j] exists
                colArr.push(board[j][i]);
            }
        }
        allOptions.push(colArr);
    }
    // Create Little squares options and push to allOptions
    for (var b = 0; b < n; b += squareN) { // b is the starting row === starting index!
        var squareArr = [];
        var endIndex = b + squareN; // this is the end index
        for (var c = b; c < endIndex; c += 1) { // c is the current row
            squareArr = squareArr.concat(board[c].slice(b, endIndex));
        }
        allOptions.push(squareArr);
    }

    // validation
    for (var k = 0; k < allOptions.length; k += 1) {
        if (allOptions[k].length !== n) return false; // check length
        for (var p = 0; p < n; p += 1) {
            if (allOptions[k].indexOf(allOptions[k][p], p + 1) > -1) return false; // singularity
            if (allOptions[k][p] < 0 || allOptions[k][p] > n) return false; // range validation
        }
    }

    return true;
}