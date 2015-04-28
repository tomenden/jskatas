/**
 * Created by tome on 3/6/2015.
 */
function makeBoard(height,width) {
    var board = [];
    for (i=0; i<height; i+=1) {
        var line = [];
        for (j=0; j<width; j+=1) {
            line.push('');
        }
        board.push(line);
    }
    return board;
}