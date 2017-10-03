import template from '../src/template'


describe('template', () => {
  it('execute', (done) => {
    let format = '${timestamp} (${namespace}) ${level}: ${data}';
    let data = {timestamp: new Date().toISOString(), namespace: 'class', level: 'INFO', data: 'Hello World'};
    let compiled = template(format);

    let str = compiled(data);
    str.should.be.equal(data.timestamp + ' (' + data.namespace + ') ' + data.level + ': ' + data.data);
    
    delete data['namespace'];
    str = compiled(data);
    str.should.be.equal(data.timestamp + ' (${namespace}) ' + data.level + ': ' + data.data);
    
    done();
  })
  it('execute extended format', (done) => {
    let format = 'Message: ${timestamp} (${namespace}) ${level}: ';
    let data = {timestamp: new Date().toISOString(), namespace: 'class', level: 'INFO'};
    let compiled = template(format);

    let str = compiled(data);
    str.should.be.equal('Message: ' + data.timestamp + ' (' + data.namespace + ') ' + data.level + ': ');    
    done();
  })
  it('execute with no literals', (done) => {
    let format = 'Message: Hellow world';
    let data = {timestamp: new Date().toISOString(), namespace: 'class', level: 'INFO'};
    let compiled = template(format);

    let str = compiled(data);
    str.should.be.equal('Message: Hellow world');    
    done();
  })
})