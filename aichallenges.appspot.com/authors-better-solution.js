/**
 * Created by tome on 4/18/2015.
 */

// source: https://github.com/kcy1019/aichallenges.appspot.com/blob/master/authors.js
var decompose = function(source) {
    var text = source.toLowerCase().replace(/[\.,?\-]/g,' ');
    var list = [];
    var place = -1;
    while (place < text.length) {
        var newplace = text.indexOf(' ',place + 1);
        if (newplace < 0) { newplace = text.length; }
        var word = text.substring(place + 1,newplace);
        list.push(word);
        place = newplace;
    }
    return list;
};

/* Naive Bayesian Classifier Trained with Maximum Likelihood. */
var total_words = new Set();

function Author(name, data)
{
    this.pchain = {};
    this.pwords = {};
    this.name = name;
    this.prob = 1.0 / 3;
    this.words = new Set();
    this.doc = decompose(data);
    for (var i = 0; i < this.doc.length; i++) {
        this.words.add(this.doc[i]);
        total_words.add(this.doc[i]);
        if (!this.pwords[this.doc[i]]) this.pwords[this.doc[i]] = 0;
        this.pwords[this.doc[i]] = 1 + this.pwords[this.doc[i]];
    }
}

Author.prototype.calcProbability = function() {
    console.log(this.pwords);
    console.log(this.words.size);
    this.total_chains = 0;
    for (var i = 0; i < this.doc.length; i++) {
        this.pwords[this.doc[i]] = this.pwords[this.doc[i]] * 1.0 / (this.words.size);
        if (this.pwords[this.doc[i]] == 0) /* Probability is too small :( */
            this.pwords[this.doc[i]] = 1e-200;
        if (i + 2 < this.doc.length) { /* Chain length of 3. */
            if (this.pchain[this.doc[i] + ' ' + this.doc[i+1] + ' ' + this.doc[i+2]])
                this.pchain[this.doc[i] + ' ' + this.doc[i+1] + ' ' + this.doc[i+2]] = 0;
            this.pchain[this.doc[i] + ' ' + this.doc[i+1] + ' ' + this.doc[i+2]] += 1;
            this.total_chains += 1;
        }
    }
    for (var i = 0; i < this.doc.length; i++) {
        this.words.add(this.doc[i]);
        if (i + 2 < this.doc.length) { /* Chain length of 3. */
            var chain = this.doc[i] + ' ' + this.doc[i+1] + ' ' + this.doc[i+2];
            this.pchain[chain] /= this.total_chains * 1.0;
            if (this.pchain[chain] == 0) /* Probability is too small :( */
                this.pchain[chain] = 1e-200;
        }
    }
    console.log(this.pwords);
};

Author.prototype.getProbability = function(book) {
    var ret = this.prob;

    for (var i = 0; i < book.length; i++) {
        if (this.pwords[book[i]])
            ret += this.pwords[book[i]];
        else
            ret += 5.0 / this.words.size;
        if (i + 2 < book.length && this.pchain[book[i] + ' ' + book[i+1] + ' ' + book[i+2]])
            ret += this.pchain[book[i] + ' ' + book[i+1] + ' ' + book[i+2]];
        else
            ret -= 0.2 / this.total_chains;
    }
    return ret;
};

this.learn = function(data) {
    this.melville = new Author('melville', data.melville);
    this.shelley = new Author('shelley', data.shelley);
    this.twain = new Author('twain', data.twain);

    this.melville.calcProbability();
    this.shelley.calcProbability();
    this.twain.calcProbability();
};

this.predict = function(testcase) {
    var a = [['melville', this.melville.getProbability(decompose(testcase))],
        ['shelley', this.shelley.getProbability(decompose(testcase))],
        ['twain', this.twain.getProbability(decompose(testcase))]];
    a.sort(function(a, b) { return a[1] > b[1]; });
    return a[0][0];
};