"use strict";
var Lilly = (function () {
    function Lilly(name) {
        if (name === void 0) { name = ''; }
        this.name = name;
    }
    Lilly.prototype.connect = function (callback) {
        try {
            localStorage.setItem("null", "null");
            localStorage.removeItem("null");
            return callback(null, true);
        }
        catch (e) {
            return callback(e);
        }
    };
    Lilly.prototype.save = function (key, data) {
        var value = JSON.stringify({ "value": data });
        try {
            localStorage.setItem(this.name + key, value);
        }
        catch (e) { }
    };
    Lilly.prototype.read = function () { };
    Lilly.prototype.remove = function () { };
    Lilly.prototype.push = function () { };
    Lilly.prototype.pull = function () { };
    Lilly.prototype.destroy = function () { };
    return Lilly;
}());
exports.Lilly = Lilly;
