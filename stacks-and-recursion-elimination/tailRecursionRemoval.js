/**
 * Created by tome on 4/25/2015.
 */

// factorial function with tail recursion
function factorialRecursive(n) { // n is positive
    if (n <= 1) { // base condition
        return 1;
    }
    else { // recursive condition
        return n * factorialRecursive(n - 1);
    }
}

// factorial function utilizing while, instead of tail recursion
function factorialWhile(n) {
    var result = 1;
    while (n > 0) {
        result *= n;
        n -= 1;
    }
    return result;
}

//console.log(factorialRecursive(100));
//console.log(factorialWhile(100));

// tail recursion example
function tailRecursion(m, n) {
    if (m === 0 || n === 0) {
        return 1;
    } else {
        return 2 * tailRecursion(m - 1, n + 1);
    }
}
// replaced tail recursion with while statement. TODO: design tests
function noTailRecursion(m, n) {
    var result = 1;
    while (m !== 0 && n !== 0) {
        result *= 2;
        m -= 1;
        n += 1;
    }
    return result;
}

// some tests

var randomPositive = Math.floor(Math.random() * 10 + 1);
var anotherRandomPositive = Math.floor(Math.random() * 10 + 1);
var randomNegative = Math.floor(Math.random() * -10 + 1);
var anotherRandomNegative = Math.floor(Math.random() * -10 + 1);

console.log(tailRecursion(1, 1));
console.log(noTailRecursion(1, 1));
console.log(tailRecursion(1, 3));
console.log(noTailRecursion(1, 3));
console.log(tailRecursion(5, -3));
console.log(noTailRecursion(5, -3));
console.log(tailRecursion(-700, -700));
console.log(noTailRecursion(-700, -700));
console.log(tailRecursion(700, 700));
console.log(noTailRecursion(700, 700));
console.log(tailRecursion(0, 700));
console.log(noTailRecursion(0, 700));
console.log(tailRecursion(randomPositive, anotherRandomPositive));
console.log(noTailRecursion(randomPositive, anotherRandomPositive));
console.log(tailRecursion(randomNegative, anotherRandomNegative));
console.log(noTailRecursion(randomNegative, anotherRandomNegative));
console.log(tailRecursion(randomPositive, anotherRandomNegative));
console.log(noTailRecursion(randomPositive, anotherRandomNegative));