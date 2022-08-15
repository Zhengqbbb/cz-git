import { beforeEach, describe, expect, test, vitest } from 'vitest'
import { generateQuestions } from '../src/generator'
import type { CommitizenGitOptions } from '../src/shared/types/options'

/**
 * @description: generateQuestions Test
 */

describe('generateQuestions()', () => {
  let options: CommitizenGitOptions

  beforeEach(() => {
    // @ts-expect-error
    options = null
  })

  const mockedCz = {
    Separator: vitest.fn(),
  }
  const getQuestion = (index: number) => generateQuestions(options, mockedCz)[index - 1]

  test('error config should be return false and print log', () => {
    expect(generateQuestions({}, undefined)).toBe(false)
  })

  describe('questions should be returned', () => {
    describe('question 1 - type', () => {
      beforeEach(() => {
        options = {
          types: [{ value: 'feat', name: 'feat: this is a feature' }],
          scopes: ['cz-git'],
        }
      })
      test('inquirer params should be right', () => {
        expect(getQuestion(1).name).toEqual('type')
        expect(getQuestion(1).type).toEqual('search-list')
        expect(getQuestion(1).themeColorCode).toEqual(undefined)
        options = {
          themeColorCode: '38;5;043',
          ...options,
        }
        expect(getQuestion(1).themeColorCode).toEqual('38;5;043')
      })

      test('source should be normal search work', () => {
        const mockTypesSourceFn = vitest.fn(getQuestion(1).source)
        expect(mockTypesSourceFn({}, 'f')).toEqual([
          {
            value: 'feat',
            name: 'feat: this is a feature',
            index: 0,
            score: 1,
          },
        ])
      })
    })

    describe('question 2 - list scope', () => {
      test('inquirer params should be right', () => {
        options = {
          types: [{ value: 'feat', name: 'feat: this is a feature' }],
          scopes: ['cz-git'],
        }
        expect(getQuestion(2).name).toEqual('scope')
        expect(getQuestion(2).type).toEqual('search-list')
        expect(getQuestion(2).themeColorCode).toEqual(undefined)
        options = {
          themeColorCode: '38;5;043',
          ...options,
        }
        expect(getQuestion(2).themeColorCode).toEqual('38;5;043')
      })

      test('source should be normal search work', () => {
        options = {
          types: [{ value: 'feat', name: 'feat: this is a feature' }],
          scopes: ['cz-git'],
        }
        const mockTypesSourceFn = vitest.fn(getQuestion(2).source)
        expect(mockTypesSourceFn({}, '')).toEqual([
          { name: 'empty', value: false },
          { name: 'custom', value: '___CUSTOM___' },
          {},
          { name: 'cz-git', value: 'cz-git' },
        ])
        expect(mockTypesSourceFn({}, 'cz')).toEqual([
          { name: 'cz-git', value: 'cz-git', index: 3, score: 4 },
        ])
        expect(mockTypesSourceFn({}, 'em')).toEqual([
          { name: 'empty', value: false, index: 0, score: 4 },
        ])
        expect(mockTypesSourceFn({}, 'cu')).toEqual([
          { name: 'custom', value: '___CUSTOM___', index: 1, score: 4 },
        ])
        expect(mockTypesSourceFn({}, 'aaa')).toEqual([])
        options = {
          allowEmptyScopes: false,
          ...options,
        }
        const mockValidateFn = vitest.fn(getQuestion(2).validate)
        expect(mockValidateFn('cz-git')).toBe(true)
        expect(mockValidateFn('')).toMatch(/[ERROR]/)
      })

      test('only one item scope should be skip', () => {
        options = {
          types: [{ value: 'feat', name: 'feat: this is a feature' }],
          scopes: ['cz-git'],
          allowCustomScopes: true,
          allowEmptyScopes: true,
        }
        let mockWhenFn = vitest.fn(getQuestion(2).when)
        expect(mockWhenFn({ types: 'feat' })).toBe(true)
        options = {
          types: [{ value: 'feat', name: 'feat: this is a feature' }],
          scopes: ['cz-git'],
          allowCustomScopes: false,
          allowEmptyScopes: false,
        }
        mockWhenFn = vitest.fn(getQuestion(2).when)
        expect(mockWhenFn({ types: 'feat' })).toBe(false)
      })
    })
  })
})
