import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import cnst from 'node:constants'
import { spawn } from 'node:child_process'
import rimraf from 'rimraf'
import type { Answers, CommitizenGitOptions } from '../types'
import { generateMessage } from '../../generator'
import { log } from './util'

/**
 * @description: fork by "temp/open" v0.9.4
 */
interface OpenFile {
  path: string
  fd: number
}

interface AffixOptions {
  prefix?: string | null | undefined
  suffix?: string | null | undefined
  dir?: string | undefined
}

const dir = path.resolve(os.tmpdir())
const RDWR_EXCL = cnst.O_CREAT | cnst.O_TRUNC | cnst.O_RDWR | cnst.O_EXCL
const dirsToDelete: string[] = []
const rimrafSync = rimraf.sync

const promisify = function (callback: any, ...arges: any[]) {
  if (typeof callback === 'function')
    return [undefined, callback]

  let promiseCallback
  const promise = new Promise((resolve, reject) => {
    promiseCallback = function () {
      const args = Array.from(arges)
      const err = args.shift()

      process.nextTick(() => {
        if (err)
          reject(err)

        else if (args.length === 1)
          resolve(args[0])

        else
          resolve(args)
      })
    }
  })

  return [promise, promiseCallback]
}

const parseAffixes = function (
  rawAffixes: string | AffixOptions | undefined,
  defaultPrefix: string,
) {
  let affixes: AffixOptions = { prefix: null, suffix: null }
  if (rawAffixes) {
    switch (typeof rawAffixes) {
      case 'string':
        affixes.prefix = rawAffixes
        break
      case 'object':
        affixes = rawAffixes
        break
      default:
        throw new Error(`Unknown affix declaration: ${affixes}`)
    }
  }
  else {
    affixes.prefix = defaultPrefix
  }
  return affixes
}

const generateName = function (
  rawAffixes: string | AffixOptions | undefined,
  defaultPrefix: string,
) {
  const affixes: AffixOptions = parseAffixes(rawAffixes, defaultPrefix)
  const now = new Date()
  const name = [
    affixes.prefix,
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    '-',
    process.pid,
    '-',
    (Math.random() * 0x100000000 + 1).toString(36),
    affixes.suffix,
  ].join('')
  return path.join(affixes.dir || dir, name)
}

const tracking = false
let exitListenerAttached = false
const filesToDelete: string[] = []

function cleanupFilesSync() {
  if (!tracking)
    return false

  let count = 0
  let toDelete
  // eslint-disable-next-line no-cond-assign
  while ((toDelete = filesToDelete.shift()) !== undefined) {
    rimrafSync(toDelete, { maxBusyTries: 6 })
    count++
  }
  return count
}

function cleanupDirsSync() {
  if (!tracking)
    return false

  let count = 0
  let toDelete
  // eslint-disable-next-line no-cond-assign
  while ((toDelete = dirsToDelete.shift()) !== undefined) {
    rimrafSync(toDelete, { maxBusyTries: 6 })
    count++
  }
  return count
}

function cleanupSync() {
  if (!tracking)
    return false

  const fileCount = cleanupFilesSync()
  const dirCount = cleanupDirsSync()
  return { files: fileCount, dirs: dirCount }
}

function attachExitListener() {
  if (!tracking)
    return false
  if (!exitListenerAttached) {
    process.addListener('exit', () => {
      try {
        cleanupSync()
      }
      catch (err) {
        console.warn('Fail to clean temporary files on exit : ', err)
        throw err
      }
    })
    exitListenerAttached = true
  }
}

function deleteFileOnExit(filePath: string) {
  if (!tracking)
    return false
  attachExitListener()
  filesToDelete.push(filePath)
}

function tempOpen(affixes: string | AffixOptions | undefined,
  callback: (err: any, result: OpenFile) => void) {
  const p = promisify(callback)
  const promise = p[0]
  callback = p[1]

  const path = generateName(affixes, 'f-')
  fs.open(path, RDWR_EXCL, 0o600, (err, fd) => {
    if (!err)
      deleteFileOnExit(path)

    callback(err, { path, fd })
  })
  return promise
}

/**
 * @description: fork by "editor" v1.0.0
 */
function editor(file?: string, opts?: any | object, cb?: any) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  if (!opts)
    opts = {}

  const ed = process.platform.startsWith('win') ? 'notepad' : 'vim'
  const editor = opts.editor || process.env.VISUAL || process.env.EDITOR || ed
  const args = editor.split(/\s+/)
  const bin = args.shift()

  const ps = spawn(bin, args.concat([file]), { stdio: 'inherit' })

  ps.on('exit', (code, sig) => {
    if (typeof cb === 'function')
      cb(code, sig)
  })
}

export function editCommit(answers: Answers,
  options: CommitizenGitOptions,
  cb: (message: string) => void) {
  tempOpen(undefined, (err, info) => {
    if (!err) {
      fs.writeSync(info.fd, generateMessage(answers, options))
      fs.close(info.fd, () => {
        editor(info.path, (code: number) => {
          if (code === 0) {
            const commitStr = fs.readFileSync(info.path, {
              encoding: 'utf8',
            })
            cb(commitStr)
          }
          else {
            log(
              'warm',
              `Editor exit non zero. Commit message was:\n${generateMessage(answers, options)}`,
            )
          }
        })
      })
    }
  })
}

export function getPreparedCommit(context: string) {
  let message = null
  if (fs.existsSync(path.resolve(__dirname, './.git/COMMIT_EDITMSG'))) {
    const prepared = fs.readFileSync(path.resolve(__dirname, './.git/COMMIT_EDITMSG'), 'utf-8')

    const preparedCommit = prepared
      .replace(/^#.*/gm, '')
      .replace(/^\s*[\r\n]/gm, '')
      .replace(/[\r\n]$/, '')
      .split(/\r\n|\r|\n/)

    if (preparedCommit.length && preparedCommit[0]) {
      if (context === 'subject') {
        [message] = preparedCommit
      }
      else if (context === 'body' && preparedCommit.length > 1) {
        preparedCommit.shift()
        message = preparedCommit.join('|')
      }
    }
  }
  return message
}
