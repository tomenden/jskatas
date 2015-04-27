/**
 * Created by tome on 1/8/2015.
 */
//http://www.codewars.com/kata/51b62bf6a9c58071c600001b/train/javascript

function solution(number){
    var str = number.toString(),
        result = '';
    for (i=0; i<str.length; i+=1) {
        var toConvert = str[i];
        for (j=0; j<str.length-1-i; j+=1) {
            toConvert += '0';
        }
        var toConvertNum = Number(toConvert);
        if (toConvertNum>=1000 && toConvertNum<=4000) {
            for (m=1; m<=toConvert[0]; m+=1) {
                result += 'M';
            }
        }
        if (toConvertNum >= 100 && toConvertNum < 400) {
            for (f=1; f<=toConvert[0]; f+=1) {
                result += 'C';
            }
        }
        if (toConvertNum === 400) {
            result += 'CD';
        }
        if (toConvertNum === 500) {
            result += 'D';
        }
        if (toConvertNum >= 600 && toConvertNum< 900) {
            result += 'D';
            for (l=1; l<=Number(toConvert[0]) - 5; l+=1) {
                result += 'C';
            }
        }
        if (toConvert === '900') {
            result += 'CM';
        }
        if (toConvertNum >= 10 && toConvertNum < 40) {
            for (k=1; k<=Number(toConvert[0]); k+=1) {
                result += 'X';
            }
        }
        if (toConvertNum === 40) {
            result += 'XL';
        }
        if (toConvertNum >=50 && toConvertNum<90) {
            result += 'L';
            for (w=1; w<=Number(toConvert[0]) - 5; w+=1) {
                result += 'X';
            }
        }
        if (toConvertNum === 90) {
            result += 'XC';
        }
        if (toConvertNum >=1 && toConvertNum <4) {
            for (q=1; q<=Number(toConvert[0]); q+=1) {
                result += 'I';
            }
        }
        if (toConvertNum === 4) {
            result += 'IV';
        }
        if (toConvertNum >= 5 && toConvertNum < 9) {
            result += 'V';
            for (b=1; b<=toConvert[0]-5; b+=1) {
                result += 'I';
            }
        }
        if (toConvertNum === 9) {
            result += 'IX';
        }
    }
    return result;
}

console.log(solution(2008));