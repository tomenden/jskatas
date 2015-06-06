Object.prototype.random = function() {
    var valuesArray = this.toRandomArray(),
        randomChoice = Math.floor((Math.random() * valuesArray.length - 1) + 1);
    return valuesArray[randomChoice];
};

Object.prototype.toRandomArray = function() {
    var options = getAllOptions.call(this), i, randomNumber,
        randomArray = [];
    while (options.length > 0) {
        randomNumber = Math.floor((Math.random() * (options.length)));
        randomArray.push(options[randomNumber]);
        options.splice(randomNumber, 1);
    }
    return randomArray;
};

var getAllOptions = function () {
    var key, allPossibilitiesArray = [], nestedNumbers;
    for (key in this){
        if (this.hasOwnProperty(key)) {
            nestedNumbers = getNestedNumberValuesFromInput(this[key]);
            allPossibilitiesArray = allPossibilitiesArray.concat(nestedNumbers);
        }
    }
    return allPossibilitiesArray;
};

var getNestedNumberValuesFromInput = function (input) {
    var numberValues = [];
    var recurse = function (input) {
        var key;
        if (typeof input === 'number' || typeof input === 'string') {
            numberValues.push(input);
        }
        if (typeof input === 'object') {
            for (key in input) {
                recurse(input[key]);
            }
        }
    };
    recurse(input);
    return numberValues;
};

var test = {w: 'a', q: 'b', e: {w: {q: 'c'}}};
console.log(test.toRandomArray());