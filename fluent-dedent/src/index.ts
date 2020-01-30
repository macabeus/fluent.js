// A blank line may contain spaces and tabs.
const RE_BLANK = /^[ \t]*$/;

/**
 * Template literal tag for dedenting Fluent code.
 *
 * Strip the indent of the last line from each line of the input. Remove the
 * first and the last line from the output. The snippet must start on a new
 * line and it must end on a line of its own, with the closing delimiter on a
 * next line.
 *
 * @param strings
 * @param values
 */
export default function ftl(
  strings: TemplateStringsArray,
  ...values: Array<unknown>
): string {
  let code = strings.reduce((acc, cur) => acc + values.shift() + cur);
  let lines = code.split("\n");

  const first = lines.shift();
  if (first === undefined || !RE_BLANK.test(first)) {
    throw new RangeError("Content must start on a new line.");
  }

  const commonIndent = lines.pop();
  if (commonIndent === undefined || !RE_BLANK.test(commonIndent)) {
    throw new RangeError("Closing delimiter must appear on a new line.");
  }

  return lines.map((line: string, idx: number): string => {
    let lineIndent = line.slice(0, commonIndent.length);
    if (lineIndent.length === 0) {
      // Empty blank lines are preserved even if technically they are not
      // indented at all. This also short-circuits the dedentation logic when
      // commonIndent.length is 0, i.e. when all indents should be kept.
      return line;
    }
    if (lineIndent !== commonIndent) {
      // The indentation of the line must match commonIndent exacty.
      throw new RangeError(`Insufficient indentation in line ${idx + 1}.`);
    }
    // Strip commonIndent.
    return line.slice(commonIndent.length);
  }).join("\n");
}
