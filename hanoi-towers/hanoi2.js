/**
 * Created by tome on 3/28/2015.
 */
//var hanoi = function(disc,src,aux,dst) {
//    if (disc > 0) {
//        hanoi(disc - 1,src,dst,aux);
//        console.log("Move disc " + disc + " from " + src + " to " + dst);
//        hanoi(disc - 1,aux,src,dst);
//    }
//};
//
//hanoi(5,1,2,3);

function hanoi(disks) {
    var result = [];
    function solve (disks, src, dest, aux) {
        if (disks > 0) {
            solve(disks-1, src, aux, dest);
            result.push([src,dest]);
            solve(disks-1, aux, dest, src);
        }
    }

    solve(disks, 1, 3, 2);

    return result;
}

console.log(hanoi(2));


//Test.assertSimilar(hanoi(1), [[1,3]]);
//Test.assertSimilar(hanoi(2), [[1,2],[1,3],[2,3]]);