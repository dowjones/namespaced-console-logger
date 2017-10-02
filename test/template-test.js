import template from '../src/template'


describe('template', () => {
  it('parse and resolve', (done) => {
    let format = '${timestamp} (${namespace}) ${level}: ${data}';
    let data = {timestamp: new Date().toISOString(), namespace: 'class', level: 'INFO', data: 'Hello World'};
    let parsed = template.parse(format);

    let str = template.resolve(parsed, data);
    str.should.be.equal(data.timestamp + ' (' + data.namespace + ') ' + data.level + ': ' + data.data);
    
    delete data['namespace'];
    str = template.resolve(parsed, data);
    str.should.be.equal(data.timestamp + ' (${namespace}) ' + data.level + ': ' + data.data);
    
    done();
  })
  it('parse and resolve extended format', (done) => {
    let format = 'Message: ${timestamp} (${namespace}) ${level}: ';
    let data = {timestamp: new Date().toISOString(), namespace: 'class', level: 'INFO'};
    let parsed = template.parse(format);

    let str = template.resolve(parsed, data);
    str.should.be.equal('Message: ' + data.timestamp + ' (' + data.namespace + ') ' + data.level + ': ');    
    done();
  })
})