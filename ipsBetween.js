/**
 * Created by tome on 12/20/2014.
 */
function ipsBetween(start, end){

    var toDec = function (prev, curr, index) {
        return (Math.pow(256, 3 - index) * curr) + prev;
    };

    start = start.split('.').reduce(toDec, 0);
    end = end.split('.').reduce(toDec, 0);

    return end - start;
}

console.log(ipsBetween("20.0.0.10", "20.0.1.0"));