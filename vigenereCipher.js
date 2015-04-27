/**
 * Created by tome on 1/8/2015.
 */
//http://www.codewars.com/kata/52d1bd3694d26f8d6e0000d3/train/javascript

function VigenèreCipher(key, abc) {
    var newKey = key,
        j = 0;
    for (i=key.length-1; i<abc.length-1; i+=1) {
        newKey += key[j];
        if (j === key.length - 1) {
            j = 0;
        } else {
            j += 1;
        }
    }

    this.encode = function (str) {
        var encoded = '';
        for (m = 0; m< str.length; m+=1) {
            if (abc.indexOf(str[m]) === -1) {
                encoded += str[m];
            } else{
                var ind = abc.indexOf(newKey[m]) + abc.indexOf(str[m]);
                if (ind>abc.length-1) {
                    encoded += abc[ind - abc.length];
                } else {
                    encoded += abc[ind]
                }
            }

        }
        return encoded;
    };

    this.decode = function (str) {
        var decoded = '';
        for (n=0; n<str.length; n+=1) {
            if (abc.indexOf(str[n]) === -1) {
                decoded += str[n];
            } else {
                var ind = abc.indexOf(str[n]) - abc.indexOf(newKey[n]);
                if (ind<0) {
                    decoded += abc[abc.length - Math.abs(ind)];
                } else {
                    decoded += abc[ind];
                }
            }
        }
        return decoded;
    };
}


// testing:
var abc, key;
abc = "abcdefghijklmnopqrstuvwxyz";
key = "password";
c = new VigenèreCipher(key, abc);
// expected: 'rovwsoiv'
console.log(c.encode('codewars'));
console.log(c.decode('laxxhsj'));