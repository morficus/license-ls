const extractLicenseText = require('../helpers/extract-license-id')
const test = require('ava')

test('Can deal with normal things... like text', t => {
    const payload = 'MIT'
    const expected = 'MIT'
    const actual = extractLicenseText(payload)

    t.is(actual, expected)
})

test('Can deal with  objects', t => {
    const payload = { type: 'MIT', url: 'some-some' }
    const expected = 'MIT'
    const actual = extractLicenseText(payload)

    t.is(actual, expected)
})

test('Can deal with an array with a single object', t => {
    const payload = [{ type: 'MIT', url: 'some-some' }]
    const expected = 'MIT'
    const actual = extractLicenseText(payload)

    t.is(actual, expected)
})

test('Can deal with an array with multiple objects', t => {
    const payload = [{ type: 'MIT', url: 'some-some' }, { type: 'ISC', url: 'some-some' }]
    const expected = 'MIT AND ISC'
    const actual = extractLicenseText(payload)

    t.is(actual, expected)
})

test('Can deal with funky arrays', t => {
    const payload = [1, '', 'MIT']
    const expected = 'MIT'
    const actual = extractLicenseText(payload)

    t.is(actual, expected)
})

test('Can deal with REALLY funky arrays', t => {
    const payload = [1, '', 'MIT', { type: 'ISC', url: 'some-url' }]
    const expected = 'MIT AND ISC'
    const actual = extractLicenseText(payload)

    t.is(actual, expected)
})