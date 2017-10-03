import template from './template'

/* eslint no-console: 0 */
const slice = Array.prototype.slice;
const allLevels = ['error', 'warn', 'info'];

/**
 * Create a logger with a default
 * logging level of `info`.
 *
 * @param {String} level (info|warn|error) minimum logging level
 * @param {String} format format meta data
 * @param {Object} meta meta data
 */

export default function (level = 'info', format, meta) {
  format = format || '${timestamp} (${namespace}) ${level}:';
  meta = meta || {};
  const compiledFunc = template(format);
  const levelIndex = allLevels.indexOf(level) + 1;
  const get = createGet(
    allLevels.slice(0, levelIndex),
    allLevels.slice(levelIndex),
    compiledFunc,
    meta);
  return {get};
}

function createGet(enabled, disabled, compiledFunc, meta) {
  return function (namespace) {
    const logger = {};
    enabled.forEach(level => logger[level] = create(namespace, level, compiledFunc, meta));
    disabled.forEach(level => logger[level] = noop);
    return logger;
  };
}

function create(namespace, level, compiledFunc, meta) {
  return function () {
    meta.namespace = namespace;
    meta.level = level.toUpperCase();
    meta.timestamp = new Date().toISOString();
    const prefix = compiledFunc(meta);
    const args = slice.call(arguments);
    if (typeof args[0] === 'string') args[0] = prefix + ' ' + args[0];
    else args.unshift(prefix);
    console[level].apply(console, args);
  };
}

function noop () {}
