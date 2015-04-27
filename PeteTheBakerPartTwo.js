/**
 * Created by tome on 1/11/2015.
 */
//http://www.codewars.com/kata/5267e5827526ea15d8000708/train/javascript

function getMissingIngredients(recipe, added) {
    var missing = {},
        arr = [],
        quantity = 0;
    for (ingredient in recipe) {
        if (typeof(added[ingredient]) === 'undefined') {
            added[ingredient] = 0;
        }
        arr.push(Math.ceil(added[ingredient] / recipe[ingredient]));
    }
    quantity = Math.max.apply(null, arr);
    if (quantity === 0) {
        missing = recipe;
    } else {
        for (ingredient in recipe) {
            if ((quantity * recipe[ingredient]) - added[ingredient] !== 0 ) {
                missing[ingredient] = (quantity * recipe[ingredient]) - added[ingredient];
            }
        }
    }
    return missing;
}



var recipe = {flour: 200, eggs: 1, sugar: 100};

console.log(getMissingIngredients(recipe, {flour: 50, eggs: 1})); // must return {flour: 150, sugar: 100}
console.log(getMissingIngredients(recipe, {})); // must return {flour: 200, eggs: 1, sugar: 100}
console.log(getMissingIngredients(recipe, {flour: 500, sugar: 200})); // must return {flour: 100, eggs: 3, sugar: 100}
