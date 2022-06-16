import ora from "ora";
import { optimizePages } from "./assert";

const spinner = ora("\u001b[38;5;043mpost-build enchance pages...\u001b[0m 📦").start();

try {
  const start = Date.now();
  /**
   * enchance the page html
   */
  optimizePages(true);

  spinner.succeed(
    `\u001b[38;5;043mpost-build enchance pages success! ${((Date.now() - start) / 1000).toFixed(
      2
    )}s\u001b[0m 🎉`
  );
} catch (e) {
  spinner.fail("post-build enchance pages failed: " + e);
}
