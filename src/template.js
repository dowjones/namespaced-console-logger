/**
 * Parse format string and return object
 *
 * @param {String} format format string
 */
export default function (format) {
  let regex = /\$\{(\w+)\}/g;
  let result = [];

  let index = 0;
  let length = 0;
  let match;
  while (match = regex.exec(format)) {
    if (index + length < match.index) {
      result.push('\'' + format.substring(index + length, match.index) + '\'');
    }
    result.push('(data.' + match[1] + ' || \'' + match[0] + '\')');

    index = match.index;
    length = match[0].length;
  }
  if ((index + length) < format.length) {
    result.push('\'' + format.substring(index + length, format.length) + '\'');
  }

  let funcBody = 'return ' + result.join(' + ') + ';';
  return new Function('data', funcBody);
}