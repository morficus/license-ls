const { table } = require('table')
const { isEmpty } = require('lodash')


/**
 * Prints the given object in an ASCII table.
 *
 * @param {Object} data
 * @param {Object} labels Custom labels to over-write the default values
 * @returns {string|*}
 */
module.exports =  function ({data, header}) {

    if (isEmpty(data)) {
        return 'No data was present so no table was generated'
    }


    const defaultLabels = {
        id: 'Row #',
        name: 'Package Name',
        version: 'Version',
        licenseId: 'SPDX ID',
        licenseIdWithoutVersion: 'SPDX ID (without version)',
        licenseVersion: 'License Version',
        licenseFullName: 'SPDX Full Name',
        licenseFilePath: 'Path to license file',
        license: 'License',
        licenseLink: 'License Link',
        copyrightYear: 'Copyright Year',
        copyrightHolder: 'Copyright Holder',
        homepage: 'Homepage',
        repository: 'Repository',
        author: 'Author',
        dependencyLevel: 'Dependency type',
        description: 'Description'
    }

    const finalLabels = Object.assign({}, defaultLabels, header)

    const headers = Object.keys(data[0]).map(key => finalLabels[key])
    const rows = data.map(Object.values)
    try {
        return table([headers, ...rows])
    } catch (err) {
        console.warn('There was an error generating the table output', err)
        return ''
    }
}