import { describe, expect, test } from 'vitest'
import { resovleArgs } from '../src/shared'

/**
 * @description: resovleArgs Test
 */
describe('resovleArgs', () => {
  test('empty args should return default czargs', () => {
    expect(resovleArgs([])).toEqual({
      czgitArgs: {
        flag: null,
        keyword: '',
      },
      gitArgs: [],
    })
  })

  test('resovle subcmd shoule be right', () => {
    expect(resovleArgs(['-cb'])).toEqual({
      czgitArgs: {
        flag: {
          checkbox: true,
        },
        keyword: '',
      },
      gitArgs: [],
    })

    expect(resovleArgs(['--checkbox', '-E', '-b', 'ix'])).toEqual({
      czgitArgs: {
        flag: {
          checkbox: true,
          emoji: true,
          break: true,
        },
        keyword: 'ix',
      },
      gitArgs: [],
    })
  })

  test('resolve flag should be right', () => {
    expect(resovleArgs(['-r'])).toEqual({
      czgitArgs: {
        flag: {
          retry: true,
        },
        keyword: '',
      },
      gitArgs: [],
    })

    expect(resovleArgs(['--retry'])).toEqual({
      czgitArgs: {
        flag: {
          retry: true,
        },
        keyword: '',
      },
      gitArgs: [],
    })

    expect(resovleArgs(['--retry', '--config=./config.js'])).toEqual({
      czgitArgs: {
        flag: {
          config: './config.js',
          retry: true,
        },
        keyword: '',
      },
      gitArgs: [],
    })
  })

  test('both resovle subcmd and flag should be right', () => {
    expect(resovleArgs(['--emoji', '-r'])).toEqual({
      czgitArgs: {
        flag: {
          retry: true,
          emoji: true,
        },
        keyword: '',
      },
      gitArgs: [],
    })

    expect(resovleArgs(['--config=./config.js', '--break'])).toEqual({
      czgitArgs: {
        flag: {
          config: './config.js',
          break: true,
        },
        keyword: '',
      },
      gitArgs: [],
    })

    expect(resovleArgs(['--config=./config.js', ':ff', '-a'])).toEqual({
      czgitArgs: {
        flag: {
          config: './config.js',
          alias: 'ff',
        },
        keyword: '',
      },
      gitArgs: ['-a'],
    })

    expect(resovleArgs(['--config=./config.js', ':ff', '--alias=dd', '-a'])).toEqual({
      czgitArgs: {
        flag: {
          config: './config.js',
          alias: 'dd',
        },
        keyword: '',
      },
      gitArgs: ['-a'],
    })

    expect(resovleArgs(['--config=./config.js', '--break', '--emoji', '-a', '--hello'])).toEqual({
      czgitArgs: {
        flag: {
          break: true,
          config: './config.js',
          emoji: true,
        },
        keyword: '',
      },
      gitArgs: ['-a', '--hello'],
    })

    expect(resovleArgs(['--config=./config.js', '--emoji', 'ch', '-a'])).toEqual({
      czgitArgs: {
        flag: {
          config: './config.js',
          emoji: true,
        },
        keyword: 'ch',
      },
      gitArgs: ['-a'],
    })

    expect(resovleArgs(['--emoji', '--template', './a.txt', 'ch'])).toEqual({
      czgitArgs: {
        flag: {
          emoji: true,
        },
        keyword: 'ch',
      },
      gitArgs: ['--template', './a.txt'],
    })

    expect(resovleArgs(['-a', ':a'])).toEqual({
      czgitArgs: {
        flag: {
          alias: 'a',
        },
        keyword: '',
      },
      gitArgs: ['-a'],
    })
  })
})
