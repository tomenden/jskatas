/**
* Created by tome on 3/16/2015.
*/
var fib = [0, 1];

function fibonacci (n) {

    if (n<2) {
        return fib[n];
    }

    fib[n] = fibonacci(n - 1) + fib[n - 2];
    return fib[n];
}




console.log(fibonacci(1000));

