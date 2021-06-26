const test = require('ava')
const spawn = require("cross-spawn");

test('runs successfully', async (t) => {
    t.timeout(10000)
    const args = [
        'cli.js',
        '--format=json',
        '--depth=0',
        '--prod',
    ]

    const sync = spawn.sync('node', args, {encoding: 'utf-8'})

    t.regex(sync.stderr, /^- Analyzing\n(√|✔) Analyzing\n- Building output format\n(√|✔) Building output format\n$/)
    t.is(sync.status, 0)

    const output = JSON.parse(sync.stdout)
    t.is(output.length, 12, 'number of packages in the output should match the direct dependencies of license-ls')
})
