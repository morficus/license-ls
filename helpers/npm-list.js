const { spawn } = require('child_process')
const package = require('../package.json')
const debug = require('debug')(package.name)

module.exports = function (options = []) {
    return new Promise((resolve, reject) => {

        debug('Got these options: %s', options)

        // always pass in the `parseable` flag so that the value can be used programmatically
        const cmdNpmList = spawn('npm', ['list', '--parseable', ...options])
        let packagePaths = ''

        cmdNpmList.stdout.on('data', (data) => {
            const parsedData = data.toString()
            packagePaths = packagePaths.concat(parsedData)
        })

        cmdNpmList.stderr.on('data', (data) => {
            debug(`stderr: ${data}`);
            // reject(data.toString())
        })

        cmdNpmList.on('close', (exitCode) => {

            const bracketsRegEx = /[\[\]']/gi
            packagePaths = packagePaths
                // handle edge-cases where npm-ls just returns a single item in a stringifyed-array (such as when doing `--depth=-1)
                .replace(bracketsRegEx, '')
                // break concatenated paths in to an array
                .split('\n')
                // extraneous spaces
                .map(item => item.trim())
                // remove blanks
                .filter(item => item)

            debug('The `node ls` command exited with the following code: %s', exitCode)
            debug('Total paths found: %s', packagePaths.length)
            debug('Dependency paths: %s', packagePaths)

            resolve(packagePaths)
        })

    })
}