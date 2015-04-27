/**
 * Created by tome on 1/26/2015.
 */
//http://www.codewars.com/kata/52742f58faf5485cae000b9a/train/javascript


function formatDuration (seconds) {
    if (seconds === 0) {
        return 'now';
    }
    var remaining = seconds;
    var order = ['year', 'day', 'hour', 'minute', 'second'];
    var result = [];
    var solution = [];
    var pronounce = [ ['year', 'years'], ['day', 'days'], ['hour', 'hours'], ['minute', 'minutes'], ['second', 'seconds'] ];
    var secondsEqual = {
        year: 31536000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for (i=0; i<order.length; i+=1) {
        result[i] = Math.floor(remaining / secondsEqual[order[i]] );
        remaining -= result[i] * secondsEqual[order[i]];
    }
    for (i=0; i<result.length; i+=1) {
        if (result[i]===1) {
            solution.push(result[i].toString() + ' ' + pronounce[i][0]);
        }
        if (result[i]>1) {
            solution.push(result[i].toString() + ' ' + pronounce[i][1]);
        }
    }

    if (solution.length > 1) {
        return solution.slice(0, solution.length-1).join(', ') + ' and ' + solution[solution.length-1];
    }
    if (solution.length === 1) {
        return solution[0];
    }
    return solution;

}


console.log(formatDuration(31536000));
