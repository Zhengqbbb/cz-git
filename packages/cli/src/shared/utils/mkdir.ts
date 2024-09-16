import type { NoParamCallback } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { mkdirp } from 'mkdirp'

function checkPath(pth: string) {
    if (process.platform === 'win32') {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path.parse(pth).root, ''))

        if (pathHasInvalidWinCharacters) {
            const error: any = new Error(`Path contains invalid characters: ${pth}`)
            error.code = 'EINVAL'
            throw error
        }
    }
}

export function ensureDir(dir: string, cb: NoParamCallback) {
    try {
        checkPath(dir)
        mkdirp.sync(dir)
        cb(null)
    }
    catch (err: any) {
        cb(err)
    }
}
