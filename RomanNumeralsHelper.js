/**
 * Created by tome on 12/21/2014.
 */
//http://www.codewars.com/kata/51b66044bce5799a7f000003/train/javascript

var RomanNumerals = {
    map: function (value, index, arr) {
        var digitVal = value * (10)^(arr.length-index-1);
        var remainder = 0;
        if (digitVal + remainder >= 1000) {
            for (i=1000; i<=digitVal; i+=1000) {
                return 'M';
            }
        }
        else if (digitVal + remainder >= 500) {
            remainder = digitVal - 500;
            return 'D';
        }
        else if (digitVal >= 100){
            for (i=100; i<=digitVal; i+=100) {
                return 'C';
            }
        }
        else if (digitVal)
    },
    toRoman: function(num) {

    },
    fromRoman: function(roman) {

    };
}