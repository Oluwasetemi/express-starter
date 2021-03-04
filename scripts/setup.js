var spawnSync = require('child_process').spawnSync
const path = require('path')

var FAILURE = 'failure'
var SUCCESS = 'success'

var styles = {
  blue: {open: '\u001b[34m', close: '\u001b[39m'},
  dim: {open: '\u001b[2m', close: '\u001b[22m'},
  red: {open: '\u001b[31m', close: '\u001b[39m'},
  green: {open: '\u001b[32m', close: '\u001b[39m'},
  success: {open: '\u001b[32;1m', close: '\u001b[0m'},
  danger: {open: '\u001b[31;1m', close: '\u001b[0m'},
  info: {open: '\u001b[36;1m', close: '\u001b[0m'},
  subtitle: {open: '\u001b[2;1m', close: '\u001b[0m'},
}

function color(modifier, string) {
  return styles[modifier].open + string + styles[modifier].close
}

function run(title, subtitle, command, options) {
  options = options || {}

  console.log(color('blue', '    ▶️  Starting: ' + title))
  console.log(color('subtitle', '          ' + subtitle))
  console.log(
    color('subtitle', '          Running the following command: ' + command),
  )

  var result = spawnSync(command, {stdio: 'inherit', shell: true})

  if (result.status !== 0 && !options.ignoreFailure) {
    console.error(
      color(
        'red',
        '    🚨  Failure: ' +
          title +
          '. Please review the messages above for information on how to troubleshoot and resolve this issue.',
      ),
    )
    process.exit(result.status)
    return FAILURE
  }

  console.log(color('green', '    ✅  Success: ' + title + '\n\n'))
  return SUCCESS
}

console.log(color('info', '▶️  Starting setup...'))

var error = spawnSync('npx --version', {shell: true})
  .stderr.toString()
  .trim()
if (error) {
  console.error(
    color(
      'red',
      '🚨  npx is not available on this computer. Please install npm@5.2.0 or greater',
    ),
  )
  throw error
}

const gistCreated =
  'https://gist.github.com/Oluwasetemi/4094d858daafc94bd73ea24e9a7471b3'

var command =
  `npx "${gistCreated}" -q`
console.log(color('dim', '      Running the following command: ' + command))

var result = spawnSync(command, {stdio: 'inherit', shell: true})

if (result.status === 0) {
  console.log(color('green', '✅  setup complete...'))
} else {
  process.exit(result.status)
}

/*
eslint
  no-var: "off",
  "vars-on-top": "off",
*/
