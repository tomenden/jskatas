/**
 * Created by tome on 5/2/2015.
 */

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

// prototypical
var myMammel = {
    name: 'Herb the Mammel',
    get_name: function () {
        return this.name;
    },
    says: function () {
        return this.saying || '';
    }
};

var myCat = Object.create(myMammel);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
myCat.get_name = function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
};

//console.log(myCat.get_name());
//console.log(myCat.purr(50));


var mammel = function(spec) {
    var that = {};

    that.get_name = function () {
        return spec.name;
    };
    that.says = function () {
        return spec.saying || '';
    };

    return that;
};


var cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammel(spec);
    that.purr = function (n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };
    that.get_name = function () {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    };
    return that;
};

var myCat = cat({name: 'Henrietta'});

Object.method('superior', function (name) {
    var that = this,
        method = that[name];
    return function () {
        return method.apply(that, arguments);
    };
});


var coolcat = function (spec) {
    var that = cat(spec),
        super_get_name = that.superior('get_name');
    that.get_name = function (n) {
        return 'like ' + super_get_name() + ' baby';
    };
    return that;
};

var myCoolCat = coolcat({name: 'Bix'});
var name = myCoolCat.get_name();
console.log(name);