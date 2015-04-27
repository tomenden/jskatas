
function hanoi(disks) {
    var result = [];
    function solve(disks, start, end, aux) { // move from start to end using aux
        if (disks > 0) {
            solve(disks - 1, start, aux, end); //move disks - 1 from start to aux using end
            result.push([start, end]); //when one is left, move it to the end
            solve(disks - 1, aux, end, start);
        }
    }

    solve(disks, 0, 2, 1);
    return result;
}

console.log(hanoi(2));

//console.log(hanoi(1, 0, 3, 2));

// iterative hanoi

