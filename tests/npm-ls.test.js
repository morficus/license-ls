const npmList = require('../helpers/npm-list')
const test = require('ava')

test('Returns a non-empty array of package paths', async (t) => {
    const actual = await npmList()

    t.true(Array.isArray(actual))
    t.true(actual.length > 0)
    t.true(actual.every(path => typeof path === 'string'))
})

test('Does not include any empty values', async (t) => {
    const actual = await npmList()

    t.true(actual.every(path => path.length > 0))
})

test('Does not include the current package', async (t) => {
    const expected = process.cwd()
    const actual = await npmList()

    t.true(actual.every(path => path !== expected))
})

test('Produces different results when given different options', async (t) => {
    const [prodOnly, devOnly] = await Promise.all([
        await npmList({depth: 0, prod: true}),
        await npmList({depth: 0, dev: true})]
    )

    t.true(prodOnly.length > devOnly.length)
    t.notDeepEqual(prodOnly, devOnly)
})

