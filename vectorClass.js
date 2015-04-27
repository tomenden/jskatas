/**
 * Created by tome on 12/21/2014.
 */
//http://www.codewars.com/kata/526dad7f8c0eb5c4640000a4/train/javascript
var Vector = function (components) {
    this.components = components;
    this.add = function (vec) {
        if (this.components.length === vec.components.length) {
            var sum = [];
            for (i=0; i<this.components.length; i+=1) {
                sum.push(this.components[i] + vec.components[i]);
            }
            return new Vector(sum);
        } else {
            throw "Error"
        }

    };
    this.subtract = function (vec) {
        if (this.components.length === vec.components.length) {
            var sum = [];
            for (i=0; i<this.components.length; i+=1) {
                sum.push(this.components[i] - vec.components[i]);
            }
            return new Vector(sum);
        } else {
            throw "Error"
        }

    };
    this.dot = function (vec) {
        if (this.components.length === vec.components.length) {
            var sum = 0;
            for (i=0; i<this.components.length; i+=1) {
                sum += this.components[i] * vec.components[i];
            }
            return sum;
        } else {
            throw "Error"
        }

    };
    this.norm = function() {
        var sum = 0;
        for (i=0; i<this.components.length; i+=1) {
            sum += this.components[i]^2;
        }
        return Math.sqrt(sum);
    };
    this.toString = function() {
        var result = [];
        for (i=0; i<this.components.length; i+=1) {
            result.push(this.components[i].toString())
        }
        result = result.join();
        return '(' + result + ')';
    };
    this.equals = function (vec) {
        if (this.components.join() === vec.components.join()) {
            return true;
        }
    }
};

var a = new Vector([1,2]);
var b = new Vector([3,4]);
console.log(a.toString());