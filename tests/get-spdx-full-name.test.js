const getLongName = require('../helpers/get-spdx-full-name')
const test = require('ava')

test('Matches a single SPDX ID', (t) => {
    const payload  = 'MIT'
    const expected = 'MIT License'
    const actual = getLongName(payload)

    t.is(actual, expected)
})

test('Returns nothing for emptry strings', (t) => {
    const payload  = ''
    const expected = ''
    const actual = getLongName(payload)

    t.is(actual, expected)
})

test('Handles the npm-specific "UNLICENSED" case', (t) => {
    const payload  = 'UNLICENSED'
    const expected = 'Proprietary License'
    const actual = getLongName(payload)

    t.is(actual, expected)
})

test('Handles the npm-specific "LicenseRef" case #1', (t) => {
    const payload  = 'SEE LICENSE IN LICENSE.PDF'
    const expected = 'External license file'
    const actual = getLongName(payload)

    t.is(actual, expected)
})

test('Handles the npm-specific "LicenseRef" case #2', (t) => {
    const payload  = 'LicenseRef-LICENSE'
    const expected = 'External license file'
    const actual = getLongName(payload)

    t.is(actual, expected)
})

test('Can handle simple expressions', (t) => {
    const payload  = '(MIT AND ISC)'
    const expected = 'MIT License and ISC License'
    const actual = getLongName(payload)

    t.is(actual, expected)
})

test('Can handle complex expressions', (t) => {
    const payload  = '(MIT OR ISC AND Apache-2.0)'
    const expected = 'MIT License or ISC License and Apache License 2.0'
    const actual = getLongName(payload)

    t.is(actual, expected)
})

test('Can handle expressions with "+"', (t) => {
    const payload  = 'LGPL-2.0+'
    const expected = 'GNU Library General Public License v2 or later'
    const actual = getLongName(payload)

    t.is(actual, expected)
})

test('Can handle expressions with "+" in complex expressions', (t) => {
    const payload  = 'MIT OR LGPL-2.0+'
    const expected = 'MIT License or GNU Library General Public License v2 or later'
    const actual = getLongName(payload)

    t.is(actual, expected)
})

test('Does not blow up if given a non-string value', (t) => {
    [null, undefined, 42, ['test'], {test: 'hello'}].forEach(payload => {
        let expected = ''
        let actual = getLongName(payload)

        t.is(actual, expected)
    })

})