/**
 * Created by tome on 1/10/2015.
 */
//http://www.codewars.com/kata/529a92d9aba78c356b000353/train/javascript
var Cons = {};
Cons.fromArray = function(array){
    //TODO provide a convenient method to convert a JavaScript array
    //to an algebraic list.
    var result = '',
        closePar='';
    for (i=0; i<=array.length-1; i+=1) {
        result += 'Cons(' + array[i] + ', ';
        closePar += ')';
    }
    result += 'null' + closePar;
    return result;
};

function filter(list, predicate){
    //TODO: return a new list containing only elements
    //that satisfy the predicate function.
    var result = [],
        listStr = list.toString(),
        arr = [];
    for (m=0; m<listStr.length; m+=1) {
        if (typeof(listStr[m]) === 'number') {
            arr.push(listStr[m]);
        }
    return listStr;
}
    //for (i=0; i<=list.length; i+=1) {
    //    if predicate(list[i]) ) {
    //        result.push(list[i]);
    //    }
    //}

}

//function map(list, mapper){
//    //TODO: return a new list containing all elements
//    //resulting from applying the mapper functiont to them
//    return null;
//}
//
//Cons.prototype.filter = function(predicate){ return filter(this,predicate); };
//Cons.prototype.map = function(mapper){ return map(this, mapper); };

console.log(Cons.fromArray(["1", "2", "3", "4", "5"]));
console.log(filter(Cons.fromArray(["1", "2", "3", "4", "5"]), function (s) {
    return s === 1;
    }));