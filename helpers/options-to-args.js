/**
 * Converts an options object in to an Array of strings similar to what you would get from `process.argv`
 *
 * @param {Object} options
 * @returns {Array<String>}
 */
module.exports = function (options) {
    return Object.entries(options)
    // remove anything with a value of false
        .filter(([key, value]) => value !== false)
        // convert in to an array of CLI arguments that can be accepted by `npm ls`
        .map(([key, value]) => `--${key}=${value}`)
}