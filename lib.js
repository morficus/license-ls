const npmLs = require('./helpers/npm-list')
const getPackageDetails = require('./helpers/get-package-details')
const spdx = require('spdx-license-list')


module.exports = async function (options = []) {
    const pathList = await npmLs(options)
    return  await Promise.all(pathList.map(async (path, index) => {
        const pkg = await getPackageDetails(path)
        const licShortName = pkg.license
        const licLongName = (spdx[licShortName] || '').name
        return {
            id: index,
            name: pkg.name,
            version: pkg.version,
            license: `${licLongName || 'unknown'} (${licShortName})`,
            repository: (pkg.repository || {}).url,
            author: (pkg.author || {}).name,
            homepage: pkg.homepage,
            dependencyLevel: pkg._development ? 'development' : 'production'
        }
    }))

}