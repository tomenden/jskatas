var decompose = function (source) {
    var text = source.toLowerCase().replace(/[\.,?-]/g, ' ');
    var list = [];
    var place = -1;
    while (place < text.length) {
        var newplace = text.indexOf(' ', place + 1);
        if (newplace < 0) newplace = text.length;
        var word = text.substring(place + 1, newplace);
        list.push(word);
        place = newplace;
    }
    return list;
};
var findWinnerInObject = function (obj) {
    var max = -Infinity;
    var winner;
    for (var label in obj) {
        var value = obj[label];
        if (value > max) {
            max = value;
            winner = label;
        }
    }
    return winner;
};

var Bayes = function () {
    this.labels = [];
    this.dictionary = {};
    this.docCount = {};
    this.totalDocCount = 0;
};

Bayes.prototype.registerLabel = function (label) {
    if (this.labels.indexOf(label) < 0) {
        this.labels.push(label);
    }
};
Bayes.prototype.incrementStem = function (word, label) {
    var dictionary = this.dictionary;
    if (dictionary.hasOwnProperty(label)) {
        if (dictionary[label].hasOwnProperty(word)) {
            dictionary[label][word]++;
        } else {
            dictionary[label][word] = 1;
        }
    } else {
        dictionary[label] = {};
        dictionary[label][word] = 1;
    }

};
Bayes.prototype.incrementDocCount = function (label) {
    if (this.docCount.hasOwnProperty(label)) {
        this.docCount[label]++;
    } else {
        this.docCount[label] = 1;
    }
    this.totalDocCount++;
};
Bayes.prototype.train = function (label, text) {
    this.registerLabel(label);
    var words = decompose(text);
    var length = words.length;
    for (var i = 0; i < length; i += 1) {
        this.incrementStem(words[i], label);
    }
    this.incrementDocCount(label);
};
Bayes.prototype.stemTotalCount = function (word) {
    var count = 0;
    for (var label in this.dictionary) {
        if (this.dictionary[label].hasOwnProperty(word)) {
            count += this.dictionary[label][word];
        }
    }
    return count;
};
Bayes.prototype.stemLabelCount = function (word, label) {
    if (this.dictionary[label].hasOwnProperty(word)) {
        return this.dictionary[label][word];
    } else {
        return 0;
    }
};
Bayes.prototype.stemInverseLabelCount = function (word, label) {
    return this.stemTotalCount(word) - this.stemLabelCount(word, label);
};
Bayes.prototype.docInverseCount = function (label) {
    return this.totalDocCount - this.docCount[label];
};

Bayes.prototype.guess = function (words)  { // words is an array
    var scores = {};
    for (var i = 0; i < this.labels.length; i++) {
        var label = this.labels[i];
        var logSum = 0;
        var length = words.length;
        for (var j = 0; j < length; j++) {
            var word = words[j];
            var _stemTotalCount = this.stemTotalCount(word);
            if (_stemTotalCount === 0) { // ignore words that are not in dictionary
                continue;
            } else {
                var wordProbability = this.stemLabelCount(word, label) / this.docCount[label];
                var wordInverseProbability = this.stemInverseLabelCount(word, label) / this.docInverseCount(label);
                var wordicity = wordProbability / (wordProbability + wordInverseProbability);
                // optional line with weight adjustments: wordicity = ( (1 * 0.5) + (_stemTotalCount * wordicity) ) / ( 1 + _stemTotalCount );
                if (wordicity === 0) {
                    wordicity = 0.01;
                }
                if (wordicity === 1) {
                    wordicity = 0.99;
                }
            }
            logSum += (Math.log(1 - wordicity) - Math.log(wordicity));
        }
        scores[label] = 1 / (1 + Math.exp(logSum));
    }
    return findWinnerInObject(scores);
};

function Authors() {
    var bayes = new Bayes();
    this.learn = function (data) {
        bayes.train('melville', data.melville);
        bayes.train('shelley', data.shelley);
        bayes.train('twain', data.twain);
        return bayes;
    };

    this.predict = function (testcase) {
        var words = decompose(testcase);
        return bayes.guess(words);
    };
}

var sample = {'melville': 'melville sample here here here', 'shelley': 'shelley sample here', 'twain': 'twain sample here'};
var test = new Authors();
var learn = test.learn(sample);
console.log(JSON.stringify(learn));


/*
Code Submitted to aichallenges - > 70% success!
 var decompose = function (source) {
 var text = source.toLowerCase().replace(/[\.,?-]/g, ' ');
 var list = [];
 var place = -1;
 while (place < text.length) {
 var newplace = text.indexOf(' ', place + 1);
 if (newplace < 0) newplace = text.length;
 var word = text.substring(place + 1, newplace);
 list.push(word);
 place = newplace;
 }
 return list;
 };
 var findWinnerInObject = function (obj) {
 var max = -Infinity;
 var winner;
 for (var label in obj) {
 var value = obj[label];
 if (value > max) {
 max = value;
 winner = label;
 }
 }
 return winner;
 };

 var Bayes = function () {
 this.labels = [];
 this.dictionary = {};
 this.docCount = {};
 this.totalDocCount = 0;
 };

 Bayes.prototype.registerLabel = function (label) {
 if (this.labels.indexOf(label) < 0) {
 this.labels.push(label);
 }
 };
 Bayes.prototype.incrementStem = function (word, label) {
 var dictionary = this.dictionary;
 if (dictionary.hasOwnProperty(label)) {
 if (dictionary[label].hasOwnProperty(word)) {
 dictionary[label][word]++;
 } else {
 dictionary[label][word] = 1;
 }
 } else {
 dictionary[label] = {};
 dictionary[label][word] = 1;
 }

 };
 Bayes.prototype.incrementDocCount = function (label) {
 if (this.docCount.hasOwnProperty(label)) {
 this.docCount[label]++;
 } else {
 this.docCount[label] = 1;
 }
 this.totalDocCount++;
 };
 Bayes.prototype.train = function (label, text) {
 this.registerLabel(label);
 var words = decompose(text);
 var length = words.length;
 for (var i = 0; i < length; i += 1) {
 this.incrementStem(words[i], label);
 }
 this.incrementDocCount(label);
 };
 Bayes.prototype.stemTotalCount = function (word) {
 var count = 0;
 for (var label in this.dictionary) {
 if (this.dictionary[label].hasOwnProperty(word)) {
 count += this.dictionary[label][word];
 }
 }
 return count;
 };
 Bayes.prototype.stemLabelCount = function (word, label) {
 if (this.dictionary[label].hasOwnProperty(word)) {
 return this.dictionary[label][word];
 } else {
 return 0;
 }
 };
 Bayes.prototype.stemInverseLabelCount = function (word, label) {
 return this.stemTotalCount(word) - this.stemLabelCount(word, label);
 };
 Bayes.prototype.docInverseCount = function (label) {
 return this.totalDocCount - this.docCount[label];
 };

 Bayes.prototype.guess = function (words)  { // words is an array
 var scores = {};
 for (var i = 0; i < this.labels.length; i++) {
 var label = this.labels[i];
 var logSum = 0;
 var length = words.length;
 for (var j = 0; j < length; j++) {
 var word = words[j];
 var _stemTotalCount = this.stemTotalCount(word);
 if (_stemTotalCount === 0) { // ignore words that are not in dictionary
 continue;
 } else {
 var wordProbability = this.stemLabelCount(word, label) / this.docCount[label];
 var wordInverseProbability = this.stemInverseLabelCount(word, label) / this.docInverseCount(label);
 var wordicity = wordProbability / (wordProbability + wordInverseProbability);
 // optional line with weight adjustments: wordicity = ( (1 * 0.5) + (_stemTotalCount * wordicity) ) / ( 1 + _stemTotalCount );
 if (wordicity === 0) {
 wordicity = 0.01;
 }
 if (wordicity === 1) {
 wordicity = 0.99;
 }
 }
 logSum += (Math.log(1 - wordicity) - Math.log(wordicity));
 }
 scores[label] = 1 / (1 + Math.exp(logSum));
 }
 return findWinnerInObject(scores);
 };

 var bayes = new Bayes();
 this.learn = function (data) {
 bayes.train('melville', data.melville);
 bayes.train('shelley', data.shelley);
 bayes.train('twain', data.twain);
 return bayes;
 };

 this.predict = function (testcase) {
 var words = decompose(testcase);
 return bayes.guess(words);
 };
 */