/**
 * Created by tome on 5/2/2015.
 */

// augment method helper to functions

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

/*
    Module - deentityify example
 */

String.method('deentityify', function () {
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };

    return function() {
        return this.replace(/&([^&;]+);/g,
            function (a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
}());

//console.log('&lt;&quot;&gt;'.deentityify());

/*
    Module - serial_maker example
 */
var serial_maker = function () {
    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function(p) {
            prefix = String(p);
        },
        set_seq: function (s) {
            seq = s;
        },
        gensym: function () {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();
console.log(unique);