/**
 * Created by tome on 5/28/2015.
 * http://www.codewars.com/kata/52a78825cdfc2cfc87000005/solutions/javascript
 */
var operators = {
    '*': function (x, y) {
        return x * y;
    },
    '/': function (x, y) {
        return x / y;
    },
    '+': function (x, y) {
        return x + y;
    },
    '-': function (x, y) {
        return x - y;
    }
};
var recurse = function (expression) {
    var multDivMatch = /(-?\d+\.?\d{0,100})(?:\s+)?([\*/])(?:\s+)?(-?\d+\.?\d{0,100})/gm.exec(expression),
        addSubMatch = /(-?\d+\.?\d{0,100})(?:\s+)?([\+-])(?:\s+)?(-?\d+\.?\d{0,100})/gm.exec(expression),
        newExpression, x, y, operation, subResult;
    if (multDivMatch === null && addSubMatch === null) { // base condition
        return parseFloat(expression, 10);
    }
    // recursion:
    if (multDivMatch) {
        x = parseFloat(multDivMatch[1], 10);
        y = parseFloat(multDivMatch[3], 10);
        operation = multDivMatch[2];
        subResult = operators[operation](x, y);
        newExpression = expression.replace(multDivMatch[0], subResult.toString());
        return recurse(newExpression);
    }
    else if (addSubMatch) {
        x = parseFloat(addSubMatch[1], 10);
        y = parseFloat(addSubMatch[3], 10);
        operation = addSubMatch[2];
        subResult = operators[operation](x, y);
        newExpression = expression.replace(addSubMatch[0], subResult.toString());
        return recurse(newExpression);
    }
};

var parenthesisRecurse = function (expression) {
    var parenthesis = /-?\(([^()]+)\)/gm.exec(expression);
    var parenthesisRegEx = /-?\(([^()]+)\)/gm,
        subResult, newExpression;
    if (parenthesis === null) {
        return recurse(expression);
    }
    else {
        if (parenthesisRegEx.exec(parenthesis[1]) === null) {
            subResult = recurse(parenthesis[1]);
            if (parenthesis[0].charAt(0) === '-') subResult *= -1;
            newExpression = expression.replace(parenthesis[0], subResult.toString());
            newExpression = newExpression.replace('--', '-');
            return parenthesisRecurse(newExpression);
        }
        newExpression = expression.replace(parenthesis[1], parenthesisRecurse(parenthesis[1]));
        return parenthesisRecurse(newExpression);
    }
};

var calc = function (expression) {
    expression = parenthesisRecurse(expression);
    return recurse(expression);
};


var tests = [
    //['(1 - 2) + -(-(-(-4)))', 3],
    //['-1 *-4', 4]
    ['(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11)', 1]
    //['123.45*-0.25 / 20']
];

for (var o = 0; o < tests.length; o += 1) {
    console.log(calc(tests[o][0]), 'expected:' + tests[o][1]);
}
