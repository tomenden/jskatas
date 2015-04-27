/**
 * Created by tome on 1/2/2015.
 */
//http://www.codewars.com/kata/529962509ce9545c76000afa/train/javascript

function connectFour(board) {
    // Your code goes here
    for (i=0; i<board.length; i+=1) {
        for (j=0; j<board[i].length; j+=1) {
            if (
                (
                    board[i][j] === 'R' &&
                    board[i][j+1] === 'R' &&
                    board[i][j+2] === 'R' &&
                    board[i][j+3] === 'R'
                ) ||
                (
                    board[i][j] === 'R' &&
                    board[i+1][j] === 'R' &&
                    board[i+2][j] === 'R' &&
                    board[i+3][j] === 'R'
                ) ||
                (
                    board[i][j] === 'R' &&
                    board[i+1][j+1] === 'R' &&
                    board[i+2][j+2] === 'R' &&
                    board[i+3][j+3] === 'R'
                ) ||
                (
                    board[i][j] === 'R' &&
                    board[i+1][j-1] === 'R' &&
                    board[i+2][j-2] === 'R' &&
                    board[i+3][j-3] === 'R'
                )
            ) {
                    return 'R'
            }
            if (
                (
                board[i][j] === 'Y' &&
                board[i][j+1] === 'Y' &&
                board[i][j+2] === 'Y' &&
                board[i][j+3] === 'Y'
                ) ||
                (
                board[i][j] === 'Y' &&
                board[i+1][j] === 'Y' &&
                board[i+2][j] === 'Y' &&
                board[i+3][j] === 'Y'
                ) ||
                (
                board[i][j] === 'Y' &&
                board[i+1][j+1] === 'Y' &&
                board[i+2][j+2] === 'Y' &&
                board[i+3][j+3] === 'Y'
                ) ||
                (
                board[i][j] === 'Y' &&
                board[i+1][j-1] === 'Y' &&
                board[i+2][j-2] === 'Y' &&
                board[i+3][j-3] === 'Y'
                )
            ) {
                return 'Y'
            }
        }
    }

    if (board[0].indexOf('-') >= 0) {
        return 'in progress';
    }

}

console.log(
    connectFour(
        [
            ['-','-','-','-','-','-','-'],
            ['-','-','-','-','-','-','-'],
            ['-','-','-','R','R','R','R'],
            ['-','-','-','Y','Y','R','Y'],
            ['-','-','-','Y','R','Y','Y'],
            ['-','-','Y','Y','R','R','R']
        ]
    )
);