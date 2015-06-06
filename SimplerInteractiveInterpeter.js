/**
 * Created by tome on 5/31/2015.
 * http://www.codewars.com/kata/53005a7b26d12be55c000243/train/javascript
 */

function Interpreter()
{
    this.vars = {};
    this.functions = {};
}

Interpreter.prototype.tokenize = function (program)
{
    if (program === "")
        return [];

    var regex = /\s*([-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
    return program.split(regex).filter(function (s) { return !s.match(/^\s*$/); });
};

Interpreter.prototype.input = function (expr)
{
    return calc(expr);
};

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
    },
    '%': function (x, y) {
        return x % y;
    }
};
var recurse = function (expression) {
    var multDivModuloMatch = /(-?\d+\.?\d{0,100})(?:\s+)?([\*/%])(?:\s+)?(-?\d+\.?\d{0,100})/gm.exec(expression),
        addSubMatch = /(-?\d+\.?\d{0,100})(?:\s+)?([\+-])(?:\s+)?(-?\d+\.?\d{0,100})/gm.exec(expression),
        newExpression, x, y, operation, subResult,
        identifier = /([a-zA-Z]|_[_a-zA-Z0-9])/gm.exec(expression),
        assignment = /([a-zA-Z]|_[_a-zA-Z0-9]) = []]/gm.exec(expression);
    if (multDivModuloMatch === null && addSubMatch === null) { // base condition
        return parseFloat(expression, 10);
    }
    // recursion:
    if (multDivModuloMatch) {
        x = parseFloat(multDivModuloMatch[1], 10);
        y = parseFloat(multDivModuloMatch[3], 10);
        operation = multDivModuloMatch[2];
        subResult = operators[operation](x, y);
        newExpression = expression.replace(multDivModuloMatch[0], subResult.toString());
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