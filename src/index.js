/* eslint no-console: 0 */
const slice = Array.prototype.slice;
const allLevels = ['error', 'warn', 'info'];

/**
 * Create a logger with a default
 * logging level of `info`.
 *
 * @param {String} level (info|warn|error) minimum logging level
 */

export default function (level = 'info') {
  const levelIndex = allLevels.indexOf(level) + 1;
  const get = createGet(
    allLevels.slice(0, levelIndex),
    allLevels.slice(levelIndex));
  return {get};
}

function createGet(enabled, disabled) {
  return function (namespace) {
    const logger = {};
    enabled.forEach(level => logger[level] = create(namespace, level));
    disabled.forEach(level => logger[level] = noop);
    return logger;
  };
}

function create(namespace, level) {
  return function () {
    const prefix = [
      new Date().toISOString(),
      '(' + namespace + ')',
      level.toUpperCase()
    ].join(' ') + ':';
    const args = slice.call(arguments);
    if (typeof args[0] === 'string') args[0] = prefix + ' ' + args[0];
    else args.unshift(prefix);
    console[level].apply(console, args);
  };
}

function noop () {}
