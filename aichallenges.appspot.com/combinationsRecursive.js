// A recursive function which returns all possible combinations of strings
// where order doesn't matter, i.e - ['A', 'B'] == ['B', 'A']

function combinations(arr) {
    var result = [];
    for (var m = 0; m < arr.length; m += 1) {
        var item = [].concat(arr[m]);
        result.push(item);
        combine(item, m + 1);
    }

    // item is Array
    function combine (item, i) {
        if (i === arr.length) {
            return;
        } else {
            var option = item.concat(arr[i]);
            result.push(option);
            combine(item, i + 1);
            combine(option, i + 1);
        }
    }

    console.log(result);
    return result;
}
combinations(['A', 'B', 'C', 'D', 'E']);
// Should return [ ['A'], ['A', 'B'], ['A', 'B', 'C'] ['A', 'C'], ['B'], ['B', 'C'], ['C'] ]