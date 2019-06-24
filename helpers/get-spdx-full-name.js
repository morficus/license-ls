const lookup = require('spdx-license-list')
const parse = require('spdx-expression-parse')

function traverse(obj) {
    let text = []

    if (obj.hasOwnProperty('license')) {
        let extratedId = obj['license']
        extratedId += obj['plus'] ? '+' : ''
        let fullName = lookup[extratedId].name
        text.push(fullName)
    }

    if(obj.hasOwnProperty('left')) {
        text.push(...traverse(obj['left']))
    }

    if(obj.hasOwnProperty('conjunction')) {
        text.push(obj['conjunction'])
    }

    if(obj.hasOwnProperty('right')) {
        text.push(...traverse(obj['right']))
    }

    return text
}

/**
 * Given an SPDX License ID or License Expression, expand it in to its long-form name.
 *
 * @param {String} identifier
 * @returns {string}
 */
module.exports = function (identifier = '') {

    const normalised = identifier.toUpperCase()
    try {
        let expandedText = ''
        if (normalised === 'UNLICENSED') {
            expandedText = 'Proprietary License'
        } else if (normalised.includes('SEE LICENSE IN') || normalised.includes('LICENSEREF')) {
            expandedText = 'External license file'
        } else {
            const match = parse(identifier)
            const identifiedLics = traverse(match)
            expandedText = identifiedLics.join(' ')
        }

        return expandedText

    } catch (err) {
        return ''
    }

}