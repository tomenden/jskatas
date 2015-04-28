/**
 *
 * @param sign {String}
 * @constructor
 */
function Player (sign) {
    this.sign = sign.toUpperCase();
    this.opponent = this.sign === 'X' ? 'O' : 'X';
}

/**
 *
 * @param board
 * @param player
 * @param index
 * @returns {*}
 */
function play(board, player, index) {
    board[index[0]][index[1]] = player.sign;
    return board;
}

/**
 *
 * @param board
 * @param player
 * @returns {Array}
 */
function bestMove(board, player) {
    var index = [];
    //find if a block is needed
    var last = (board[0].length - 1);
    var corners = [[0, 0], [0, last], [last, 0], [last, last]];

    for(c=0; c<4; c+=1) {

    }

    for (i=0; i<board.length; i+=1) {
        var count = 0;
        for (j=0; j<board[i].length; j+=1) {
            if (board[i][j] === player.opponent) {
                playerCount += 1;
            }
        }
        if(playerCount === 2) {
            index[0] = i;
            index[1] = board[i].indexOf('');
        }
    }
    return index;
}