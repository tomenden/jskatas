/**
 * Created by tome on 1/30/2015.
 */
//http://www.codewars.com/kata/514b6c44a337752e67000077/train/javascript

function namespace(root, path, value){
    var parts = path.split('.'),
        lastPart = parts.length-1,
        obj = root;
    for (i=0; i<lastPart; i+=1) {
        var part = parts[i];
        if (obj[part] === undefined) {
            obj[part] = {};
        }
        obj = obj[part];
    }
    if (value) {
        obj[parts[lastPart]] = value;
    }
    return obj[parts[lastPart]];
}

stuff = {};
namespace(stuff, 'moreStuff.name', 'the stuff');
console.log(stuff);
console.log(namespace(stuff, 'moreStuff.name')); //returns 'the stuff'
console.log(namespace(stuff, 'otherStuff.id')); // returns undefined