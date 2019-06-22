#!/usr/bin/env node

const package = require('./package.json')
const { promisify } = require('util')
const readPackageTree = promisify(require('read-package-tree'))
const spdx = require('spdx-license-list')
const { spawn } = require('child_process')
const debug = require('debug')(package.name)
const { table } = require('table')
const { parseAsync } = require('json2csv')
const { argv } = require('yargs')
const ora = require('ora')
// get the npm project dir assocaited with this path
// const proj = await findPrefix(process.cwd())
debug.enabled = false

const spinner = ora()

function extractMyArgs() {
    const allArgs = process.argv
    const myArgesIndex = allArgs.length - 2
    // skip the first two CLI arguments since they will be the executor (path to node) and the command name
    if (myArgesIndex) {
        return allArgs.slice(-myArgesIndex)
    } else {
        return []
    }
}

function getDependencyPaths() {

    return new Promise((resolve, reject) => {

        const args = extractMyArgs()
        debug('Got these arguments: %s', args)
        const list = spawn('npm', ['list', '--parseable', ...args])
        let listBatch = ''

        list.stdout.on('data', (data) => {
            const parsedData = data.toString()
            listBatch = listBatch.concat(parsedData)
        })

        list.stderr.on('data', (data) => {
            debug(`stderr: ${data}`);
            reject(data.toString())
        })

        list.on('close', (exitCode) => {
            // remove blanks
            listBatch = listBatch
                // break concatenated paths in to an array
                .split('\n')
                // remove blanks
                .filter(item => item)

            debug('The `node ls` command existed with the following code: %s', exitCode)
            debug('Total paths found: %s', listBatch.length)
            debug('Dependency paths: %s', listBatch)

            resolve(listBatch)
        })

    })
}

async function extractPackageInfo(pathList) {


    return pathList.map(async (path, index) =>  {
        const raw = await readPackageTree(path)
        const pkg = raw.package
        debug('Parsing package: %s', pkg.name)
        const licShortName = pkg.license
        const licLongName = (spdx[licShortName] || '').name
        return {
            id: index,
            package: pkg.name,
            version: pkg.version,
            license: `${licLongName || 'unknown'} (${licShortName})`,
            homepage: pkg.homepage,
            repository: (pkg.repository || {}).url,
            author: (pkg.author || {}).name,
            dependencyLevel: pkg._development ? 'development' : 'production'
        }
    })
}

function convertToTable(myJsonArray) {
    debug('Building table display')
    const labels = {
        id: 'Row #',
        package: 'Name',
        version: 'Version',
        license: 'License',
        homepage: 'Homepage',
        repository: 'Repository',
        author: 'Author',
        dependencyLevel: 'Dependency type'
    }

    const headers = Object.keys(myJsonArray[0]).map(key => labels[key])
    const data = myJsonArray.map(Object.values)
    return table([headers, ...data])
}

async function main({format}) {
    spinner.start('Reading content of node_modules')
    const pathList = await getDependencyPaths()
    spinner.succeed().start('Extracting license info')

    const jsonReq = await extractPackageInfo(pathList)
    const json = await Promise.all(jsonReq)
    spinner.succeed().start('Constructing output')
    const output = {
        json :JSON.stringify(json, null, 2),
        table: convertToTable(json),
        csv: await parseAsync(json)
    }

    spinner.succeed()
    console.log(output[format])
    // TODO: stuff with totals and aggregates
}

main({ format: argv.format || 'table'})