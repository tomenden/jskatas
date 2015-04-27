//http://www.codewars.com/kata/5326ef17b7320ee2e00001df/train

function solve(map, miner, exit) {
    var position = miner,
        X = position.x,
        Y = position.y,
        result = [],
        currentMap=map,
        length = map.length,
        dontGo = '';

    function nextMove(current) {
        var options = {
            right: {x: current.x + 1, y: current.y, dontGo: 'left'},
            left: {x: current.x - 1, y: current.y, dontGo: 'right'},
            down: {x: current.x, y: current.y + 1, dontGo: 'up'},
            up: {x: current.x, y: current.y - 1, dontGo: 'down'}

        };
        for (var option in options) {
            if (option.toString() == dontGo) {
                continue;
            }
            if (! (map[options[option].x]) || !(map[options[option].x][options[option].y])) {
                continue;
            }

            if (options[option].x < 0 || options[option].y < 0) {
                continue;
            }
            if (map[options[option].x][options[option].y]) {
                result.push(option);
                position.x = options[option].x;
                position.y = options[option].y;
                dontGo = options[option].dontGo
                return position;
            }
        }
    }

    while (position.x != exit.x || position.y != exit.y) {
        nextMove(position)
    }
    return result;
}

var map = [[true, true, false, false, false],
    [false, true, true, false, false],
    [false, false, true, true, false],
    [false, false, false, true, true],
    [false, false, false, false, true]];

console.log(solve(map, {x:0,y:0}, {x:4,y:4}));


//describe('A trivial map (1x1)', function() {
//    var map = [[true]];
//
//    it('Should return an empty array, since we\'re already at the goal', function() {
//        Test.assertSimilar(solve(map, {x:0,y:0}, {x:0,y:0}), []);
//    });
//});
//
//describe('A pretty simple map (2x2)', function() {
//    var map = [[true, false],
//        [true, true]];
//
//    it('Should return the only correct move', function() {
//        Test.assertSimilar(solve(map, {x:0,y:0}, {x:1,y:0}), ['right']);
//    });
//
//    it('Should return the only moves necessary', function() {
//        Test.assertSimilar(solve(map, {x:0,y:0}, {x:1,y:1}), ['right', 'down']);
//    });
//});
//
//describe('A linear map(1x4)', function() {
//    var map = [[true], [true], [true], [true]];
//
//    it('Should return a chain of moves to the right', function() {
//        Test.assertSimilar(solve(map, {x:0,y:0}, {x:3,y:0}), ['right', 'right', 'right']);
//    });
//
//    it('Should return a chain of moves to the left', function() {
//        Test.assertSimilar(solve(map, {x:3,y:0}, {x:0,y:0}), ['left', 'left', 'left']);
//    });
//});
//
//describe('Should walk around an obstacle (3x3 map)', function() {
//    var map = [[true, true, true],
//        [false, false, true],
//        [true, true, true]];
//
//    it('Should return the right sequence of moves', function() {
//        Test.assertSimilar(solve(map, {x:0,y:0}, {x:2,y:0}), ['down', 'down', 'right', 'right', 'up', 'up']);
//    });
//});
//
//describe('Should be able to change directions multiple times (5x5 map)', function() {
//    var map = [[true, true, false, false, false],
//        [false, true, true, false, false],
//        [false, false, true, true, false],
//        [false, false, false, true, true],
//        [false, false, false, false, true]];
//
//    it('Should return a step sequence of moves', function() {
//        Test.assertSimilar(solve(map, {x:0,y:0}, {x:4,y:4}),
//            ['down', 'right', 'down', 'right', 'down', 'right', 'down', 'right']);
//    });
//});
//
//describe('Should avoid dead-ends (5x5 map)', function() {
//    var map = [[true, true, true, false, true],
//        [false, false, true, false, true],
//        [true, true, true, true, true],
//        [true, false, true, false, false],
//        [false, true, true, true, true]];
//
//    it('Should return the right moves', function() {
//        Test.assertSimilar(solve(map, {x:0,y:0}, {x:4,y:4}), ['down', 'down', 'right', 'right', 'right', 'right', 'down', 'down'])
//    });
//});