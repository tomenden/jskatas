/**
 * Created by tome on 6/1/2015.
 * Kata: http://www.codewars.com/kata/52e864d1ffb6ac25db00017f/train/javascript
 *
 * Solved using Shunting-yard algorithm  - http://en.wikipedia.org/wiki/Shunting-yard_algorithm
 */

var operators = {
    '^': {
        precedence: 4,
        associativity: 'right'
    },
    '*': {
        precedence: 3,
        associativity: 'left'
    },
    '/': {
        precedence: 3,
        associativity: 'left'
    },
    '+': {
        precedence: 2,
        associativity: 'left'
    },
    '-': {
        precedence: 2,
        associativity: 'left'
    }
};

function toPostfix (infix) {
    var output = '', operatorStack = [];
    var i, token, numberRegex = /[0-9]/g, operatorRegex = /[\+\-\*/\^]/g;
    for (i = 0; i < infix.length; i += 1) {
        token = infix.charAt(i);
        if (token.match(numberRegex)) {// token is a number
            output += token;
        }
        else if (token.match(operatorRegex)) {
            var operator = operators[token], lastStackOperator;
            var lastStackItem = operatorStack[operatorStack.length - 1];
            while (operatorStack.length > 0 && lastStackItem.match(operatorRegex)) {
                lastStackOperator = operators[lastStackItem];
                if ((operator.associativity === 'left' && operator.precedence <= lastStackOperator.precedence) ||
                    (operator.associativity === 'right' && operator.precedence < lastStackOperator.precedence)) {
                    output += operatorStack.pop();
                    lastStackItem = operatorStack[operatorStack.length - 1];
                } else {
                    break;
                }
            }
            operatorStack.push(token);
        }
        else if (token === '(') {
            operatorStack.push(token);
        }
        else if (token === ')') {
            while (operatorStack.length > 0 && operatorStack.slice(-1)[0] !== '(') {
                output += operatorStack.pop();
            }
            operatorStack.pop();
        }
    }
    while (operatorStack.length > 0) {
        output += operatorStack.pop();
    }
    return output;
}

console.log(toPostfix("(5-4-1)+9/5/2-7/1/7"));