gd96.Itpl = {};

/**
 * Linear interpolation
 *
 * @param a
 * @param b
 * @param t
 * @param mt
 * @returns {*}
 */
gd96.Itpl.lerp = function (a, b, t, mt) {
    return a + (b - a) * (t / mt);
};
