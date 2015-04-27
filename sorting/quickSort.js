/**
 * Created by tome on 4/18/2015.
 */
var a = [34, 203, 3, 746, 200, 984, 198, 9, 764];

function quickSort(a)
{
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}

quickSort(a);
console.log(a);