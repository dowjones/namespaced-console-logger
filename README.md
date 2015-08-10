# Namespaced Console Logger 
[![Build Status](https://secure.travis-ci.org/dowjones/namespaced-console-logger.png)](http://travis-ci.org/dowjones/namespaced-console-logger) [![NPM version](https://badge.fury.io/js/namespaced-console-logger.svg)](http://badge.fury.io/js/namespaced-console-logger)


Minimal namespaced stdout / stderr logger with a timestamp for the browser and Node.js.
Satisfies three requirements below and attempts to do nothing else:

1. Is small: has no dependencies & <50 loc (for the browser)
2. Has a timestamp
3. Has a namespace


Example output:
```
2015-08-10T20:09:20.526Z (namespace) INFO: Hello world!
```


## Usage

```js
import createLoggers from 'namespaced-console-logger';

const loggers = createLoggers();
const logger = loggers.get('namespace');

logger.info('Hello %s!', 'world');
```

- `createLoggers()` takes a minimum logging `level`, which is one of: `['info', 'warn', 'error']` and defaults to `info`. For example if you select `warn`, all `info` logs will be ignored. `warn` and `error` logs will be displayed.


## License

[MIT](/LICENSE)
