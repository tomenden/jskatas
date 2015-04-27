/**
 * Created by tome on 4/18/2015.
 */

function Authors() {
    // word-split helper function
    function wordSplit(source) {
        var text = source.replace(/[\.,?-]/g,'');
        var list = [];
        var place = -1;
        while (place < text.length) {
            var newplace = text.indexOf(' ',place + 1);
            if (newplace < 0) newplace = text.length;
            var word = text.substring(place + 1,newplace);
            list.push(word);
            place = newplace;
        }
        return list;
    }

    /*
    data is an obj of {author_name: "text"}
     */

    this.learn = function (data) {
        var dictionary = {};
        for (var author in data) {
            var text;
            if (data.hasOwnProperty(author)) {
                text = wordSplit(data[author]);
                dictionary[author] = countWords(text);
            }
        }
        return this.dictionary = dictionary;
    };

    function countWords(wordArray) {
        var result = {};
        for (var i=0; i<wordArray.length; i+=1) {
            var word = wordArray[i];
            result.hasOwnProperty(word) ? result[word]++ : result[word] = 1;
        }
        return result;
    }

    this.predict = function (testcase) {
        var score = {'melville': 0, 'shelley': 0, 'twain': 0},
            dictionary = this.dictionary,
            text = wordSplit(testcase),
            wordCount = countWords(text),
            max = -1,
            prediction;
        for (var word in wordCount) {
            if (wordCount.hasOwnProperty(word)) {
                for (var author in dictionary) {
                    if (dictionary.hasOwnProperty(author)) {
                        if (dictionary[author].hasOwnProperty(word)) {
                            score[author] += (dictionary[author][word] / wordCount[word]) * 100;
                        }
                    }
                }
            }
        }

        for (var author in score) {
            if (score[author] > max) {
                max = score[author];
                prediction = author;
            }
        }
        return prediction;
    };
}

var authors = new Authors();
var testLearn = {'melville': 'melville sample here here here', 'shelley': 'shelley sample here', 'twain': 'twain sample here'};
authors.learn(testLearn);
console.log(authors.dictionary);
var testCase1 = "this should be zero";
var prediction = authors.predict(testCase1);
console.log(prediction);