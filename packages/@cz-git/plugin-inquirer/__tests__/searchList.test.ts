import { beforeEach, describe, expect, test, vitest } from 'vitest'
import { SearchList } from '@cz-git/inquirer'
import inquirer from 'inquirer'
import ReadlineStub from './helpers/readline'

/**
 * @description: Test - inquirer plugin: SearchList
 */

describe('inquirer-SearchList', () => {
  let rl: any
  let source: any
  /** call the source */
  let resolve: any
  let prompt: SearchList
  let promise: any
  let promiseForAnswer: any
  let defaultChoices: any

  beforeEach(() => {
    defaultChoices = ['foo', new inquirer.Separator(), 'bar', 'bum']
    // eslint-disable-next-line promise/param-names
    promise = new Promise((res) => {
      resolve = res
    })
    source = vitest.fn(() => promise)

    rl = new ReadlineStub()
    prompt = new SearchList(
      {
        message: 'test',
        name: 'name',
        source,
      } as any,
      rl,
      {},
    )
  })

  describe('basic feature', () => {
    describe('parameter', () => {
      test('name should be require', () => {
        expect(() => {
          new SearchList(
            {
              message: 'test',
              source,
            } as any,
            rl,
            {},
          )
        }).toThrowError(/name/)
      })

      test('source should be require', () => {
        expect(() => {
          new SearchList(
            {
              name: 'foo',
              message: 'foo',
            } as any,
            rl,
            {},
          )
        }).toThrowError(/source/)
      })
    })

    // validation
    // submit
    // filter
    // deafult
  })

  describe('main behaviour', () => {
    describe('default behaviour', () => {
      test('default enter should be the first to selected item', async () => {
        prompt = new SearchList(
          {
            message: 'test',
            name: 'name',
            source,
          } as any,
          rl,
          {},
        )
        promiseForAnswer = getPromiseForAnswer()
        await resolve([9, 0, 'foo'])
        await promise.then()
        enter()
        const answer = await promiseForAnswer.then()
        expect(answer).toEqual(9)
      }, 1000)
    })

    describe('keyPress behaviour', () => {
      let promiseForAnswer: any
      beforeEach(() => {
        promiseForAnswer = getPromiseForAnswer()
        resolve(defaultChoices)
      })

      test('use keypress down should be normal', async () => {
        moveDown()
        enter()
        const answer = await promiseForAnswer.then()
        expect(answer).toEqual('bar')
      }, 1000)

      test('use keypress down and up should be normal', async () => {
        moveDown()
        moveDown()
        moveUp()
        enter()
        const answer = await promiseForAnswer.then()
        expect(answer).toEqual('bar')
      }, 1000)

      test('use loop choices down should be normal', async () => {
        moveDown()
        tab()
        moveDown()
        enter()
        const answer = await promiseForAnswer.then()
        expect(answer).toEqual('foo')
      }, 1000)

      test('use loop choices up should be normal', async () => {
        moveUp()
        enter()
        const answer = await promiseForAnswer.then()
        expect(answer).toEqual('bum')
      }, 1000)

      test('use tab and the cursor position should be right', async () => {
        tab()
        tab()
        expect(getCursor()).toEqual(0)
        enter()
        const answer = await promiseForAnswer.then()
        expect(answer).toEqual('bum')
      }, 1000)
    })

    describe('search behaviour', async () => {
      beforeEach(async () => {
        getPromiseForAnswer()
        source.mockReset()
        source.mockReturnValue(promise)
      })

      test('when user types should be call searche after each char', async () => {
        type('a')
        expect(source).toBeCalledWith({}, 'a')
        type('bba')
        expect(source).toBeCalledWith({}, 'ab')
        expect(source).toBeCalledWith({}, 'abb')
        expect(source).toBeCalledWith({}, 'abba')
        expect(source).toBeCalledTimes(4)
      }, 1000)

      test('if same searchterm (not input added) should be does not search again', async () => {
        type('ice')
        expect(source).toBeCalledTimes(3)
        source.mockReset()
        typeNonChar()
        expect(source).toBeCalledTimes(0)
      }, 1000)
    })
  })

  /** start prompt run */
  function getPromiseForAnswer() {
    return prompt.run()
  }

  function enter() {
    rl.emit('line')
  }

  function typeNonChar() {
    rl.input.emit('keypress', '', {
      name: 'shift',
    })
  }

  function type(word: string) {
    word.split('').forEach((char) => {
      rl.line += char
      rl.input.emit('keypress', char)
    })
  }

  function moveUp() {
    rl.input.emit('keypress', '', {
      name: 'up',
    })
  }

  function moveDown() {
    rl.input.emit('keypress', '', {
      name: 'down',
    })
  }

  // function moveUpCtrl() {
  //   rl.input.emit("keypress", "", {
  //     name: "p",
  //     ctrl: true
  //   });
  // }

  // function moveDownCtrl() {
  //   rl.input.emit("keypress", "", {
  //     name: "n",
  //     ctrl: true
  //   });
  // }

  function getCursor() {
    return rl.cursor
  }

  function tab() {
    rl.input.emit('keypress', '', {
      name: 'tab',
    })
  }
})
