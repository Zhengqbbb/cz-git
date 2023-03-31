import fs from 'fs'
import { resolve } from 'pathe'
import { createGenerator } from 'ts-json-schema-generator'
import type { Config } from 'ts-json-schema-generator'

const config: Config = {
  path: resolve(__dirname, './czrc-schema.d.ts'),
  tsconfig: resolve(__dirname, '../tsconfig.json'),
  type: 'CommitizenGitOptions',
}

function main() {
  const schema = createGenerator(config).createSchema(config.type)
  return JSON.stringify(schema, null, 2)
}

try {
  const start = new Date().getTime()
  console.log('\x1B[90m[build-post] \x1B[33mGenerate configure JSON schema ...\x1B[0m')

  const __output = resolve(__dirname, '../docs/public/schema', 'cz-git.json')
  const jsonSchema = main()
  fs.writeFileSync(__output, jsonSchema, 'utf8')

  console.log(`\x1B[90m${__output}\x1B[0m`)
  console.log('\x1B[32m✓\x1B[0m Generate configure JSON schema')
  console.log(`  \x1B[90mGenerate configure JSON schema in ${((Date.now() - start) / 1000).toFixed(2)}s\x1B[0m\n`)
}
catch (e) {
  console.log(e)
}
