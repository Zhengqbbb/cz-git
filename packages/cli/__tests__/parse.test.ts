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
        subCommand: null,
      },
      gitArgs: [],
    })
  })

  test('resovle subcmd shoule be right', () => {
    expect(resovleArgs(['init'])).toEqual({
      czgitArgs: {
        flag: null,
        subCommand: {
          init: true,
        },
      },
      gitArgs: [],
    })

    expect(resovleArgs(['checkbox', 'emoji', 'hello'])).toEqual({
      czgitArgs: {
        flag: null,
        subCommand: {
          checkbox: true,
          emoji: true,
        },
      },
      gitArgs: ['hello'],
    })
  })

  test('resolve flag should be right', () => {
    expect(resovleArgs(['-r'])).toEqual({
      czgitArgs: {
        flag: {
          retry: true,
        },
        subCommand: null,
      },
      gitArgs: [],
    })

    expect(resovleArgs(['--retry'])).toEqual({
      czgitArgs: {
        flag: {
          retry: true,
        },
        subCommand: null,
      },
      gitArgs: [],
    })

    expect(resovleArgs(['--retry', '--config=./config.js'])).toEqual({
      czgitArgs: {
        flag: {
          config: './config.js',
          retry: true,
        },
        subCommand: null,
      },
      gitArgs: [],
    })
  })

  test('both resovle subcmd and flag should be right', () => {
    expect(resovleArgs(['init', '--yes', '-y'])).toEqual({
      czgitArgs: {
        flag: {
          yes: true,
        },
        subCommand: {
          init: true,
        },
      },
      gitArgs: [],
    })

    expect(resovleArgs(['emoji', '-r'])).toEqual({
      czgitArgs: {
        flag: {
          retry: true,
        },
        subCommand: {
          emoji: true,
        },
      },
      gitArgs: [],
    })

    expect(resovleArgs(['--config=./config.js', 'break'])).toEqual({
      czgitArgs: {
        flag: {
          config: './config.js',
        },
        subCommand: {
          break: true,
        },
      },
      gitArgs: [],
    })

    expect(resovleArgs(['--config=./config.js', ':ff', '-a'])).toEqual({
      czgitArgs: {
        flag: {
          config: './config.js',
          alias: 'ff',
        },
        subCommand: null,
      },
      gitArgs: ['-a'],
    })

    expect(resovleArgs(['--config=./config.js', ':ff', '--alias=dd', '-a'])).toEqual({
      czgitArgs: {
        flag: {
          config: './config.js',
          alias: 'dd',
        },
        subCommand: null,
      },
      gitArgs: ['-a'],
    })

    expect(resovleArgs(['--config=./config.js', 'break', 'emoji', '-a', '--hello'])).toEqual({
      czgitArgs: {
        flag: {
          config: './config.js',
        },
        subCommand: {
          break: true,
          emoji: true,
        },
      },
      gitArgs: ['-a', '--hello'],
    })
  })
})
