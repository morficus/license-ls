const fsPromises = require('fs').promises

const { isString, isObject, isArray, compact } = require('lodash')

/**
 * Inpsects the license file and tries to heuristically determine the copyright holder and the copyright year from it.
 *
 * @param {string} the path to the license file
 * @returns {{copyrightYear: string, copyrightHolder: string}} the copyright information parsed from the license file
 */
module.exports = async function extractCopyright(licenseFilePaths) {
    if (!licenseFilePaths || licenseFilePaths.length === 0) {
        return {}
    }
    const licenseFilePath = licenseFilePaths[0]
    let handle
    try {
        handle = await fsPromises.open(licenseFilePath, 'r')
        const fullFile = await handle.readFile({ encoding: 'utf-8' })
        const lines = fullFile.split('\n')
        // The copyright line should be somewhere at the start, inspect the first few lines.
        for (let i = 0; i < Math.min(lines.length, 5); i++) {
            const line = lines[i]
            const matchWithRange = /copyright(?:.*)(\d{4}\s*-\s*\d{4})(?:[,;.]?)\s+(.*)$/i.exec(line)
            if (matchWithRange) {
                return cleanUp({ copyrightYear: matchWithRange[1], copyrightHolder: matchWithRange[2] })
            }
            const matchWithYear = /copyright(?:.*)(\d{4})(?:[,;.]?)\s+(.*)$/i.exec(line)
            if (matchWithYear) {
                return cleanUp({ copyrightYear: matchWithYear[1], copyrightHolder: matchWithYear[2] })
            }
            const matchWithoutYear = /copyright\s+(.*)$/i.exec(line)
            if (matchWithoutYear) {
                return cleanUp({ copyrightYear: null, copyrightHolder: matchWithoutYear[1] })
            }
        }
    } catch (e) {
        console.warn('Could not open license file to parse copyright information.', e)
    } finally {
        if (handle) {
            await handle.close()
        }
    }
    return {}
}

function cleanUp(copyright) {
  const patterns = [
    /\s*All rights reserved.\s*/ig,
     /\s*\([^\s]+@[^\s]+\)/ig, // matches "(email-address@domain.tld)"
     /\s*<[^\s]+@[^\s]+>/ig, // matches "<email-address@domain.tld>"
     /\s*<http[^\s]+>/ig, // matches "<http(s)://domain.tld>"
    /\s*\([cC]\)/ig
  ]
  patterns.forEach(p => {
    copyright.copyrightHolder = copyright.copyrightHolder.replace(p, '')
  })
  copyright.copyrightHolder = copyright.copyrightHolder.trim()
  return copyright
}
