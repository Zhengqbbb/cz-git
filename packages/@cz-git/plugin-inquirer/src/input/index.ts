/**
 * @description inquirer plugin - Search Checkbox
 * @author @Zhengqbbb (zhengqbbb@gmail.com)
 * @license MIT
 */

import type { Interface as ReadlineInterface } from 'node:readline'
import Base from 'inquirer/lib/prompts/base'
import observe from 'inquirer/lib/utils/events'
import { map, takeUntil } from 'rxjs/operators'
import type { Answers, Question } from 'inquirer'
import { ansiEscapes, style } from '../shared'
import type { CompletePromptQuestionOptions } from '../shared'

export type { CompletePromptQuestionOptions } from '../shared'
export class CompleteInput extends Base {
    private completeValue?: string
    private answer?: string
    private state?: string
    private done: any

    constructor(questions: Question, readline: ReadlineInterface, answers: Answers) {
        super(questions, readline, answers)
        const { completeValue } = this.opt as unknown as CompletePromptQuestionOptions
        if (typeof completeValue === 'string')
            this.completeValue = completeValue
    }

    /**
     * Start the Inquiry session
     *
     * @param {Function} cb Callback when prompt is done
     */
    _run(cb: any): this {
        this.done = cb

        // Once user confirm (enter key)
        const events = observe(this.rl)
        const submit = events.line.pipe(map(this.filterInput.bind(this)))

        const validation = this.handleSubmitEvents(submit)
        validation.success.forEach(this.onEnd.bind(this))
        validation.error.forEach(this.onError.bind(this))

        events.keypress.pipe(takeUntil(validation.success)).forEach(this.onKeypress.bind(this))

        // Init the prompt
        this.render()

        return this
    }

    /**
     * render screen
     *
     * @param {string} error output screen footer
     */
    render(error?: string) {
        let bottomContent = ''
        let appendContent = ''
        let message = this.getQuestion()
        const { transformer, completeValue } = this.opt as unknown as CompletePromptQuestionOptions
        const isFinal = this.status === 'answered'

        if (isFinal)
            appendContent = this.answer || ''
        else
            appendContent = this.rl.line

        if (transformer)
            message += transformer(appendContent, this.answers, { isFinal })
        else
            message += isFinal ? style.cyan(appendContent) : appendContent

        if (!this.state && !isFinal && completeValue) {
            message += style.gray(completeValue)
            bottomContent = style.gray(
                '\n' + '>> Press <tab>|<right> complete;Press <Enter> submit value',
            )
        }

        if (error)
            bottomContent = style.red('>> ') + error

        this.screen.render(message, bottomContent)
    }

    filterInput(input: string = this.rl.line) {
        if (!input)
            return this.completeValue || ''

        return input
    }

    onEnd(state: { value?: string }) {
        this.answer = state.value
        this.status = 'answered'

        // Re-render prompt
        this.render()

        this.screen.done()
        this.done(state.value)
    }

    onError({ value = '', isValid }: any) {
    // @ts-expect-error
        this.rl.line += value
        // @ts-expect-error
        this.rl.cursor += value.length
        this.render(isValid)
    }

    onKeypress(e: { key: { name?: string, ctrl?: boolean }, value: string }) {
        if (
            !this.state
            && this.completeValue
            && (e.key.name === 'tab' || e.key.name === 'right')
        ) {
            // NOTE: the ansi cursor not work
            this.rl.write(ansiEscapes.cursorLeft)
            this.rl.write(ansiEscapes.cursorForward(this.completeValue.length))
            // @ts-expect-error
            this.rl.line = this.completeValue
            // @ts-expect-error
            this.rl.cursor = this.completeValue.length
        }
        this.state = 'touched'
        this.completeValue = ''

        this.render()
    }
}
