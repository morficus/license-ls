const { promisify } = require('util')
const readPackageTree = promisify(require('read-package-tree'))

module.exports = async function (path) {
    if (!path) {
        throw new Error('You must specify a path')
    }
    const raw = await readPackageTree(path)
    return raw.package

}