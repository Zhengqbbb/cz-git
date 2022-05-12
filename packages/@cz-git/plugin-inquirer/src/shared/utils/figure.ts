import process from "node:process";

/**
 * @description check the term is support unicode
 */
export const isUnicodeSupport = () => {
  if (process.platform !== "win32") {
    return process.env.TERM !== "linux"; // Linux console (kernel)
  }

  return (
    Boolean(process.env.CI) ||
    Boolean(process.env.WT_SESSION) || // Windows Terminal
    process.env.ConEmuTask === "{cmd::Cmder}" || // ConEmu and cmder
    process.env.TERM_PROGRAM === "vscode" ||
    process.env.TERM === "xterm-256color" ||
    process.env.TERM === "alacritty" ||
    process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm"
  );
};

const mainSymbols = {
  pointer: "❯",
  radioOn: "◉",
  radioOff: "◯",
  squareSmallFilled: "◼"
};

const fallbackSymbols = {
  pointer: ">",
  radioOn: "(*)",
  radioOff: "( )",
  squareSmallFilled: "■"
};

export const figures = isUnicodeSupport() ? mainSymbols : fallbackSymbols;
