var set = [];

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

            if (Math.max(table[c][i + 1], v[i] + table[c - w[i]][i + 1]) === v[i] + table[c - w[i]][i + 1]) {
                set.push({'value': v[i] + table[c - w[i]][i + 1], 'item': v[i], 'parent': [c, i]});
                return v[i] + table[c - w[i]][i + 1];
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
console.log(set);