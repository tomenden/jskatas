/**
 * Created by tome on 3/24/2015.
 */

var arr = [[1, 2], [2, 3], 'a', [1, 3], 'a'];
function best(moveOptions) {
    var options = [];
    for (var i=0; i<moveOptions.length; i+=1) {
        var index = moveOptions.indexOf('a', i);
        options.push(moveOptions.slice(i, index));
        i = index;
    }

    return options;
}

console.log(best(arr));