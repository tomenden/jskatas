/**
 * Created by tome on 1/2/2015.
 */
//http://www.codewars.com/kata/51ba717bb08c1cd60f00002f/train/javascript

function solution(list){
    var result = [],
        buffer = [];
    for (i=0; i<list.length; i+=1) {
        buffer.push(list[i]);
        var j = 1;
        if (list[i] + j === list[i+j]) {
            buffer.push(list[i+j]);
            j += 1;
        } else {
            buffer = buffer.filter(
                function (value, index) {
                    return buffer.indexOf(value) === index;
                }
            );
            if (buffer.length > 2) {
                result.push(buffer[0].toString() + "-" + buffer[buffer.length - 1].toString());
                buffer = [];
            } else {
                for (m=0; m<buffer.length; m+=1) {
                    result.push(buffer[m]);
                }
                buffer = [];
            }
        }
    }
    return result.toString();
}
console.log(solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]));
