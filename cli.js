const arguments = require('./helpers/get-clean-args')()
const lib = require('./lib')
const toTable = require('./formatters/table')
const toCsv = require('./formatters/csv')
const toJson = require('./formatters/json')
const { argv } = require('yargs')

lib(arguments)
    .then(async results => {
        let output = ''

        const format = argv.format || 'table'
        switch (format) {
            case 'table':
                output = await toTable({data: results})
                break
            case 'csv':
                output = await toCsv(results, argv.delimiter)
                break
            case 'json':
                output = toJson(results)
                break
            default:
                output = await toTable({data: results})
                break
        }
        console.log(output)
    })