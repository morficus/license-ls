const npmLs = require('./helpers/npm-list')
const getPackageDetails = require('./helpers/get-package-details')
const getExpandedLicName = require('./helpers/get-spdx-full-name')

/**
 * Get a list of licenses for any installed project dependencies
 * @param {Object} options
 * @returns {Promise<[]>}
 */
module.exports = async function (options = {}) {
    const pathList = await npmLs(options)
    return  await Promise.all(pathList.map(async (path, index) => {
        const pkg = await getPackageDetails(path)
        const licShortName = pkg.license
        const licLongName = getExpandedLicName(licShortName) || 'unknown'
        return {
            id: index,
            name: pkg.name,
            version: pkg.version,
            license: `${licLongName} (${licShortName})`,
            repository: (pkg.repository || {}).url,
            author: (pkg.author || {}).name,
            homepage: pkg.homepage,
            dependencyLevel: pkg._development ? 'development' : 'production'
        }
    }))

}