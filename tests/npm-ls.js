const getDependencyPaths = require('../helpers/npm-list')
const test = require('ava')

test('Returns a non-empty array of package paths', async (t) => {
    const actual = await getDependencyPaths()

    t.true(Array.isArray(actual))
    t.true(actual.length > 0)
    t.true(actual.every(path => typeof path === 'string'))
})

test('Does not include any empty values', async (t) => {
    const actual = await getDependencyPaths()

    t.true(actual.every(path => path.length > 0))
})

