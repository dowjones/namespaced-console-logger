import template from '../src/template'


describe('template', () => {
  it('should replace all variables or functions', () => {
    const format = '{{timestamp}} {{calculatedValue}} ({{namespace}}) {{level}}: {{data}}';
    const func = () =>  {
      return 1 + 2;
    };
    const data = {timestamp: new Date().toISOString(), calculatedValue: func, namespace: 'class', level: 'INFO', data: 'Hello World'};
    const compiled = template(format);
    const str = compiled(data);
    str.should.be.equal(data.timestamp + ' ' + func() + ' (' + data.namespace + ') ' + data.level + ': ' + data.data);
  });
  
  it('should replace all variables if format is instanceof String', () => {
    const format = new String('{{timestamp}} ({{namespace}}) {{level}}: {{data}}');
    const data = {timestamp: new Date().toISOString(), namespace: 'class', level: 'INFO', data: 'Hello World'};
    const compiled = template(format);
    const str = compiled(data);
    str.should.be.equal(data.timestamp + ' (' + data.namespace + ') ' + data.level + ': ' + data.data);
  });
  
  it('should keep placeholder if variable is undefined', () => {
    const format = '{{timestamp}} ({{namespace}}) {{level}}: {{data}}';
    const data = {timestamp: new Date().toISOString(), level: 'INFO', data: 'Hello World'};
    const compiled = template(format);
    const str = compiled(data);
    str.should.be.equal(data.timestamp + ' ({{namespace}}) ' + data.level + ': ' + data.data);
  });
  
  it('should preserve trailing whitespace', () => {
    const format = 'Message: {{timestamp}} ({{namespace}}) {{level}}: ';
    const data = {timestamp: new Date().toISOString(), namespace: 'class', level: 'INFO'};
    const compiled = template(format);
    const str = compiled(data);
    str.should.be.equal('Message: ' + data.timestamp + ' (' + data.namespace + ') ' + data.level + ': ');    
  });
  
  it('should return format string if no literals', () => {
    const format = 'Message: {{ Hellow world}';
    const data = {timestamp: new Date().toISOString(), namespace: 'class', level: 'INFO'};
    const compiled = template(format);

    let str = compiled(data);
    str.should.be.equal('Message: {{ Hellow world}');   
  });
  
  it('should return format string if no data', () => {
    const format = '{{timestamp}} ({{namespace}}) {{level}}:';
    const compiled = template(format);

    let str = compiled({});
    str.should.be.equal('{{timestamp}} ({{namespace}}) {{level}}:');  
    
    str = compiled();
    str.should.be.equal('{{timestamp}} ({{namespace}}) {{level}}:');  
  });
  
  it('should return empty string if format is undefined or empty or not a string', () => {
    const format = 'Message: Hellow world';
    const data = {timestamp: new Date().toISOString(), namespace: 'class', level: 'INFO'};

    let compiled = template();
    let str = compiled(data);
    str.should.be.equal('');    

    compiled = template('');
    str = compiled(data);
    str.should.be.equal('');  

    compiled = template({});
    str = compiled(data);
    str.should.be.equal('');  

    compiled = template(() => {});
    str = compiled(data);
    str.should.be.equal('');  
  });
})