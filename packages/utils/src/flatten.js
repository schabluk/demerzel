/**
 * Flatten arrays functional style.
 * Use: flatten(array)
 * [1, [2, 3], [[4, [5, [6], 7], [8, 9]]]] => [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
 */

const map = f => a => a.map(f)
const reduce = (f, acc) => a => a.reduce(f, acc)
const pipe = (f, g) => x => g(f(x))

const flattenEach = map(x => Array.isArray(x) ? flatten(x) : x)
const flattenDeep = reduce((a, b) => a.concat(b), [])
const flatten = pipe(flattenEach, flattenDeep)

export default flatten
