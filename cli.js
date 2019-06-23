const lib = require('./lib')
const toTable = require('./formatters/table')
const toCsv = require('./formatters/csv')
const toJson = require('./formatters/json')
const { argv } = require('yargs')
const ora = require('ora')

const spinner = ora('Analyzing').start()
const options = Object.assign({}, argv)
// remove the useless argv attributes
delete options._
delete options.$0

lib(options)
    .then(async results => {
        let output = ''

        spinner.succeed().start('Building output format')
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
        spinner.succeed()
        console.log(output)
    })