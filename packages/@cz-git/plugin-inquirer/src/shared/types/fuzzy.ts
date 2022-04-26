/**
 * Powered by Fuzzy
 * https://github.com/myork/fuzzy
 *
 * Copyright (c) 2012 Matt York
 * Licensed under the MIT license.
 *
 * @description: A standalone fuzzy search / fuzzy filter. provide inquirer usage
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

export interface MatchOptions {
  pre?: string;
  post?: string;
  caseSensitive?: boolean;
}

export interface MatchResult {
  rendered: string;
  score: number;
}

export interface FilterOptions<T> {
  pre?: string;
  post?: string;
  extract?(input: T): string;
}

export interface FilterResult<T> {
  string: string;
  score: number;
  index: number;
  original: T;
}

export type FilterFucType<T> = (
  pattern: string,
  arr: T[],
  opts?: FilterOptions<T>
) => FilterResult<T>[];
