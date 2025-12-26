#!/usr/bin/env node
const { exit } = require('process')
const path = require('path')
const { writeFileSync, existsSync, mkdirSync } = require('fs')
const { main, generateENVFile } = require('./dist/index.js')

const new_env_content = `import type { ENVTypes } from './envTypes'

export const envVars: ENVTypes = {
  app: {
    EXAMPLE_ENV: 'hello'
  },
}
`
const new_envTypes_content = `
export type ENVTypes = {
  app: {
    [key: string]: string // allow for extra keys
    EXAMPLE_ENV: string
  }
}
`

// don't run on VERCEL deployments
if (process.env.VERCEL) {
  process.exit(0)
}

if (process.argv[2] === 'init') {
  try {
    writeFileSync('./env.ts', new_env_content, { flag: 'wx' })
    writeFileSync('./envTypes.ts', new_envTypes_content, { flag: 'wx' })
    const generatedPrefix = existsSync('./src') ? 'src' : ''
    mkdirSync(path.join(generatedPrefix, '__generated__'), { recursive: true })
  } catch (err) {
    console.error('There was an error running init. Have you already run it?')
    exit(1)
  }
  exit(0)
}

if (!process.argv[2]) {
  console.error(
    'missing target file: please call env-ts with a target file, ex: `env-ts env.ts [target-sub-repo]',
  )
  exit(1)
}
if (!process.argv[3]) {
  console.error(
    'missing target sub-repo: please call env-ts with a target sub-repo, ex: `env-ts env.ts app`',
  )
  exit(1)
}

main(process.argv[2], process.argv[3])
  .then((envString) => {
    console.log(envString)
    if (process.argv[4]) {
      // process.argv[4] is the prefix filter for env vars
      generateENVFile(process.argv[3], process.argv[4])
    }
  })
  .catch((err) => {
    console.error(err.message || err)
    exit(1)
  })
