#!/usr/bin/env node
const lib = require('./lib')
const toTable = require('./formatters/table')
const toCsv = require('./formatters/csv')
const toJson = require('./formatters/json')
const toXml = require('./formatters/xml')
const ora = require('ora')
const cliOptions = require('./cli-options')
const argv = require('yargs')
    .usage('$0', 'List licenses for installed packages (https://github.com/morficus/license-ls)')
    .options(cliOptions)
    .hide('table')
    // force comma-separated values in to arrays
    .coerce(['include'], function (input) {
        if (input.length > 1) {
            return input
        } else {
            return input[0].split(',')
        }
    })
    .argv

const options = Object.assign({}, argv)
// remove the useless stuff form yargs
delete options._
delete options.$0

const spinner = ora('Analyzing').start()

lib(options)
    .then(async results => {
        let output = ''

        // grab only the properties that need to be included
        // this is basically the same as _.pluck is doing
        const limited = results.map(package => {
            return options.include.reduce((aggregate, key) => {
                aggregate[key] = package[key]
                return aggregate
            }, {})
        })

        spinner.succeed().start('Building output format')
        const format = options.format
        switch (format) {
            case 'table':
                output = await toTable({data: limited, header: options.table.header})
                break
            case 'csv':
                output = await toCsv(limited, options.csv.delimiter)
                break
            case 'json':
                output = toJson(limited)
                break
            case 'xml':
                output = toXml({data: limited, options: options.xml})
                break
        }
        spinner.succeed()
        console.log(output)
    })
    .catch(reason => {
        spinner.fail('Unexpected error')
        console.error(reason);
    })
