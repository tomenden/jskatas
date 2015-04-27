/**
 * Created by tome on 3/1/2015.
 */
//http://www.codewars.com/kata/525ca723b6aecee8c900033c/train/javascript

/**
 * CSV Parser.  Takes a string as input and returns
 * an array of arrays (for each row).
 *
 * @param input String, CSV input
 * @param separator String, single character used to separate fields.
 *        Defaults to ","
 * @param quote String, single character used to quote non-simple fields.
 *        Defaults to "\"".
 */
//function parseCSV(input, separator, quote) {
//    separator = separator || ',';
//    quote = quote || '"';
//
//    var result = [];
//    var lines = input.split('\n');
//    for (i=0; i<lines.length; i+=1) {
//        result.push(lines[i].split(separator));
//    }
//    //var items = input.split(separator);
//    //for (m=0; m<items.length; m+=1) {
//    //    if (items[m].indexOf(quote)) {
//    //    }
//    //}
//    var startQuote,
//        endQuote;
//    for (n=0; n<result.length; n+=1) {
//        for (k = 0; k<result[n].length; k+=1) {
//            if (result[n][k].indexOf(quote) === 0) {
//                startQuote = [n, k];
//            }
//            if (result[n][k].indexOf(quote) == result[n][k].length - 1) {
//                endQuote = [n, k];
//            }
//        }
//    }
//    //result[startQuote[0]][startQuote[1]] = result[startQuote[0]][startQuote[1]].substring(1,)
//    //result[endQuote[0]][endQuote[1]].shift();
//    //result[startQuote[0]][startQuote[1]] = result[startQuote[0]][startQuote[1]] + result[endQuote[0]][endQuote[1]];
//    //result[endQuote[0]].splice(endQuote[1], 1);
//
//    return result;
//
//}

/**
 *
 * @param input
 * @param separator
 * @param quote
 * @returns {Array}
 */
function parseCSV(input, separator, quote) {
    separator = separator || ',';
    quote = quote || '"';
    var arr = input.split(separator);
    var regexNew = new RegExp('^(?:' + quote + ')((.|\n)*)(?:' + quote + ')$', 'gm');
    var result = [];
    var line = [];

    for (i=0; i<arr.length; i+=1) {
        var quoted = regexNew.exec(arr[i]);
        if (quoted) {
            var quotedItem = quoted[1];
            if (quotedItem.indexOf(quote + quote) > -1) {
                var doubleQuote = new RegExp(quote + quote, 'g');
                quotedItem = quotedItem.replace(doubleQuote, quote);
            }
            line.push(quotedItem);
            if (i === arr.length-1) {
                result.push(line);
            }
        }

        if(!quoted) {
            var newLineIndex = arr[i].indexOf('\n');

            if (newLineIndex > -1) {
                    arr.splice(i + 1, 0, arr[i].substring(newLineIndex + 1));
                    line.push(arr[i].substring(0, newLineIndex));
                    result.push(line);
                    line = [];
                    continue;
            }
            if (i===arr.length-1) {
                line.push(arr[i]);
                result.push(line);
            }
            else {
                line.push(arr[i]);
            }
        }
    }

    return result;
}


var test = '1,,3\n4,5,\n,7,"gsdij ""dsij"",,,sdg,dgs,,, ",8';
//console.log(parseCSV('1,2,3,4,5,6\n7,8\n,11,9,,10,11,12'));
console.log(parseCSV(test));