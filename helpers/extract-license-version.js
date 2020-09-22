const { isString, isObject, isArray, compact } = require('lodash')

/**
 * Takes an SPDX identifier like Apache-1.0 and splits it into "Apache" and "1.0".
 *
 * @param {string} an SPDX identifier
 * @returns {{licenseIdWithoutVersion: string, licenseVersion: string}} the SPDX ID parsed into individual parts. For
 * unversioned licenses, licenseIdWithoutVersion without version will contain the input and licenseVersion will be
 * null.
 */
module.exports = function extractLicenseText(spdxId) {
  const match = /^(.*?)-(\d[\d\.]+)$/.exec(spdxId)
  if (match) {
    return {
      licenseIdWithoutVersion: match[1],
      licenseVersion: match[2]
    }
  }
  return {
    licenseIdWithoutVersion: spdxId,
    licenseVersion: null
  }
}
