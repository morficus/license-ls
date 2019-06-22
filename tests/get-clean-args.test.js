const getCleanArgs = require('../helpers/get-clean-args')
const test = require('ava')

test('Returns empty if no arguments are given', async (t) => {
    process.argv = ["execPath", "script"]
    const expected = []
    const actual = getCleanArgs()

    t.is(actual.length, expected.length)
})

test('Returns any and all arguments passed in', async (t) => {
    process.argv = ["execPath", "script", '--depth=0', '--random=42', 'some other thing']
    const expected = ['--depth=0', '--random=42', 'some other thing']
    const actual = getCleanArgs()

    t.is(actual.length, expected.length)
    t.deepEqual(actual, expected)
})

test('Removes black-listed values', async (t) => {
    process.argv = ["execPath", "script", '--depth=0', '--json', '--parseable', '--long']
    const expected = ['--depth=0']
    const actual = getCleanArgs()

    t.is(actual.length, expected.length)
    t.deepEqual(actual, expected)
})