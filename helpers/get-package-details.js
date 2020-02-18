const readPackageTree = require('read-package-tree')

/**
 * Gte full package information for a module at the given path
 *
 * @param {String} path Path to a directory that contains a package.json file
 * @returns {Promise<string|*|null>}
 */
module.exports = async function (path) {
    if (!path) {
        throw new Error('You must specify a path')
    }
    const raw = await readPackageTree(path)
    return raw.package

}