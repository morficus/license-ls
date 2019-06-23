const { parseAsync } = require('json2csv')

/**
 * Covert the given Object to CSV
 *
 * @param {Object} data
 * @param {String} delimiter (defaults to ',')
 * @returns {Promise<string|*>}
 */
module.exports = async function (data, delimiter = ',') {
    try {
        return parseAsync(data, { delimiter })
    } catch(err) {
        console.warn('There was an error generating the CSV output', err)
        return ''
    }
}
