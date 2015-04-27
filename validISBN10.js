/**
 * Created by tome on 12/21/2014.
 */
//http://www.codewars.com/kata/51fc12de24a9d8cb0e000001/train/javascript
function validISBN10(isbn) {
    var arr = isbn.split(''),
        sum = 0;
    if (arr.length !== 10){
        return false;
    }
    if (arr[arr.length-1] === 'X') {
        arr[arr.length-1] = 10;
    }
    for (i=0; i<arr.length; i+=1) {
        sum += arr[i] * (i+1);
    }
    if (sum % 11 === 0) {
        return true;
    } else {
        return false;
    }
}

console.log(validISBN10('1234512345'))