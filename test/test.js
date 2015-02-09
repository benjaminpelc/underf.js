/**
* Node tests: Requires Mocha.JS, Chai.JS 
*/

var assert = require('./vendor/chai').assert;
var _f = require('../src/underf');

describe('add', function(){
	it('Should be equal to 5', function(){
		assert.equal(5, _f.add(2, 3));
	});

	it('should return a function when given one argument', function() {
		assert.typeOf(_f.add(2), 'function');
	});
	
	it('should work as a curried function', function() {
		assert.equal(9, _f.add(5)(4));
	});

	it('should return a string if one argument is a string', function() {
		assert.typeOf(_f.add('2', 2), 'string', 'Adding "2" and 2');
		assert.typeOf(_f.add(2,'2'), 'string');
	});
});

describe('square', function() {
	it('Should be equal to 9', function() {
		assert.equal(9, _f.square(3));
	});
});
