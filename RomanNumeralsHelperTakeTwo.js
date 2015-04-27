/**
 * Created by tome on 4/25/2015.
 */

var valuesDictionary = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
};
var order = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
var stringResult = '';
var intResult = 0;
function intToRoman(int, i) {
    var symbol;
    var symbolValue;
    if (int === 0) {
        return null;
    }
    else {
        for (var j = i; j < order.length; j += 1) {
            symbol = order[j];
            symbolValue = valuesDictionary[symbol];
            if (int >= symbolValue) {
                stringResult += symbol;
                intToRoman(int - symbolValue, j);
                break;
            }
        }
        return stringResult;
    }
}
function strToRoman(str) {
    // base case
    var lengthTwo = str.substr(0, 2);
    var lengthOne = str.substr(0, 1);
    if (str === '') {
        return null;
    }
    // recursive case
    else {
        if (valuesDictionary.hasOwnProperty(lengthTwo)) {
            intResult += valuesDictionary[lengthTwo];
            strToRoman(str.substr(2));
        }
        else if (valuesDictionary.hasOwnProperty(lengthOne)) {
            intResult += valuesDictionary[lengthOne];
            strToRoman(str.substr(1));
        }
        return intResult;
    }
}
var RomanNumerals = {
    toRoman : function (int) {
        stringResult = '';
        return intToRoman(int, 0);
    },
    fromRoman: function (str) {
        intResult = 0;
        return strToRoman(str);
    }
};

console.log(RomanNumerals.toRoman(4));
console.log(RomanNumerals.toRoman(4) == "IV");
console.log('IV' == "IV");