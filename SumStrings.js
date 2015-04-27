//http://www.codewars.com/kata/5324945e2ece5e1f32000370/train/javascript

function sumStrings(a,b) {
    var lenA = a.length,
        lenB = b.length,
        result = '',
        remainder = 0;
    switch (Math.max(lenA, lenB)) {
        case lenA:
            longer = a;
            shorter = b;
            break;
        case lenB:
            longer = b;
            shorter = a;
            break;
    }
    for (i=0; i<Math.abs(lenA-lenB); i+=1) {
        shorter = '0' + shorter;
    }

    for (i=longer.length-1; i>=1; i-=1) {
        var sum = remainder + Number(longer[i]) + Number(shorter[i]);
        if (sum < 10){
            result = sum.toString() + result;
            remainder = 0;
        }
        if (sum === 10) {
            result = '0' + result;
            remainder = 1;
        }
        if (sum >10) {
            result = (sum % 10).toString() + result;
            remainder = 1
        }
    }
    //result = remainder + Number(longer[0]) + Number(shorter[0]) + result;
    remainder + Number(longer[0]) + Number(shorter[0]) === 0
        ? result = result
        : result = remainder + Number(longer[0]) + Number(shorter[0]) + result;

    return result;
}

console.log(sumStrings('00103', '08567'));
//console.log(sumStrings('800', '9567'));
//console.log(sumStrings('7', '20'));