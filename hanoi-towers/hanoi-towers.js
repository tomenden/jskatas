function hanoi(disks) {
    //define sticks
    var A = [], B = [], C = [], goal = [], moves = [];

    // define starting point of A and define goal
    for (var i = 0; i<disks; i+=1) {
        A.push((i + 1) * 100);
        goal.push((i + 1)*100);
    }

    // check whether goal is reached
    function is_goal_reached(state) {
        return state[2].join() == goal.join();
    }

    //function move(from, to) {
    //    var disk = from[from.length - 1];
    //    var movePossible = to.length === 0 || disk < to[to.length - 1];
    //    if (movePossible) {
    //        to.push(disk);
    //        from.pop();
    //
    //    }
    //    else {
    //        return "Move isn't possible";
    //    }
    //}

    /**
     *
     * @param sticks (array of all sticks)
     * @returns {Array}
     */
    function getPossibleMoves(sticks) {
        var result = [];
        for (var i=0; i<sticks.length; i+=1) {
            if (sticks[i].length === 0) {
                continue;
            }
            for (var j=0; j< sticks.length; j+=1) {
                if (j === i) {
                    continue;
                }
                var movingDisk = sticks[i][sticks[i].length - 1];
                var topDiskAtDest = sticks[j][sticks[j].length - 1];
                if ( sticks[j].length === 0 || movingDisk < topDiskAtDest ) {
                    result.push([i + 1, j + 1]);
                }
            }
        }
        return result;
    }

    function getPossibleStates(sticks) {
        var result = [];
        var possibleMoves = getPossibleMoves(sticks);
        for (var i=0; i<possibleMoves.length; i+=1) {
            var sticksCopy = copy(sticks);
            sticksCopy[possibleMoves[i][1]-1].push(sticksCopy[possibleMoves[i][0]-1].pop());
            result.push(sticksCopy)
        }
        return result;
    }

    function play(state) {
        if (is_goal_reached(state)) {
            moves.push("a");
            return moves;
        }
        else {
            var possibleMoves = getPossibleMoves(state), possibleStates = getPossibleStates(state);
            for (var i=0; i<possibleMoves.length; i+=1) {
                //DRY
                if (moves.length>0 && possibleMoves[i][0] === moves[moves.length-1][1] && possibleMoves[i][1] === moves[moves.length-1][0]) {
                    continue;
                }
                moves.push(possibleMoves[i]);
                play(possibleStates[i]);
            }
            return moves;
        }
    }

    function best(moveOptions) {
        var options = [], result;
        for (var i=0; i<moveOptions.length; i+=1) {
            var index = moveOptions.indexOf('a', i);
            options.push(moveOptions.slice(i, index));
            i = index;
        }

        result = options[0];
        for (var j=1; j<options.length; j+=1) {
            if (options[j].length < result.length) {
                result = options[j];
            }
        }
        return result;
    }

    function copy(arr) {
        var copy = [];
        for (var i=0; i<arr.length; i+=1) {
            var stick = [];
            for (var j=0; j<arr[i].length; j+=1) {
                stick.push(arr[i][j]);
            }
            copy.push(stick)
        }
        return copy;
    }

    //var sticksCopy = copy([A, B, C]);
    var game = play([A, B, C]);
    return best(game);
    //return [A, B, C];
}

console.log(hanoi(3));


