const getPackageDetails = require('../helpers/get-package-details')
const test = require('ava')

test('Returns details for a package at a given path', async (t) => {
    const path = './node_modules/ava'
    const expected = {
        name: 'ava',
        homepage: 'https://avajs.dev',
        repository: {
            type: 'git',
            url: 'git+https://github.com/avajs/ava.git'
        },
        license: 'MIT',
        description: 'Testing can be a drag. AVA helps you get it done.'
    }
    const actual = await getPackageDetails(path)

    t.is(actual.name, expected.name)
    t.is(actual.homepage, expected.homepage)
    t.is(actual.license, expected.license)
    t.is(actual.repository.url, expected.repository.url)
    t.is(actual.description, expected.description)
})

test('Should fail if the path does not exist', async (t) => {
    const path = './some-fake-path'
    try {
        await getPackageDetails(path)
        t.fail('Expected an exception')
    } catch (err) {
        t.pass()
    }
})

test('Should fail if an empty path is given', async (t) => {
    const path = ''
    try {
        await getPackageDetails(path)
        t.fail('Expected an exception')
    } catch (err) {
        t.pass()
    }
})