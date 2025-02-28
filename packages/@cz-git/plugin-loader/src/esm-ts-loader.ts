import process from 'node:process'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import fs from 'node:fs'
import { style } from '@cz-git/inquirer'
import type { Loader } from 'cosmiconfig'

type LoaderError = Error & {
    code?: string
}

// export NODE_OPTIONS="--experimental-transform-types --disable-warning ExperimentalWarning"
export function esmTsLoader(): Loader {
    return async (cfgPath: string, _: string) => {
        try {
            console.log(111, cfgPath)
            const filePath = resolve(cfgPath)
            console.log('exists ?', fs.existsSync(filePath))
            console.log(222, filePath)
            const fileUrl = pathToFileURL(filePath).href
            console.log(333, fileUrl)
            const result = await import(fileUrl)
            return result.default || result
        }
        catch (e: any) {
            // TODO: bun - The Current native bun will cause the TUI unnormal
            // @ts-ignore // Usage: `deno task cz`
            const isDeno = typeof Deno !== 'undefined' && Deno?.version?.deno
            if (isDeno)
                throw e

            const error = e as LoaderError
            const isNodeLTSInRange = (() => {
                if (!process.version.startsWith('v'))
                    return false
                const major = process.version.split('.')[0].slice(1)
                const minor = process.version.split('.')[1]
                return Number(major) >= 22 && Number(minor) >= 10
            })()
            if (error?.code === 'ERR_UNKNOWN_FILE_EXTENSION') {
                if (isNodeLTSInRange)
                    console.log(style.gray(`Loading file: ${cfgPath}\nRequires injecting experimental NODE_OPTIONS env: --experimental-transform-types\nSee: ${style.underline('https://cz-git.qbb.sh/config/#typescript-template')}`))
                else
                    console.log(style.gray(`Loading file: ${cfgPath}\n1. Requires Node.js version >= v22.10.0\n2. Inject experimental NODE_OPTIONS env: --experimental-transform-types\nSee: ${style.underline('https://cz-git.qbb.sh/config/#typescript-template')}`))
                return {}
            }
            else {
                throw error
            }
        }
    }
}
