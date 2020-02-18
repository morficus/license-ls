const optionsToArgs = require('../helpers/options-to-args')
const test = require('ava')

test('Return an array of object-keys prefixed with `--`', t => {
    const data = { value0: true, value1: 1, value2: 'b', value3: [1,2,3] }
    const expected = ['--value0=true', '--value1=1', '--value2=b', '--value3=1,2,3']
    const actual = optionsToArgs(data)

    t.deepEqual(expected, actual)
})

test('Exclude any items with a value of `false`', t => {
    const data = { value1: 1, value2: 'b', value3: [1,2,3], value4: false, value5: 0 }
    const expected = ['--value1=1', '--value2=b', '--value3=1,2,3', '--value5=0']
    const actual = optionsToArgs(data)

    t.deepEqual(expected, actual)
})

test('Excludes any items that are in the "ignore" list', t => {
    const data = { value1: 1, value2: 'b', value3: [1,2,3], value4: false, value5: 0 }
    const ignore = ['value1']
    const expected = ['--value2=b', '--value3=1,2,3', '--value5=0']
    const actual = optionsToArgs(data, ignore)

    t.deepEqual(expected, actual)
})

test('Should return nothing if no data is given', t => {
    const expected = []
    const actual = optionsToArgs()

    t.deepEqual(expected, actual)
})