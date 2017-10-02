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
 * @param {Object} data meta data
 */

export default function (level = 'info', format, data) {
  format = format || '${timestamp} (${namespace}) ${level}:';
  data = data || {};
  const parsed = template.parse(format);
  const levelIndex = allLevels.indexOf(level) + 1;
  const get = createGet(
    allLevels.slice(0, levelIndex),
    allLevels.slice(levelIndex),
    parsed,
    data);
  return {get};
}

function createGet(enabled, disabled, parsed, data) {
  return function (namespace) {
    const logger = {};
    enabled.forEach(level => logger[level] = create(namespace, level, parsed, data));
    disabled.forEach(level => logger[level] = noop);
    return logger;
  };
}

function create(namespace, level, parsed, data) {
  return function () {
    data.namespace = namespace;
    data.level = level.toUpperCase();
    data.timestamp = new Date().toISOString();
    const prefix = template.resolve(parsed, data);
    const args = slice.call(arguments);
    if (typeof args[0] === 'string') args[0] = prefix + ' ' + args[0];
    else args.unshift(prefix);
    console[level].apply(console, args);
  };
}

function noop () {}
