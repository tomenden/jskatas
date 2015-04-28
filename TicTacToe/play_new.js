
function newGame() {
    var board = [];
    for (var i=0; i<3; i+=1) {
        board[i] = [];
        for (var j=0; j<3; j+=1) {
            board[i][j] = '-';
        }
    }
    return board;
}

function copy_board(board) {
    var new_board = [];
    for (var i=0; i<board.length; i+=1) {
        new_board.push(board[i].slice(0));
    }
    return new_board;
}

function TicTacToe(board, player) {
    this.board = board;
    this.player = player;
    this.opponent = player === 'x' ? 'o' : 'x';
}

TicTacToe.prototype.move = function(player, square) {
    var board = this.board;
    var possibleMoves = this.get_possibleMoves();
    var legal;
    for (var i=0; i<possibleMoves.length; i+=1) {
        if (possibleMoves[i][0] === square[0] && possibleMoves[i][1] === square[1]) {
            board[square[0]][square[1]] = player;
            legal = true;
        }
    }
    if (legal !== true) {
        console.log("This move is not possible. square is already taken or out of bounds");
    }

    this.board = board;
    return this.board;
};

TicTacToe.prototype.get_possibleMoves = function () {
    var board = this.board;
    var possibleMoves = [];
    for (var i = 0; i < 3; i += 1) {
        for (var j = 0; j < 3; j += 1) {
            if (board[i][j] === '-')
                possibleMoves.push([i, j]);
        }
    }
    return possibleMoves;
};

TicTacToe.prototype.calculateScore = function() {
    var board = this.board;
    var lines = [];
    lines.push(board[0]);
    lines.push(board[1]);
    lines.push(board[2]);
    lines.push([board[0][0], board[1][0], board[2][0]]);
    lines.push([board[0][1], board[1][1], board[2][1]]);
    lines.push([board[0][2], board[1][2], board[2][2]]);
    lines.push([board[0][0], board[1][1], board[2][2]]);
    lines.push([board[0][2], board[1][1], board[2][0]]);


    var playerLines = [];
    var opponentLines = [];

    for (var i=0; i<lines.length; i+=1) {
        var playerCount = 0;
        var opponentCount = 0;
        for (var j=0; j<lines[i].length; j+=1) {
            if (lines[i][j] === 'x') {
                playerCount += 1;
            }
            if (lines[i][j] === 'o') {
                opponentCount += 1;
            }
        }
        playerLines.push(playerCount);
        opponentLines.push(opponentCount);
    }

    function logic (count) {
        switch (count) {
            case 1:
                return 1;
            case 2:
                return 10;
            case 3:
                return 1000;
            case 0:
                return 0;
        }
    }

    playerLines = playerLines.map(logic);
    opponentLines = opponentLines.map(logic);

    var playerScore, opponentScore;
    playerScore = playerLines.reduce(function (a, b) {
        return a + b;
    });

    opponentScore = opponentLines.reduce(function (a, b) {
        return a + b
    });


    return playerScore + (opponentScore * -1);
};

TicTacToe.prototype.isGameOver = function() {
    //consider removing var lines from here
    var board = this.board;
    var lines = [];
    lines.push(board[0]);
    lines.push(board[1]);
    lines.push(board[2]);
    lines.push([board[0][0], board[1][0], board[2][0]]);
    lines.push([[board[0][1], board[1][1], board[2][1]]]);
    lines.push([board[0][2], board[1][2], board[2][2]]);
    lines.push([board[0][0], board[1][1], board[2][2]]);
    lines.push([board[0][2], board[1][1], board[2][0]]);
    var winner;
    for (var i=0; i<lines.length; i+=1) {
        if (lines[i][0] !== '-' && lines[i][0] === lines[i][1] && lines[i][1] === lines[i][2]) {
            if (lines[i][0] === 'x') {
                winner = 'x';
                return 1;
            }
            if (lines[i][0] === 'o') {
                winner = 'o';
                return -1;
            }
        }

    }
    return 0;
};

TicTacToe.prototype.get_possibleStates = function(player) {
    var board = this.board;
    var possibleMoves = this.get_possibleMoves(board);
    var possibleStates = [];
    for (var i=0; i<possibleMoves.length; i+=1) {
        var newState = copy_board(board);
        newState[possibleMoves[i][0]][possibleMoves[i][1]] = player;
        possibleStates.push(newState);
    }
    return possibleStates;
};

var minimax = function (level, game) {
    var player = game.player;
    var opponent = game.opponent;
    var possibleStates = game.get_possibleStates(player);
    var score;
    var bestRow = -1;
    var bestCol = -1;
    var bestScore = (game.player === 'x') ? Number.MIN_VALUE : Number.MAX_VALUE;


    if (game.isGameOver() !== 0 || possibleStates.length === 0) {
        bestScore = game.calculateScore();
        return [bestScore, bestRow, bestCol];
    } else {
        for (var i = 0; i < possibleStates.length; i += 1) {
            var newGame = new TicTacToe(possibleStates[i], opponent);
            score = minimax(level - 1, newGame)[0];
            if (player === 'x') {
                if (score > bestScore) {
                    bestScore = score;
                    bestRow = game.get_possibleMoves()[i][0];
                    bestCol = game.get_possibleMoves()[i][1];
                }
            } else {
                if (score < bestScore) {
                    bestScore = score;
                    bestRow = game.get_possibleMoves()[i][0];
                    bestCol = game.get_possibleMoves()[i][1];
                }
            }
        }
    }
    return [bestScore, bestRow, bestCol];

};


TicTacToe.prototype.computerMove = function() {
    var board = this.board;
    this.move(this.player, minimax(9, this).slice(1));
    return this.board;
};

var testBoard = [['x', '-', '-'], ['o', 'x', '-'], ['o', '-', '-']];


var game = new TicTacToe(testBoard, 'x');
console.log(minimax(9,game));



//var newStates = game.get_possibleStates('x');
//var game2 = new TicTacToe(newStates[0], 'o');
//console.log(game2.board);
//console.log(game2.calculateScore());



//TicTacToe.prototype.minimax = function(level, player, state) {
//    var score;
//    var bestRow;
//    var bestColumn;
//    var bestScore;
//    var possibleMoves = this.get_possibleMoves(state);
//    var possibleStates = this.get_possibleStates(player, state);
//    //determine if in terminal node, if so, get score
//    if (this.isGameOver(state) !== 0 || level === 0 || this.get_possibleMoves(state).length === 0) {
//        bestScore = this.calculateScore(state);
//    } else {
//        for (var i = 0; i < possibleStates.length; i += 1) {
//            if (player === 'x') {
//                var opponent = 'o';
//                bestScore = -Infinity;
//                var nextState = new TicTacToe(opponent);
//                nextState.board = possibleStates[i][0];
//                score = nextState.minimax(level - 1, opponent, nextState.board)[0];
//                if (score > bestScore) {
//                    bestScore = score;
//                    bestRow = possibleMoves[i][0];
//                    bestColumn = possibleMoves[i][1];
//                }
//
//            } else {
//                var opponent = 'x';
//                bestScore = Infinity;
//                var nextState = new TicTacToe(opponent);
//                score = nextState.minimax(level - 1, opponent, nextState.board)[0];
//                if (score < bestScore) {
//                    bestScore = score;
//                    bestRow = possibleMoves[i][0];
//                    bestColumn = possibleMoves[i][1];
//                }
//            }
//        }
//    }
//    return [bestScore, bestRow, bestColumn];
//};




//TicTacToe.prototype.get_bestMove = function(player, board) {
//    var possibleMoves = this.get_possibleMoves(board);
//    var possibleStates = this.get_possibleStates(player, board);
//    var scores = [];
//    var move;
//
//    if (this.isGameOver(board) !== 0) {
//        return this.calculateScore(board);
//
//    }
//
//    for (var j=0; j<possibleStates.length; j+=1) {
//        scores.push(this.calculateScore(possibleStates[j]));
//    }
//
//    if (player === 'x') {
//        var maxIndex = scores.indexOf(Math.max.apply(Math, scores));
//        move = possibleMoves[maxIndex];
//        return scores[maxIndex];
//    }
//
//    if (player === 'o') {
//        var minIndex = scores.indexOf(Math.min.apply(Math, scores));
//        move = possibleMoves[minIndex];
//        return scores[minIndex];
//    }
//
//
//};


//var game = new TicTacToe('x');
//game.board = [['-', 'x', '-'], ['-', '-', 'x'], ['o', 'o', 'x']];
//console.log(game.minimax(4,'x',game.board));
//console.log(game.get_possibleMoves(game.board));
//console.log(game.get_possibleStates('x', game.board));
//console.log(game.board);
//console.log(game.get_possibleMoves(game.board));
//console.log(game.board);
//console.log(game.get_possibleStates('x', game.board));
//console.log(game.calculateScore(game.get_possibleStates('x', game.board)[1]));
//console.log(game.minimax(4, 'x', game.board));
//console.log(game.isGameOver(game.get_possibleStates('x', game.board)[1]));

/**
 *
 * @param player
 * @returns {*}
 */
//TicTacToe.prototype.playRandomMove = function(player) {
//    var possibleMoves = this.get_possibleMoves();
//    var randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
//    var row = randomMove[0];
//    var column = randomMove[1];
//    this.board[row][column] = player;
//    return this.board;
//};