/**
 * Created by tome on 1/15/2015.
 */
//http://www.codewars.com/kata/5254ca2719453dcc0b00027d/train/javascript

function permutations(string) {
    var len = string.length,
        result = [];
    for (i=0; i<len; i+=1) {
        var char = string.slice(i, i + 1),
            substring = string.slice(0, i) + string.slice(i + 1);
        for (j=0; j<substring.length; j+=1) {
            result.push(char + substring.slice(0, j) + substring.slice(j));
        }
    }
    result.filter(function (item, index) {
        return result.indexOf(item) === index;
    });
    return result;
}

console.log(
permutations('a'), // ['a']
permutations('ab'), // ['ab', 'ba']
permutations('aabb') // ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
);

// (string,slice(0,1), string.slice(1,2), string.slice(2,3), string.slice(3,4)
// string.slice (0,2)