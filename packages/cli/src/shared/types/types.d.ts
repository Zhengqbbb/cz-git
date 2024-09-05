declare module 'dedent' {
    /**
     * ES6 string tag that strips indentation from multi-line strings.
     * @see: https://github.com/dmnd/dedent
     */
    export default function dedent(str: string): string
}

declare module 'cachedir' {
    /**
     * Get a directory for your caching needs
     * @see: https://github.com/LinusU/node-cachedir
     * @param {string} name
     * @return {string} cacheDir
     */
    export default function cachedir(name: string): string
}
