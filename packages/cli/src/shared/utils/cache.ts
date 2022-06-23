import { readFileSync, writeFileSync } from "fs";

export const readCacheSync = (cachePath: string) => JSON.parse(readFileSync(cachePath, "utf8"));

export const writeCacheSync = (cachePath: string, key: string, value: any) => {
  let originalCache;
  try {
    originalCache = readCacheSync(cachePath);
  } catch (e) {
    originalCache = {};
  }
  const newCache = { ...originalCache, [key]: value };
  writeFileSync(cachePath, JSON.stringify(newCache));
  return newCache;
};

export const getCacheValueSync = (cachePath: string, repoPath: string) => {
  try {
    const cache = readCacheSync(cachePath);
    return cache[repoPath];
  } catch (e) {}
};
