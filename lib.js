const promisify = require('util').promisify
const npmLs = require('./helpers/npm-list')
const getPackageDetails = require('./helpers/get-package-details')
const getExpandedLicName = require('./helpers/get-spdx-full-name')
const extractLicenseText = require('./helpers/extract-license-id')
const glob = promisify(require('glob'))

/**
 * Get a list of licenses for any installed project dependencies
 * @param {Object} options
 * @returns {Promise<[]>}
 */
module.exports = async function (options = {}) {
    const pathList = await npmLs(options)
    return Promise.all(pathList.map(async (path, index) => {
        const pkg = await getPackageDetails(path)
        const licShortName = extractLicenseText(pkg.license || pkg.licenses || pkg.licence || pkg.licences)
        const licLongName = getExpandedLicName(licShortName) || 'unknown'

        // find any local licences files and build a path to them
        const licFilePath = await glob('+(license**|licence**)', {cwd: path, nocase: true, nodir: true})
            .then(files => files.map(file => `${path}/${file}`))

        return {
            id: index,
            name: pkg.name,
            version: pkg.version,
            licenseId: licShortName,
            licenseFullName: licLongName,
            licenseFilePath: licFilePath || [],
            license: `${licLongName} (${licShortName || '?'})`,
            repository: (pkg.repository || {}).url,
            author: (pkg.author || {}).name,
            homepage: pkg.homepage,
            path,
            dependencyLevel: pkg._development ? 'development' : 'production',
            description: pkg.description
        }
    }))

}