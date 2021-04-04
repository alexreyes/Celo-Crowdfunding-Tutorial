"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pipeable_1 = require("./pipeable");
/**
 * @since 2.0.0
 */
exports.URI = 'Writer';
/**
 * @since 2.0.0
 */
function evalWriter(fa) {
    return fa()[0];
}
exports.evalWriter = evalWriter;
/**
 * @since 2.0.0
 */
function execWriter(fa) {
    return fa()[1];
}
exports.execWriter = execWriter;
/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
function tell(w) {
    return function () { return [undefined, w]; };
}
exports.tell = tell;
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
function listen(fa) {
    return function () {
        var _a = fa(), a = _a[0], w = _a[1];
        return [[a, w], w];
    };
}
exports.listen = listen;
/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
function pass(fa) {
    return function () {
        var _a = fa(), _b = _a[0], a = _b[0], f = _b[1], w = _a[1];
        return [a, f(w)];
    };
}
exports.pass = pass;
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
function listens(f) {
    return function (fa) { return function () {
        var _a = fa(), a = _a[0], w = _a[1];
        return [[a, f(w)], w];
    }; };
}
exports.listens = listens;
/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
function censor(f) {
    return function (fa) { return function () {
        var _a = fa(), a = _a[0], w = _a[1];
        return [a, f(w)];
    }; };
}
exports.censor = censor;
/**
 * @since 2.0.0
 */
function getMonad(M) {
    return {
        URI: exports.URI,
        _E: undefined,
        map: exports.writer.map,
        of: function (a) { return function () { return [a, M.empty]; }; },
        ap: function (mab, ma) { return function () {
            var _a = mab(), f = _a[0], w1 = _a[1];
            var _b = ma(), a = _b[0], w2 = _b[1];
            return [f(a), M.concat(w1, w2)];
        }; },
        chain: function (ma, f) { return function () {
            var _a = ma(), a = _a[0], w1 = _a[1];
            var _b = f(a)(), b = _b[0], w2 = _b[1];
            return [b, M.concat(w1, w2)];
        }; }
    };
}
exports.getMonad = getMonad;
/**
 * @since 2.0.0
 */
exports.writer = {
    URI: exports.URI,
    map: function (fa, f) { return function () {
        var _a = fa(), a = _a[0], w = _a[1];
        return [f(a), w];
    }; }
};
var map = pipeable_1.pipeable(exports.writer).map;
exports.map = map;
