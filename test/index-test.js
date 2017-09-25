import {stub, useFakeTimers} from 'sinon';
import createLoggers from '../src';

describe('namespaced-console-logger', () => {
  let infoStub, warnStub, errorStub, clock;

  beforeEach(() => {
    infoStub = stub(console, 'info');
    warnStub = stub(console, 'warn');
    errorStub = stub(console, 'error');
    clock = useFakeTimers();
  });

  afterEach(() => {
    infoStub.restore();
    warnStub.restore();
    errorStub.restore();
    clock.restore();
  });

  describe('get', () => {
    let logger;
    beforeEach(() => logger = createLoggers().get('nsp'));

    it('should info log with timestamp and namespace', () => {
      logger.info('i');
      infoStub.calledOnce.should.be.ok();
      infoStub.firstCall.args[0].should
        .equal('1970-01-01T00:00:00.000Z (nsp) INFO: i');
    });

    it('should warn log with timestamp and namespace', () => {
      logger.warn('w');
      warnStub.calledOnce.should.be.ok();
      warnStub.firstCall.args[0].should
        .equal('1970-01-01T00:00:00.000Z (nsp) WARN: w');
    });

    it('should error log with timestamp and namespace', () => {
      logger.error('e');
      errorStub.calledOnce.should.be.ok();
      errorStub.firstCall.args[0].should
        .equal('1970-01-01T00:00:00.000Z (nsp) ERROR: e');
    });

    it('should support non-string input', () => {
      logger.info(14);
      const args = infoStub.firstCall.args;
      args[0].should.equal('1970-01-01T00:00:00.000Z (nsp) INFO:');
      args[1].should.equal(14);
    });
  });

  describe('with levels', () => {
    it('should enable all on min info', () => {
      const loggers = createLoggers('info');
      const logger = loggers.get('n');

      logger.info('i');
      infoStub.calledOnce.should.be.ok();

      logger.warn('i');
      warnStub.calledOnce.should.be.ok();

      logger.error('i');
      errorStub.calledOnce.should.be.ok();
    });

    it('should disable info level on min warn', () => {
      const loggers = createLoggers('warn');
      const logger = loggers.get('n');

      logger.info('i');
      infoStub.called.should.not.be.ok();

      logger.warn('i');
      warnStub.calledOnce.should.be.ok();

      logger.error('i');
      errorStub.calledOnce.should.be.ok();
    });

    it('should disable info and warn level on min error', () => {
      const loggers = createLoggers('error');
      const logger = loggers.get('n');

      logger.info('i');
      infoStub.called.should.not.be.ok();

      logger.warn('i');
      warnStub.called.should.not.be.ok();

      logger.error('i');
      errorStub.calledOnce.should.be.ok();
    });
  });

  describe('with prefixes', () => {
    it('should info log with timestamp and namespace and single prefixe', () => {
      let logger = createLoggers('info', {prefixes: [ 'prefix' ]}).get('nsp')
      logger.info('i');
      infoStub.calledOnce.should.be.ok();
      infoStub.firstCall.args[0].should
        .equal('1970-01-01T00:00:00.000Z prefix (nsp) INFO: i');
    });

    it('should info log with timestamp and namespace and multiple prefixes', () => {
      let logger = createLoggers('info', {prefixes: [ 'prefix1', 'prefixes2' ]}).get('nsp')
      logger.info('i');
      infoStub.calledOnce.should.be.ok();
      infoStub.firstCall.args[0].should
        .equal('1970-01-01T00:00:00.000Z prefix1 prefixes2 (nsp) INFO: i');
    });

    it('should info log with timestamp and namespace and no options', () => {
      let logger = createLoggers().get('nsp')
      logger.info('i');
      infoStub.calledOnce.should.be.ok();
      infoStub.firstCall.args[0].should
        .equal('1970-01-01T00:00:00.000Z (nsp) INFO: i');
    });

    it('should info log with timestamp and namespace and no prefixes', () => {
      let logger = createLoggers('info', {}).get('nsp')
      logger.info('i');
      infoStub.calledOnce.should.be.ok();
      infoStub.firstCall.args[0].should
        .equal('1970-01-01T00:00:00.000Z (nsp) INFO: i');
    });

    it('should info log with timestamp and namespace and invalid prefixes', () => {
      let logger = createLoggers('info', {prefixes: {}}).get('nsp')
      logger.info('i');
      infoStub.calledOnce.should.be.ok();
      infoStub.firstCall.args[0].should
        .equal('1970-01-01T00:00:00.000Z (nsp) INFO: i');
    });
  });
});
