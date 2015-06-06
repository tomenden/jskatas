/*
 http://www.codewars.com/kata/reverse-polish-notation-calculator/train/javascript
 */

function calc(expr) {
    var operationPair = /(\d+(?:\.\d+)?)\s(\d+(?:\.\d+)?)\s([\+\-/\*])/,
        lastNumber = /(\d+(\.\d+)?)$/,
        math;
    if (expr === "") return 0;
    if (expr.match(operationPair) === null){
        return parseFloat(lastNumber.exec(expr));
    } else {
        while (expr.match(operationPair) !== null) {
            math = operationPair.exec(expr);
            math = eval(math[1] + math[3] + math[2]);
            expr = expr.replace(operationPair, math.toString());
        }
        return parseFloat(expr, 10);
    }
}

console.log(calc("5 1 2 + 4 * + 3 -"));