/**
 * Created by tome on 5/20/2015.
 *
 * http://www.codewars.com/kata/52d2e2be94d26fc622000735/train/javascript
 */

function VigenèreAutokeyCipher(key, abc) {
    var getKeyForString = function (str, key) {
        //generate new key, according to input length
        var i,
            temp = key.slice();
        key = '';
        for (i = 0; i < str.length; i += 1) {
            if (i < temp.length) {
                key += temp.charAt(i);
            } else {
                key += str.charAt(i - temp.length);
            }
        }
        return key;
    };
    this.encode = function (str) {
        var encoded = '', i, j, encodedChar, char, charIndex, keyCharIndex, keyChar;
        key = getKeyForString(str, key);
        for (i = 0; i < str.length; i += 1) {
            char = str.charAt(i);
            charIndex = abc.indexOf(char);
            keyChar = key.charAt(i);
            keyCharIndex = abc.indexOf(keyChar);
            if (charIndex === -1 || charIndex + keyCharIndex >= abc.length) {
                encodedChar = char;
            }  else {
                encodedChar = abc.charAt(charIndex + keyCharIndex);
            }
            encoded += encodedChar;
        }
        return encoded;
    };
    this.decode = function (str) {
        var i, decoded = '', decodedChar, encodedChar, encodedCharIndex, keyChar, keyCharIndex, charIndex;
        key = getKeyForString(str, key);
        for (i = 0; i < str.length; i += 1) {
            encodedChar = str.charAt(i);
            encodedCharIndex = abc.indexOf(encodedChar);
            keyChar = key.charAt(i);
            keyCharIndex = abc.indexOf(keyChar);
            //console.log('encoded char: ' + encodedChar + '\n' + 'encodedCharIndex: ' + encodedCharIndex + '\n' + 'keyCharIndex: ' + keyCharIndex);
            if (encodedCharIndex === -1 || encodedCharIndex - keyCharIndex < 0) {
                decodedChar = encodedChar;
            } else {
                charIndex = encodedCharIndex - keyCharIndex;
                decodedChar = abc.charAt(charIndex);
            }
            decoded += decodedChar;
        }
        return decoded;
    };
}

var key = 'password';
var abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


var c = new VigenèreAutokeyCipher(key, abc);