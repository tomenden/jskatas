//  http://www.codewars.com/kata/53db4acb1f1a7dd68700040a/train/javascript

function canReach(from, to, movements) {
}

function moveKnight(from) {
    var a = from[0], b = from[1],
        moves = [], i;
    moves.push([a - 2, b - 1], [a - 2, b + 1],
        [a - 1, b - 2], [a - 1, b + 2],
        [a + 1, b - 2], [a + 1, b + 2],
        [a + 2, b - 1], [a + 2, b + 1]
    );
    for (i = moves.length - 1; i >= 0; i -= 1) {
        if (moves[i][0] < 1 || moves[i][0] > 8
            || moves[i][1] < 1 || moves[i][1] > 8) {
            moves.splice(i, 1);
        }
    }
    return moves;


}


//Helper
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
//
function moveKnightRandom(from) {
    var options = moveKnight(from);
    var len = options.length;
    var rand = randomIntFromInterval(0, len - 1);
    return options[rand];
}

function compose() {
    var funcs = Array.prototype.slice.call(arguments);
    var result, i;
    return function(x) {
        result = funcs[funcs.length - 1].call(null, x);
        for (var i = funcs.length - 2; i >= 0; i -= 1) {
            result = funcs[i].call(null, result);
        }
        return result;
    };
}

function bind(ffunc) {
    return function (arr) {
        var i, result = [];
        for (i = 0; i < arr.length; i += 1) {
            var value = arr[i];
            result = result.concat(ffunc(value));
        }
        console.log(result)
        return result;
    }

}

function unit() {
}

function knightEngine(from, movements) {
}