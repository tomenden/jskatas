/**
 * Created by tome on 4/15/2015.
 */

function sumIntervals(intervals){
    var units = [];
    for (var i=0; i<intervals.length; i+=1) {
        for (var j=intervals[i][0]+1; j<=intervals[i][1]; j+=1) {
            if (units.indexOf(j) === -1) {
                units.push(j);
            }
        }
    }
    return units.length;
}

var test1 = [[1,5],[1,5]];
var test2 = [[1,4],[7, 10],[3, 5]];

console.log(sumIntervals(test1));
console.log(sumIntervals(test2));

//describe('sumIntervals', function(){
//    it('should return the correct sum for non overlapping intervals', function(){
//        var test1 = [[1,5]];
//        var test2 = [[1,5],[6,10]];
//        Test.assertEquals(sumIntervals(test1), 4);
//        Test.assertEquals(sumIntervals(test2), 8);
//    });
//
//    it('should return the correct sum for overlapping intervals', function(){
//        var test1 = [[1,5],[1,5]];
//        var test2 = [[1,4],[7, 10],[3, 5]];
//        Test.assertEquals(sumIntervals(test1), 4);
//        Test.assertEquals(sumIntervals(test2), 7);
//    });
//});