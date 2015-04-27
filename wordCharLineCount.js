/**
 * Created by tome on 12/22/2014.
 */
//http://www.codewars.com/kata/5286a298f8fc1b7667000c1c/train/javascript

// OLD
// function DocumentParser(reader)
//{
//    this.reader = reader;
//    this.reset();
//}
//
//DocumentParser.prototype.reset = function()
//{
//    this.wordCount = 0;
//    this.charCount = 0;
//    this.lineCount = 0;
//};
//
//DocumentParser.prototype.parse = function()
//{
//    this.getChars = function () {
//                                    var chars = [];
//                                    var work = true;
//                                    while (work) {
//                                        var buffer = this.reader.getChunk();
//                                        if (buffer.length > 1) {
//                                            var bufferArr = buffer.split('');
//                                            for (i=0; i<bufferArr.length; i+=1) {
//                                                chars.push(bufferArr[i]);
//                                            }
//                                        }
//                                        if (buffer.length === 1){
//                                            chars.push(buffer);
//                                        }
//                                        if (buffer.length === 0) {
//                                            work = false;
//                                        }
//                                    }
//                                    buffer = "";
//                                    return chars;
//                                };
//    this.charArr = this.getChars();
//    this.getCharCount = function() {
//                                    var count = 0;
//                                    for (i=0; i<this.charArr.length; i+=1){
//                                        if (this.charArr[i] !== "\n") {
//                                            count +=1;
//                                        }
//                                    }
//                                    return count;
//                                    };
//    this.charCount = this.getCharCount();
//    this.str = this.charArr.join('');
//    this.wordArr = this.str.split('\n').join(' ').split(' ').filter(function(element) { return element !== ''});
//    this.getWordsLength = function() {
//                                    if (!this.wordArr.length) {
//                                        return 0;
//                                    } else {
//                                        for (i = 0; i < this.wordArr.length; i += 1) {
//                                            if (this.wordArr[i] === ' ' || this.wordArr[i] === '') {
//                                                this.wordArr.splice(i, 1);
//                                            }
//                                        }
//                                        return this.wordArr.length;
//                                    }
//                                };
//    this.wordCount = this.getWordsLength();
//    this.getLineCount = function() {
//                                    if (this.str.length) {
//                                        var counter = 1,
//                                            start = 0,
//                                            index = this.str.indexOf('\n', start);
//                                        for (i=index; i<this.str.length; i += 1) {
//                                            if (start >=0 && this.str.indexOf('\n', start) >= 0) {
//                                                counter +=1;
//                                                start = this.str.indexOf('\n', start) +1;
//                                            }
//                                        }
//
//                                        return counter;
//                                    } else {
//                                        return 0;
//                                    }
//                                };
//    this.lineCount = this.getLineCount();
//};

// Filter Extracted Solution
// function DocumentParser(reader)
//{
//    this.reader = reader;
//    this.reset();
//}
//
//DocumentParser.prototype.reset = function()
//{
//    this.wordCount = 0;
//    this.charCount = 0;
//    this.lineCount = 0;
//};
//
//
//
//DocumentParser.prototype.parse = function()
//{
//    var chunk = this.reader.getChunk(),
//        isLastCharSpace = false;
//    if (chunk !== "") {
//        this.lineCount += 1;
//        if (chunk !== " " && chunk !== "\n") {
//            this.wordCount += 1;
//        }
//    }
//
//    function filterChar (char) {
//        return char !== "\n";
//    }
//    function filterLine (char) {
//        return char === "\n";
//    }
//    function filterWord (char, index, arr) {
//        if (index === 0) {
//            return char !== " " && char !== "\n" && isLastCharSpace;
//        }
//        return char !== " " && char !== "\n" && (arr[index -1] === " " || arr[index -1] === "\n")
//    }
//
//
//    function getChunkCharCount() {
//        var chars = chunk.split("").filter(filterChar);
//        return chars.length;
//    }
//
//    function getChunkWordCount() {
//        var words = chunk.split("").filter(filterWord);
//        return words.length;
//    }
//
//    function getChunkLineCount() {
//        var lines = chunk.split("").filter(filterLine);
//        return lines.length;
//    }
//
//    while (chunk !== "") {
//        this.charCount += getChunkCharCount();
//        this.wordCount += getChunkWordCount();
//        this.lineCount += getChunkLineCount();
//        isLastCharSpace = (chunk[chunk.length - 1] === " " || chunk[chunk.length - 1] === "\n");
//        chunk = this.reader.getChunk();
//    }
//
//};


function DocumentParser(reader)
{
    this.reader = reader;
    this.reset();
}

DocumentParser.prototype.reset = function()
{
    this.wordCount = 0;
    this.charCount = 0;
    this.lineCount = 0;
};

DocumentParser.prototype.parse = function()
{
    var chunk = this.reader.getChunk(),
        isLastCharSpace = false;
    if (chunk !== "") {
        this.lineCount += 1;
        if (chunk !== " " && chunk !== "\n") {
            this.wordCount += 1;
        }
    }


    function getChunkCharAndLineCount() {
        var charCount = 0,
            lineCount = 0;
        for(var i = 0; i < chunk.length; i+=1) {
            if (chunk[i] !== "\n") {
                charCount++;
            }
        }
        lineCount = chunk.length - charCount;
        return [charCount, lineCount];
    }

    function getChunkWordCount() {
        var count = 0;
        var firstChar = chunk[0];
        if (firstChar !== " " && firstChar !== "\n" && isLastCharSpace) {
            count++;
        }
        for(var i = 1; i < chunk.length; ++i) {
            var char = chunk[i];
            if (char !== " " && char !== "\n" && (chunk[i -1] === " " || chunk[i -1] === "\n")) {
                count++;
            }
        }
        return count;
    }

    while (chunk !== "") {
        this.charCount += getChunkCharAndLineCount()[0];
        this.lineCount += getChunkCharAndLineCount()[1];
        this.wordCount += getChunkWordCount();
        var lastChar = chunk[chunk.length - 1];
        isLastCharSpace = (lastChar === " " || lastChar === "\n");
        chunk = this.reader.getChunk();
    }

};

function FileReaderSimulator(text)
{
    var index = -1;
    this.getChunk = function()
    {
        index++;
        return index == text.length ? "" : text.charAt(index);
    };
}

var fileContent = " Hello \n   World ",
    reader = new FileReaderSimulator(fileContent),
    parser = new DocumentParser(reader);

parser.parse();

console.log(parser.charCount); // 16
console.log(parser.wordCount);// 4
console.log(parser.lineCount);// 1