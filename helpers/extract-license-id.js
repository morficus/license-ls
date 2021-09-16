const { isString, isObject, isArray, compact } = require('lodash')

/**
 * Deal with all the wild stuff the "license" field in package.json can have and return only the SPDX ID (if any).
 *
 * @param {*} license
 * @returns {string}
 */
module.exports = function extractLicenseText(license) {
    let licenseText
    if (isString(license)) {
        licenseText = license

    } else if (isArray(license)) {
        const text = license.map(extractLicenseText)
        licenseText = compact(text).join(' AND ')

    } else if (isObject(license)) {
        licenseText = license.type

    } else {
        licenseText = ''
    }

    return licenseText
}