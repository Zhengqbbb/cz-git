import { describe, expect, test } from 'vitest'
import { getCurrentScopes, getMaxSubjectLength, isSingleItem } from '../src/shared'

/**
 * @description: utils Test
 */

describe('getMaxSubjectLength', () => {
  const answer = {
    type: 'feat',
    scope: 'cz-git',
  }

  test('underfined options subject rule', () => {
    expect(getMaxSubjectLength(undefined, undefined, {})).toEqual(Infinity)
    expect(getMaxSubjectLength(answer.type, undefined, {})).toEqual(Infinity)
    expect(getMaxSubjectLength(answer.type, answer.scope, {})).toEqual(Infinity)
  })

  test('use commitlint rule get subject max length', () => {
    const options = { maxSubjectLength: 100 }
    expect(getMaxSubjectLength(answer.type, answer.scope, options)).toEqual(100)
  })

  test('when use both maxsubject rule and maxheader rule', () => {
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 120,
        maxSubjectLength: 100,
      }),
    ).toEqual(86)
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 100,
        maxSubjectLength: 120,
      }),
    ).toEqual(86)
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 100,
        maxSubjectLength: 110,
      }),
    ).toEqual(86)
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: Infinity,
        maxSubjectLength: Infinity,
      }),
    ).toEqual(Infinity)
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: Infinity,
        maxSubjectLength: 100,
      }),
    ).toEqual(100)
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 100,
        maxSubjectLength: Infinity,
      }),
    ).toEqual(86)
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 100,
        maxSubjectLength: 0,
      }),
    ).toEqual(0)
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 0,
        maxSubjectLength: 100,
      }),
    ).toEqual(0)
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 100,
        maxSubjectLength: 100,
      }),
    ).toEqual(86)
  })
})

describe('isSingleItem()', () => {
  test('output should be right', () => {
    expect(isSingleItem(true, true, [])).toEqual(false)
    expect(isSingleItem(true, false, [])).toEqual(false)
    expect(isSingleItem(true, true, ['hello'])).toEqual(false)
    expect(isSingleItem(false, true, ['hello'])).toEqual(false)
    expect(isSingleItem(false, false, ['hello'])).toEqual(true)
  })
})

describe('getCurrentScopes()', () => {
  test('no scopes should empty', () => {
    expect(getCurrentScopes([], {}, 'feat')).toEqual([])
    expect(getCurrentScopes([], { test: [{ name: 'unitest' }] }, 'feat')).toEqual([])
  })
  test('hit scopeOverrides should return', () => {
    const scopeOverrides = { test: [{ name: 'unitest' }] }
    expect(getCurrentScopes(['feat'], scopeOverrides, 'test')).toEqual([{ name: 'unitest' }])
  })
  test('no hit scopeOverrides should return scopes', () => {
    const scopeOverrides = { test: [{ name: 'unitest' }] }
    expect(getCurrentScopes(['feat', 'fix'], scopeOverrides, 'feat')).toEqual(['feat', 'fix'])
  })
})
