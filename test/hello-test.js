var chai = require('chai');
var assert = chai.assert;

var hello = "hello world";
var hello2 = "hello world";

describe('Hello', function(){
  it('should return if hello variable are the same', function(){
    assert.equal(hello, hello2);
  })

})
