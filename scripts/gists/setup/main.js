#!/usr/bin/env node
/* eslint-disable no-useless-return */

// adapted from https://gist.github.com/kentcdodds/bb452ffe53a5caa3600197e1d8005733 which I will always convert to a gist using
//  hub gist create

const spawnSync = require('child_process').spawnSync

const FAILURE = 'failure'
const SUCCESS = 'success'

// disable https://scarf.sh/
// which is used by some projects dependencies
process.env.SCARF_ANALYTICS = false

const styles = {
  // got these from playing around with what I found from:
  // https://github.com/istanbuljs/istanbuljs/blob/0f328fd0896417ccb2085f4b7888dd8e167ba3fa/packages/istanbul-lib-report/lib/file-writer.js#L84-L96
  // they're the best I could find that works well for light or dark terminals
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

  console.log(color('info', `    ▶️  Starting: ${  title}`))
  console.log(color('subtitle', `          ${  subtitle}`))
  console.log(
    color('subtitle', `          Running the following command: ${  command}`),
  )

  const result = spawnSync(command, {stdio: 'inherit', shell: true})

  if (result.status !== 0 && !options.ignoreFailure) {
    console.error(
      color(
        'danger',
        `    🚨  Failure: ${
          title
          }. Please review the messages above for information on how to troubleshoot and resolve this issue.`,
      ),
    )
    process.exit(result.status)
    return FAILURE
  }

  console.log(color('success', `    ✅  Success: ${  title  }\n\n`))
  return SUCCESS
}

function main() {
  let result

  result = run(
    'System Validation',
    'Ensuring the correct versions of tools are installed on this computer.',
    `npx "https://gist.github.com/Oluwasetemi/afb69f5d6db1305ad7b812f4e9c595b9"`,
  )
  if (result === FAILURE) return

  result = run(
    'Dependency Installation',
    'Installing third party code dependencies so the workshop works properly on this computer.',
    'npm install --legacy-peer-deps',
  )
  if (result === FAILURE) return

  result = run(
    'Project Validation',
    'Running validation checks to ensure dependencies were installed properly',
    'npm run validate -s',
  )
  if (result === FAILURE) return

  // seed data

  // start pm2 instance if it is running on a linux server

  // if (
  //   !process.argv.includes('--no-autofill') &&
  //   !process.env.NO_EMAIL_AUTOFILL
  // ) {
  //   result = run(
  //     'Autofilling Email',
  //     "Each exercise comes with a elaboration form to help your retention. Providing your email now will mean you don't have to provide it each time you fill out the form.",
  //     'npx "https://gist.github.com/kentcdodds/2d44448a8997b9964b1be44cd294d1f5"',
  //     {ignoreFailure: true},
  //   )
  //   if (result === FAILURE) return
  // }
}

main()
