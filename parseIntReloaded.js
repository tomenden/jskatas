/**
 * Created by tome on 2/1/2015.
 * http://www.codewars.com/kata/525c7c5ab6aecef16e0001a5/train
 */

function parseInt(string) {
    var result = 0;
    var digits = string.split(' ');
    var map = {
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
        "ten": 10,
        "eleven": 11,
        "twelve": 12,
        "thirteen": 13,
        "fourteen": 14,
        "fifteen": 15,
        "sixteen": 16,
        "seventeen": 17,
        "eighteen": 18,
        "nineteen": 19,
        "twenty": 20,
        "thirty": 30,
        "forty": 40,
        "fifty": 50,
        "sixty": 60,
        "seventy": 70,
        "eighty": 80,
        "ninety": 90,
        "hundred": 100,
        "thousand": 1000,
        "million": 1000000
    };

    if (digits.indexOf('and') !== -1) {
        digits.splice(digits.indexOf('and'), 1);
    }

    for (i=0; i<digits.length; i+=1) {
        var hyphenIndex = digits[i].indexOf('-',i);
        if (hyphenIndex !== -1) {
            digits[i] = map[digits[i].slice(0, hyphenIndex)] + map[digits[i].slice(hyphenIndex + 1)];
        }
    }

    var mapFunc = function (current, index, array) {
        if (map[current]) {
            return map[current];
        } else {
            return current;
        }
    };

    var finalDigits = digits.map(mapFunc);
    return finalDigits;

    var test = finalDigits.reduce(function(previousValue, currentValue, index, array) {
        if (currentValue === 100) {
            return previousValue * currentValue;
        }
    });

    //for (m=0; m<finalDigits.length; m+=1) {
    //        var hundredIndex = finalDigits.indexOf(100, m);
    //        if (hundredIndex !== -1) {
    //            var miniArr = finalDigits.slice(m,hundredIndex);
    //            miniArr.reduce(function(previousValue, currentValue, index, array) {
    //                return (previousValue + currentValue) * 100;
    //            })
    //        }
    //}
    return test;
}
console.log(parseInt("seven hundred eighty-three thousand nine hundred and nineteen"));

//Test.assertEquals(parseInt('one'), 1);
//Test.assertEquals(parseInt('twenty'), 20);
//Test.assertEquals(parseInt('two hundred forty-six'), 246);