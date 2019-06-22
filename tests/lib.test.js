const lib = require('../lib')
const test = require('ava')

test('Returns an array of objects', async t => {
    const actual = await lib()
    t.true(Array.isArray(actual))
    t.true(actual.every(p => typeof p === 'object'))
})

test('Every package result has an ID', async t => {
    const actual = await lib()
    t.true(Array.isArray(actual))
    t.true(actual.every(p => p.hasOwnProperty('id')))
})

test('Every package result has the package name', async t => {
    const actual = await lib()
    t.true(Array.isArray(actual))
    t.true(actual.every(p => p.hasOwnProperty('name')))
})

test('Every package result has the package version', async t => {
    const actual = await lib()
    t.true(Array.isArray(actual))
    t.true(actual.every(p => p.hasOwnProperty('version')))
})

test('Every package result has the package dependency level', async t => {
    const actual = await lib()
    t.true(Array.isArray(actual))
    t.true(actual.every(p => p.hasOwnProperty('dependencyLevel')))
})

test('Every package result has the package license as text', async t => {
    const actual = await lib()
    t.true(Array.isArray(actual))
    t.true(actual.every(p => {
        return p.hasOwnProperty('license') && (typeof p.license === 'string')
    }))
})

test('License text includes long and short name', async t => {
    const expected = 'MIT License (MIT)'
    const actual = (await lib(['--depth=0']))[0]

    t.is(actual.license, expected)
})