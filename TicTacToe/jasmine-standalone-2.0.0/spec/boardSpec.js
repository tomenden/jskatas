/**
 * Created by tome on 3/6/2015.
 */

describe('Board', function () {

    var board;
    beforeEach(function() {
        board = newGame();
    })

    it('should create a 3x3 standard tic tac toe board', function () {
        expect(board.length).toEqual(3);
        for (i = 0; i < board.length; i += 1) {
            expect(board[i].length).toEqual(3);
        }
    });
});