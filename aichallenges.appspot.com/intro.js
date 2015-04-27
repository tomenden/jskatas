/**
 * Created by tome on 4/18/2015.
 */
// Two-dimensional map rotated 180 degrees
//[[2  3  5  ],
//    [4  9  25 ],
//    [8  27 125]]
//Becomes:
//    [[125 27 8],
//        [25  9  4],
//        [5   3  2]]

function Game() {
    this.map = [[2, 3, 5],
        [4, 9, 25],
        [8, 27, 125]];

    this.run = function(map) {
        var newmap = [];
        for (var i = map.length - 1; i >= 0; i--) {
            newmap.push(map[i].reverse());
        }
        return newmap;
    }
}

var game = new Game();
var map = game.map;
var newMap = game.run(map);
console.log(newMap);