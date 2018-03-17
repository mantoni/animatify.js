var classList = require('../lib/animate').classList;
var assert = require('assert');

describe('classList', function(){
  describe('get', function() {
    it('should be equal, with more spaces', function () {
      var cls = ['hello', 'world'];
      var el = document.createElement('div');
      el.className = 'hello   world';
      var originCls = classList.get(el);
      console.log(originCls);
      assert.deepEqual(originCls, cls);
    });
  });
  describe('add', function(){
    it('should be equal', function(){
      var cls = ['hello', 'world'];
      var el = document.createElement('div');
      classList.add(el, cls);
      console.log(el.className);
      assert.equal(el.className, cls.join(' '));
    });
    it('should be equal, with already classes', function(){
      var cls = ['hello', 'world'];
      var el = document.createElement('div');
      el.className = cls.join(' ');
      classList.add(el, cls);
      console.log(el.className);
      assert.equal(el.className, cls.join(' '));
    });
  });
  describe('remove', function(){
    it('should be equal', function(){
      var cls = ['hello', 'world'];
      var el = document.createElement('div');
      classList.add(el, cls);
      classList.remove(el, cls);
      console.log(el.className);
      assert.equal(el.className, '');
    });
    it('should be equal, with already classes', function(){
      var cls = ['hello', 'world'];
      var el = document.createElement('div');
      el.className = 'ciao mondo';
      classList.add(el, cls);
      assert.equal(el.className, 'ciao mondo hello world');
      classList.remove(el, cls);
      console.log(el.className);
      assert.equal(el.className, 'ciao mondo');
    });
  });
});
