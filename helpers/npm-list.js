const spawn = require('cross-spawn')
const package = require('../package.json')
const debug = require('debug')(package.name)
const optionsToArgv = require('./options-to-args')


/**
 * Wrapper to allow programmatic usage of the `npm ls` command
 *
 * @param {Object} opts
 * @returns {Promise<Array<Object>>}
 */
module.exports = function (opts = {}) {
    const blackListOpts = ['format', 'csv']
    const options = optionsToArgv(opts, blackListOpts)
    
    return new Promise((resolve, reject) => {

        debug('Got these options: %s', JSON.stringify(options, null, 2))

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

            const currentPackagePath = process.cwd()
            const bracketsRegEx = /[\[\]']/gi
            packagePaths = packagePaths
                // handle edge-cases where npm-ls just returns a single item in a stringifyed-array (such as when doing `--depth=-1)
                .replace(bracketsRegEx, '')
                // break concatenated paths in to an array
                .split('\n')
                // extraneous spaces
                .map(path => path.trim())
                // remove blanks
                .filter(path => path)
                // filter out the top-level package
                .filter(path => path !== currentPackagePath)

            debug('The `node ls` command exited with the following code: %s', exitCode)
            debug('Total paths found: %s', packagePaths.length)
            debug('Dependency paths: %s', packagePaths)

            resolve(packagePaths)
        })

    })
}