/**
 * Converts an options object in to an Array of strings similar to what you would get from `process.argv`
 *
 * @param {Object} options
* @param {Array} ignoreList
 * @returns {Array<String>}
 */
module.exports = function (options = {}, ignoreList = []) {
    return Object.entries(options)
        // remove anything with a value of false
        .filter(([key, value]) => value !== false)
        // remove items based on ignore-list
        .filter(([key, value]) => !ignoreList.includes(key))
        // convert in to an array of CLI arguments that can be accepted by `npm ls`
        .map(([key, value]) => `--${key}=${value}`)
}