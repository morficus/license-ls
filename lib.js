const { chain, compact, sortBy } = require('lodash')
const promisify = require('util').promisify
const npmLs = require('./helpers/npm-list')
const getPackageDetails = require('./helpers/get-package-details')
const getExpandedLicName = require('./helpers/get-spdx-full-name')
const extractLicenseId = require('./helpers/extract-license-id')
const extractLicenseVersion = require('./helpers/extract-license-version')
const extractCopyright = require('./helpers/extract-copyright')
const glob = promisify(require('glob'))

/**
 * Get a list of licenses for any installed project dependencies
 * @param {Object} options
 * @returns {Promise<[]>}
 */
module.exports = async function (options = {}) {
    const pathList = await npmLs(options)
    const results = await Promise.all(pathList.map(async (path, index) => {
        const pkg = await getPackageDetails(path)
        if (!pkg) {
          return null;
        }
        const repository = (pkg.repository || {}).url
        const licShortName = extractLicenseId(pkg.license || pkg.licenses || pkg.licence || pkg.licences)
        const licLongName = getExpandedLicName(licShortName) || 'unknown'
        const { licenseIdWithoutVersion, licenseVersion } = extractLicenseVersion(licShortName)

        // find any local licences files and build a path to them
        const allLicenseFiles = await glob('+(license**|licence**)', {cwd: path, nocase: true, nodir: true})
        const licenseFilePaths = allLicenseFiles.map(file => `${path}/${file}`)
        const licenseLink =
          repository && allLicenseFiles.length > 0 ?
              `${repositoryToHttp(repository)}/${allLicenseFiles[0]}` :
              ''

        const { copyrightYear, copyrightHolder } = await extractCopyright(licenseFilePaths)
        return {
            id: index,
            name: pkg.name,
            version: pkg.version,
            licenseId: licShortName,
            licenseIdWithoutVersion,
            licenseVersion,
            licenseFullName: licLongName,
            licenseFilePath: licenseFilePaths || [],
            license: `${licLongName} (${licShortName || '?'})`,
            licenseLink,
            copyrightYear,
            copyrightHolder,
            repository,
            author: (pkg.author || {}).name,
            homepage: pkg.homepage,
            path,
            dependencyLevel: pkg._development ? 'development' : 'production',
            description: pkg.description
        }
    }))
    return chain(results).compact().sortBy(['name', 'version']).value()
}

function repositoryToHttp(repositoryUrl) {
  if (repositoryUrl) {
    // The branch "master" might not be actually the default branch of the project but
    // the link will still resolve. If there is no master branch, Github will pick the correct default branch and show:
    // "Branch not found, redirected to default branch."
    // Naturally, for projects not hosted on Github we might be out of luck.
    return repositoryUrl
      .replace(/^git\+/, '')
      .replace(/^ssh:\/\/git@/, 'https://')
      .replace(/^git:\/\//, 'https://')
      .replace(/\.git/, '/blob/master')
  }
}
