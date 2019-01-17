/*
 * Cartesian product of multiple sets.
 * http://stackoverflow.com/a/43053803
 */

const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))))

export const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a)

/*
 * Power set.
 * https://rosettacode.org/wiki/Power_set#ES6
 */
export const powerset = xs =>
  xs.reduceRight((a, x) => a.concat(a.map(y => [x].concat(y))), [
    []
  ])
