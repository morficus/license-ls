# License List
List licenses for installed packages.  

![npm](https://img.shields.io/npm/v/license-ls.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/dbc11e7aa9d037034303/maintainability)](https://codeclimate.com/github/morficus/license-ls/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/dbc11e7aa9d037034303/test_coverage)](https://codeclimate.com/github/morficus/license-ls/test_coverage)
[![Build Status](https://travis-ci.org/morficus/license-ls.svg?branch=master)](https://travis-ci.org/morficus/license-ls)

## Features
* JSON, CSV or ASCII table output
* Specify the package depth
* Ability to limit list to only dev or only production packages
* Support for converting SPDX expressions in to their full names
* Can be used programmatically for maximum flex- and extensibility

## Available options
* Most [npm-ls](https://docs.npmjs.com/cli/ls.html)  arguments are available and results in the same behavior (with exception of `json`, `long` and `parseable`, which have no effect)
* `--format`: specify the output format as json, table or csv (defaults to table)
* `--delimiter`: only valid when using the csv output format, character the use as the value separator (defaults to `,`) 

## Examples
Get a list of all dependency packages
```bash
npx license-ls
```

Get a list of only direct dependencies
```bash
npx license-ls --depth=0
```

Get a list of only direct production dependencies
```bash
npx license-ls --depth=0 --prod
```

Get a list of all dependency packages in JSON format
```bash
npx license-ls --format=json
```

Save results to a file
```bash
npx license-ls --depth=0 > report.txt
```

## Sample Output formats
All of the following samples were generated by running the relevant command against this project.   

### JSON output
```npx license-ls --format=json --depth=0```
```json
 [
   {
     "id": 0,
     "name": "license-ls",
     "version": "1.0.0",
     "license": "MIT License (MIT)",
     "repository": "git+https://github.com/morficus/license-ls.git",
     "author": "Maurice Williams",
     "homepage": "https://github.com/morficus/license-ls#readme",
     "dependencyLevel": "production"
   },
   {
     "id": 1,
     "name": "ava",
     "version": "2.1.0",
     "license": "MIT License (MIT)",
     "repository": "git+https://github.com/avajs/ava.git",
     "homepage": "https://avajs.dev",
     "dependencyLevel": "development"
   },
   {
     "id": 2,
     "name": "debug",
     "version": "4.1.1",
     "license": "MIT License (MIT)",
     "repository": "git://github.com/visionmedia/debug.git",
     "author": "TJ Holowaychuk",
     "homepage": "https://github.com/visionmedia/debug#readme",
     "dependencyLevel": "development"
   },
   {
     "id": 3,
     "name": "json2csv",
     "version": "4.5.1",
     "license": "MIT License (MIT)",
     "repository": "git+https://github.com/zemirco/json2csv.git",
     "author": "Mirco Zeiss",
     "homepage": "https://github.com/zemirco/json2csv#readme",
     "dependencyLevel": "production"
   },
   {
     "id": 4,
     "name": "libnpm",
     "version": "2.0.1",
     "license": "ISC License (ISC)",
     "repository": "git+https://github.com/npm/libnpm.git",
     "author": "Kat Marchán",
     "homepage": "https://github.com/npm/libnpm#readme",
     "dependencyLevel": "production"
   },
   {
     "id": 5,
     "name": "ora",
     "version": "3.4.0",
     "license": "MIT License (MIT)",
     "repository": "git+https://github.com/sindresorhus/ora.git",
     "author": "Sindre Sorhus",
     "homepage": "https://github.com/sindresorhus/ora#readme",
     "dependencyLevel": "production"
   },
   {
     "id": 6,
     "name": "read-package-tree",
     "version": "5.2.2",
     "license": "ISC License (ISC)",
     "repository": "git+https://github.com/npm/read-package-tree.git",
     "author": "Isaac Z. Schlueter",
     "homepage": "https://github.com/npm/read-package-tree",
     "dependencyLevel": "production"
   },
   {
     "id": 7,
     "name": "spdx-license-list",
     "version": "6.0.0",
     "license": "Creative Commons Zero v1.0 Universal (CC0-1.0)",
     "repository": "git+https://github.com/sindresorhus/spdx-license-list.git",
     "author": "Sindre Sorhus",
     "homepage": "https://github.com/sindresorhus/spdx-license-list#readme",
     "dependencyLevel": "production"
   },
   {
     "id": 8,
     "name": "table",
     "version": "5.4.1",
     "license": "BSD 3-Clause \"New\" or \"Revised\" License (BSD-3-Clause)",
     "repository": "git+https://github.com/gajus/table.git",
     "author": "Gajus Kuizinas",
     "homepage": "https://github.com/gajus/table#readme",
     "dependencyLevel": "production"
   },
   {
     "id": 9,
     "name": "yargs",
     "version": "13.2.4",
     "license": "MIT License (MIT)",
     "repository": "git+https://github.com/yargs/yargs.git",
     "homepage": "https://yargs.js.org/",
     "dependencyLevel": "production"
   }
 ]
```

### CSV output
```npx license-ls --format=csv --depth=0```
```csv
"id","name","version","license","repository","author","homepage","dependencyLevel"
0,"license-ls","1.0.0","MIT License (MIT)","git+https://github.com/morficus/license-ls.git","Maurice Williams","https://github.com/morficus/license-ls#readme","production"
1,"ava","2.1.0","MIT License (MIT)","git+https://github.com/avajs/ava.git",,"https://avajs.dev","development"
2,"debug","4.1.1","MIT License (MIT)","git://github.com/visionmedia/debug.git","TJ Holowaychuk","https://github.com/visionmedia/debug#readme","development"
3,"json2csv","4.5.1","MIT License (MIT)","git+https://github.com/zemirco/json2csv.git","Mirco Zeiss","https://github.com/zemirco/json2csv#readme","production"
4,"libnpm","2.0.1","ISC License (ISC)","git+https://github.com/npm/libnpm.git","Kat Marchán","https://github.com/npm/libnpm#readme","production"
5,"ora","3.4.0","MIT License (MIT)","git+https://github.com/sindresorhus/ora.git","Sindre Sorhus","https://github.com/sindresorhus/ora#readme","production"
6,"read-package-tree","5.2.2","ISC License (ISC)","git+https://github.com/npm/read-package-tree.git","Isaac Z. Schlueter","https://github.com/npm/read-package-tree","production"
7,"spdx-license-list","6.0.0","Creative Commons Zero v1.0 Universal (CC0-1.0)","git+https://github.com/sindresorhus/spdx-license-list.git","Sindre Sorhus","https://github.com/sindresorhus/spdx-license-list#readme","production"
8,"table","5.4.1","BSD 3-Clause ""New"" or ""Revised"" License (BSD-3-Clause)","git+https://github.com/gajus/table.git","Gajus Kuizinas","https://github.com/gajus/table#readme","production"
9,"yargs","13.2.4","MIT License (MIT)","git+https://github.com/yargs/yargs.git",,"https://yargs.js.org/","production"
```



### Table output
```npx license-ls --depth=0```
```text
╔═══════╤═══════════════════════╤═════════╤════════════════════════════════════════════════════════╤═══════════════════════════════════════════════════════════════╤════════════════════╤══════════════════════════════════════════════════════════════╤═════════════════╗
║ Row # │ Package Name          │ Version │ License                                                │ Repository                                                    │ Author             │ Homepage                                                     │ Dependency type ║
╟───────┼───────────────────────┼─────────┼────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────╢
║ 0     │ license-ls            │ 1.0.0   │ MIT License (MIT)                                      │ git+https://github.com/morficus/license-ls.git                │ Maurice Williams   │ https://github.com/morficus/license-ls#readme                │ production      ║
╟───────┼───────────────────────┼─────────┼────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────╢
║ 1     │ ava                   │ 2.1.0   │ MIT License (MIT)                                      │ git+https://github.com/avajs/ava.git                          │                    │ https://avajs.dev                                            │ development     ║
╟───────┼───────────────────────┼─────────┼────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────╢
║ 2     │ debug                 │ 4.1.1   │ MIT License (MIT)                                      │ git://github.com/visionmedia/debug.git                        │ TJ Holowaychuk     │ https://github.com/visionmedia/debug#readme                  │ development     ║
╟───────┼───────────────────────┼─────────┼────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────╢
║ 3     │ json2csv              │ 4.5.1   │ MIT License (MIT)                                      │ git+https://github.com/zemirco/json2csv.git                   │ Mirco Zeiss        │ https://github.com/zemirco/json2csv#readme                   │ production      ║
╟───────┼───────────────────────┼─────────┼────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────╢
║ 4     │ libnpm                │ 2.0.1   │ ISC License (ISC)                                      │ git+https://github.com/npm/libnpm.git                         │ Kat Marchán        │ https://github.com/npm/libnpm#readme                         │ production      ║
╟───────┼───────────────────────┼─────────┼────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────╢
║ 5     │ nyc                   │ 14.1.1  │ ISC License (ISC)                                      │ git+ssh://git@github.com/istanbuljs/nyc.git                   │ Ben Coe            │ https://github.com/istanbuljs/nyc#readme                     │ production      ║
╟───────┼───────────────────────┼─────────┼────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────╢
║ 6     │ ora                   │ 3.4.0   │ MIT License (MIT)                                      │ git+https://github.com/sindresorhus/ora.git                   │ Sindre Sorhus      │ https://github.com/sindresorhus/ora#readme                   │ production      ║
╟───────┼───────────────────────┼─────────┼────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────╢
║ 7     │ read-package-tree     │ 5.2.2   │ ISC License (ISC)                                      │ git+https://github.com/npm/read-package-tree.git              │ Isaac Z. Schlueter │ https://github.com/npm/read-package-tree                     │ production      ║
╟───────┼───────────────────────┼─────────┼────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────╢
║ 8     │ spdx-expression-parse │ 3.0.0   │ MIT License (MIT)                                      │ git+https://github.com/jslicense/spdx-expression-parse.js.git │ Kyle E. Mitchell   │ https://github.com/jslicense/spdx-expression-parse.js#readme │ production      ║
╟───────┼───────────────────────┼─────────┼────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────╢
║ 9     │ spdx-license-list     │ 6.0.0   │ Creative Commons Zero v1.0 Universal (CC0-1.0)         │ git+https://github.com/sindresorhus/spdx-license-list.git     │ Sindre Sorhus      │ https://github.com/sindresorhus/spdx-license-list#readme     │ production      ║
╟───────┼───────────────────────┼─────────┼────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────╢
║ 10    │ table                 │ 5.4.1   │ BSD 3-Clause "New" or "Revised" License (BSD-3-Clause) │ git+https://github.com/gajus/table.git                        │ Gajus Kuizinas     │ https://github.com/gajus/table#readme                        │ production      ║
╟───────┼───────────────────────┼─────────┼────────────────────────────────────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────┼──────────────────────────────────────────────────────────────┼─────────────────╢
║ 11    │ yargs                 │ 13.2.4  │ MIT License (MIT)                                      │ git+https://github.com/yargs/yargs.git                        │                    │ https://yargs.js.org/                                        │ production      ║
╚═══════╧═══════════════════════╧═════════╧════════════════════════════════════════════════════════╧═══════════════════════════════════════════════════════════════╧════════════════════╧══════════════════════════════════════════════════════════════╧═════════════════╝
```

## Using as a library
You can use all of the same CLI options when using `license-ls` as a module (with the exception of `format`).  
When using it as a module, the function will always return a promise that resolves to an Array

```javascript
const licenseLs = require('license-ls')
const options = {
    depth: 1,
    prod: true
}

licenseLs(options)
.then(result => {
    // do your thing
})
```

## Contributing
Want a new feature added? Found a bug?
Go ahead an open [a new issue](https://github.com/morficus/license-ls/issues/new) or feel free to subject pull requests