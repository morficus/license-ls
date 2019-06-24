const { toXML } = require('jstoxml')

/**
 * Format a package details as attributes on a single XML tag
 *
 * @param {Object} details
 * @returns {{_name: string, _attrs: array, _content: string}}
 */
function asAttributes(details) {
    const tagAttrs = Object.assign({}, details)
    delete tagAttrs.name
    return {
        _name: 'dependency',
        _content: details.name,
        _attrs: tagAttrs
    }
}

/**
 * Format a package details as individual XML tags
 *
 * @param {Object} details
 * @returns {{dependency: {_name: string, _content: *}[]}}
 */
function asEntry(details){
    const entry = Object.keys(details).map(key => ({
        _name: key,
        _content: details[key]
    }))

    return { dependency: entry }
}

const defaultOptions = {
    asAttrs: true
}
module.exports = function ({data, options}) {

    const opts = Object.assign({}, defaultOptions, options)

    const formatted = data.map(opts.asAttrs ? asAttributes : asEntry)

    const filter = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&apos;',
        '&': '&amp;'
    }
    const xmlOptions = {
        filter,
        attributesFilter: filter
    }

    return toXML({ dependencies: formatted }, xmlOptions)
}