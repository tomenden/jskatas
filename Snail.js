/**
 * Created by tome on 1/12/2015.
 */
//http://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/train/javascript
snail = function(array) {
    var len = array.length,
        last = len - 1,
        cur = 0,
        result = [];
    if (array.toString() === '') {
        return [];
    } else{
        for (i=0; i<=cur && i<=last; i+=1) {
            for (j=cur; j<=last; j+=1) {
                result.push(array[i][j])
            }
            for (m=i+1; m<=last; m+=1) {
                result.push(array[m][last]);
            }
            for (n=last-1; n>=cur; n-=1) {
                result.push(array[last][n]);
            }
            for (o=last-1; o>cur; o-=1) {
                result.push(array[o][cur]);
            }
            cur +=1;
            last -=1;
        }
    }
    return result;
};


console.log(snail([
                    [1,2,3,4,5],
                    [6,7,8,9,10],
                    [11,12,13,14,15],
                    [16,17,18,19,20],
                    [21,22,23,24,25]
]));
// [1,2,3,4,5,10,15,20,25,24,23,22,21,16,11,6,7,8,9,14,19,18,17,12,13]

//result.push(
//    array[0][0],
//    array[0][1],
//    array[0][2],
//
//    array[1][2],
//    array[2][2],
//
//    array[2][1],
//    array[2][0],
//
//    array[1][0],
//    array[1][1]
//);


//array = [
//        [1,2,3],
//        [8,9,4],
//        [7,6,5]
//];
//console.log(snail(array)); //=> [1,2,3,4,5,6,7,8,9]
//
//array = [
//    [1,2,3],
//    [4,5,6],
//    [7,8,9]
//];
//console.log(snail(array)); //=> [1,2,3,6,9,8,7,4,5]
