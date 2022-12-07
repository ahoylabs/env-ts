#!/usr/bin/env ts-node
const { exit } = require('process')
const { main, generateENVFile } = require('./dist/index.js')

// don't run on VERCEL deployments
if (process.env.VERCEL) return ''

if (!process.argv[2]) {
  console.error(
    'missing target file: please call env-ts with a target file, ex: `env-ts env.ts [target-sub-repo]',
  )
  return exit(1)
}
if (!process.argv[3]) {
  console.error(
    'missing target sub-repo: please call env-ts with a target sub-repo, ex: `env-ts env.ts app`',
  )
  return exit(1)
}

main(process.argv[2], process.argv[3])
  .then((envString) => {
    console.log(envString)
    if (process.argv[4]) {
      generateENVFile(process.argv[3], process.argv[4], process.argv[5])
    }
  })
  .catch((err) => {
    console.error(err)
    exit(1)
  })
