/**
 * Created by tome on 3/6/2015.
 */
describe('Play', function () {
    var board;
    var x;
    var o;

    beforeEach(function () {
        x = new Player('x');
        board = newGame();
        o = new Player('o');
    });

    it('should have a player X', function () {
        expect(x.sign).toBe('X');
        expect(x.opponent).toBe('O');
    });

    it('should have a player O', function () {
        expect(o.sign).toBe('O');
        expect(o.opponent).toBe('X');
    });

    it('should draw an x in the middle of the board', function () {
        play(board, x, [1, 1]);
        expect(board[1][1]).toBe('X');
        expect(board).toEqual([['', '', ''], ['', 'X', ''], ['', '', '']]);
    })

    it('should draw an o in the upper right corner', function () {
        play(board, o, [0, 2]);
        expect(board[0][2]).toBe('O');
    });

    it('should block O with an X, horizontally', function () {
        board = [
            ['O', 'O', ''],
            ['', '', 'X'],
            ['X', '', '']
        ];
        var index = bestMove(board, x);
        play(board, x, index);
        expect(board[0][2]).toBe('X');
    });


    //it('should block O with an X, diagonally', function () {
    //    board = [
    //        ['O', '', ''],
    //        ['', 'O', 'X'],
    //        ['X', '', '']
    //    ];
    //    var index = bestMove(board, x);
    //    play(board, x, index);
    //    expect(board[2][2]).toBe('X');
    //});

});


