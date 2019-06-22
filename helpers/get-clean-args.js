/**
 * Get a list of passed in CLI arguments in "raw" format.
 * Will automatically remove any black-listed arguments.
 *
 * @returns {string[]|Array}
 */
module.exports = function() {
    const blacklist = ['--json', '--parseable', '--long']

    // make a copy as to not mutate the global values
    const argv = [...process.argv]

    // remove the first two entries from the argv list
    argv.shift()
    argv.shift()


    return argv.filter(arg => !blacklist.includes(arg))
}