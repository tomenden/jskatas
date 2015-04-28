/**
 * Created by tome on 3/6/2015.
 */
function makeBoard() {
    var board = [];
    for (var i=0; i<3; i+=1) {
        board[i] = [];
        for (var j=0; j<3; j+=1) {
            board[i][j] = '-';
        }
    }
    return board;
}
console.log(makeBoard());
