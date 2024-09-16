const ESC = '\u001B['
/**
 * @description ANSI escape codes for manipulating the terminal
 */
export const ansiEscapes = {
    /** move cursor to left */
    cursorLeft: `${ESC}D`,
    /** move cursor forward count length */
    cursorForward: (count = 1) => `${ESC + count}C`,
    /** move cursor backward count length */
    cursorBackward: (count = 1) => `${ESC + count}D`,
}
