import { readFileSync, writeFileSync } from 'node:fs'
import { style } from 'cz-git'

export function readCacheSync(cachePath: string) {
  return JSON.parse(readFileSync(cachePath, 'utf8'))
}

export function writeCacheSync(cachePath: string, key: string, value: any) {
  let originalCache
  try {
    originalCache = readCacheSync(cachePath)
  }
  catch (e) {
    originalCache = {}
  }
  const newCache = { ...originalCache, [key]: value }
  writeFileSync(cachePath, JSON.stringify(newCache), 'utf8')
  return newCache
}

export function getCacheValueSync(cachePath: string, repoPath: string) {
  try {
    const cache = readCacheSync(cachePath)
    return cache[repoPath]
  }
  catch (e) {
    throw new Error(
      `${style.red(`>>> No found commit message cache in current repo: ${repoPath}`)}
${style.yellow('>>> Tip: Retry option requires using once "czg" command commit msg record')}`,
    )
  }
}
