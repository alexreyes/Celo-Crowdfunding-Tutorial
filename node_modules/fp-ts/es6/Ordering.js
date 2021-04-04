/**
 * @since 2.0.0
 */
export function sign(n) {
    return n <= -1 ? -1 : n >= 1 ? 1 : 0;
}
/**
 * @since 2.0.0
 */
export var eqOrdering = {
    equals: function (x, y) { return x === y; }
};
/**
 * @since 2.0.0
 */
export var semigroupOrdering = {
    concat: function (x, y) { return (x !== 0 ? x : y); }
};
/**
 * @since 2.0.0
 */
export function invert(O) {
    switch (O) {
        case -1:
            return 1;
        case 1:
            return -1;
        default:
            return 0;
    }
}
