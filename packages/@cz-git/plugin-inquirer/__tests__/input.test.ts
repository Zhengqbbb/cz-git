import { beforeEach, describe, expect, it } from 'vitest'
import { CompleteInput } from '@cz-git/inquirer'
import ReadlineStub from './helpers/readline'

/**
 * @description: Test - inquirer plugin: CompleteInput
 */

describe('inquirer-CompleteInput', () => {
    let rl: any
    let prompt: CompleteInput
    let promiseForAnswer: any

    beforeEach(() => {
        rl = new ReadlineStub()
    })

    describe('basic feature', () => {
        describe('parameter', () => {
            it('name should be require', () => {
                expect(() => {
                    new CompleteInput(
                        {
                            message: 'test',
                        } as any,
                        rl,
                        {},
                    )
                }).toThrowError(/name/)
            })
        })

        describe('filter', () => {
            it('filter should be work', async () => {
                prompt = new CompleteInput(
                    {
                        message: 'test',
                        name: 'name',
                        filter() {
                            return 'pass'
                        },
                    } as any,
                    rl,
                    {},
                )
                promiseForAnswer = getPromiseForAnswer()
                enter()
                const answer = await promiseForAnswer.then()
                expect(answer).toEqual('pass')
            }, 1000)
        })

    // validation
    // submit
    // deafult
    })

    describe('main behaviour', () => {
        describe('default behaviour', () => {
            beforeEach(() => {
                prompt = new CompleteInput(
                    {
                        message: 'test',
                        name: 'name',
                    } as any,
                    rl,
                    {},
                )
            })

            it('default input empty should be output empty', async () => {
                promiseForAnswer = getPromiseForAnswer()
                enter()
                const answer = await promiseForAnswer.then()
                expect(answer).toEqual('')
            }, 1000)

            it('type some word should be output value', async () => {
                promiseForAnswer = getPromiseForAnswer()
                type('helle world...!')
                enter()
                const answer = await promiseForAnswer.then()
                expect(answer).toEqual('helle world...!')
            }, 1000)
        })

        describe('use complete behaviour', () => {
            beforeEach(() => {
                prompt = new CompleteInput(
                    {
                        message: 'test',
                        name: 'name',
                        completeValue: '[botton]',
                    } as any,
                    rl,
                    {},
                )
            })

            it('just enter should be output completeValue', async () => {
                promiseForAnswer = getPromiseForAnswer()
                enter()
                const answer = await promiseForAnswer.then()
                expect(answer).toEqual('[botton]')
            }, 1000)

            it('tab and enter should be output completeValue', async () => {
                promiseForAnswer = getPromiseForAnswer()
                tab()
                enter()
                const answer = await promiseForAnswer.then()
                expect(answer).toEqual('[botton]')
            }, 1000)

            it('right key and enter should be output completeValue', async () => {
                promiseForAnswer = getPromiseForAnswer()
                moveRight()
                enter()
                const answer = await promiseForAnswer.then()
                expect(answer).toEqual('[botton]')
            }, 1000)

            it('right key and enter should be output true value', async () => {
                promiseForAnswer = getPromiseForAnswer()
                tab()
                type('update ...')
                enter()
                const answer = await promiseForAnswer.then()
                expect(answer).toEqual('[botton]update ...')
            }, 1000)

            it('use backspace key and enter should be output empty value', async () => {
                promiseForAnswer = getPromiseForAnswer()
                backspace()
                enter()
                const answer = await promiseForAnswer.then()
                expect(answer).toEqual('')
            }, 1000)

            it('use tab and backspace key should be normal delete', async () => {
                promiseForAnswer = getPromiseForAnswer()
                tab()
                backspace()
                backspace()
                enter()
                const answer = await promiseForAnswer.then()
                expect(answer).toEqual('[botto')
            }, 1000)

            it('just type word the completeValue should be remove', async () => {
                promiseForAnswer = getPromiseForAnswer()
                type('update ...')
                enter()
                const answer = await promiseForAnswer.then()
                expect(answer).toEqual('update ...')
            }, 1000)
        })
    })

    /**
     * @description: start prompt run
     */
    function getPromiseForAnswer() {
        return prompt.run()
    }

    function enter() {
        rl.emit('line')
    }

    // function space() {
    //   rl.input.emit("keypress", "", {
    //     name: "space"
    //   });
    // }

    function backspace() {
        rl.line = rl.line.substr(0, rl.line.length - 1)
        rl.input.emit('keypress', '', {
            name: 'backspace',
        })
    }

    // function typeNonChar() {
    //   rl.input.emit("keypress", "", {
    //     name: "shift"
    //   });
    // }

    function type(word: string) {
        word.split('').forEach((char) => {
            rl.line += char
            rl.input.emit('keypress', char)
        })
    }

    // function moveUp() {
    //   rl.input.emit("keypress", "", {
    //     name: "up"
    //   });
    // }

    function moveRight() {
        rl.input.emit('keypress', '', {
            name: 'right',
        })
    }

    // function moveDown() {
    //   rl.input.emit("keypress", "", {
    //     name: "down"
    //   });
    // }

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

    // function getCursor() {
    //   return rl.cursor;
    // }

    function tab() {
        rl.input.emit('keypress', '', {
            name: 'tab',
        })
    }
})
