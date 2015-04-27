/**
 * Created by tome on 4/24/2015.
 */
    // from http://www.codewars.com/kata/540afbe2dc9f615d5e000425/train/javascript
var Sudoku = function(data)
{
    var n = data.length;
    function getAllOptions() {
        var result = [];
        var squareN = Math.sqrt(n);
        // Create all rows/cols options and push to result
        for (var i = 0; i < n; i += 1) {
            result.push(data[i]);// push row
            var colArr = [];// arr for col
            for (var j = 0; j < n; j += 1) {
                if (i < data[j].length) {// only push to colArr data[i][j] exists
                    colArr.push(data[j][i]);
                }
            }
            result.push(colArr);
        }
        // Create Little squares options and push to result
        for (var b = 0; b < n; b += squareN) { // b is the starting row === starting index!
            var squareArr = [];
            var endIndex = b + squareN; // this is the end index
            for (var c = b; c < endIndex; c += 1) { // c is the current row
                squareArr = squareArr.concat(data[c].slice(b, endIndex));
            }
            result.push(squareArr);
        }
        return result;
    }

    return {
        isValid: function() {
            var allOptions;
            // check if sqrt is int
            if (Math.sqrt(n) !== parseInt(Math.sqrt(n), 10)) {
                return false;
            } else {
                allOptions = getAllOptions();
            }
            for (var i = 0; i < allOptions.length; i += 1) {// loop through all options
                if (allOptions[i].length !== n) return false;// length validation
                for (var j = 0; j < allOptions[i].length; j += 1) {
                    if (allOptions[i].indexOf(allOptions[i][j], j + 1) > -1) return false; // singularity validation
                    if (allOptions[i][j] !== parseInt(allOptions[i][j], 10)) return false; // int validation
                    if (allOptions[i][j] < 1 || allOptions[i][j] > n) return false; // range validation
                }
            }
            return true;
        }
    };
};

var goodExample = new Sudoku ([
    [7, 8, 4, 1, 5, 9, 3, 2, 6],
    [5, 3, 9, 6, 7, 2, 8, 4, 1],
    [6, 1, 2, 4, 3, 8, 7, 5, 9],

    [9, 2, 8, 7, 1, 5, 4, 6, 3],
    [3, 5, 7, 8, 4, 6, 1, 9, 2],
    [4, 6, 1, 9, 2, 3, 5, 8, 7],

    [8, 7, 6, 3, 9, 4, 2, 1, 5],
    [2, 4, 3, 5, 6, 1, 9, 7, 8],
    [1, 9, 5, 2, 8, 7, 6, 3, 4]
]);
console.log(goodExample.isValid());
var badSudoku2 = new Sudoku([
    [1,2,3,4,5],
    [1,2,3,4],
    [1,2,3,4],
    [1]
]);
console.log(badSudoku2.isValid());