/**
 * Created by tome on 4/25/2015.
 * http://cs.saddleback.edu/rwatkins/CS2B/Lab%20Exercises/Stacks%20and%20Recursion%20Lab.pdf
 */
// recursive fibonacci: gets stuck for n = 100
function fibRecursive(n) {
    if (n <= 2) { // base
        return 1;
    } else { // recursion
        return fibRecursive(n - 1) + fibRecursive(n - 2);
    }
}

// iterative fibonacci: MUCH MUCH FASTER AND MORE EFFICIENT! Easily deals with any N
function fibIterative(n) {
    var fib = [0, 1, 1]; // store fibonacci sequence
    for (var i = 3; i <= n; i += 1) {
        fib[i] = fib[i - 2] + fib[i - 1];
    }
    return fib[n];
}

console.log(fibIterative(2));