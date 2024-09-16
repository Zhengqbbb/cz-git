import type { Answers, Question } from 'inquirer'
import type Separator from 'inquirer/lib/objects/separator'

export interface ChoiceType<T> {
    name: string
    type: string | T
    short: string
    value: string | boolean
    line: string
    disabled: boolean
    checked: boolean
}

export interface ChoicesType {
    getChoice: (pointer: number) => ChoiceType<any>
    /**
     * origin choices
     */
    choices: ChoiceType<Separator['type']>[]
    /**
     * filter Separator choices
     */
    realChoices: ChoiceType<string>[]
}

export interface BaseOptionType {
    pageSize: number
    default?: any
}

interface isFinal {
    isFinal: boolean
}

export interface SearchPromptQuestionOptions<T extends Answers = Answers> extends Question<T> {
    separator: string

    /**
     * support rgb color code. e.g: `38;5;042`
     *
     * @default cyan
     * @tip the rgb color see to check your number: https://github.com/sindresorhus/xterm-colors
     */
    themeColorCode?: string

    /**
     * default checked item's value array on initial
     */
    initialCheckedValue?: string[] | string

    /**
     * Function to determine what options to display to user.
     * Called with previous answers object and the current user input each time the user types, it must return a promise.
     */
    source: (answersSoFar: T, input: string | undefined) => Promise<any[]>

    /**
     * The number of elements to show on each page.
     */
    pageSize?: number | undefined

    /**
     * Setting it to true turns the input into a normal text input.
     *
     * @default false
     */
    isInitDefault?: boolean | undefined
}

export interface CompletePromptQuestionOptions<T extends Answers = Answers> extends Question<T> {
    completeValue?: string
    transformer?: (input: string, answers: Answers, { isFinal }: isFinal) => string
}
