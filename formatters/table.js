const { table } = require('table')

/**
 * Prints the given object in an ASCII table.
 *
 * @param {Object} data
 * @param {Object} labels Custom labels to over-write the default values
 * @returns {string|*}
 */
module.exports =  function ({data, header}) {

    const defaultLabels = {
        id: 'Row #',
        name: 'Package Name',
        version: 'Version',
        license: 'License',
        homepage: 'Homepage',
        repository: 'Repository',
        author: 'Author',
        dependencyLevel: 'Dependency type'
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