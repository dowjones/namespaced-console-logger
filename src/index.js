/* eslint no-console: 0 */
const slice = Array.prototype.slice;
const allLevels = ['error', 'warn', 'info'];

/**
 * Create a logger with a default
 * logging level of `info`.
 *
 * @param {String} level (info|warn|error) minimum logging level
 * @param {Object} options options such as prefixes
 */

export default function (level = 'info', options) {
  const levelIndex = allLevels.indexOf(level) + 1;
  const get = createGet(
    allLevels.slice(0, levelIndex),
    allLevels.slice(levelIndex),
    options);
  return {get};
}

function createGet(enabled, disabled, options) {
  return function (namespace) {
    const logger = {};
    enabled.forEach(level => logger[level] = create(namespace, level, options));
    disabled.forEach(level => logger[level] = noop);
    return logger;
  };
}

function create(namespace, level, options) {
  return function () {
    let prefixes = '';
    if (options && Array.isArray(options.prefixes)) {
      prefixes = options.prefixes.join(' ');
    }
    const prefix = [
      new Date().toISOString(),
      prefixes,
      '(' + namespace + ')',
      level.toUpperCase()
    ].filter(Boolean).join(' ') + ':';
    const args = slice.call(arguments);
    if (typeof args[0] === 'string') args[0] = prefix + ' ' + args[0];
    else args.unshift(prefix);
    console[level].apply(console, args);
  };
}

function noop () {}
