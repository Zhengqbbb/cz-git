import path from 'node:path'
import fs from 'fs-extra'
import pkgDir from 'pkg-dir'
import tmp from 'tmp'

const TEST_PATH = 'packages/@cz-git/plugin-loader/__tests__'

export async function useBootstrap(fixture?: string, directory?: string) {
    const tmpDir = tmp.dirSync({
        keep: false,
        unsafeCleanup: true,
    })

    if (typeof fixture !== 'undefined') {
        const packageDir = await pkgDir(directory)
        if (!packageDir)
            throw new Error(`Err, no such file or directory '${packageDir}'`)

        await fs.copy(path.join(packageDir, TEST_PATH, fixture), tmpDir.name)
    }

    return tmpDir
}
