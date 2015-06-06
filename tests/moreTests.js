/* pseudocode

 http://www.algorithmist.com/index.php/Coin_Change
def count( n, m ):
 if n == 0:
 return 1
 if n < 0:
 return 0
 if m <= 0 and n >= 1: #m < 0 for zero indexed programming languages
 return 0

 return count( n, m - 1 ) + count( n - S[m], m )
 */

var S = [1, 2, 5, 10];
function count(n, m) {
    if (n === 0) {
        return 1;
    }
    if (n < 0) {
        return 0;
    }
    if (m < 0 && n >= 1) {
        return 0;
    }
    return count(n, m - 1) + count(n - S[m], m);
}

console.log(count(10, S.length - 1));