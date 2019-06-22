const { parseAsync } = require('json2csv')

module.exports = async function (data, delimiter = ',') {
    try {
        console.log(data)
        return parseAsync(data, { delimiter })
    } catch(err) {
        console.warn('There was an error generating the CSV output', err)
        return ''
    }
}
