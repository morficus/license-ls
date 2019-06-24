module.exports = {
  format: {
    type: 'string',
    description: 'Output format',
    default: 'table',
    choices: ['table', 'json', 'csv', 'json', 'xml']
  },
  depth: {
    description: 'Max display depth of the dependency tree',
    type: 'number'
  },
  include: {
    description: 'List of properties to include',
    type: 'array',
    choices: ['id', 'name', 'version', 'license', 'repository', 'author', 'homepage', 'path', 'dependencyLevel'],
    default: ['id', 'name', 'version', 'license', 'repository', 'author', 'homepage', 'dependencyLevel']
  },
  production: {
    alias: 'prod',
    description: 'Display only the dependency tree for packages in dependencies',
    type: 'boolean'
  },
  development: {
    alias: 'dev',
    description: 'Display only the dependency tree for packages in devDependencies',
    type: 'boolean'
  },
  global: {
    description: 'List packages in the global install prefix instead of in the current project',
    type: 'boolean'
  },
  link: {
    description: 'Display only dependencies which are linked',
    type: 'boolean'
  },
  'csv.delimiter': {
    description: 'character the use as the value separator',
    type: 'string',
    default: ','
  },
  'table.header.*': {
    description: 'changes the default header name for table output (ie: `--table.header.name=Module`)',
    type: 'string',
  },
  'xml.asAttrs': {
    description: 'uses each package property as the XML tag element, with the package name as the content (see "XML Output #2" in the Examples section) ',
    type: 'boolean',
    default: false
  }
}